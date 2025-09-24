import { Fragment, useContext, useState, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./ChatBox.module.scss";
import Image from "next/legacy/image";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";

export default function ChatBox() {
  const [sendMessage, setSendMessage] = useState("");
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [chatPanel, setChatPanel] = useState("file" || "chat" || "group");

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
  const [chatPanelItems, setChatPanelItems] = useState(chatPanelData);

  const handleClickPanel = (index) => {
    const updatedItems = chatPanelItems.map((item, idx) => ({
      ...item,
      active: idx === index,
    }));
    setChatPanelItems(updatedItems);
    chatPanelData[index].onClick();
  };

  return (
    <div className={classes.container}>
      {!fullSizeChatBox && (
        <div className={classes.navigation}>
          {chatPanelItems.map((item, index) => (
            <div
              key={index}
              className={item.active ? classes.itemActive : classes.item}
              onClick={() => handleClickPanel(index)}
            >
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      )}
      {(fullSizeChatBox || chatPanel === "file") && (
        <div className={classes.file}>
          <h3>فایل</h3>
        </div>
      )}
      {(fullSizeChatBox || chatPanel === "chat") && (
        <div className={classes.chat}>
          <div className={classes.title}>
            <h3>چت</h3>
          </div>
          <div className={classes.messages}>
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
        <div className={classes.group}>
          <h3>گروه</h3>
        </div>
      )}
    </div>
  );
}
