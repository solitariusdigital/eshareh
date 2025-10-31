import { useContext, useState, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./TaskBox.module.scss";
import CircleIcon from "@mui/icons-material/Circle";
import Tooltip from "@mui/material/Tooltip";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RedoIcon from "@mui/icons-material/Redo";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { convertDate, sliceString } from "@/services/utility";
import {
  getSingleProjectApi,
  updateTaskApi,
  deleteTaskApi,
} from "@/services/api";

export default function TaskCard({ taskData, onTaskUpdate }) {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    fetchProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProject = async () => {
    const projectsData = await getSingleProjectApi(taskData.projectId);
    setProjectData(projectsData);
  };

  const getPriorityColor = (priority) => {
    const priorityColor = {
      Low: "yellowgreen",
      Medium: "blueviolet",
      High: "orange",
      Urgent: "crimson",
    };
    return priorityColor[priority];
  };

  const changeTaskStatus = async (status) => {
    const nextStatus = {
      todo: "progress",
      progress: "done",
      done: "todo",
    };
    await updateTaskApi({
      ...taskData,
      status: nextStatus[status],
    });
    onTaskUpdate();
  };

  const deleteTask = async (id) => {
    let confirmationMessage = "حذف مطمئنی؟";
    let confirm = window.confirm(confirmationMessage);
    if (confirm) {
      await deleteTaskApi(id);
    }
    onTaskUpdate();
  };

  const isWithinThreeDays = () => {
    if (taskData.status === "done") return;
    const dueDate = new Date(taskData.dueDate);
    const today = new Date();
    dueDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diffInMs = dueDate - today;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return diffInDays <= 3 && diffInDays >= 0;
  };

  return (
    <div className={classes.taskCard}>
      <div className={classes.row}>
        <h4
          style={{
            fontFamily: "FarsiBold",
          }}
        >
          {taskData.title}
        </h4>
        <div className={classes.indicator}>
          <Tooltip title="Next Status">
            <RedoIcon
              className="icon"
              sx={{ fontSize: 18 }}
              onClick={() => {
                changeTaskStatus(taskData.status);
              }}
            />
          </Tooltip>
          {projectData?.adminsId.includes(currentUser._id) && (
            <Tooltip title="Delete">
              <DeleteOutlineIcon
                className="icon"
                sx={{ fontSize: 16 }}
                onClick={() => deleteTask(taskData._id)}
              />
            </Tooltip>
          )}
        </div>
      </div>
      <p className={classes.description}>
        {sliceString(taskData.description, 70)}
      </p>
      <p className={classes.projectTitle}>{projectData?.title}</p>
      <div className={classes.row}>
        <div className={classes.row}>
          {isWithinThreeDays() && (
            <Tooltip title="Action">
              <NotificationsIcon sx={{ fontSize: 18, color: "red" }} />
            </Tooltip>
          )}
          {taskData.status === "done" && (
            <Tooltip title="Completed">
              <DoneOutlineIcon sx={{ fontSize: 18, color: "green" }} />
            </Tooltip>
          )}
          {taskData.status !== "done" && (
            <Tooltip title="Due Date">
              <TimelapseIcon sx={{ fontSize: 18 }} />
            </Tooltip>
          )}
          <p>
            {(() => {
              const dateStr = convertDate(taskData?.dueDate) || "-";
              const commaIndex = dateStr.indexOf(",");
              return commaIndex !== -1 ? dateStr.slice(0, commaIndex) : dateStr;
            })()}
          </p>
        </div>
        <Tooltip title={taskData.priority}>
          <CircleIcon
            sx={{ fontSize: 14, color: getPriorityColor(taskData.priority) }}
          />
        </Tooltip>
      </div>
    </div>
  );
}
