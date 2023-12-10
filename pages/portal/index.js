import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./portal.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import Router from "next/router";
import secureLocalStorage from "react-secure-storage";
import AES from "crypto-js/aes";
import { enc } from "crypto-js";
import Image from "next/legacy/image";
import portal from "@/assets/portal.png";
import { createUserApi, getUsersApi } from "@/services/api";

export default function Portal() {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { language, setLanguage } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { editSolution, setEditSolution } = useContext(StateContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const [formType, setFormType] = useState(true);

  useEffect(() => {
    navigationTopBar.map((nav, i) => {
      nav.active = false;
    });
    setNavigationTopBar([...navigationTopBar]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (permissionControl === "admin") {
      Router.push("/admin");
      setEditSolution(null);
    }
  }, [permissionControl, setEditSolution]);

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };

  const handleLogin = () => {
    if (!email || !password) {
      showAlert(
        language ? "ایمیل و پسورد الزامیست" : "Email & Password required"
      );
      return;
    }
    if (!validateEmail(email)) {
      showAlert(language ? "ایمیل اشتباه" : "Invalid email");
      return;
    }
    if (password.length < 8) {
      showAlert(
        language
          ? "رمز عبور باید 8 کاراکتر باشد"
          : "Password must be 8 characters"
      );
      return;
    }

    if (formType) {
      signinUser();
    } else {
      signupUser();
    }
  };

  // signin existing user
  const signinUser = async () => {
    const users = await getUsersApi();
    const userData = users.find((user) => user.email === email);
    if (userData) {
      if (decryptPassword(userData.password) === password) {
        setCurrentUser(userData);
        secureLocalStorage.setItem("currentUser", JSON.stringify(userData));
        if (userData.permission === "admin") {
          Router.push("/admin");
        } else {
          Router.push("/");
        }
      } else {
        showAlert(language ? "پسورد اشتباه" : "Wrong password");
      }
    } else {
      showAlert(language ? "ایمیل وجود ندارد" : "Email does not exist");
    }
  };

  // signup new user into db/state/localstorage
  const signupUser = async () => {
    const user = {
      name: "",
      email: email.trim(),
      password: cryptPassword(),
      permission: "user",
    };
    try {
      const userData = await createUserApi(user);
      if (userData.hasOwnProperty("error")) {
        showAlert("خطا در برقراری ارتباط");
      } else {
        setCurrentUser(userData);
        secureLocalStorage.setItem("currentUser", JSON.stringify(userData));
        Router.push("/");
      }
    } catch (error) {
      showAlert("خطا در برقراری ارتباط");
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
      <h1>{language ? "پرتال" : "Portal"}</h1>
      <div className={classes.background}>
        <div className={classes.gridLayout}>
          <div className={classes.form}>
            <div className={classes.input}>
              <div className={classes.bar}>
                <p
                  className={classes.label}
                  style={{
                    fontFamily: language ? "English" : "English",
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
                type="email"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                autoComplete="off"
              />
            </div>
            <div className={classes.input}>
              <div className={classes.bar}>
                <p
                  className={classes.label}
                  style={{
                    fontFamily: language ? "English" : "English",
                  }}
                >
                  {language ? "پسورد" : "Password"}
                </p>
                <CloseIcon
                  className="icon"
                  onClick={() => setPassword("")}
                  sx={{ fontSize: 16 }}
                />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                autoComplete="off"
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
                {formType ? (
                  <>{language ? "ورود" : "Sign in"}</>
                ) : (
                  <>{language ? "ثبت نام" : "Sign up"}</>
                )}
              </button>
              <div
                className={classes.create}
                onClick={() => setFormType(!formType)}
              >
                {formType ? (
                  <>{language ? "ایجاد حساب کاربری" : "Create an account"}</>
                ) : (
                  <>{language ? "حساب کاربری دارم" : "Have an account"}</>
                )}
              </div>
            </div>
          </div>
          <div className={classes.image}>
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
    </div>
  );
}
