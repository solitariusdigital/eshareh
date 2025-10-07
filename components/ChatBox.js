import { Fragment, useContext, useState, useEffect, useRef } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./ChatBox.module.scss";
import Image from "next/legacy/image";
import Tooltip from "@mui/material/Tooltip";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import CircleIcon from "@mui/icons-material/Circle";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import GroupIcon from "@mui/icons-material/Group";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import loaderImage from "@/assets/loader.png";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Chat from "./forms/Chat";
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

export default function ChatBox() {
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [chatPanel, setChatPanel] = useState("group" || "chat" || "document");
  const [displayPopup, setDisplayPopup] = useState(false);
  const [chatsDataDisplay, setChatsDataDisplay] = useState([]);
  const [chatRender, setChatRender] = useState([]);
  const [documentsRender, setDocumentsRender] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageContent, setMessageContent] = useState("");
  const [media, setMedia] = useState(null);
  const sourceLink = "https://eshareh.storage.iran.liara.space";

  const fullSizeChatBox =
    screenSize === "desktop" || screenSize === "tablet-landscape";
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

  const chatPanelData = [
    {
      label: "فایل",
      active: false,
      onClick: () => setChatPanel("document"),
    },
    {
      label: "گروه",
      active: true,
      onClick: () => setChatPanel("group"),
    },
  ];
  const [chatPanelDisplay, setChatPanelDisplay] = useState(chatPanelData);

  const handleClickChatPanel = (index) => {
    const updatedItems = chatPanelDisplay.map((item, idx) => ({
      ...item,
      active: idx === index,
    }));
    setChatPanelDisplay(updatedItems);
    chatPanelData[index].onClick();
  };

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

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      createNewMessage("text");
    }
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
      type.startsWith("audio/") ||
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
    const result = validateFile(file);
    if (!result.valid) {
      alert(result.message);
    } else {
      let mediaFolder = "documents";
      let subFolder = `doc${sixGenerator()}`;
      let mediaName = file.name.replace(/\.[^/.]+$/, "");
      let mediaFormat = result.extension;
      let mediaLink = `${sourceLink}/${mediaFolder}/${subFolder}/${mediaName}${mediaFormat}`;
      await uploadMedia(file, mediaName, mediaFolder, subFolder, mediaFormat);
      await createNewMessage(
        "document",
        mediaLink,
        mediaName,
        result.extension
      );
      setMedia(null);
    }
  };

  const deleteMessage = async (id) => {
    let confirmationMessage = "حذف مطمئنی؟";
    let confirm = window.confirm(confirmationMessage);
    if (confirm) {
      await deleteMessageApi(id);
    }
  };

  return (
    <div className={classes.container}>
      {!fullSizeChatBox && (
        <div className={classes.navigation}>
          {chatPanelDisplay.map((item, index) => (
            <div
              key={index}
              className={item.active ? classes.itemActive : classes.item}
              onClick={() => handleClickChatPanel(index)}
            >
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      )}
      {(fullSizeChatBox || chatPanel === "document") && (
        <div className={classes.documentBox}>
          {documentsRender.map((document, index) => (
            <div key={index} className={classes.document}>
              <div className={classes.row}>
                <div>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: applyFontToEnglishWords(
                        document.content,
                        "EnglishLight",
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
                    <DownloadIcon
                      className="icon"
                      sx={{ fontSize: 16 }}
                      onClick={() =>
                        window.open(
                          document.fileUrl,
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                    />
                  </Tooltip>
                  <Tooltip title="Detele">
                    <DeleteOutlineIcon
                      className="icon"
                      sx={{
                        fontSize: 16,
                        color: "#a70237",
                      }}
                      onClick={() => deleteMessage(document._id)}
                    />
                  </Tooltip>
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
                          marginRight: "4px",
                        }}
                        sx={{ fontSize: 20 }}
                        onClick={() => setDisplayPopup(true)}
                      />
                    </Tooltip>
                  )}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "FarsiBold",
                    }}
                  >
                    {selectedChat.title}
                  </h3>
                  <p>{selectedChat.description}</p>
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
                      <Tooltip title="Detele">
                        <DeleteOutlineIcon
                          className="icon"
                          sx={{
                            fontSize: 16,
                            color: "#a70237",
                          }}
                          onClick={() => deleteMessage(chat._id)}
                        />
                      </Tooltip>
                      {chat.type === "document" && (
                        <Tooltip title="View">
                          <DownloadIcon
                            className="icon"
                            sx={{ fontSize: 16, color: "#000000" }}
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
                    fontFamily: "Farsi",
                    resize: "none",
                  }}
                  placeholder="..."
                  id="message"
                  name="message"
                  onChange={(e) => setMessageContent(e.target.value)}
                  onKeyDown={handleKeyDown}
                  value={messageContent}
                  autoComplete="off"
                  dir="rtl"
                  disabled={selectedChat.archive}
                ></textarea>
              </div>
            </Fragment>
          )}
        </div>
      )}
      {(fullSizeChatBox || chatPanel === "group") && (
        <div className={classes.groupBox}>
          <Tooltip title="New Chat">
            <AddIcon className="icon" onClick={() => createNewChat()} />
          </Tooltip>
          {chatsDataDisplay.map((chat, index) => (
            <div
              key={index}
              className={chat.active ? classes.groupActive : classes.group}
              onClick={() => handleChatSelection(index)}
            >
              <div className={classes.indicators}>
                <KeyboardArrowLeftIcon
                  sx={{ color: chat.active ? "#fdb714" : "" }}
                />
                {!chat.isRead && (
                  <CircleIcon sx={{ fontSize: 12, color: "#fdb714" }} />
                )}
              </div>
              <div className={classes.info}>
                <h4>{chat.title}</h4>
                <div className={classes.row}>
                  <p
                    style={{
                      fontFamily: "English",
                    }}
                  >
                    {chat.users.length}
                  </p>
                  <GroupIcon sx={{ fontSize: 18 }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {displayPopup && (
        <div className={classes.popup}>
          <CloseIcon
            className="icon"
            onClick={() => setDisplayPopup(false)}
            sx={{ fontSize: 16 }}
          />
          <Chat selectedChat={selectedChat} />
        </div>
      )}
    </div>
  );
}
