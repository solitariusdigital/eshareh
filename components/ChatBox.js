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
import Chat from "./forms/Chat";
import { convertDate, applyFontToEnglishWords } from "@/services/utility";
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
} from "@/services/api";

export default function ChatBox() {
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [chatPanel, setChatPanel] = useState("group" || "chat" || "file");
  const [displayPopup, setDisplayPopup] = useState(false);
  const [chatsDataDisplay, setChatsDataDisplay] = useState([]);
  const [chatRender, setChatRender] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageContent, setMessageContent] = useState("");
  const [usersData, setUsersData] = useState([]);

  const fullSizeChatBox =
    screenSize === "desktop" || screenSize === "tablet-landscape";
  const intervalRef = useRef(null);

  useEffect(() => {
    const handleUserApi = async () => {
      const userData = await getUsersApi();
      setUsersData(userData);
    };
    handleUserApi();
  }, []);

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
          fetchMessages(abortController.signal);
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
        fetchMessages(abortController.signal); // Refresh immediately when user returns
        startPolling();
      }
    };

    const handleWindowBlur = () => {
      stopPolling();
    };

    const handleWindowFocus = () => {
      fetchMessages(abortController.signal); // Refresh immediately on focus
      startPolling();
    };

    if (selectedChat?._id) {
      fetchMessages(abortController.signal); // Initial fetch
      startPolling();
      // Add event listeners
      document.addEventListener("visibilitychange", handleVisibilityChange);
      window.addEventListener("blur", handleWindowBlur);
      window.addEventListener("focus", handleWindowFocus);
    }
    return () => {
      stopPolling();
      abortController.abort(); // Cancel pending requests
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat?._id]);

  const fetchMessages = async (signal) => {
    if (!selectedChat?._id) return;
    try {
      const chatData = await getMessagesApi({ signal });
      const currentChat = chatData.filter(
        (chat) => chat.chatId === selectedChat._id
      );
      const enrichedChat = enrichChatWithUser(currentChat, usersData);
      enrichedChat.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      setChatRender(enrichedChat);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Error fetching messages:", error);
      }
    }
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
      onClick: () => setChatPanel("file"),
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
    await handleNotifications(index);
    setChatPanel("chat");
  };

  const handleNotifications = async (index) => {
    const notificationsData = await getNotificationApi();
    let filterNotifications = notificationsData.filter(
      (notification) =>
        notification.userId === currentUser._id &&
        notification.chatId === chatsDataDisplay[index]._id
    );
    if (filterNotifications.length > 0) {
      for (const notification of filterNotifications) {
        await deleteNotificationApi(notification._id);
      }
    }
  };

  const createNewMessage = async () => {
    if (!messageContent.trim()) {
      return;
    }
    const messageObject = {
      chatId: selectedChat._id,
      senderId: currentUser._id,
      type: "text",
      content: messageContent.trim(),
      fileUrl: "",
      fileType: "",
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
      createNewMessage();
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
      {(fullSizeChatBox || chatPanel === "file") && (
        <div className={classes.fileBox}>
          <h3>فایل</h3>
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
                            as="image"
                            priority
                          />
                        </div>
                        <h4
                          style={{
                            fontFamily: "FarsiBold",
                          }}
                        >
                          {chat.user.name["fa"]}
                        </h4>
                      </div>
                      <p className={classes.date}>
                        {convertDate(chat.updatedAt)}
                      </p>
                    </div>
                    <p
                      className={classes.content}
                      dangerouslySetInnerHTML={{
                        __html: applyFontToEnglishWords(
                          chat["content"],
                          "EnglishLight",
                          "14px",
                          "fa"
                        ),
                      }}
                    ></p>
                  </div>
                ))}
              </div>
              <div className={classes.input}>
                <div className={classes.icon}>
                  <Tooltip title="Send">
                    <SendIcon
                      className="icon"
                      sx={{ color: "#fdb714" }}
                      onClick={() => createNewMessage()}
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
                      <Tooltip title="Attach">
                        <AttachFileIcon
                          className="icon"
                          onClick={() => setMessageContent("")}
                        />
                      </Tooltip>
                      <input
                        onChange={(e) => {
                          setMedia(e.target.files[0]);
                        }}
                        type="file"
                      />
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
                  <CircleIcon sx={{ fontSize: 12, color: "#a70237" }} />
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
