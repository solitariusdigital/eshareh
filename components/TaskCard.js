import { Fragment, useContext, useState, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./TaskBox.module.scss";
import CircleIcon from "@mui/icons-material/Circle";
import Tooltip from "@mui/material/Tooltip";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RedoIcon from "@mui/icons-material/Redo";
import { convertDate } from "@/services/utility";
import {
  getSingleProjectApi,
  updateTaskApi,
  deleteTaskApi,
} from "@/services/api";

export default function TaskCard({ taskData, onTaskUpdate }) {
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
      Urgent: "red",
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
          <Tooltip title="Delete">
            <DeleteOutlineIcon
              className="icon"
              sx={{ fontSize: 16 }}
              onClick={() => deleteTask(taskData._id)}
            />
          </Tooltip>
        </div>
      </div>
      <p className={classes.description}>{taskData.description}</p>
      <p className={classes.projectTitle}>{projectData?.title}</p>
      <div className={classes.row}>
        <div className={classes.row}>
          <Tooltip title="Due Date">
            <TimelapseIcon sx={{ fontSize: 18 }} />
          </Tooltip>
          <p>
            {convertDate(taskData.dueDate).slice(
              0,
              convertDate(taskData.dueDate).indexOf(",")
            )}
          </p>
        </div>
        <Tooltip title={taskData.priority}>
          <CircleIcon
            sx={{ fontSize: 12, color: getPriorityColor(taskData.priority) }}
          />
        </Tooltip>
      </div>
    </div>
  );
}
