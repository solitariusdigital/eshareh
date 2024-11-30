import { Fragment, useContext, useState, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import classes from "./Form.module.scss";
import CloseIcon from "@mui/icons-material/Close";

export default function SendJob() {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [alert, setAlert] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [loader, setLoader] = useState(false);
  const [media, setMedia] = useState("");

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
          <div className={classes.input}>
            <label className={`file ${classes.file}`}>
              <input
                onChange={(e) => {
                  setMedia(e.target.files[0]);
                }}
                type="file"
                accept=".pdf"
              />
              <p
                style={{
                  fontFamily: language ? "FarsiMedium" : "EnglishMedium",
                }}
              >
                {language ? "انتخاب فایل" : "Upload"}
              </p>
            </label>
          </div>
          <button
            disabled={disableButton}
            style={{
              fontFamily: language ? "FarsiMedium" : "EnglishMedium",
            }}
            onClick={() => updateAboutContent()}
          >
            {language ? "ارسال" : "Submit"}
          </button>
        </div>
        <p
          className={classes.alert}
          style={{
            fontFamily: "Farsi",
          }}
        >
          {alert}
        </p>
        {media !== "" && (
          <div className={classes.mediaPreview}>
            <CloseIcon
              className="icon"
              onClick={() => setMedia("")}
              sx={{ fontSize: 16 }}
            />
            <embed
              className={classes.media}
              src={URL.createObjectURL(media)}
              height="300px"
              type="application/pdf"
            />
          </div>
        )}
      </div>
    </Fragment>
  );
}
