import { Fragment, useContext, useState, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./ChatBox.module.scss";
import Image from "next/legacy/image";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

export default function ChatBox() {
  const [sendMessage, setSendMessage] = useState("");
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [chatPanel, setChatPanel] = useState("file" || "chat" || "group");
  const { currentUser, setCurrentUser } = useContext(StateContext);

  const fullSizeChatBox =
    screenSize === "desktop" || screenSize === "tablet-landscape";

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

  const groupsData = [
    {
      title: "اسم گروه",
      image: currentUser.media,
      active: false,
      // onClick: () => setSendMessage(""),
    },
    {
      title: "اسم گروه",
      image: currentUser.media,
      active: false,
      // onClick: () => setSendMessage(""),
    },
  ];
  const [groupsDataDisplay, setGroupsDataDisplay] = useState(groupsData);

  const handleGroupsData = (index) => {
    const updatedItems = groupsDataDisplay.map((item, idx) => ({
      ...item,
      active: idx === index,
    }));
    setGroupsDataDisplay(updatedItems);
    // groupsData[index].onClick();
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
            <h3>اسم چت</h3>
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
              <SendIcon
                className="icon"
                onClick={() => setSendMessage("")}
                sx={{ color: "#fdb714" }}
              />
              <AttachFileIcon
                className="icon"
                onClick={() => setSendMessage("")}
                sx={{ color: "#d1d3d4" }}
              />
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
          {groupsDataDisplay.map((group, index) => (
            <div
              key={index}
              className={group.active ? classes.groupActive : classes.group}
              onClick={() => handleGroupsData(index)}
            >
              <KeyboardArrowLeftIcon className="icon" />
              <h4>{group.title}</h4>
              <div className={classes.image}>
                <Image
                  className={classes.image}
                  src={group.image}
                  blurDataURL={group.image}
                  layout="fill"
                  objectFit="cover"
                  alt="profile"
                  as="image"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
