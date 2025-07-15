import { useState, useContext, useEffect, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./login.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import Router from "next/router";
import secureLocalStorage from "react-secure-storage";
import AES from "crypto-js/aes";
import { enc } from "crypto-js";
import Image from "next/legacy/image";
import portal from "@/assets/portal.png";
import { getUsersApi } from "@/services/api";
import { validateEmail } from "@/services/utility";

export default function Login() {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { language, setLanguage } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { editSolution, setEditSolution } = useContext(StateContext);
  const [displayForm, setDisplayForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");

  useEffect(() => {
    if (currentUser) {
      Router.push("/portal");
    } else {
      setDisplayForm(true);
    }
  }, [currentUser]);

  useEffect(() => {
    if (permissionControl === "admin") {
      setEditSolution(null);
    }
  }, [permissionControl, setEditSolution]);

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

  const handleLogin = () => {
    if (!email || !password) {
      showAlert(
        language ? "ایمیل و رمز عبور الزامیست" : "Email & Password are required"
      );
      return;
    }
    if (!validateEmail(email)) {
      showAlert(language ? "ایمیل نامعتبر" : "Invalid email");
      return;
    }
    if (password.length < 8) {
      showAlert(
        language
          ? "رمز عبور باید حداقل 8 کاراکتر باشد"
          : "Password must be minimum 8 characters"
      );
      return;
    }
    signinUser();
  };

  // signin existing user
  const signinUser = async () => {
    const users = await getUsersApi();
    const userData = users.find((user) => user.email === email);
    if (userData) {
      if (decryptPassword(userData.password) === password) {
        setCurrentUser(userData);
        secureLocalStorage.setItem("currentUser", JSON.stringify(userData));
        Router.push("/portal");
      } else {
        showAlert(language ? "رمز عبور اشتباه" : "Wrong password");
      }
    } else {
      showAlert(language ? "ایمیل وجود ندارد" : "Email does not exist");
    }
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
    <Fragment>
      {displayForm && (
        <div className={classes.container}>
          <div
            className={
              language ? classes.gridLayout : classes.gridLayoutReverse
            }
          >
            <h1>{language ? "پورتال" : "Portal"}</h1>
            <div className={classes.form}>
              <div className={classes.input}>
                <div className={classes.bar}>
                  <p
                    className={classes.label}
                    style={{
                      fontFamily: language ? "Farsi" : "English",
                    }}
                  >
                    {language ? "ایمیل" : "Email"}
                  </p>
                  <CloseIcon
                    className="icon"
                    onClick={() => setEmail("")}
                    sx={{ fontSize: 16 }}
                  />
                </div>
                <input
                  style={{
                    fontFamily: language ? "English" : "English",
                  }}
                  type="email"
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  autoComplete="off"
                  dir="ltr"
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
                    {language ? "رمز عبور" : "Password"}
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
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  autoComplete="off"
                  dir="ltr"
                />
              </div>
              <div className={classes.formAction}>
                <p
                  className={classes.alert}
                  style={{
                    fontFamily: language ? "Farsi" : "English",
                  }}
                >
                  {alert}
                </p>
                <button
                  onClick={() => handleLogin()}
                  style={{
                    fontFamily: language ? "FarsiBold" : "EnglishMedium",
                  }}
                >
                  <>{language ? "ورود" : "Sign in"}</>
                </button>
              </div>
            </div>
            <div className={classes.imageBox}>
              <Image
                src={portal}
                blurDataURL={portal}
                placeholder="blur"
                alt="image"
                layout="responsive"
                objectFit="contain"
                as="image"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
