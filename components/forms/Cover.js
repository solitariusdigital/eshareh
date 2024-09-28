import { useState } from "react";
import classes from "./Form.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { createCoverApi } from "@/services/api";
import Image from "next/legacy/image";
import loaderImage from "@/assets/loader.png";
import {
  fourGenerator,
  sixGenerator,
  uploadMedia,
  areAllStatesValid,
} from "@/services/utility";

export default function Cover() {
  const [title, setTitle] = useState({ en: "", fa: "" });
  const [media, setMedia] = useState("");
  const [link, setLink] = useState("");
  const [color, setColor] = useState("");
  const [mediaType, setMediaType] = useState("image" || "video");

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
    const isValid = areAllStatesValid([title]);
    if (!isValid || !color || !media) {
      showAlert("همه موارد الزامیست");
      return;
    }

    setLoader(true);
    setDisableButton(true);

    // upload media
    let mediaLink = "";
    if (media) {
      let mediaFormat = mediaType === "image" ? ".jpg" : ".mp4";
      let mediaFolder = "cover";
      const subFolder = `cov${sixGenerator()}`;
      let mediaId = `img${fourGenerator()}`;
      mediaLink = `${sourceLink}/${mediaFolder}/${subFolder}/${mediaId}${mediaFormat}`;
      await uploadMedia(media, mediaId, mediaFolder, subFolder, mediaFormat);
    }

    const cover = {
      title: {
        fa: title.fa,
        en: title.en,
      },
      coverMedia: {
        link: mediaLink,
        type: mediaType,
      },
      link: link,
      color: color,
      active: false,
      text: false,
    };
    await createCoverApi(cover);
    window.location.assign("/admin");
  };

  return (
    <div className={classes.container}>
      <div className={classes.form}>
        <div
          style={{
            fontFamily: "English",
          }}
        >
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
          <div className={classes.input}>
            <div className={classes.bar}>
              <p className={classes.label}>Link</p>
              <CloseIcon
                className="icon"
                onClick={() => setLink("")}
                sx={{ fontSize: 16 }}
              />
            </div>
            <input
              style={{
                fontFamily: "English",
              }}
              type="text"
              id="link"
              name="link"
              onChange={(e) => setLink(e.target.value)}
              value={link}
              autoComplete="off"
            />
          </div>
        </div>
      </div>
      <div className={classes.form}>
        <div>
          <div
            className={classes.input}
            style={{
              fontFamily: "Farsi",
            }}
          >
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
          <div
            className={classes.input}
            style={{
              fontFamily: "English",
            }}
          >
            <div className={classes.bar}>
              <p className={classes.label}>
                Hex color code
                <span>*</span>
              </p>
              <CloseIcon
                className="icon"
                onClick={() => setColor("")}
                sx={{ fontSize: 16 }}
              />
            </div>
            <input
              style={{
                fontFamily: "English",
              }}
              type="text"
              placeholder="fdb714"
              id="color"
              name="color"
              onChange={(e) => setColor(e.target.value)}
              value={color}
              autoComplete="off"
              maxLength={6}
            />
          </div>
        </div>
      </div>
      <div className={classes.formAction}>
        <div
          className={classes.navigation}
          style={{
            fontFamily: "Farsi",
          }}
        >
          <p
            className={mediaType === "video" ? classes.navActive : classes.nav}
            onClick={() => {
              setMediaType("video");
              setMedia("");
            }}
          >
            ویدئو
          </p>
          <p
            className={mediaType === "image" ? classes.navActive : classes.nav}
            onClick={() => {
              setMediaType("image");
              setMedia("");
            }}
          >
            عکس
          </p>
        </div>
        {mediaType === "image" && (
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
              <p>عکس</p>
            </label>
            {media !== "" && (
              <div className={classes.preview}>
                <CloseIcon
                  className="icon"
                  onClick={() => setMedia("")}
                  sx={{ fontSize: 16 }}
                />
                <Image
                  className={classes.media}
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
        )}
        {mediaType === "video" && (
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
                accept="video/*"
              />
              <p>ویدئو</p>
            </label>
            {media !== "" && (
              <div className={classes.preview}>
                <CloseIcon
                  className="icon"
                  onClick={() => setMedia("")}
                  sx={{ fontSize: 16 }}
                />
                <video
                  className={classes.media}
                  preload="metadata"
                  src={URL.createObjectURL(media)}
                  controls
                />
              </div>
            )}
          </div>
        )}
        <p
          className={classes.alert}
          style={{
            fontFamily: "Farsi",
          }}
        >
          {alert}
        </p>
        {loader && (
          <div>
            <Image width={50} height={50} src={loaderImage} alt="isLoading" />
          </div>
        )}
        <button
          disabled={disableButton}
          style={{
            fontFamily: "FarsiMedium",
          }}
          onClick={() => handleSubmit()}
        >
          ذخیره
        </button>
      </div>
    </div>
  );
}
