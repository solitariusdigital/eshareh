import { Fragment, useContext, useState, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./TaskBox.module.scss";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import GroupIcon from "@mui/icons-material/Group";
import ListIcon from "@mui/icons-material/List";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import TaskCard from "@/components/TaskCard";
import Progress from "@/components/Progress";
import Assignment from "@/components/forms/Assignment";
import { convertDate } from "@/services/utility";
import { getProjectsApi } from "@/services/api";
import TaskCount from "@/components/TaskCount";

export default function TaskBox() {
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [selectedTask, setSelectedTask] = useState(null);
  const [displayPopup, setDisplayPopup] = useState(false);
  const [projectsDataDisplay, setProjectsDataDisplay] = useState([]);
  const [projectId, setProjectId] = useState(null);

  const fullSizeChatBox =
    screenSize === "desktop" || screenSize === "tablet-landscape";

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProjects = async () => {
    const projectsData = await getProjectsApi();
    setProjectsDataDisplay(
      projectsData
        .filter((project) => project.users.includes(currentUser._id))
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    );
  };

  const calculatePercentage = (total) => {
    let completed = 1;
    return (completed / total) * 100;
  };

  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes.column}>
          <div className={classes.topBar}>
            <div className={classes.row}>
              <h3
                style={{
                  fontFamily: "FarsiBold",
                }}
              >
                پروژه
              </h3>
              <h5
                style={{
                  fontFamily: "EnglishMedium",
                }}
              >
                {projectsDataDisplay.length}
              </h5>
            </div>
            <Tooltip title="New Project">
              <AddIcon
                className="icon"
                sx={{ fontSize: 20 }}
                onClick={() => {
                  setDisplayPopup(true);
                  setProjectId(null);
                }}
              />
            </Tooltip>
          </div>
          {projectsDataDisplay.map((project, index) => (
            <div key={index} className={classes.project}>
              <h4
                style={{
                  fontFamily: "FarsiBold",
                }}
              >
                {project.title}
              </h4>
              <p className={classes.description}>{project.description}</p>
              <div className={classes.row}>
                <div className={classes.row}>
                  <Tooltip title="Due Date">
                    <TimelapseIcon sx={{ fontSize: 18 }} />
                  </Tooltip>
                  <p>
                    {convertDate(project.dueDate).slice(
                      0,
                      convertDate(project.dueDate).indexOf(",")
                    )}
                  </p>
                </div>
                <div className={classes.row}>
                  <Tooltip title="Tasks">
                    <ListIcon sx={{ fontSize: 18 }} />
                  </Tooltip>
                  <p
                    style={{
                      fontFamily: "English",
                    }}
                  >
                    <TaskCount projectId={project._id} />
                  </p>
                </div>
                <div className={classes.row}>
                  <Tooltip title="Members">
                    <GroupIcon sx={{ fontSize: 18 }} />
                  </Tooltip>
                  <p
                    style={{
                      fontFamily: "English",
                    }}
                  >
                    {project.users.length}
                  </p>
                </div>
                <div className={classes.row}>
                  <Tooltip title="Add Tasks">
                    <AddIcon
                      className="icon"
                      sx={{ fontSize: 18 }}
                      onClick={() => {
                        setDisplayPopup(true);
                        setProjectId(project._id);
                      }}
                    />
                  </Tooltip>
                </div>
              </div>
              <div className={classes.progress}>
                <Progress
                  color={"#fdb714"}
                  completed={calculatePercentage(project.users.length)}
                  border={true}
                  height={2}
                />
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
              درحال انجام
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
            projectId={projectId}
          />
        </div>
      )}
    </Fragment>
  );
}
