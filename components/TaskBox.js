import { Fragment, useContext, useState, useEffect, useRef } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./TaskBox.module.scss";
import Image from "next/legacy/image";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import TaskCard from "@/components/TaskCard";
import Portal from "@/components/forms/Portal";

export default function TaskBox() {
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [selectedChat, setSelectedChat] = useState(null);
  const [displayPopup, setDisplayPopup] = useState(false);

  const fullSizeChatBox =
    screenSize === "desktop" || screenSize === "tablet-landscape";

  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes.column}>
          <div className={classes.topBar}>
            <h3
              style={{
                fontFamily: "FarsiBold",
              }}
            >
              وظایف
            </h3>
            <Tooltip title="New Task">
              <AddIcon
                className="icon"
                sx={{ fontSize: 20 }}
                onClick={() => setDisplayPopup(true)}
              />
            </Tooltip>
          </div>
          <TaskCard />
          <TaskCard />
        </div>
        <div className={classes.column}>
          <div className={classes.topBar}>
            <h3
              style={{
                fontFamily: "FarsiBold",
              }}
            >
              در حال انجام
            </h3>
          </div>
        </div>
        <div className={classes.column}>
          <div className={classes.topBar}>
            <h3
              style={{
                fontFamily: "FarsiBold",
              }}
            >
              تکمیل
            </h3>
          </div>
        </div>
      </div>
      {displayPopup && (
        <div className={classes.popup}>
          <CloseIcon
            className="icon"
            onClick={() => setDisplayPopup(false)}
            sx={{ fontSize: 20 }}
          />
          <Portal selectedChat={selectedChat} floatChat={false} />
        </div>
      )}
    </Fragment>
  );
}
