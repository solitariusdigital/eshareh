import { Fragment, useContext, useState, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import classes from "./Form.module.scss";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Tooltip from "@mui/material/Tooltip";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { createNotificationApi, getUsersApi } from "@/services/api";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import { utils } from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import {
  applyFontToEnglishWords,
  convertPersianToGregorian,
} from "@/services/utility";
import {
  createChatApi,
  getSingleChatApi,
  getSingleProjectApi,
  updateChatApi,
  getSingleUserApi,
  updateUserApi,
  createProjectApi,
  updateProjectApi,
  createTaskApi,
} from "@/services/api";

export default function Assignment({
  selectedData,
  floatChat,
  type,
  projectId,
  onProjectUpdate,
}) {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const [title, setTitle] = useState(selectedData?.title || "");
  const [description, setDescription] = useState(
    selectedData?.description || ""
  );
  const [users, setUsers] = useState([]);
  const [disableButton, setDisableButton] = useState(false);
  const [alert, setAlert] = useState("");
  const [editData, setEditData] = useState(selectedData);
  const [projectDate, setProjectDate] = useState(editData?.dateObject || null);
  const [dueDate, setDueDate] = useState(editData?.dueDate || null);
  const [tasksUsers, setTasksUsers] = useState(null);
  const [tasksFormData, setTasksFormData] = useState({});
  const [selectedProjectId, setSelectedProjectId] = useState(projectId);
  const priorities = ["Low", "Medium", "High", "Urgent"];
  const router = useRouter();

  useEffect(() => {
    if (!projectId) return;
    const fetchData = async () => {
      try {
        const projectData = await getSingleProjectApi(projectId);
        enrichUserData(projectData.users);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getUsersApi();
        let addSelectOption = users.map((user) => ({
          ...user,
          selection: selectedData?.users.includes(user._id) ? true : false,
        }));
        setUsers(addSelectOption);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUserSelection = (index, isActive) => {
    setUsers((prevState) =>
      prevState.map((item, i) =>
        i === index ? { ...item, selection: isActive } : item
      )
    );
  };

  const selectAllUsers = () => {
    setUsers(
      users.map((user) => ({
        ...user,
        selection: !user.selection,
      }))
    );
  };

  // new chat - new project
  const createNewData = async () => {
    let usersId = users
      .filter((user) => user.selection)
      .map((user) => user._id);
    if (!title.trim() || (type === "project" && !dueDate)) {
      showAlert("موارد ستاره‌دار الزامیست");
      return;
    }
    if (usersId.length < 2) {
      showAlert("حداقل ۲ عضو الزامیست");
      return;
    }
    setDisableButton(true);

    let resultData = null;
    switch (type) {
      case "project":
        const projectObject = {
          title: title.trim(),
          description: description.trim(),
          users: usersId,
          adminsId: [currentUser._id],
          completed: false,
          dateObject: projectDate,
          dueDate: dueDate,
        };
        if (editData) {
          projectObject.id = editData._id;
          resultData = await updateProjectApi(projectObject);
          onProjectUpdate();
        } else {
          resultData = await createProjectApi(projectObject);
          setSelectedProjectId(resultData._id);
          enrichUserData(usersId);
        }
        setDisableButton(false);
        break;
      case "chat":
        const chatObject = {
          type: "public",
          title: title.trim(),
          description: description.trim(),
          users: usersId,
          adminsId: [currentUser._id],
          lastMessageId: "",
          archive: false,
        };
        if (editData) {
          chatObject.id = editData._id;
          chatObject.archive = editData.archive;
          chatObject.lastMessageId = editData.lastMessageId;
          resultData = await updateChatApi(chatObject);
        } else {
          resultData = await createChatApi(chatObject);
        }
        await createNotification(usersId, resultData);
        router.reload(router.asPath);
        break;
    }
  };

  const enrichUserData = async (usersId) => {
    const allUsersData = await Promise.all(
      usersId.map((id) => getSingleUserApi(id))
    );
    setTasksUsers(allUsersData);
  };

  const createNotification = async (usersId, resultData) => {
    let baseNotificationObject = {
      itemId: resultData._id,
      type: "chat",
      isRead: false,
    };

    for (const id of usersId) {
      const notificationObject = {
        ...baseNotificationObject,
        userId: id,
      };
      let userData = await getSingleUserApi(id);
      await updateUserApi({
        ...userData,
        notifications: true,
      });
      await createNotificationApi(notificationObject);
    }
  };

  const toggleChatActivation = async (type) => {
    let chatData = await getSingleChatApi(editData._id);
    switch (type) {
      case "active":
        chatData.archive = true;
        break;
      case "deactive":
        chatData.archive = false;
        break;
    }
    let updateChat = await updateChatApi(chatData);
    setEditData(updateChat);
  };

  const createTasks = async () => {
    if (Object.keys(tasksFormData).length === 0) return;
    const allTasks = [];
    for (const userId of Object.keys(tasksFormData)) {
      for (const taskData of tasksFormData[userId]) {
        if (!taskData || Object.keys(taskData).length === 0) continue;
        const hasRequiredFields =
          taskData.title?.trim() &&
          taskData.description?.trim() &&
          taskData.priority &&
          taskData.date &&
          typeof taskData.date === "object" &&
          taskData.date.day &&
          taskData.date.month &&
          taskData.date.year;
        if (!hasRequiredFields) {
          showAlert("همه موارد الزامیست");
          return;
        }
        allTasks.push({ userId, taskData });
      }
    }
    for (const { userId, taskData } of allTasks) {
      const taskObject = {
        projectId: selectedProjectId,
        title: taskData.title.trim(),
        description: taskData.description.trim(),
        users: [userId],
        status: "todo",
        priority: taskData.priority,
        dueDate: convertPersianToGregorian(taskData.date),
      };
      await createTaskApi(taskObject);
    }
    router.reload(router.asPath);
  };

  const assingProjectDate = (day) => {
    setProjectDate(day);
    let gregorian = convertPersianToGregorian(day);
    setDueDate(gregorian);
  };

  const handleTaskFormChange = (userId, index, field, value) => {
    setTasksFormData((prev) => {
      const userTasks = prev[userId] || [];
      // Make a shallow copy
      const updatedTasks = [...userTasks];
      // Fill any gaps up to the index with empty objects
      for (let i = updatedTasks.length; i <= index; i++) {
        if (!updatedTasks[i]) updatedTasks[i] = {};
      }
      // Update the task at the index
      updatedTasks[index] = {
        ...updatedTasks[index],
        [field]: value,
      };
      return {
        ...prev,
        [userId]: updatedTasks,
      };
    });
  };

  const addMoreTask = async (id) => {
    let getUser = await getSingleUserApi(id);
    const newUsersData = [...tasksUsers];
    newUsersData.push(getUser);
    setTasksUsers(newUsersData);
  };

  const removeTask = (index) => {
    setTasksUsers((prevUsers) => {
      const updatedUsers = prevUsers.filter((_, i) => i !== index);
      setTasksFormData((prevData) => {
        const newData = { ...prevData };
        Object.keys(newData).forEach((userId) => {
          if (Array.isArray(newData[userId])) {
            newData[userId] = newData[userId].filter((_, i) => i !== index);
          }
        });
        return newData;
      });
      return updatedUsers;
    });
  };

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };

  return (
    <div className={classes.assignmentContainer}>
      {!selectedProjectId ? (
        <Fragment>
          <div className={classes.assignment}>
            {!editData && (
              <h3>{type === "project" ? "پروژه جدید" : "چت جدید"}</h3>
            )}
            <div className={classes.input}>
              <div className={classes.bar}>
                <p className={classes.label}>
                  <span>*</span>
                  عنوان
                </p>
              </div>
              <input
                style={{
                  fontFamily: "Farsi",
                }}
                type="text"
                id="title"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                autoComplete="off"
                dir="rtl"
              />
            </div>
            <div className={classes.input}>
              <div className={classes.bar}>
                <p className={classes.label}>توضیحات</p>
              </div>
              <input
                style={{
                  fontFamily: "Farsi",
                }}
                type="text"
                id="description"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                autoComplete="off"
                dir="rtl"
              />
            </div>
            {type === "project" && (
              <div className={classes.calendar}>
                <h3 className={classes.label}>
                  <span>*</span>
                  تاریخ مهلت
                </h3>
                <DatePicker
                  value={projectDate}
                  onChange={(date) => assingProjectDate(date)}
                  inputPlaceholder="انتخاب"
                  shouldHighlightWeekends
                  minimumDate={utils("fa").getToday()}
                  locale="fa"
                />
              </div>
            )}
            <div className={classes.indicatorAction}>
              {type === "chat" && editData && (
                <Tooltip title={editData.archive ? "Deactive" : "Active"}>
                  {editData.archive ? (
                    <ToggleOffIcon
                      className="icon"
                      sx={{ fontSize: 32, color: "#a70237" }}
                      onClick={() => toggleChatActivation("deactive")}
                    />
                  ) : (
                    <ToggleOnIcon
                      className="icon"
                      sx={{ fontSize: 32, color: "#6b8745" }}
                      onClick={() => toggleChatActivation("active")}
                    />
                  )}
                </Tooltip>
              )}
              {permissionControl === "admin" && (
                <Tooltip title="Select all">
                  <DoneAllIcon
                    className="icon"
                    sx={{ fontSize: 32 }}
                    onClick={() => selectAllUsers()}
                  />
                </Tooltip>
              )}
            </div>
          </div>
          <div
            className={
              floatChat
                ? classes.assignmentSelectionFloat
                : classes.assignmentSelection
            }
          >
            {users?.map((user, index) => {
              return (
                <div
                  key={index}
                  className={classes.row}
                  onClick={() => handleUserSelection(index, !user.selection)}
                >
                  <div>
                    <h3
                      style={{
                        fontFamily: "FarsiBold",
                      }}
                    >
                      {user.name.fa}
                    </h3>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: applyFontToEnglishWords(
                          user.title.fa,
                          "English",
                          "16px",
                          "fa"
                        ),
                      }}
                    ></p>
                  </div>
                  {user.selection ? (
                    <RadioButtonCheckedIcon
                      className="icon"
                      sx={{ color: "#fdb714" }}
                    />
                  ) : (
                    <RadioButtonUncheckedIcon className="icon" />
                  )}
                </div>
              );
            })}
          </div>
          <div className={classes.formAction}>
            <p className={classes.alert}>{alert}</p>
            <button
              disabled={disableButton}
              style={{
                fontFamily: "FarsiMedium",
              }}
              onClick={() => createNewData()}
            >
              {editData ? "ویرایش" : "ذخیره"}
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <h3 style={{ margin: "8px 0px" }}>واگذاری وظایف</h3>
          <div className={classes.tasksManager}>
            {tasksUsers?.map((user, index) => {
              return (
                <div
                  key={index}
                  className={classes.usersTasks}
                  onClick={() => handleUserSelection(index, !user.selection)}
                >
                  <div className={classes.row}>
                    <h3
                      style={{
                        fontFamily: "FarsiBold",
                      }}
                    >
                      {user.name.fa}
                    </h3>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: applyFontToEnglishWords(
                          user.title.fa,
                          "English",
                          "16px",
                          "fa"
                        ),
                      }}
                    ></p>
                    <div className={classes.row}>
                      <Tooltip title="Add">
                        <AddIcon
                          className="icon"
                          sx={{ fontSize: 18 }}
                          onClick={() => addMoreTask(user._id)}
                        />
                      </Tooltip>
                      <Tooltip title="Remove">
                        <RemoveIcon
                          className="icon"
                          sx={{ fontSize: 18 }}
                          onClick={() => removeTask(index)}
                        />
                      </Tooltip>
                    </div>
                  </div>
                  <div className={classes.input}>
                    <input
                      style={{
                        fontFamily: "Farsi",
                      }}
                      placeholder="عنوان"
                      type="text"
                      id="title"
                      name="title"
                      onChange={(e) =>
                        handleTaskFormChange(
                          user._id,
                          index,
                          "title",
                          e.target.value
                        )
                      }
                      value={tasksFormData[user._id]?.[index]?.title || ""}
                      autoComplete="off"
                      dir="rtl"
                    />
                  </div>
                  <div className={classes.input}>
                    <textarea
                      style={{
                        fontFamily: "Farsi",
                      }}
                      placeholder="توضیحات"
                      type="text"
                      id="description"
                      name="description"
                      onChange={(e) =>
                        handleTaskFormChange(
                          user._id,
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      value={
                        tasksFormData[user._id]?.[index]?.description || ""
                      }
                      autoComplete="off"
                      dir="rtl"
                    />
                  </div>
                  <div className={classes.row}>
                    <DatePicker
                      value={tasksFormData[user._id]?.[index]?.date}
                      onChange={(date) =>
                        handleTaskFormChange(user._id, index, "date", date)
                      }
                      inputPlaceholder="تاریخ مهلت"
                      shouldHighlightWeekends
                      minimumDate={utils("fa").getToday()}
                      locale="fa"
                    />
                    <select
                      style={{
                        fontFamily: "English",
                      }}
                      value={
                        tasksFormData[user._id]?.[index]?.priority || "default"
                      }
                      onChange={(e) =>
                        handleTaskFormChange(
                          user._id,
                          index,
                          "priority",
                          e.target.value
                        )
                      }
                    >
                      <option value="default" disabled>
                        Select
                      </option>
                      {priorities.map((priority, index) => {
                        return (
                          <option key={index} value={priority}>
                            {priority}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={classes.formAction}>
            <p className={classes.alert}>{alert}</p>
            <button
              disabled={disableButton}
              style={{
                fontFamily: "FarsiMedium",
              }}
              onClick={() => createTasks()}
            >
              {editData ? "ویرایش" : "ذخیره"}
            </button>
          </div>
        </Fragment>
      )}
    </div>
  );
}
