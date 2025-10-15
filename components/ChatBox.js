import { Fragment, useContext, useState, useEffect, useRef } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./ChatBox.module.scss";
import Image from "next/legacy/image";
import Tooltip from "@mui/material/Tooltip";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CircleIcon from "@mui/icons-material/Circle";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import GroupIcon from "@mui/icons-material/Group";
import EditIcon from "@mui/icons-material/Edit";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import loaderImage from "@/assets/loader.png";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import Chat from "./forms/Chat";
import imageCompression from "browser-image-compression";
import {
  convertDate,
  applyFontToEnglishWords,
  uploadMedia,
  sixGenerator,
} from "@/services/utility";
import {
  getChatsApi,
  createMessageApi,
  getMessagesApi,
  getUsersApi,
  getSingleChatApi,
  updateChatApi,
  getNotificationApi,
  deleteNotificationApi,
  createNotificationApi,
  getSingleUserApi,
  updateUserApi,
  deleteMessageApi,
} from "@/services/api";

export default function ChatBox({ floatChat }) {
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [chatPanel, setChatPanel] = useState("group" || "chat" || "document");
  const [displayPopup, setDisplayPopup] = useState(false);
  const [chatsDataDisplay, setChatsDataDisplay] = useState([]);
  const [chatRender, setChatRender] = useState([]);
  const [documentsRender, setDocumentsRender] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageContent, setMessageContent] = useState("");
  const [isFarsi, setIsFarsi] = useState(false);
  const [media, setMedia] = useState(null);
  const sourceLink = "https://eshareh.storage.iran.liara.space";

  const fullSizeChatBox =
    !floatChat &&
    (screenSize === "desktop" || screenSize === "tablet-landscape");
  const intervalRef = useRef(null);

  useEffect(() => {
    fetchChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchChats = async () => {
    const chatsData = await getChatsApi();
    const notificationsData = await getNotificationApi();
    let filterChats = chatsData.filter((chat) =>
      chat.users.includes(currentUser._id)
    );
    let filterNotifications = notificationsData.filter(
      (notification) => notification.userId === currentUser._id
    );
    let addOption = filterChats.map((chat) => ({
      ...chat,
      active: chat._id === selectedChat?._id,
      adminAccess: chat.adminsId.includes(currentUser._id),
      isRead:
        filterNotifications.filter(
          (notification) => notification.chatId === chat._id
        ).length === 0,
    }));
    addOption.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    setChatsDataDisplay(addOption);
  };

  useEffect(() => {
    const abortController = new AbortController();

    const startPolling = () => {
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          if (navigator.onLine) {
            fetchMessages(abortController.signal);
          }
        }, 5000);
      }
    };

    const stopPolling = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopPolling();
      } else {
        if (navigator.onLine) {
          fetchMessages(abortController.signal);
        }
        startPolling();
      }
    };

    const handleWindowBlur = async () => {
      const userData = await getSingleUserApi(currentUser._id);
      const updateUserData = {
        ...userData,
        status: "offline",
      };
      await updateUserApi(updateUserData);
      stopPolling();
    };

    const handleWindowFocus = async () => {
      const userData = await getSingleUserApi(currentUser._id);
      const updateUserData = {
        ...userData,
        status: "online",
      };
      await updateUserApi(updateUserData);
      // delete notifications
      const notificationsData = await getNotificationApi();
      let filterNotifications = notificationsData.filter(
        (notification) =>
          notification.userId === currentUser._id &&
          notification.chatId === selectedChat._id
      );
      if (filterNotifications.length > 0) {
        const deletionPromises = filterNotifications.map((notification) =>
          deleteNotificationApi(notification._id)
        );
        await Promise.all(deletionPromises);
      }
      if (navigator.onLine) {
        fetchMessages(abortController.signal);
      }
      fetchChats();
      startPolling();
    };

    const handleOnline = () => {
      fetchMessages(abortController.signal);
      startPolling();
    };

    const handleOffline = () => {
      stopPolling();
    };

    if (selectedChat?._id) {
      if (navigator.onLine) {
        fetchMessages(abortController.signal);
      }
      startPolling();

      document.addEventListener("visibilitychange", handleVisibilityChange);
      window.addEventListener("blur", handleWindowBlur);
      window.addEventListener("focus", handleWindowFocus);
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);
    }

    return () => {
      stopPolling();
      abortController.abort();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat?._id]);

  const fetchMessages = async (signal) => {
    if (!selectedChat?._id) return;
    const chatData = await getMessagesApi({ signal });
    const usersData = await getUsersApi();
    const currentChat = chatData.filter(
      (chat) => chat.chatId === selectedChat._id
    );
    const chatFiles = currentChat
      .filter((chat) => chat.type === "document")
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    const enrichedChat = enrichChatWithUser(currentChat, usersData);
    enrichedChat.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    setChatRender(enrichedChat);
    setDocumentsRender(chatFiles);
  };

  const enrichChatWithUser = (chatData, usersData) =>
    chatData.map((chat) => ({
      ...chat,
      user: usersData.find((user) => user._id === chat.senderId) || null,
    }));

  const handleChatSelection = async (index) => {
    const updatedItems = chatsDataDisplay.map((item, idx) => ({
      ...item,
      active: idx === index,
    }));
    setChatsDataDisplay(updatedItems);
    setSelectedChat(updatedItems[index]);
    setChatPanel("chat");
    await handleDeleteNotifications(index);
  };

  const handleDeleteNotifications = async (index) => {
    const notificationsData = await getNotificationApi();
    let filterNotifications = notificationsData.filter(
      (notification) =>
        notification.userId === currentUser._id &&
        notification.chatId === chatsDataDisplay[index]._id
    );
    if (filterNotifications.length > 0) {
      const deletionPromises = filterNotifications.map((notification) =>
        deleteNotificationApi(notification._id)
      );
      await Promise.all(deletionPromises);
    }
  };

  const createNewMessage = async (
    type,
    content = "",
    fileName = "",
    fileType = ""
  ) => {
    if (type === "text" && !messageContent?.trim()) return;
    const textContent = messageContent?.trim() || "";
    const finalContent = content || textContent;
    const isText = type === "text";
    const isDocument = type === "document";

    const messageObject = {
      chatId: selectedChat._id,
      senderId: currentUser._id,
      type,
      content: isText ? finalContent : fileName,
      fileUrl: isDocument ? finalContent : "",
      fileType: fileType,
      isDeleted: false,
      isEdited: false,
    };

    let lastMessage = await createMessageApi(messageObject);
    await updateCurrentChat(lastMessage);
    setMessageContent("");
    fetchMessages();
  };

  const updateCurrentChat = async (lastMessage) => {
    let currentChat = await getSingleChatApi(selectedChat._id);
    await updateChatApi({
      ...currentChat,
      lastMessageId: lastMessage._id,
    });
    await createNotification(lastMessage);
    fetchChats();
  };

  const createNotification = async (lastMessage) => {
    let baseNotificationObject = {
      chatId: selectedChat._id,
      messageId: lastMessage._id,
      type: "message",
      isRead: false,
    };
    let filterCurrentUser = selectedChat.users.filter(
      (user) => user !== currentUser._id
    );
    for (const id of filterCurrentUser) {
      const notificationObject = {
        ...baseNotificationObject,
        userId: id,
      };
      let userData = await getSingleUserApi(id);
      await updateUserApi({
        ...userData,
        notifications: true,
      });
      await createNotificationApi(notificationObject);
    }
  };

  const handleKeyDownMessage = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      createNewMessage("text");
    }
  };

  const handleChangeMessage = (e) => {
    const value = e.target.value;
    setMessageContent(value);

    // Detect if message contains Persian (Farsi) characters
    const persianRegex = /[\u0600-\u06FF]/; // Persian/Arabic Unicode range
    setIsFarsi(persianRegex.test(value));
  };

  const createNewChat = () => {
    setDisplayPopup(true);
    setSelectedChat(null);
    const updatedItems = chatsDataDisplay.map((item) => ({
      ...item,
      active: false,
    }));
    setChatsDataDisplay(updatedItems);
  };

  const validateFile = (file) => {
    if (!file) return { valid: false, message: "فایلی ارائه نشده است." };

    const name = file.name?.toLowerCase() || "";
    const type = file.type?.toLowerCase() || "";

    const mimeToExt = {
      // Images
      "image/jpeg": ".jpg",
      "image/png": ".png",
      "image/gif": ".gif",
      "image/webp": ".webp",
      "image/bmp": ".bmp",
      "image/svg+xml": ".svg",
      // Documents
      "application/pdf": ".pdf",
      "application/msword": ".doc",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        ".docx",
      "application/vnd.ms-excel": ".xls",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        ".xlsx",
      "application/vnd.ms-powerpoint": ".ppt",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        ".pptx",
      "text/plain": ".txt",
      // Archives
      "application/zip": ".zip",
      "application/x-zip-compressed": ".zip",
      "application/x-rar-compressed": ".rar",
    };

    const allowedMimeTypes = Object.keys(mimeToExt);
    const allowedExtensions = Object.values(mimeToExt);

    if (
      type.startsWith("video/") ||
      name.endsWith(".mp4") ||
      name.endsWith(".mov") ||
      name.endsWith(".webm")
    ) {
      setMedia(null);
      return { valid: false, message: "ارسال فایل صوتی یا ویدئویی مجاز نیست." };
    }
    // Allow if MIME type is explicitly supported
    if (allowedMimeTypes.includes(type)) {
      const extension = mimeToExt[type];
      return { valid: true, extension };
    }
    // Fallback: check by file extension
    const matchedExt = allowedExtensions.find((ext) => name.endsWith(ext));
    if (matchedExt) {
      return { valid: true, extension: matchedExt };
    }
    // Reject otherwise
    setMedia(null);
    return { valid: false, message: "نوع فایل مجاز نیست." };
  };

  const uploadFile = async (file) => {
    if (!file) return;
    const isConfirmed = window.confirm(`ارسال فایل ${file.name} مطمئنی؟`);
    if (!isConfirmed) {
      setMedia(null);
      return;
    }
    const { valid, message, extension } = validateFile(file);
    if (!valid) {
      alert(message);
      setMedia(null);
      return;
    }
    try {
      const isImage = [".png", ".jpg", ".jpeg"].includes(
        extension.toLowerCase()
      );
      const fileToUpload = isImage ? await compressImage(file) : file;
      const mediaFolder = "documents";
      const subFolder = `doc${sixGenerator()}`;
      const mediaName = fileToUpload.name.replace(/\.[^/.]+$/, "");
      const mediaFormat = extension;
      const mediaLink = `${sourceLink}/${mediaFolder}/${subFolder}/${mediaName}${mediaFormat}`;
      await Promise.all([
        uploadMedia(
          fileToUpload,
          mediaName,
          mediaFolder,
          subFolder,
          mediaFormat
        ),
        createNewMessage("document", mediaLink, mediaName, mediaFormat),
      ]);
    } catch (err) {
      alert("مشکلی در آپلود فایل پیش آمد.");
    } finally {
      setMedia(null);
    }
  };

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1280,
      useWebWorker: true,
    };
    return await imageCompression(file, options);
  };

  const deleteMessage = async (id) => {
    let confirmationMessage = "حذف مطمئنی؟";
    let confirm = window.confirm(confirmationMessage);
    if (confirm) {
      await deleteMessageApi(id);
    }
  };

  return (
    <div className={floatChat ? classes.containerFloat : classes.containerGrid}>
      {(fullSizeChatBox || chatPanel === "document") && (
        <div className={classes.documentBox}>
          {!fullSizeChatBox && (
            <Tooltip title="Back">
              <ArrowForwardIosIcon
                className="icon"
                sx={{ fontSize: 20 }}
                onClick={() => setChatPanel("chat")}
              />
            </Tooltip>
          )}
          {documentsRender.map((document, index) => (
            <div key={index} className={classes.document}>
              <div className={classes.row}>
                <div>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: applyFontToEnglishWords(
                        document.content,
                        "English",
                        "14px",
                        "fa"
                      ),
                    }}
                  ></p>
                  <p
                    className={classes.fileType}
                    style={{
                      fontFamily: "English",
                    }}
                  >
                    {document.fileType}
                  </p>
                </div>
                <div className={classes.row}>
                  <Tooltip title="View">
                    <FileDownloadOutlinedIcon
                      className="icon"
                      sx={{ fontSize: 20 }}
                      onClick={() =>
                        window.open(
                          document.fileUrl,
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                    />
                  </Tooltip>
                  {document.senderId === currentUser._id && (
                    <Tooltip title="Detele">
                      <DeleteOutlineIcon
                        className="icon"
                        sx={{
                          fontSize: 18,
                        }}
                        onClick={() => deleteMessage(document._id)}
                      />
                    </Tooltip>
                  )}
                </div>
              </div>
              <p className={classes.date}>{convertDate(document.updatedAt)}</p>
            </div>
          ))}
        </div>
      )}
      {(fullSizeChatBox || chatPanel === "chat") && (
        <div className={classes.chat}>
          {selectedChat && (
            <Fragment>
              <div className={classes.topBar}>
                <div className={classes.indocators}>
                  <div className={classes.row}>
                    <Tooltip title={selectedChat.users.length}>
                      <GroupIcon sx={{ fontSize: 20 }} />
                    </Tooltip>
                    <p
                      style={{
                        fontFamily: "English",
                      }}
                    >
                      {selectedChat.users.length}
                    </p>
                  </div>
                  {selectedChat.adminAccess && (
                    <Tooltip title="Edit">
                      <EditIcon
                        className="icon"
                        style={{
                          margin: "0px 4px",
                        }}
                        sx={{ fontSize: 20 }}
                        onClick={() => setDisplayPopup(true)}
                      />
                    </Tooltip>
                  )}
                  {!fullSizeChatBox && (
                    <Tooltip title="Documents">
                      <InsertDriveFileOutlinedIcon
                        className="icon"
                        sx={{ fontSize: 20 }}
                        onClick={() => setChatPanel("document")}
                      />
                    </Tooltip>
                  )}
                </div>
                <div className={classes.row}>
                  <div
                    style={{
                      marginRight: !fullSizeChatBox ? "12px" : null,
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "FarsiBold",
                      }}
                    >
                      {selectedChat.title}
                    </h3>
                    <p>{selectedChat.description}</p>
                  </div>
                  {!fullSizeChatBox && (
                    <Tooltip title="Back">
                      <ArrowForwardIosIcon
                        className="icon"
                        sx={{ fontSize: 20 }}
                        onClick={() => setChatPanel("group")}
                      />
                    </Tooltip>
                  )}
                </div>
              </div>
              <div className={classes.messageBox}>
                {chatRender.map((chat, index) => (
                  <div
                    key={index}
                    className={
                      chat.senderId === currentUser._id
                        ? classes.senderMsg
                        : classes.message
                    }
                  >
                    <div className={classes.row}>
                      <div className={classes.row}>
                        <div className={classes.image}>
                          <Image
                            className={classes.image}
                            src={chat.user.media}
                            blurDataURL={currentUser.media}
                            layout="fill"
                            objectFit="cover"
                            alt="image"
                          />
                          {chat.senderId !== currentUser._id && (
                            <CircleIcon
                              className={classes.status}
                              sx={{
                                fontSize: 8,
                                color:
                                  chat.user.status === "online"
                                    ? "#6b8745"
                                    : "#a70237",
                              }}
                            />
                          )}
                        </div>
                        <div className={classes.title}>
                          <h4
                            style={{
                              fontFamily: "FarsiBold",
                            }}
                          >
                            {chat.user.name["fa"]}
                          </h4>
                          <p>{chat.user.title["fa"]}</p>
                        </div>
                      </div>
                      <p className={classes.date}>
                        {convertDate(chat.updatedAt)}
                      </p>
                    </div>
                    <p
                      className={classes.content}
                      dangerouslySetInnerHTML={{
                        __html: applyFontToEnglishWords(
                          chat.content,
                          "EnglishLight",
                          "14px",
                          "fa"
                        ),
                      }}
                    ></p>
                    <div className={classes.indicators}>
                      {chat.senderId === currentUser._id && (
                        <Tooltip title="Detele">
                          <DeleteOutlineIcon
                            className="icon"
                            sx={{
                              fontSize: 18,
                              color: "#000000",
                            }}
                            onClick={() => deleteMessage(chat._id)}
                          />
                        </Tooltip>
                      )}
                      {chat.type === "document" && (
                        <Tooltip title="View">
                          <FileDownloadOutlinedIcon
                            className="icon"
                            sx={{ fontSize: 20, color: "#000000" }}
                            onClick={() =>
                              window.open(
                                chat.fileUrl,
                                "_blank",
                                "noopener,noreferrer"
                              )
                            }
                          />
                        </Tooltip>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className={classes.input}>
                <div className={classes.icon}>
                  <Tooltip title="Send">
                    <SendIcon
                      className="icon"
                      sx={{ color: "#fdb714" }}
                      onClick={() => createNewMessage("text")}
                    />
                  </Tooltip>
                  <div className={classes.input}>
                    <label
                      className="file"
                      style={{
                        border: "none",
                        padding: "0px",
                      }}
                    >
                      {!media ? (
                        <Fragment>
                          <Tooltip title="Attach">
                            <AttachFileIcon
                              className="icon"
                              sx={{ color: "#fdb714" }}
                              onClick={() => setMessageContent("")}
                            />
                          </Tooltip>
                          <input
                            onChange={(e) => {
                              setMedia(e.target.files[0]);
                              uploadFile(e.target.files[0]);
                            }}
                            type="file"
                          />
                        </Fragment>
                      ) : (
                        <Image
                          width={25}
                          height={25}
                          src={loaderImage}
                          alt="isLoading"
                        />
                      )}
                    </label>
                  </div>
                </div>
                <textarea
                  style={{
                    fontFamily: isFarsi ? "Farsi" : "English",
                    resize: "none",
                  }}
                  placeholder="..."
                  id="message"
                  name="message"
                  onChange={handleChangeMessage}
                  onKeyDown={handleKeyDownMessage}
                  value={messageContent}
                  autoComplete="off"
                  dir={isFarsi ? "rtl" : "ltr"}
                  disabled={selectedChat?.archive}
                ></textarea>
              </div>
            </Fragment>
          )}
        </div>
      )}
      {(fullSizeChatBox || chatPanel === "group") && (
        <div className={classes.groupBox}>
          <Tooltip title="New Chat">
            <AddIcon
              className="icon"
              sx={{ fontSize: 20 }}
              onClick={() => createNewChat()}
            />
          </Tooltip>
          {chatsDataDisplay.map((chat, index) => (
            <div
              key={index}
              className={chat.active ? classes.groupActive : classes.group}
              onClick={() => handleChatSelection(index)}
            >
              <div className={classes.info}>
                <div className={classes.indicator}>
                  <Tooltip title="Chat">
                    <ArrowBackIosNewIcon
                      className="icon"
                      sx={{ fontSize: 18 }}
                    />
                  </Tooltip>
                  {!chat.isRead && (
                    <div className={classes.notification}>
                      <CircleIcon
                        className="animate__animated animate__heartBeat"
                        sx={{ fontSize: 12, color: "#fdb714" }}
                      />
                    </div>
                  )}
                </div>
                <p className={classes.date}>{convertDate(chat.updatedAt)}</p>
                <div className={classes.row}>
                  <p
                    style={{
                      fontFamily: "English",
                    }}
                  >
                    {chat.users.length}
                  </p>
                  <GroupIcon sx={{ fontSize: 16 }} />
                </div>
                <h4
                  style={{
                    fontFamily: "FarsiBold",
                  }}
                >
                  {chat.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      )}
      {displayPopup && (
        <div
          className={classes.popup}
          style={{
            border: floatChat ? "1px solid #d1d3d4" : "none",
            borderRadius: floatChat ? "5px" : "none",
          }}
        >
          <CloseIcon
            className="icon"
            onClick={() => setDisplayPopup(false)}
            sx={{ fontSize: 20 }}
          />
          <Chat selectedChat={selectedChat} floatChat={floatChat} />
        </div>
      )}
    </div>
  );
}
