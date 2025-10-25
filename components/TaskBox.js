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
import Assignment from "@/components/forms/Assignment";
import { convertDate } from "@/services/utility";
import {
  getProjectsApi,
  getTasksApi,
  getNotificationApi,
} from "@/services/api";

export default function TaskBox() {
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [selectedTask, setSelectedTask] = useState(null);
  const [displayPopup, setDisplayPopup] = useState(false);
  const [projectsDataDisplay, setProjectsDataDisplay] = useState([]);

  const fullSizeChatBox =
    screenSize === "desktop" || screenSize === "tablet-landscape";

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProjects = async () => {
    const projectsData = await getProjectsApi();
    setProjectsDataDisplay(projectsData);
  };

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
              پروژه
            </h3>
            <Tooltip title="New Project">
              <AddIcon
                className="icon"
                sx={{ fontSize: 20 }}
                onClick={() => setDisplayPopup(true)}
              />
            </Tooltip>
          </div>

          {projectsDataDisplay.map((project, index) => (
            <div
              key={index}
              className={project.active ? classes.groupActive : classes.group}
              onClick={() => handleChatSelection(index)}
            >
              <div className={classes.info}>
                <p className={classes.date}>{convertDate(project.updatedAt)}</p>
                <div className={classes.row}>
                  <p
                    style={{
                      fontFamily: "English",
                    }}
                  >
                    {project.users.length}
                  </p>
                </div>
                <h4
                  style={{
                    fontFamily: "FarsiBold",
                  }}
                >
                  {project.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
        <div className={classes.column}>
          <div className={classes.topBar}>
            <h3
              style={{
                fontFamily: "FarsiBold",
              }}
            >
              وظایف
            </h3>
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
          <Assignment
            selectedData={selectedTask}
            floatChat={false}
            type="project"
          />
        </div>
      )}
    </Fragment>
  );
}
