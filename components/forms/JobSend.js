import { Fragment, useContext, useState } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./Form.module.scss";
import Image from "next/legacy/image";
import loaderImage from "@/assets/loader.png";
import dot from "@/assets/dot.png";
import CloseIcon from "@mui/icons-material/Close";
import {
  fourGenerator,
  uploadMedia,
  toEnglishNumber,
  validateEmail,
  isEnglishNumber,
} from "@/services/utility";
import { createResumeApi } from "@/services/api";

export default function JobSend({ jobsId }) {
  const { language, setLanguage } = useContext(StateContext);
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState("");
  const [fileName, setFileName] = useState("");
  const [alert, setAlert] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [loader, setLoader] = useState(false);
  const [resumeRecieved, setResumeRecieved] = useState(false);
  const sourceLink = "https://eshareh.storage.iran.liara.space";

  const handleFileChange = (event) => {
    setMedia(event);
    const file = event;
    if (file && file.type === "application/pdf") {
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  const resetFileSelect = () => {
    const inputFile = document.getElementById("inputFile");
    inputFile.value = null;
    setMedia("");
    setFileName("");
  };

  const checkFormValidity = () => {
    if (!name || !birth || !phone || !email || !description) {
      showAlert(language ? "همه موارد الزامیست" : "All fields are required");
      return;
    }
    if (!validateEmail(email)) {
      showAlert(language ? "ایمیل اشتباه" : "Invalid email");
      return;
    }
    if (!media) {
      showAlert(language ? "انتخاب فایل" : "Select a file");
      return;
    }
    const maxSizeInBytes = 5 * 1024 * 1024;
    if (media.size > maxSizeInBytes) {
      showAlert(
        language ? "حداکثر حجم فایل 5 مگابایت" : "Max file size is 5MB"
      );
      const inputFile = document.getElementById("inputFile");
      inputFile.value = null;
      return;
    }
    let phoneEnglish = isEnglishNumber(phone) ? phone : toEnglishNumber(phone);
    if (phoneEnglish.length === 11 && phoneEnglish.startsWith("09")) {
      submitResume(phoneEnglish);
    } else {
      showAlert(language ? "موبایل اشتباه" : "Invalid phone");
    }
  };

  const submitResume = async (phoneEnglish) => {
    setDisableButton(true);
    setLoader(true);
    setResumeRecieved(false);

    let mediaLink = "";
    let mediaFolder = "jobs";
    let format = ".pdf";
    let mediaId = `jobs${fourGenerator()}`;
    mediaLink = `${sourceLink}/${mediaFolder}/${jobsId}/${mediaId}${format}`;
    await uploadMedia(media, mediaId, mediaFolder, jobsId, format);

    const resumeObject = {
      name: name.trim(),
      birth: birth.trim(),
      phone: phoneEnglish,
      email: email.trim(),
      description: description.trim(),
      media: mediaLink,
      jobsId: jobsId,
      accepted: false,
      rejected: false,
    };

    await createResumeApi(resumeObject);

    setName("");
    setBirth("");
    setPhone("");
    setEmail("");
    setDescription("");
    setMedia("");
    resetFileSelect();
    setDisableButton(false);
    setLoader(false);
    setResumeRecieved(true);
  };

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };

  return (
    <Fragment>
      <div className={classes.container} style={{ margin: "0px" }}>
        <div
          className={classes.form}
          style={{
            fontFamily: language ? "Farsi" : "English",
          }}
        >
          <div className={classes.input}>
            <div className={classes.bar}>
              <p className={classes.label}>
                {language ? "نام کامل" : "Full Name"}
                <span>*</span>
              </p>
              <CloseIcon
                className="icon"
                onClick={() => setName("")}
                sx={{ fontSize: 16 }}
              />
            </div>
            <input
              style={{
                fontFamily: language ? "Farsi" : "English",
              }}
              placeholder="..."
              type="text"
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              autoComplete="off"
            ></input>
          </div>
          <div className={classes.input}>
            <div className={classes.bar}>
              <p
                className={classes.label}
                style={{
                  fontFamily: language ? "Farsi" : "English",
                }}
              >
                {language ? "ایمیل" : "Email"}
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
        </div>
        <div
          className={classes.form}
          style={{
            fontFamily: language ? "Farsi" : "English",
          }}
        >
          <div className={classes.input}>
            <div className={classes.bar}>
              <p className={classes.label}>
                {language ? "تاریخ تولد" : "Date of Birth"}
                <span>*</span>
              </p>
              <CloseIcon
                className="icon"
                onClick={() => setBirth("")}
                sx={{ fontSize: 16 }}
              />
            </div>
            <input
              style={{
                fontFamily: language ? "English" : "English",
              }}
              placeholder="dd/mm/yyyy"
              type="text"
              id="birth"
              name="birth"
              onChange={(e) => setBirth(e.target.value)}
              value={birth}
              autoComplete="off"
              dir="ltr"
            ></input>
          </div>
          <div className={classes.input}>
            <div className={classes.bar}>
              <p className={classes.label}>
                {language ? "تماس" : "Phone"}
                <span>*</span>
              </p>
              <CloseIcon
                className="icon"
                onClick={() => setPhone("")}
                sx={{ fontSize: 16 }}
              />
            </div>
            <input
              style={{
                fontFamily: language ? "Farsi" : "English",
              }}
              placeholder="09123456789"
              type="tel"
              id="phone"
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              autoComplete="off"
              maxLength={11}
            ></input>
          </div>
        </div>
      </div>
      <div className={classes.form}>
        <div className={classes.inputTextArea}>
          <div className={classes.bar}>
            <p className={classes.label}>
              {language ? "درباره من" : "About Me"}
              <span>*</span>
            </p>
            <CloseIcon
              className="icon"
              onClick={() => setDescription("")}
              sx={{ fontSize: 16 }}
            />
          </div>
          <textarea
            style={{
              fontFamily: language ? "Farsi" : "English",
            }}
            placeholder="..."
            type="text"
            id="description"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            autoComplete="off"
          ></textarea>
        </div>
      </div>
      <div
        className={classes.formAction}
        style={{
          fontFamily: "English",
        }}
      >
        <p
          style={{
            fontFamily: language ? "Farsi" : "English",
          }}
          className={language ? classes.resume : classes.resumeReverse}
        >
          {language ? "رزومه / نمونه کار" : "Resume / Portfolio"}
        </p>
        <div className={classes.row}>
          <p
            className={language ? classes.resume : classes.resumeReverse}
            style={{
              fontFamily: language ? "English" : "English",
            }}
          >
            {fileName}
          </p>
          {media && (
            <CloseIcon
              className="icon"
              onClick={() => resetFileSelect()}
              sx={{ fontSize: 16 }}
            />
          )}
        </div>
        <div className={classes.row}>
          <div className={classes.input}>
            <label className={`file ${classes.file}`}>
              <input
                onChange={(e) => {
                  handleFileChange(e.target.files[0]);
                }}
                id="inputFile"
                type="file"
                accept=".pdf"
              />
              <p
                style={{
                  fontFamily: language ? "FarsiMedium" : "EnglishMedium",
                }}
              >
                {language ? "انتخاب فایل" : "Select a file"}
              </p>
            </label>
          </div>
          <button
            disabled={disableButton}
            style={{
              fontFamily: language ? "FarsiMedium" : "EnglishMedium",
            }}
            onClick={() => checkFormValidity()}
          >
            {language ? "ارسال" : "Submit"}
          </button>
        </div>
        {resumeRecieved && (
          <div
            className={classes.resumeRecieved}
            style={{
              fontFamily: language ? "FarsiMedium" : "English",
            }}
          >
            <Image width={50} height={50} src={dot} alt="isLoading" />
            <h3>
              {language
                ? "ما رزومه شما را دریافت کردیم، با تشکر"
                : "We recieved your resume, Thank you"}
            </h3>
          </div>
        )}
        <p
          className={classes.alert}
          style={{
            fontFamily: language ? "Farsi" : "English",
          }}
        >
          {alert}
        </p>
        {loader && (
          <div
            style={{
              fontFamily: language ? "Farsi" : "English",
            }}
          >
            <p>
              {language
                ? "در حال آپلود، لطفا صبر کنید"
                : "Uploading, please wait"}
            </p>
            <Image width={50} height={50} src={loaderImage} alt="isLoading" />
          </div>
        )}
      </div>
    </Fragment>
  );
}
