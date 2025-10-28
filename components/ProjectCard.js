import { Fragment, useContext, useState, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import Image from "next/legacy/image";
import classes from "./TaskBox.module.scss";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Tooltip from "@mui/material/Tooltip";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import { convertDate } from "@/services/utility";
import {
  getSingleProjectApi,
  getTasksApi,
  getSingleUserApi,
  deleteTaskApi,
} from "@/services/api";

export default function ProjectCard({ projectId }) {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [projectDataDisplay, setProjectDataDisplay] = useState([]);
  const [taskDatadisplay, setTaskDataDisplay] = useState([]);

  useEffect(() => {
    fetchProject();
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProject = async () => {
    const projectData = await getSingleProjectApi(projectId);
    setProjectDataDisplay(projectData);
  };

  const fetchTasks = async () => {
    const tasksData = await getTasksApi();
    const filteredTasks = tasksData.filter(
      (task) => task.projectId === projectId
    );
    const enrichedTask = await enrichTaskWithUser(filteredTasks);
    setTaskDataDisplay(
      enrichedTask.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    );
  };

  const enrichTaskWithUser = async (taskData) => {
    for (const task of taskData) {
      task.userData = null;
      for (const userId of task.users) {
        const userData = await getSingleUserApi(userId);
        task.userData = userData;
      }
    }
    return taskData;
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

  const getStatus = (status) => {
    const statusFa = {
      todo: "وظایف",
      done: "درحال انجام",
      progress: "تکمیل",
    };
    return statusFa[status];
  };

  const deleteTask = async (id) => {
    let confirmationMessage = "حذف مطمئنی؟";
    let confirm = window.confirm(confirmationMessage);
    if (confirm) {
      await deleteTaskApi(id);
      fetchTasks();
    }
  };

  return (
    <div className={classes.projectCard}>
      <h3
        style={{
          fontFamily: "FarsiBold",
        }}
      >
        {projectDataDisplay.title}
      </h3>
      <p className={classes.description}>{projectDataDisplay.description}</p>
      <div className={classes.taskBox}>
        {taskDatadisplay.map((task, index) => (
          <div key={index} className={classes.task}>
            <div className={classes.row}>
              <div className={classes.image}>
                <Image
                  className={classes.image}
                  blurDataURL={task.userData.media}
                  src={task.userData.media}
                  layout="fill"
                  objectFit="cover"
                  alt="image"
                />
              </div>
              <h3
                style={{
                  fontFamily: "FarsiBold",
                }}
              >
                {task.userData.name.fa}
              </h3>
              <h4>{task.userData.title.fa}</h4>
            </div>
            <div className={classes.row}>
              <p>{task.title}</p>
            </div>
            <div className={classes.row}>
              <p className={classes.description}>{task.description}</p>
            </div>
            <div className={classes.row} style={{ margin: "0px" }}>
              <div className={classes.row}>
                <Tooltip title="Due Date">
                  <TimelapseIcon sx={{ fontSize: 18 }} />
                </Tooltip>
                <p
                  style={{
                    marginRight: "4px",
                  }}
                >
                  {convertDate(task.dueDate).slice(
                    0,
                    convertDate(task.dueDate).indexOf(",")
                  )}
                </p>
              </div>
              <p
                style={{
                  fontFamily: "FarsiBold",
                }}
              >
                {getStatus(task.status)}
              </p>
              <div
                className={classes.priority}
                style={{ background: getPriorityColor(task.priority) }}
              >
                <p
                  style={{
                    fontFamily: "English",
                  }}
                >
                  {task.priority}
                </p>
              </div>
            </div>
            {projectDataDisplay.adminsId.includes(currentUser._id) && (
              <Tooltip title="Delete">
                <DeleteOutlineIcon
                  className="icon"
                  sx={{ fontSize: 16 }}
                  onClick={() => deleteTask(task._id)}
                />
              </Tooltip>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
