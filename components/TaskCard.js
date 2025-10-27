import { Fragment, useContext, useState, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./TaskBox.module.scss";
import CircleIcon from "@mui/icons-material/Circle";
import Tooltip from "@mui/material/Tooltip";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import { convertDate } from "@/services/utility";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { getSingleProjectApi } from "@/services/api";

export default function TaskCard({ taskData }) {
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    fetchProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProject = async () => {
    try {
      const projectsData = await getSingleProjectApi(taskData.projectId);
      setProjectData(projectsData);
    } catch (error) {
      console.error("Error fetching projects or tasks:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Low":
        return "yellowgreen";
      case "Medium":
        return "blueviolet";
      case "High":
        return "orange";
      case "Urgent":
        return "red";
    }
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
      </div>
      <p className={classes.description}>{taskData.description}</p>
      <p className={classes.projectTitle}>{projectData?.title}</p>
      <div className={classes.row}>
        <Tooltip title={taskData.priority}>
          <CircleIcon
            sx={{ fontSize: 12, color: getStatusColor(taskData.priority) }}
          />
        </Tooltip>
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
        <div className={classes.row}>
          <Tooltip title="Progress">
            <ChecklistIcon sx={{ fontSize: 18 }} />
          </Tooltip>
          <p
            style={{
              fontFamily: "English",
            }}
          >
            {taskData.progress}%
          </p>
        </div>
      </div>
    </div>
  );
}
