import { Fragment, useContext, useState, useEffect, useRef } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./TaskBox.module.scss";
import CircleIcon from "@mui/icons-material/Circle";
import Tooltip from "@mui/material/Tooltip";
import Chat from "@/components/forms/Portal";
import CloseIcon from "@mui/icons-material/Close";

export default function TaskCard() {
  return (
    <div className={classes.taskCard}>
      <div className={classes.row}>
        <h4
          style={{
            fontFamily: "FarsiBold",
          }}
        >
          وظایف
        </h4>
        <Tooltip title="New Task">
          <CircleIcon className="icon" sx={{ fontSize: 8 }} />
        </Tooltip>
      </div>
      <p>صفحه‌های وب را بدون هزینه بین زبان فارسی</p>
    </div>
  );
}
