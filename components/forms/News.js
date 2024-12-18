import { Fragment, useContext, useState } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import classes from "./Form.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { createNewsApi, updateNewsApi } from "@/services/api";
import Image from "next/legacy/image";
import loaderImage from "@/assets/loader.png";
import {
  areAllStatesValid,
  extractParagraphs,
  fourGenerator,
  sixGenerator,
  uploadMedia,
  toFarsiNumber,
  isValidDateFormat,
} from "@/services/utility";
const jalaali = require("jalali-date");

export default function News() {
  const { editNews, setEditNews } = useContext(StateContext);
  const [title, setTitle] = useState(
    editNews
      ? { en: editNews.en.title, fa: editNews.fa.title }
      : { en: "", fa: "" }
  );
  const [subtitle, setSubtitle] = useState(
    editNews
      ? { en: editNews.en.subtitle, fa: editNews.fa.subtitle }
      : { en: "", fa: "" }
  );
  const [paragraph, setParagraph] = useState(
    editNews
      ? { en: editNews.en.paragraph, fa: editNews.fa.paragraph }
      : { en: "", fa: "" }
  );
  const [dateString, setDateString] = useState(
    editNews ? editNews.dateString : ""
  );
  const [alert, setAlert] = useState("");
  const [loader, setLoader] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const sourceLink = "https://eshareh.storage.iran.liara.space";
  const router = useRouter();

  const [imagesPreview, setImagesPreview] = useState([]);
  const [videosPreview, setVideosPreview] = useState([]);
  const [voicesPreview, setVoicesPreview] = useState([]);
  const [uploadImages, setUploadImages] = useState([]);
  const [uploadVideos, setUploadVideos] = useState([]);
  const [uploadVoices, setUploadVoices] = useState([]);

  const handleImageChange = (event) => {
    const array = Array.from(event.target.files);
    setUploadImages(array);
    setImagesPreview(
      array.map((item) => ({
        file: item,
        link: URL.createObjectURL(item),
      }))
    );
  };
  const handleVideoChange = (event) => {
    const array = Array.from(event.target.files);
    setUploadVideos(array);
    setVideosPreview(
      array.map((item) => ({
        file: item,
        link: URL.createObjectURL(item),
      }))
    );
  };
  const handleVoiceChange = (event) => {
    const array = Array.from(event.target.files);
    setUploadVoices(array);
    setVoicesPreview(
      array.map((item) => ({
        file: item,
        link: URL.createObjectURL(item),
      }))
    );
  };

  const removeImageInputFile = () => {
    const input = document.getElementById("inputImage");
    input.value = null;
  };
  const removeVideoInputFile = () => {
    const input = document.getElementById("inputVideo");
    input.value = null;
  };
  const removeVoiceInputFile = () => {
    const input = document.getElementById("inputVoice");
    input.value = null;
  };

  const transformDate = async (date) => {
    const monthNames = [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ];
    const [day, month, year] = date.split("/").map(Number);
    const gregorian = jalaali.toGregorian(year, month, day);
    const parts = gregorian.toString().split(" ");
    const gregorianDateString = `${parts[1]} ${parts[3]}`;
    const persianDateString = `${toFarsiNumber(year)} ${
      monthNames[month - 1]
    } ماه`;
    return {
      fa: persianDateString,
      en: gregorianDateString,
    };
  };

  const handleSubmit = async () => {
    const isValid = areAllStatesValid([title, subtitle, paragraph]);
    if (!isValid) {
      showAlert("همه موارد الزامیست");
      return;
    }
    if (!isValidDateFormat(dateString)) {
      showAlert("تاریخ نامعتبر");
      return;
    }
    let date;
    if (!dateString) {
      showAlert("تاریخ الزامیست");
      return;
    } else {
      date = await transformDate(dateString);
    }
    if (
      !editNews &&
      imagesPreview.length === 0 &&
      videosPreview.length === 0 &&
      voicesPreview.length === 0
    ) {
      showAlert("انتخاب عکس یا ویدئو");
      return;
    }

    setLoader(true);
    setDisableButton(true);

    let mediaLinks = editNews ? editNews.media : [];
    let voice = editNews ? editNews.voice : [];
    const mediaFolder = "news";
    const newsId = editNews ? editNews.newsId : `news${sixGenerator()}`;

    if (imagesPreview.length > 0) {
      const imageFormat = ".jpg";
      for (const media of uploadImages) {
        const mediaId = `img${fourGenerator()}`;
        const mediaLink = `${sourceLink}/${mediaFolder}/${newsId}/${mediaId}${imageFormat}`;
        await uploadMedia(media, mediaId, mediaFolder, newsId, imageFormat);
        mediaLinks.push({
          link: mediaLink,
          type: "image",
          active: true,
        });
      }
    }

    if (videosPreview.length > 0) {
      const videoFormat = ".mp4";
      for (const media of uploadVideos) {
        const mediaId = `vid${fourGenerator()}`;
        const mediaLink = `${sourceLink}/${mediaFolder}/${newsId}/${mediaId}${videoFormat}`;
        await uploadMedia(media, mediaId, mediaFolder, newsId, videoFormat);
        mediaLinks.push({
          link: mediaLink,
          type: "video",
          active: true,
        });
      }
    }

    if (voicesPreview.length > 0) {
      const videoFormat = ".mp3";
      for (const media of uploadVoices) {
        const mediaId = `voc${fourGenerator()}`;
        const mediaLink = `${sourceLink}/${mediaFolder}/${newsId}/${mediaId}${videoFormat}`;
        await uploadMedia(media, mediaId, mediaFolder, newsId, videoFormat);
        voice.push({
          link: mediaLink,
          type: "voice",
          active: true,
        });
      }
    }

    const newsObject = {
      fa: {
        title: title.fa,
        subtitle: subtitle.fa,
        paragraph: extractParagraphs(paragraph.fa).join("\n\n"),
        date: date.fa,
      },
      en: {
        title: title.en,
        subtitle: subtitle.en,
        paragraph: extractParagraphs(paragraph.en).join("\n\n"),
        date: date.en,
      },
      dateString: dateString,
      media: mediaLinks,
      voice: voice,
      active: false,
      newsId: newsId,
    };
    if (editNews) {
      newsObject.id = editNews["_id"];
      await updateNewsApi(newsObject);
    } else {
      await createNewsApi(newsObject);
    }
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
          <div className={classes.input}>
            <div className={classes.bar}>
              <p className={classes.label}>
                Subtitle
                <span>*</span>
              </p>
              <CloseIcon
                className="icon"
                onClick={() =>
                  setSubtitle((prevData) => ({
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
              id="subtitleEn"
              name="subtitle"
              onChange={(e) =>
                setSubtitle((prevData) => ({
                  ...prevData,
                  en: e.target.value,
                }))
              }
              value={subtitle.en}
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
          <div className={classes.input}>
            <div className={classes.barReverse}>
              <p className={classes.label}>
                <span>*</span>
                عنوان فرعی
              </p>
              <CloseIcon
                className="icon"
                onClick={() =>
                  setSubtitle((prevData) => ({
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
              id="subtitleFa"
              name="subtitle"
              onChange={(e) =>
                setSubtitle((prevData) => ({
                  ...prevData,
                  fa: e.target.value,
                }))
              }
              value={subtitle.fa}
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
          <div className={classes.input}>
            <div className={classes.barReverse}>
              <p className={classes.label}>
                <span>*</span>
                تاریخ شمسی
              </p>
              <CloseIcon
                className="icon"
                onClick={() => setDateString("")}
                sx={{ fontSize: 16 }}
              />
            </div>
            <input
              style={{
                fontFamily: "English",
              }}
              placeholder="dd/mm/yyyy"
              type="text"
              id="date"
              name="date"
              onChange={(e) => setDateString(e.target.value)}
              value={dateString}
              autoComplete="off"
            ></input>
          </div>
        </div>
      </div>
      <div className={classes.formAction}>
        <div className={classes.mediaContainer}>
          <div className={classes.media}>
            <label className="file">
              <input
                onChange={handleImageChange}
                id="inputImage"
                type="file"
                accept="image/*"
                multiple
              />
              <p>عکس</p>
            </label>
            <CloseIcon
              className={classes.clearMedia}
              onClick={() => {
                setImagesPreview([]);
                removeImageInputFile();
              }}
              sx={{ fontSize: 16 }}
            />
            <div className={classes.preview}>
              {imagesPreview.map((image, index) => (
                <Image
                  key={index}
                  width={300}
                  height={200}
                  objectFit="contain"
                  src={image.link}
                  alt="image"
                  priority
                />
              ))}
            </div>
          </div>
          <div className={classes.media}>
            <label className="file">
              <input
                onChange={handleVideoChange}
                id="inputVideo"
                type="file"
                accept="video/*"
                multiple
              />
              <p>ویدئو</p>
            </label>
            <CloseIcon
              className={classes.clearMedia}
              onClick={() => {
                setVideosPreview([]);
                removeVideoInputFile();
              }}
              sx={{ fontSize: 16 }}
            />
            <div className={classes.preview}>
              {videosPreview.map((video, index) => (
                <video
                  key={index}
                  className={classes.video}
                  src={video.link + "#t=0.1"}
                  controls
                  playsInline
                  preload="metadata"
                />
              ))}
            </div>
          </div>
          <div className={classes.media}>
            <label className="file">
              <input
                onChange={handleVoiceChange}
                id="inputVoice"
                type="file"
                accept="audio/*"
                multiple
              />
              <p>صوتی</p>
            </label>
            <CloseIcon
              className={classes.clearMedia}
              onClick={() => {
                setVoicesPreview([]);
                removeVoiceInputFile();
              }}
              sx={{ fontSize: 16 }}
            />
            <div className={classes.preview}>
              {voicesPreview.map((voice, index) => (
                <audio
                  key={index}
                  className={classes.voice}
                  preload="metadata"
                  controls
                >
                  <source src={voice.link} />
                </audio>
              ))}
            </div>
          </div>
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
          {editNews ? "ویرایش داده" : "ذخیره داده"}
        </button>
      </div>
    </Fragment>
  );
}
