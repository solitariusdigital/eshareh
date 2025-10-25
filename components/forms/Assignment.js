import { Fragment, useContext, useState, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import classes from "./Form.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import Tooltip from "@mui/material/Tooltip";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { createNotificationApi, getUsersApi } from "@/services/api";
import { Calendar, utils } from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import {
  applyFontToEnglishWords,
  convertPersianToGregorian,
} from "@/services/utility";
import {
  createChatApi,
  getSingleChatApi,
  updateChatApi,
  getSingleUserApi,
  updateUserApi,
  createProjectApi,
  updateProjectApi,
} from "@/services/api";

export default function Assignment({ selectedData, floatChat, type }) {
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
  const [date, setDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [assignTasks, setAssignTasks] = useState(true);

  const router = useRouter();

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

  const createChat = async () => {
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
          dueDate: dueDate,
        };
        if (editData) {
          projectObject.id = editData._id;
          projectObject.dueDate = editData.dueDate;
          resultData = await updateProjectApi(projectObject);
        } else {
          resultData = await createProjectApi(projectObject);
          setAssignTasks(true);
        }
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

  const createNotification = async (usersId, resultData) => {
    let baseNotificationObject = {
      itemId: resultData._id,
      type: type,
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

  const assingDate = (day) => {
    setDate(day);
    let gregorian = convertPersianToGregorian(day);
    setDueDate(gregorian);
  };

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };

  return (
    <div className={classes.assignmentContainer}>
      {!assignTasks ? (
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
                <CloseIcon
                  className="icon"
                  onClick={() => setTitle("")}
                  sx={{ fontSize: 16 }}
                />
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
                <CloseIcon
                  className="icon"
                  onClick={() => setDescription("")}
                  sx={{ fontSize: 16 }}
                />
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
                <Calendar
                  value={date}
                  onChange={(date) => assingDate(date)}
                  shouldHighlightWeekends
                  minimumDate={utils("fa").getToday()}
                  locale="fa"
                />
              </div>
            )}
            <div className={classes.formAction}>
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
              onClick={() => createChat()}
            >
              {editData ? "ویرایش" : "ذخیره"}
            </button>
          </div>
        </Fragment>
      ) : (
        <h2>task time</h2>
      )}
    </div>
  );
}
