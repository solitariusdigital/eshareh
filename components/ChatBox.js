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
import Chat from "./forms/Chat";
import { getChatsApi } from "@/services/api";

export default function ChatBox() {
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [sendMessage, setSendMessage] = useState("");
  const [chatPanel, setChatPanel] = useState("file" || "chat" || "group");
  const [displayPopup, setDisplayPopup] = useState(false);
  const [groupsDataDisplay, setGroupsDataDisplay] = useState([]);
  const [selectedChat, setSelectedChat] = useState([]);
  const [chatDisplay, setChatDisplay] = useState([]);

  const fullSizeChatBox =
    screenSize === "desktop" || screenSize === "tablet-landscape";

  useEffect(() => {
    const handleChatApi = async () => {
      const chatsData = await getChatsApi();
      let addOption = chatsData.map((data) => ({
        ...data,
        active: false,
      }));
      addOption.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      setGroupsDataDisplay(addOption);
    };
    handleChatApi();
  }, []);

  const chatPanelData = [
    {
      label: "فایل",
      active: false,
      onClick: () => setChatPanel("file"),
    },
    {
      label: "چت",
      active: false,
      onClick: () => setChatPanel("chat"),
    },
    {
      label: "گروه",
      active: false,
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
  };

  const createNewMessage = async () => {
    console.log(selectedChat["_id"]);
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
          <div className={classes.title}>
            <h3>{selectedChat.title}</h3>
          </div>
          <div className={classes.messageBox}>
            <div className={classes.message}>
              <p>
                message 1 asds sad asd asdasd asdasd. sdasdasd asdasdasd
                asdasdsd asd asdasdasd sadasdasd
              </p>
            </div>
            <div className={classes.message}>
              <p>message 2</p>
            </div>
            <div className={classes.message}>
              <p>message 3</p>
            </div>
            <div className={classes.message}>
              <p>message 4</p>
            </div>
            <div className={classes.message}>
              <p>message 4</p>
            </div>
            <div className={classes.message}>
              <p>message 4</p>
            </div>
            <div className={classes.message}>
              <p>message 4</p>
            </div>
            <div className={classes.message}>
              <p>message 4</p>
            </div>
            <div className={classes.message}>
              <p>message 4</p>
            </div>
            <div className={classes.message}>
              <p>message 4</p>
            </div>
            <div className={classes.message}>
              <p>message 4</p>
            </div>
            <div className={classes.message}>
              <p>message 4</p>
            </div>
            <div className={classes.message}>
              <p>message 4</p>
            </div>
            <div className={classes.message}>
              <p>message 4</p>
            </div>
            <div className={classes.message}>
              <p>message 4</p>
            </div>
            <div className={classes.message}>
              <p>message 4</p>
            </div>
            <div className={classes.message}>
              <p>message 4</p>
            </div>
            <div className={classes.message}>
              <p>message 200</p>
            </div>
          </div>
          <div className={classes.input}>
            <div className={classes.icon}>
              <Tooltip title="Send">
                <SendIcon
                  className="icon"
                  onClick={() => createNewMessage()}
                  sx={{ color: "#fdb714" }}
                />
              </Tooltip>
              <Tooltip title="Attach">
                <AttachFileIcon
                  className="icon"
                  onClick={() => setSendMessage("")}
                />
              </Tooltip>
            </div>
            <textarea
              style={{
                fontFamily: "Farsi",

                resize: "none",
              }}
              placeholder="..."
              id="sendMessage"
              name="sendMessage"
              onChange={(e) => setSendMessage(e.target.value)}
              value={sendMessage}
              autoComplete="off"
              dir="rtl"
            ></textarea>
          </div>
        </div>
      )}
      {(fullSizeChatBox || chatPanel === "group") && (
        <div className={classes.groupBox}>
          <Tooltip title="New Chat">
            <AddIcon className="icon" onClick={() => setDisplayPopup(true)} />
          </Tooltip>
          {groupsDataDisplay.map((group, index) => (
            <div
              key={index}
              className={group.active ? classes.groupActive : classes.group}
              onClick={() => handleGroupsData(index)}
            >
              <div className={classes.indicators}>
                <KeyboardArrowLeftIcon />
                {group.isRead && (
                  <CircleIcon sx={{ fontSize: 12, color: "#a70237" }} />
                )}
              </div>
              <div className={classes.info}>
                <h4>{group.title}</h4>
                <p>
                  اعضا
                  <span
                    style={{
                      fontFamily: "English",
                    }}
                  >
                    {group.users.length}
                  </span>
                  نفر
                </p>
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
          <Chat />
        </div>
      )}
    </div>
  );
}
