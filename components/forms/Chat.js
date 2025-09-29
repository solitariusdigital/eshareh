import { Fragment, useContext, useState, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import classes from "./Form.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { getUsersApi } from "@/services/api";
import { applyFontToEnglishWords } from "@/services/utility";

export default function Chat() {
  const { languageType, setLanguageType } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);

  const [title, setTitle] = useState("");
  const [users, setUsers] = useState([]);
  const [disableButton, setDisableButton] = useState(false);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getUsersApi();
        let addSelectOption = users.map((user) => ({
          ...user,
          selection: false,
        }));
        setUsers(addSelectOption);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
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
    if (!title) {
      showAlert("موارد ستاره‌دار الزامیست");
      return;
    }

    setDisableButton(true);

    // router.reload(router.asPath);
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
        <div className={classes.formAction}>
          <p className={classes.label}>انتخاب اعضای گروه چت جدید</p>
          {permissionControl === "admin" && (
            <button
              disabled={disableButton}
              style={{
                fontFamily: "FarsiMedium",
              }}
              onClick={() => selectAllUsers()}
            >
              انتخاب همه
            </button>
          )}
        </div>
      </div>
      <div className={classes.usersForm}>
        {users?.map((user, index) => {
          return (
            <div
              key={index}
              className={classes.row}
              onClick={() => handleUserSelection(index, !user.selection)}
            >
              <div>
                <h3>{user.name[languageType]}</h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: applyFontToEnglishWords(
                      user["title"][languageType],
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
          ایجاد چت
        </button>
      </div>
    </Fragment>
  );
}
