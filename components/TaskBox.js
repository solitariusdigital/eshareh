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
import TaskCount from "@/components/TaskCount";
import Assignment from "@/components/forms/Assignment";
import { convertDate } from "@/services/utility";
import { getProjectsApi, getTasksApi } from "@/services/api";

export default function TaskBox() {
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [selectedTask, setSelectedTask] = useState(null);
  const [displayPopup, setDisplayPopup] = useState(false);
  const [projectsDataDisplay, setProjectsDataDisplay] = useState([]);
  const [tasksDataDisplay, setTasksDataDisplay] = useState([]);
  const [projectId, setProjectId] = useState(null);
  const [doneTasksCount, setDoneTasksCount] = useState({});

  const fullSizeChatBox =
    screenSize === "desktop" || screenSize === "tablet-landscape";

  useEffect(() => {
    fetchProjects();
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Generic helper to filter by user and sort by dueDate descending
  const filterAndSortByUser = (items, userId) =>
    items
      .filter((item) => item.users.includes(userId))
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  // Calculate completion percentage per project
  const calculateCompletion = (projects, tasks) =>
    projects.reduce((acc, project) => {
      const projectTasks = tasks.filter((t) => t.projectId === project._id);
      const doneTasks = projectTasks.filter((t) => t.status === "done");
      acc[project._id] =
        projectTasks.length > 0
          ? (doneTasks.length / projectTasks.length) * 100
          : 0;
      return acc;
    }, {});

  const fetchProjects = async () => {
    try {
      const projectsData = await getProjectsApi();
      const filteredProjects = filterAndSortByUser(
        projectsData,
        currentUser._id
      );
      setProjectsDataDisplay(filteredProjects);

      const tasksData = await getTasksApi();
      setDoneTasksCount(calculateCompletion(filteredProjects, tasksData));
    } catch (error) {
      console.error("Error fetching projects or tasks:", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const tasksData = await getTasksApi();
      const filteredTasks = filterAndSortByUser(
        tasksData,
        currentUser._id
      ).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      setTasksDataDisplay(filteredTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
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
                  completed={doneTasksCount[project._id] ?? 0}
                  border={true}
                  height={3}
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
            <h5
              style={{
                fontFamily: "EnglishMedium",
              }}
            >
              {tasksDataDisplay.filter((task) => task.status === "todo").length}
            </h5>
          </div>
          {tasksDataDisplay
            .filter((task) => task.status === "todo")
            .map((task, index) => (
              <Fragment key={index}>
                <TaskCard taskData={task} />
              </Fragment>
            ))}
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
            <h5
              style={{
                fontFamily: "EnglishMedium",
              }}
            >
              {
                tasksDataDisplay.filter((task) => task.status === "progress")
                  .length
              }
            </h5>
          </div>
          {tasksDataDisplay
            .filter((task) => task.status === "progress")
            .map((task, index) => (
              <Fragment key={index}>
                <TaskCard taskData={task} />
              </Fragment>
            ))}
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
            <h5
              style={{
                fontFamily: "EnglishMedium",
              }}
            >
              {tasksDataDisplay.filter((task) => task.status === "done").length}
            </h5>
          </div>
          {tasksDataDisplay
            .filter((task) => task.status === "done")
            .map((task, index) => (
              <Fragment key={index}>
                <TaskCard taskData={task} />
              </Fragment>
            ))}
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
