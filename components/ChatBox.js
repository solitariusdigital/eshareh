import { Fragment, useContext, useState, useEffect, useMemo } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./ChatBox.module.scss";
import Image from "next/legacy/image";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";

export default function ChatBox() {
  const [sendMessage, setSendMessage] = useState("");
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [chatPanel, setChatPanel] = useState("file" || "chat" || "group");

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
      {screenSize !== "desktop" && (
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
      {(screenSize === "desktop" || chatPanel === "file") && (
        <div className={classes.file}>file</div>
      )}
      {(screenSize === "desktop" || chatPanel === "chat") && (
        <div className={classes.chat}>
          <div className={classes.input}>
            <div className={classes.sendIcon}>
              <SendIcon
                className="icon"
                onClick={() => setSendMessage("")}
                sx={{ fontSize: 28, color: "#fdb714" }}
              />
            </div>
            <textarea
              style={{
                fontFamily: "Farsi",

                resize: "none",
              }}
              placeholder="ارسال پیام"
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

      {(screenSize === "desktop" || chatPanel === "group") && (
        <div className={classes.group}>group</div>
      )}
    </div>
  );
}
