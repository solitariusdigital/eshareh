import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./login.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import Router from "next/router";
import AES from "crypto-js/aes";
import { enc } from "crypto-js";

export default function Login() {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { language, setLanguage } = useContext(StateContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");

  useEffect(() => {
    if (currentUser) {
      Router.push("/");
    }
  }, [currentUser]);

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
      showAlert("ایمیل و پسورد الزامیست");
      return;
    }
    if (!validateEmail(email)) {
      showAlert("ایمیل اشتباه");
      return;
    }

    // Encrypt
    const cryptedPassword = AES.encrypt(
      password,
      process.env.NEXT_PUBLIC_CRYPTO_SECRETKEY
    ).toString();
    console.log(cryptedPassword);
    // Decrypt
    const decryptedBytes = AES.decrypt(
      cryptedPassword,
      process.env.NEXT_PUBLIC_CRYPTO_SECRETKEY
    );
    const decryptedPassword = decryptedBytes.toString(enc.Utf8);
    console.log(decryptedPassword);
  };

  return (
    <div className={classes.container}>
      <div className={classes.input}>
        <div className={classes.bar}>
          <p
            className={classes.label}
            style={{
              fontFamily: language ? "English" : "English",
            }}
          >
            <span>*</span>
            Email
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
            <span>*</span>
            Password
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
        <p className="alert">{alert}</p>
        <button onClick={() => handleLogin()}>Login</button>
      </div>
    </div>
  );
}
