import { useContext, useState, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import Image from "next/legacy/image";
import classes from "./TaskBox.module.scss";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Tooltip from "@mui/material/Tooltip";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import EditIcon from "@mui/icons-material/Edit";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import { utils } from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import Assignment from "@/components/forms/Assignment";
import { convertDate, convertPersianToGregorian } from "@/services/utility";
import {
  getSingleProjectApi,
  getTasksApi,
  getSingleUserApi,
  deleteTaskApi,
  updateTaskApi,
  updateProjectApi,
} from "@/services/api";

export default function ProjectCard({ projectId }) {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [projectDataDisplay, setProjectDataDisplay] = useState([]);
  const [taskDatadisplay, setTaskDataDisplay] = useState([]);
  const [tasksFormData, setTasksFormData] = useState({});
  const [editProject, setEditProject] = useState(false);
  const [addTasks, setAddTasks] = useState(false);

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
      Urgent: "crimson",
    };
    return priorityColor[priority];
  };

  const getStatus = (status) => {
    const statusFa = {
      todo: "وظایف",
      progress: "درحال انجام",
      done: "تکمیل",
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

  const isWithinThreeDays = (task) => {
    if (task.status === "done") return;
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    dueDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diffInMs = dueDate - today;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return diffInDays <= 3 && diffInDays >= 0;
  };

  const handleTaskDateChange = async (taskId, value, index) => {
    let confirmationMessage = "تغییر تاریخ مطمئنی؟";
    let confirm = window.confirm(confirmationMessage);
    if (confirm) {
      setTasksFormData((prev) => ({
        ...prev,
        [taskId]: value,
      }));
      let gregorian = convertPersianToGregorian(value);
      await updateTaskApi({
        ...taskDatadisplay[index],
        dueDate: gregorian,
      });
      fetchTasks();
    }
  };

  const calculateProgress = () => {
    const doneTasks = taskDatadisplay.filter((task) => task.status === "done");
    return Math.round((doneTasks.length / taskDatadisplay.length) * 100);
  };

  const completeProject = async (type) => {
    switch (type) {
      case "complete":
        projectDataDisplay.completed = true;
        break;
      case "progress":
        projectDataDisplay.completed = false;
        break;
    }
    await updateProjectApi(projectDataDisplay);
    fetchTasks();
  };

  const handleProjectUpdate = () => {
    setEditProject(false);
    setAddTasks(false);
    fetchTasks();
    fetchProject();
  };

  return (
    <>
      {!editProject ? (
        <div className={classes.projectCard}>
          <div
            className={classes.topBar}
            style={{
              fontFamily: "FarsiBold",
            }}
          >
            <div className={classes.row}>
              <h4
                style={{
                  marginRight: "12px",
                }}
              >
                <span
                  style={{
                    fontFamily: "EnglishMedium",
                    marginRight: "4px",
                  }}
                >
                  {calculateProgress() || 0}%
                </span>
                تکمیل
              </h4>
            </div>
            <div className={classes.row}>
              <p
                style={{
                  marginRight: "4px",
                }}
              >
                {(() => {
                  const dateStr =
                    convertDate(projectDataDisplay?.dueDate) || "-";
                  const commaIndex = dateStr.indexOf(",");
                  return commaIndex !== -1
                    ? dateStr.slice(0, commaIndex)
                    : dateStr;
                })()}
              </p>
              <Tooltip title="Due Date">
                <TimelapseIcon sx={{ fontSize: 18 }} />
              </Tooltip>
            </div>
            {projectDataDisplay.adminsId?.includes(currentUser._id) && (
              <div className={classes.row}>
                <Tooltip
                  title={projectDataDisplay.completed ? "Progress" : "Complete"}
                >
                  {!projectDataDisplay.completed ? (
                    <ToggleOffIcon
                      className="icon"
                      sx={{ fontSize: 32, color: "#a70237" }}
                      onClick={() => {
                        completeProject("complete");
                      }}
                    />
                  ) : (
                    <ToggleOnIcon
                      className="icon"
                      sx={{ fontSize: 32, color: "#6b8745" }}
                      onClick={() => {
                        completeProject("progress");
                      }}
                    />
                  )}
                </Tooltip>
                <Tooltip title="Add Tasks">
                  <AddCircleIcon
                    className="icon"
                    style={{
                      margin: "0px 8px",
                    }}
                    sx={{ fontSize: 18 }}
                    onClick={() => {
                      setAddTasks(!addTasks);
                    }}
                  />
                </Tooltip>
                <Tooltip title="Edit Project">
                  <EditIcon
                    className="icon"
                    sx={{ fontSize: 20 }}
                    onClick={() => setEditProject(true)}
                  />
                </Tooltip>
              </div>
            )}
          </div>
          <h3
            style={{
              fontFamily: "FarsiBold",
            }}
          >
            {projectDataDisplay?.title}
          </h3>
          <h3 className={classes.description}>
            {projectDataDisplay?.description}
          </h3>
          {taskDatadisplay?.length === 0 && (
            <p className={classes.note}>
              وظایف اضافه شده در اینجا نمایش داده می‌شوند
            </p>
          )}
          {addTasks && (
            <Assignment
              selectedData={projectDataDisplay}
              floatChat={false}
              projectId={projectId}
              type="project"
              onProjectUpdate={handleProjectUpdate}
            />
          )}
          <div className={classes.taskBox}>
            {taskDatadisplay.map((task, index) => (
              <div key={index} className={classes.task}>
                <div className={classes.row}>
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
                        margin: "0px 8px",
                      }}
                    >
                      {task.userData.name.fa}
                    </h3>
                    {task.users.some((id) =>
                      projectDataDisplay.adminsId.includes(id)
                    ) && (
                      <Tooltip title="Project Admin">
                        <ShieldOutlinedIcon sx={{ fontSize: 18 }} />
                      </Tooltip>
                    )}
                  </div>
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
                    {isWithinThreeDays(task) && (
                      <Tooltip title="Action">
                        <NotificationsIcon
                          sx={{ fontSize: 18, color: "red" }}
                        />
                      </Tooltip>
                    )}
                    {task.status === "done" && (
                      <Tooltip title="Done">
                        <DoneOutlineIcon
                          sx={{ fontSize: 18, color: "green" }}
                        />
                      </Tooltip>
                    )}
                    {task.status !== "done" && (
                      <Tooltip title="Due Date">
                        <TimelapseIcon sx={{ fontSize: 18 }} />
                      </Tooltip>
                    )}
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
                  <div className={classes.indicator}>
                    <DatePicker
                      value={tasksFormData[task._id]}
                      onChange={(date) =>
                        handleTaskDateChange(task._id, date, index)
                      }
                      inputPlaceholder="تغییر مهلت"
                      shouldHighlightWeekends
                      minimumDate={utils("fa").getToday()}
                      locale="fa"
                    />
                    <Tooltip title="Delete">
                      <DeleteOutlineIcon
                        className="icon"
                        sx={{ fontSize: 18 }}
                        onClick={() => deleteTask(task._id)}
                      />
                    </Tooltip>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Assignment
          selectedData={projectDataDisplay}
          floatChat={false}
          type="project"
          onProjectUpdate={handleProjectUpdate}
        />
      )}
    </>
  );
}
