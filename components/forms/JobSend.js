import { Fragment, useContext, useState } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import classes from "./Form.module.scss";
import Image from "next/legacy/image";
import loaderImage from "@/assets/loader.png";
import dot from "@/assets/dot.png";
import CloseIcon from "@mui/icons-material/Close";
import {
  fourGenerator,
  uploadMedia,
  toEnglishNumber,
  toFarsiNumber,
  validateEmail,
  isValidDateFormat,
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
  const router = useRouter();
  const maxWords = 150;

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

  const handleDescriptionChange = (e) => {
    const inputText = e.target.value;
    const wordCount = inputText.trim()
      ? inputText.trim().split(/\s+/).length
      : 0;

    if (wordCount <= maxWords) {
      setDescription(inputText);
    }
  };
  const currentWordCount = description.trim()
    ? description.trim().split(/\s+/).length
    : 0;
  const remainingWords = maxWords - currentWordCount;

  const checkFormValidity = () => {
    if (!name || !birth || !phone || !email || !description) {
      showAlert("موارد ستاره‌دار الزامیست");
      return;
    }
    if (!isValidDateFormat(birth)) {
      showAlert("تاریخ تولد نامعتبر");
      return;
    }
    if (!validateEmail(email)) {
      showAlert("ایمیل نامعتبر");
      return;
    }
    if (!media) {
      showAlert("انتخاب فایل");
      return;
    }
    const maxSizeInBytes = 5 * 1024 * 1024;
    if (media.size > maxSizeInBytes) {
      showAlert("حداکثر حجم فایل 5 مگابایت");
      const inputFile = document.getElementById("inputFile");
      inputFile.value = null;
      return;
    }
    let phoneEnglish = isEnglishNumber(phone) ? phone : toEnglishNumber(phone);
    if (phoneEnglish.length === 11 && phoneEnglish.startsWith("09")) {
      submitResume(phoneEnglish);
    } else {
      showAlert("موبایل اشتباه");
    }
  };

  const submitResume = async (phoneEnglish) => {
    setDisableButton(true);
    setLoader(true);

    let mediaFolder = "res";
    let format = ".pdf";
    let mediaId = `res${fourGenerator()}`;
    let mediaLink = `${sourceLink}/${mediaFolder}/${jobsId}/${mediaId}${format}`;
    await uploadMedia(media, mediaId, mediaFolder, jobsId, format);

    const resumeObject = {
      name: name.trim(),
      birth: birth.trim(),
      phone: phoneEnglish,
      email: email.trim(),
      description: description.trim(),
      media: mediaLink,
      jobsId: jobsId,
      status: "",
    };

    await createResumeApi(resumeObject);
    setLoader(false);
    setResumeRecieved(true);
    setTimeout(() => {
      router.reload(router.asPath);
    }, 3000);
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
          className={classes.formJobSend}
          style={{
            fontFamily: language ? "Farsi" : "Farsi",
          }}
        >
          <div className={classes.input}>
            <div className={classes.bar}>
              <p className={classes.label}>
                نام کامل
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
                fontFamily: language ? "Farsi" : "Farsi",
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
              <p className={classes.label}>
                ایمیل
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
              placeholder="..."
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
        <div className={classes.formJobSend}>
          <div className={classes.input}>
            <div className={classes.bar}>
              <p className={classes.label}>
                تاریخ تولد
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
                موبایل
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
                fontFamily: language ? "English" : "English",
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
      <div className={classes.formJobSend}>
        <div className={classes.inputTextArea}>
          <div className={classes.bar}>
            <p className={classes.label}>
              درباره من
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
              fontFamily: language ? "Farsi" : "Farsi",
            }}
            placeholder="..."
            type="text"
            id="description"
            name="description"
            onChange={handleDescriptionChange}
            value={description}
            autoComplete="off"
            maxLength={maxWords * 5}
          ></textarea>
        </div>
        <p>{toFarsiNumber(remainingWords)}</p>
      </div>
      <div className={classes.formAction}>
        <p className={classes.resume}>
          رزومه / پورتفولیو
          <span>*</span>
        </p>
        <div className={classes.row}>
          <p
            className={classes.resume}
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
          <label className={classes.file}>
            <input
              onChange={(e) => {
                handleFileChange(e.target.files[0]);
              }}
              id="inputFile"
              type="file"
              accept=".pdf"
            />
            <p
              className={classes.label}
              style={{
                fontFamily: language ? "FarsiMedium" : "FarsiMedium",
              }}
            >
              بارگذاری
            </p>
          </label>
          <button
            disabled={disableButton}
            style={{
              fontFamily: language ? "FarsiMedium" : "FarsiMedium",
            }}
            onClick={() => checkFormValidity()}
          >
            تایید
          </button>
        </div>
        <p
          className={classes.alert}
          style={{
            fontFamily: language ? "Farsi" : "Farsi",
          }}
        >
          {alert}
        </p>
        {loader && (
          <div>
            <p>در حال بارگذاری، لطفا صبر کنید</p>
            <Image width={50} height={50} src={loaderImage} alt="isLoading" />
          </div>
        )}
        {resumeRecieved && (
          <div
            className={classes.resumeRecieved}
            style={{
              fontFamily: language ? "FarsiMedium" : "FarsiMedium",
            }}
          >
            <Image width={50} height={50} src={dot} alt="isLoading" />
            <h3>
              ما درخواست شما را دریافت کرده‌ایم. از اینکه به‌عنوان گام بعدی شغلی
              خود اشاره را در نظر می‌گیرید سپاسگزاریم.
            </h3>
          </div>
        )}
      </div>
    </Fragment>
  );
}
