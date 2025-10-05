import { Fragment, useContext, useState, useEffect } from "react";
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
} from "@/services/api";

export default function ChatBox() {
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [messageContent, setMessageContent] = useState("");
  const [chatPanel, setChatPanel] = useState("group" || "chat" || "file");
  const [displayPopup, setDisplayPopup] = useState(false);
  const [groupsDataDisplay, setGroupsDataDisplay] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatDisplay, setChatDisplay] = useState([]);
  const [usersData, setUsersData] = useState([]);

  const fullSizeChatBox =
    screenSize === "desktop" || screenSize === "tablet-landscape";

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
    let filterChats = chatsData.filter((chat) =>
      chat.users.includes(currentUser._id)
    );
    let addOption = filterChats.map((chat) => ({
      ...chat,
      active: true ? chat._id === selectedChat?._id : false,
      adminAccess: chat.adminsId.includes(currentUser._id),
    }));
    addOption.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    setGroupsDataDisplay(addOption);
  };

  useEffect(() => {
    if (selectedChat?._id) {
      fetchMessages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat]);

  const fetchMessages = async () => {
    const chatData = await getMessagesApi();
    const currentChat = chatData.filter(
      (chat) => chat.chatId === selectedChat._id
    );
    const enrichedChat = await enrichChatWithUser(currentChat, usersData);
    enrichedChat.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    setChatDisplay(enrichedChat);
  };

  const enrichChatWithUser = (chatData, usersData) =>
    Promise.all(
      chatData.map((chat) => ({
        ...chat,
        user: usersData.find((user) => user._id === chat.senderId) || null,
      }))
    );

  const chatPanelData = [
    {
      label: "فایل",
      active: false,
      onClick: () => setChatPanel("file"),
    },
    // {
    //   label: "چت",
    //   active: false,
    //   onClick: () => setChatPanel("chat"),
    // },
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

  const handleGroupsData = (index) => {
    const updatedItems = groupsDataDisplay.map((item, idx) => ({
      ...item,
      active: idx === index,
    }));
    setGroupsDataDisplay(updatedItems);
    setSelectedChat(updatedItems[index]);
    setChatPanel("chat");
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
    fetchChats();
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
    const updatedItems = groupsDataDisplay.map((item) => ({
      ...item,
      active: false,
    }));
    setGroupsDataDisplay(updatedItems);
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
                {chatDisplay.map((chat, index) => (
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
          {groupsDataDisplay.map((group, index) => (
            <div
              key={index}
              className={group.active ? classes.groupActive : classes.group}
              onClick={() => handleGroupsData(index)}
            >
              <div className={classes.indicators}>
                <KeyboardArrowLeftIcon
                  sx={{ color: group.active ? "#fdb714" : "" }}
                />
                {group.isRead && (
                  <CircleIcon sx={{ fontSize: 12, color: "#a70237" }} />
                )}
              </div>
              <div className={classes.info}>
                <h4>{group.title}</h4>
                <div className={classes.row}>
                  <p
                    style={{
                      fontFamily: "English",
                    }}
                  >
                    {group.users.length}
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
