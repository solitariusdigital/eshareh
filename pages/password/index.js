import { useState, useContext, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./password.module.scss";
import Router from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getSingleUserApi, updateUserApi } from "@/services/api";
import secureLocalStorage from "react-secure-storage";
import AES from "crypto-js/aes";
import { enc } from "crypto-js";

export default function Password() {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { language, setLanguage } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const [visibility, setVisibility] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");

  useEffect(() => {
    if (!currentUser) {
      Router.push("/");
    }
  }, [currentUser]);

  useEffect(() => {
    navigationTopBar.map((nav, i) => {
      nav.active = false;
    });
    setNavigationTopBar([...navigationTopBar]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };

  const handleChange = async () => {
    if (!password || !oldPassword) {
      showAlert(
        language
          ? "رمز عبور قدیم و جدید الزامیست"
          : "Old & new passwords are required"
      );
      return;
    }
    if (password.length < 8) {
      showAlert(
        language
          ? "رمز عبور جدید باید حداقل 8 کاراکتر باشد"
          : "New password must be minimum 8 characters"
      );
      return;
    }
    const userData = await getSingleUserApi(currentUser["_id"]);
    if (decryptPassword(userData.password) === oldPassword) {
      const user = {
        ...currentUser,
        password: cryptPassword(),
      };
      await updateUserApi(user);
      window.location.assign("/portal");
      secureLocalStorage.removeItem("currentUser");
      setCurrentUser(null);
    } else {
      showAlert(language ? "رمز عبور قدیم اشتباه" : "Old password is wrong");
    }
  };

  // encrypt password
  const cryptPassword = () => {
    return AES.encrypt(
      password.trim(),
      process.env.NEXT_PUBLIC_CRYPTO_SECRETKEY
    ).toString();
  };

  // dencrypt password
  const decryptPassword = (password) => {
    let decryptedBytes = AES.decrypt(
      password,
      process.env.NEXT_PUBLIC_CRYPTO_SECRETKEY
    );
    return decryptedBytes.toString(enc.Utf8);
  };

  return (
    <div className={classes.container}>
      {visibility ? (
        <VisibilityOffIcon
          className="icon"
          onClick={() => setVisibility(false)}
        />
      ) : (
        <VisibilityIcon className="icon" onClick={() => setVisibility(true)} />
      )}
      <div className={classes.input}>
        <div className={classes.bar}>
          <p
            className={classes.label}
            style={{
              fontFamily: language ? "Farsi" : "English",
            }}
          >
            {language ? "رمز عبور قدیم" : "Old Password"}
          </p>
          <CloseIcon
            className="icon"
            onClick={() => setOldPassword("")}
            sx={{ fontSize: 16 }}
          />
        </div>
        <input
          style={{
            fontFamily: language ? "English" : "English",
          }}
          type={visibility ? "text" : "password"}
          id="oldPassword"
          name="oldPassword"
          onChange={(e) => setOldPassword(e.target.value)}
          value={oldPassword}
          autoComplete="off"
        />
      </div>
      <div className={classes.input}>
        <div className={classes.bar}>
          <p
            className={classes.label}
            style={{
              fontFamily: language ? "Farsi" : "English",
            }}
          >
            {language ? "رمز عبور جدید" : "New Password"}
          </p>
          <CloseIcon
            className="icon"
            onClick={() => setPassword("")}
            sx={{ fontSize: 16 }}
          />
        </div>
        <input
          style={{
            fontFamily: language ? "English" : "English",
          }}
          type={visibility ? "text" : "password"}
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          autoComplete="off"
        />
      </div>
      <p
        className={classes.alert}
        style={{
          fontFamily: language ? "Farsi" : "English",
        }}
      >
        {alert}
      </p>
      <button
        onClick={() => handleChange()}
        style={{
          fontFamily: language ? "FarsiBold" : "EnglishMedium",
        }}
      >
        {language ? "ذخیره" : "Save"}
      </button>
    </div>
  );
}
