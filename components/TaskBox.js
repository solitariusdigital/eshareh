import { Fragment, useContext, useState, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./TaskBox.module.scss";
import Tooltip from "@mui/material/Tooltip";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import GroupIcon from "@mui/icons-material/Group";
import ListIcon from "@mui/icons-material/List";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import TaskCard from "@/components/TaskCard";
import Progress from "@/components/Progress";
import TaskCount from "@/components/TaskCount";
import Assignment from "@/components/forms/Assignment";
import ProjectCard from "@/components/ProjectCard";
import { convertDate, sliceString } from "@/services/utility";
import { getProjectsApi, getTasksApi } from "@/services/api";

export default function TaskBox() {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [selectedTask, setSelectedTask] = useState(null);
  const [assignmentPopup, setAssignmentPopup] = useState(false);
  const [projectCardPopup, setProjectPopup] = useState(false);
  const [projectsDataDisplay, setProjectsDataDisplay] = useState([]);
  const [tasksDataDisplay, setTasksDataDisplay] = useState([]);
  const [projectId, setProjectId] = useState(null);
  const [doneTasksCount, setDoneTasksCount] = useState({});

  useEffect(() => {
    fetchProjects();
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTaskUpdated = () => {
    fetchProjects();
    fetchTasks();
  };

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
    const projectsData = await getProjectsApi();
    const filteredProjects = filterAndSortByUser(projectsData, currentUser._id);
    filteredProjects.sort((a, b) => a.completed - b.completed);
    setProjectsDataDisplay(filteredProjects);
    const tasksData = await getTasksApi();
    setDoneTasksCount(calculateCompletion(filteredProjects, tasksData));
  };

  const fetchTasks = async () => {
    const tasksData = await getTasksApi();
    const filteredTasks = filterAndSortByUser(tasksData, currentUser._id);
    setTasksDataDisplay(filteredTasks);
  };

  const handleProjectChange = () => {
    setAssignmentPopup(false);
    setProjectPopup(false);
    handleTaskUpdated();
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
            <div className={classes.row}>
              <Tooltip title="Refresh">
                <RefreshIcon
                  className="icon"
                  sx={{ fontSize: 20 }}
                  onClick={() => {
                    handleTaskUpdated();
                  }}
                />
              </Tooltip>
              <Tooltip title="New Project">
                <AddCircleIcon
                  className="icon"
                  style={{
                    marginRight: "4px",
                  }}
                  sx={{ fontSize: 20 }}
                  onClick={() => {
                    setAssignmentPopup(true);
                    setProjectId(null);
                  }}
                />
              </Tooltip>
            </div>
          </div>
          {projectsDataDisplay.map((project, index) => (
            <div
              key={index}
              className={classes.project}
              onClick={() => {
                setProjectPopup(true);
                setProjectId(project._id);
              }}
            >
              {project.completed && (
                <Tooltip title="Completed">
                  <DoneOutlineIcon sx={{ fontSize: 18, color: "green" }} />
                </Tooltip>
              )}
              <div className={classes.bar}>
                <h4
                  style={{
                    fontFamily: "FarsiBold",
                  }}
                >
                  {project.title}
                </h4>
                <Tooltip title="View">
                  <ArrowBackIosNewIcon
                    className="icon"
                    onClick={() => {
                      setProjectPopup(true);
                      setProjectId(project._id);
                    }}
                    sx={{ fontSize: 18 }}
                  />
                </Tooltip>
              </div>
              <p className={classes.description}>
                {sliceString(project.description, 70)}
              </p>
              <div className={classes.indicator}>
                <div className={classes.row}>
                  <Tooltip title="Due Date">
                    <TimelapseIcon sx={{ fontSize: 18 }} />
                  </Tooltip>
                  <p>
                    {(() => {
                      const dateStr = convertDate(project?.dueDate) || "-";
                      const commaIndex = dateStr.indexOf(",");
                      return commaIndex !== -1
                        ? dateStr.slice(0, commaIndex)
                        : dateStr;
                    })()}
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
            .map((task) => (
              <TaskCard
                key={task._id}
                taskData={task}
                onTaskUpdate={handleTaskUpdated}
              />
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
            .map((task) => (
              <TaskCard
                key={task._id}
                taskData={task}
                onTaskUpdate={handleTaskUpdated}
              />
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
            .map((task) => (
              <TaskCard
                key={task._id}
                taskData={task}
                onTaskUpdate={handleTaskUpdated}
              />
            ))}
        </div>
      </div>
      {assignmentPopup && (
        <div className={classes.popup}>
          <CloseIcon
            className="icon"
            onClick={() => setAssignmentPopup(false)}
            sx={{ fontSize: 20 }}
          />
          <Assignment
            selectedData={selectedTask}
            floatChat={false}
            type="project"
            projectId={projectId}
            onProjectChange={handleProjectChange}
          />
        </div>
      )}
      {projectCardPopup && (
        <div className={classes.popup}>
          <CloseIcon
            className="icon"
            onClick={() => setProjectPopup(false)}
            sx={{ fontSize: 20 }}
          />
          <ProjectCard
            projectId={projectId}
            onProjectChange={handleProjectChange}
          />
        </div>
      )}
    </Fragment>
  );
}
