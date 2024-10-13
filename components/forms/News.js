import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import classes from "./Form.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { createNewsApi } from "@/services/api";
import Image from "next/legacy/image";
import loaderImage from "@/assets/loader.png";
import {
  areAllStatesValid,
  extractParagraphs,
  fourGenerator,
  uploadMedia,
} from "@/services/utility";
import building from "@/assets/building.png";

export default function News({ pages, mediaData }) {
  const [title, setTitle] = useState({ en: "", fa: "" });
  const [paragraph, setParagraph] = useState({ en: "", fa: "" });
  const [alert, setAlert] = useState("");
  const [mediaType, setMediaType] = useState("image" || "gif");
  const [media, setMedia] = useState("");
  const [loader, setLoader] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const sourceLink = "https://eshareh.storage.iran.liara.space";
  const router = useRouter();
  const [development, setDevelopment] = useState(false);

  const handleSubmit = async () => {
    const isValid = areAllStatesValid([title, paragraph]);

    if (!isValid || !media) {
      showAlert("همه موارد الزامیست");
      return;
    }

    setLoader(true);
    setDisableButton(true);

    let mediaLink = "";
    let mediaFormat = mediaType === "image" ? ".jpg" : ".gif";
    let mediaFolder = "news";
    const subFolder = `news${sixGenerator()}`;
    let mediaId = `img${fourGenerator()}`;
    mediaLink = `${sourceLink}/${mediaFolder}/${subFolder}/${mediaId}${mediaFormat}`;
    await uploadMedia(media, mediaId, mediaFolder, subFolder, mediaFormat);

    const newsObject = {
      fa: {
        title: title.fa,
        paragraph: paragraph.fa,
      },
      en: {
        title: title.en,
        paragraph: paragraph.en,
      },
      media: mediaLink,
      active: false,
    };
    await createNewsApi(newsObject);
    showAlert("ذخیره شد");
    router.reload(router.asPath);
  };

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };

  return (
    <Fragment>
      {!development ? (
        <div className={classes.container}>
          <div
            className={classes.form}
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
                placeholder="..."
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
              ></input>
            </div>
            <div className={classes.inputTextArea}>
              <div className={classes.bar}>
                <p className={classes.label}>
                  Paragraph
                  <span>*</span>
                </p>
                <CloseIcon
                  className="icon"
                  onClick={() =>
                    setParagraph((prevData) => ({
                      ...prevData,
                      en: "",
                    }))
                  }
                  sx={{ fontSize: 16 }}
                />
              </div>
              <textarea
                style={{
                  fontFamily: "English",
                }}
                placeholder="..."
                type="text"
                id="paragraphEn"
                name="paragraph"
                onChange={(e) =>
                  setParagraph((prevData) => ({
                    ...prevData,
                    en: e.target.value,
                  }))
                }
                value={paragraph.en}
                autoComplete="off"
              ></textarea>
            </div>
          </div>
          <div
            className={classes.form}
            style={{
              fontFamily: "Farsi",
            }}
          >
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
                placeholder="..."
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
              ></input>
            </div>
            <div className={classes.inputTextArea}>
              <div className={classes.barReverse}>
                <p className={classes.label}>
                  <span>*</span>
                  پاراگراف
                </p>
                <CloseIcon
                  className="icon"
                  onClick={() =>
                    setParagraph((prevData) => ({
                      ...prevData,
                      fa: "",
                    }))
                  }
                  sx={{ fontSize: 16 }}
                />
              </div>
              <textarea
                style={{
                  fontFamily: "Farsi",
                }}
                placeholder="..."
                type="text"
                id="paragraphFa"
                name="paragraph"
                onChange={(e) =>
                  setParagraph((prevData) => ({
                    ...prevData,
                    fa: e.target.value,
                  }))
                }
                value={paragraph.fa}
                autoComplete="off"
                dir="rtl"
              ></textarea>
            </div>
          </div>
          <div
            className={classes.formAction}
            style={{
              fontFamily: "English",
            }}
          >
            <div className={classes.navigation}>
              <p
                className={
                  mediaType === "gif" ? classes.navActive : classes.nav
                }
                onClick={() => {
                  setMediaType("gif");
                  setMedia("");
                }}
              >
                gif
              </p>
              <p
                className={
                  mediaType === "image" ? classes.navActive : classes.nav
                }
                onClick={() => {
                  setMediaType("image");
                  setMedia("");
                }}
              >
                عکس
              </p>
            </div>
            <div
              className={classes.input}
              style={{
                fontFamily: `${mediaType === "image" ? "Farsi" : "English"}`,
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
                <p>{mediaType === "image" ? "عکس" : "gif"}</p>
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
                <Image
                  width={50}
                  height={50}
                  src={loaderImage}
                  alt="isLoading"
                />
              </div>
            )}
            <button
              disabled={disableButton}
              style={{
                fontFamily: "FarsiMedium",
              }}
              onClick={() => handleSubmit()}
            >
              ذخیره داده
            </button>
          </div>
        </div>
      ) : (
        <div className={classes.building}>
          <Image
            width={50}
            height={50}
            src={building}
            alt="building"
            as="image"
            unoptimized
          />
        </div>
      )}
    </Fragment>
  );
}
