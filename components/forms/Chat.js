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
import { applyFontToEnglishWords } from "@/services/utility";
import {
  createChatApi,
  getSingleChatApi,
  updateChatApi,
  getSingleUserApi,
  updateUserApi,
} from "@/services/api";

export default function Chat({ selectedChat, floatChat }) {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const [title, setTitle] = useState(selectedChat?.title || "");
  const [description, setDescription] = useState(
    selectedChat?.description || ""
  );
  const [users, setUsers] = useState([]);
  const [disableButton, setDisableButton] = useState(false);
  const [alert, setAlert] = useState("");
  const [editChat, setEditChat] = useState(selectedChat);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getUsersApi();
        let addSelectOption = users.map((user) => ({
          ...user,
          selection: selectedChat?.users.includes(user._id) ? true : false,
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
    if (!title.trim()) {
      showAlert("موارد ستاره‌دار الزامیست");
      return;
    }
    if (usersId.length < 2) {
      showAlert("حداقل ۲ عضو الزامیست");
      return;
    }
    setDisableButton(true);

    const chatObject = {
      type: "public",
      title: title.trim(),
      description: description.trim(),
      users: usersId,
      adminsId: [currentUser._id],
      lastMessageId: "",
      archive: false,
    };
    let chatData = null;
    if (editChat) {
      chatObject.id = editChat._id;
      chatObject.archive = editChat.archive;
      chatObject.lastMessageId = editChat.lastMessageId;
      chatData = await updateChatApi(chatObject);
    } else {
      chatData = await createChatApi(chatObject);
    }
    await createNotification(usersId, chatData);
    router.reload(router.asPath);
  };

  const createNotification = async (usersId, chatData) => {
    let baseNotificationObject = {
      chatId: chatData._id,
      messageId: "",
      type: "message",
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
    let chatData = await getSingleChatApi(editChat._id);
    switch (type) {
      case "active":
        chatData.archive = true;
        break;
      case "deactive":
        chatData.archive = false;
        break;
    }
    let updateChat = await updateChatApi(chatData);
    setEditChat(updateChat);
  };

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };

  return (
    <Fragment>
      <div className={classes.usersInput}>
        <div className={classes.input}>
          <div className={classes.bar}>
            <p className={classes.label}>
              <span>*</span>
              عنوان چت
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
        <div className={classes.formAction}>
          {editChat && (
            <Tooltip title={editChat.archive ? "Deactive" : "Active"}>
              {editChat.archive ? (
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
          floatChat ? classes.usersSelectionFloat : classes.usersSelection
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
          {editChat ? "ویرایش چت" : "ذخیره چت"}
        </button>
      </div>
    </Fragment>
  );
}
