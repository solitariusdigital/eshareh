import { useContext, useState } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./Form.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { createUserApi } from "@/services/api";
import Image from "next/legacy/image";
import {
  fourGenerator,
  sixGenerator,
  uploadMedia,
  areAllStatesValid,
  validateEmail,
} from "@/services/utility";
import loaderImage from "@/assets/loader.png";
import AES from "crypto-js/aes";

export default function TeamForm() {
  const { language, setLanguage } = useContext(StateContext);

  const [name, setName] = useState({ en: "", fa: "" });
  const [title, setTitle] = useState({ en: "", fa: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [media, setMedia] = useState("");

  const [alert, setAlert] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [loader, setLoader] = useState(false);
  const sourceLink = "https://eshareh.storage.iran.liara.space";

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };

  const handleSubmit = async () => {
    const isValid = areAllStatesValid([name, title]);
    if (!isValid || !email || !password) {
      showAlert("همه موارد الزامیست");
      return;
    }
    if (!validateEmail(email)) {
      showAlert(language ? "ایمیل اشتباه" : "Invalid email");
      return;
    }
    if (password.length < 8) {
      showAlert(
        language
          ? "پسورد باید حداقل 8 کاراکتر باشد"
          : "Password must be minimum 8 characters"
      );
      return;
    }

    setLoader(true);
    setDisableButton(true);

    // upload media
    let mediaLink = "";
    if (media) {
      let mediaFormat = ".jpg";
      let mediaFolder = "team";
      const subFolder = `usr${sixGenerator()}`;
      let mediaId = `img${fourGenerator()}`;
      mediaLink = `${sourceLink}/${mediaFolder}/${subFolder}/${mediaId}${mediaFormat}`;
      await uploadMedia(media, mediaId, mediaFolder, subFolder, mediaFormat);
    }

    const user = {
      name: {
        fa: name.fa,
        en: name.en,
      },
      title: {
        fa: title.fa,
        en: title.en,
      },
      email: email,
      password: cryptPassword(),
      media: mediaLink,
      permission: "user",
      active: true,
    };
    await createUserApi(user);
    window.location.assign("/admin");
  };

  // encrypt password
  const cryptPassword = () => {
    return AES.encrypt(
      password.trim(),
      process.env.NEXT_PUBLIC_CRYPTO_SECRETKEY
    ).toString();
  };

  return (
    <div className={classes.form}>
      <div className={classes.formSection}>
        <div
          style={{
            fontFamily: "English",
          }}
        >
          <div className={classes.input}>
            <div className={classes.bar}>
              <p className={classes.label}>
                Name
                <span>*</span>
              </p>
              <CloseIcon
                className="icon"
                onClick={() =>
                  setName((prevData) => ({
                    ...prevData,
                    en: "",
                  }))
                }
                sx={{ fontSize: 16 }}
              />
            </div>
            <input
              style={{
                fontFamily: "English",
              }}
              type="text"
              id="nameEn"
              name="name"
              onChange={(e) =>
                setName((prevData) => ({
                  ...prevData,
                  en: e.target.value,
                }))
              }
              value={name.en}
              autoComplete="off"
            />
          </div>
          <div className={classes.input}>
            <div className={classes.bar}>
              <p className={classes.label}>
                Title
                <span>*</span>
              </p>
              <CloseIcon
                className="icon"
                onClick={() =>
                  setTitle((prevData) => ({
                    ...prevData,
                    en: "",
                  }))
                }
                sx={{ fontSize: 16 }}
              />
            </div>
            <input
              style={{
                fontFamily: "English",
              }}
              type="text"
              id="titleEn"
              name="title"
              onChange={(e) =>
                setTitle((prevData) => ({
                  ...prevData,
                  en: e.target.value,
                }))
              }
              value={title.en}
              autoComplete="off"
            />
          </div>
        </div>
        <div
          style={{
            fontFamily: "Farsi",
          }}
        >
          <div className={classes.input}>
            <div className={classes.barReverse}>
              <p className={classes.label}>
                <span>*</span>
                نام
              </p>
              <CloseIcon
                className="icon"
                onClick={() =>
                  setName((prevData) => ({
                    ...prevData,
                    fa: "",
                  }))
                }
                sx={{ fontSize: 16 }}
              />
            </div>
            <input
              style={{
                fontFamily: "Farsi",
              }}
              type="text"
              id="nameFa"
              name="name"
              onChange={(e) =>
                setName((prevData) => ({
                  ...prevData,
                  fa: e.target.value,
                }))
              }
              value={name.fa}
              autoComplete="off"
              dir="rtl"
            />
          </div>
          <div className={classes.input}>
            <div className={classes.barReverse}>
              <p className={classes.label}>
                <span>*</span>
                عنوان
              </p>
              <CloseIcon
                className="icon"
                onClick={() =>
                  setTitle((prevData) => ({
                    ...prevData,
                    fa: "",
                  }))
                }
                sx={{ fontSize: 16 }}
              />
            </div>
            <input
              style={{
                fontFamily: "Farsi",
              }}
              type="text"
              id="titleFa"
              name="title"
              onChange={(e) =>
                setTitle((prevData) => ({
                  ...prevData,
                  fa: e.target.value,
                }))
              }
              value={title.fa}
              autoComplete="off"
              dir="rtl"
            />
          </div>
        </div>
      </div>
      <div className={classes.formSection}>
        <div
          className={classes.input}
          style={{
            fontFamily: "English",
          }}
        >
          <div className={classes.bar}>
            <p className={classes.label}>
              Email
              <span>*</span>
            </p>
            <CloseIcon
              className="icon"
              onClick={() => setEmail("")}
              sx={{ fontSize: 16 }}
            />
          </div>
          <input
            style={{
              fontFamily: "English",
            }}
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            autoComplete="off"
          />
        </div>
        <div
          className={classes.input}
          style={{
            fontFamily: "English",
          }}
        >
          <div className={classes.bar}>
            <p className={classes.label}>
              Password
              <span>*</span>
            </p>
            <CloseIcon
              className="icon"
              onClick={() => setPassword("")}
              sx={{ fontSize: 16 }}
            />
          </div>
          <input
            style={{
              fontFamily: "English",
            }}
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoComplete="off"
          />
        </div>
      </div>

      <div
        className={classes.input}
        style={{
          fontFamily: "Farsi",
        }}
      >
        <label className="file">
          <input
            onChange={(e) => {
              setMedia(e.target.files[0]);
            }}
            type="file"
            accept="image/*"
          />
          <p>عکس اختیاری</p>
        </label>
        {media !== "" && (
          <div className={classes.preview}>
            <CloseIcon
              className="icon"
              onClick={() => setMedia("")}
              sx={{ fontSize: 16 }}
            />
            <Image
              className={classes.image}
              width={170}
              height={200}
              objectFit="contain"
              src={URL.createObjectURL(media)}
              alt="image"
              priority
            />
          </div>
        )}
      </div>
      <div className={classes.formAction}>
        <p className={classes.alert}>{alert}</p>
        {loader && (
          <div>
            <Image width={50} height={50} src={loaderImage} alt="isLoading" />
          </div>
        )}
        <button
          disabled={disableButton}
          style={{
            fontFamily: language ? "FarsiMedium" : "FarsiMedium",
          }}
          onClick={() => handleSubmit()}
        >
          ذخیره
        </button>
      </div>
    </div>
  );
}
