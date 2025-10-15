import { Fragment, useContext, useState } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import classes from "./Form.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { createNewsApi, updateNewsApi } from "@/services/api";
import Image from "next/legacy/image";
import loaderImage from "@/assets/loader.png";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import Tooltip from "@mui/material/Tooltip";
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
  const [fields, setFields] = useState(
    editNews
      ? editNews.fields
      : [
          {
            en: { title: "", description: "", tag: "h2", word: "", link: "" },
            fa: { title: "", description: "", tag: "h2", word: "", link: "" },
          },
        ]
  );
  const [title, setTitle] = useState(
    editNews
      ? { en: editNews.en.title, fa: editNews.fa.title }
      : { en: "", fa: "" }
  );
  const [paragraph, setParagraph] = useState(
    editNews
      ? { en: editNews.en.paragraph, fa: editNews.fa.paragraph }
      : { en: "", fa: "" }
  );
  const [titleSeo, setTitleSeo] = useState(
    editNews
      ? { en: editNews.en.titleSeo, fa: editNews.fa.titleSeo }
      : { en: "", fa: "" }
  );
  const [descriptionSeo, setDescriptionSeo] = useState(
    editNews
      ? { en: editNews.en.descriptionSeo, fa: editNews.fa.descriptionSeo }
      : { en: "", fa: "" }
  );
  const [category, setCategory] = useState(
    editNews
      ? { en: editNews.en.category, fa: editNews.fa.category }
      : { en: "", fa: "" }
  );
  const [dateString, setDateString] = useState(
    editNews ? editNews.dateString : ""
  );
  const [page, setPage] = useState("portal");
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

  const tags = ["h2", "h3"];
  const handleAddField = () => {
    setFields([
      ...fields,
      {
        en: { title: "", description: "", tag: "h2", word: "", link: "" },
        fa: { title: "", description: "", tag: "h2", word: "", link: "" },
      },
    ]);
  };
  const handleTitleChange = (index, value) => {
    const newFields = [...fields];
    newFields[index].fa.title = value;
    newFields[index].en.title = value;
    setFields(newFields);
  };
  const handleTagChange = (index, value) => {
    const newFields = [...fields];
    newFields[index].fa.tag = value;
    newFields[index].en.tag = value;
    setFields(newFields);
  };
  const handleWordChange = (index, value) => {
    const newFields = [...fields];
    newFields[index].fa.word = value;
    newFields[index].en.word = value;
    setFields(newFields);
  };
  const handleLinkChange = (index, value) => {
    const newFields = [...fields];
    newFields[index].fa.link = value;
    newFields[index].en.link = value;
    setFields(newFields);
  };
  const handleDescriptionChange = (index, value) => {
    const newFields = [...fields];
    newFields[index].fa.description = extractParagraphs(value).join("\n\n");
    newFields[index].en.description = extractParagraphs(value).join("\n\n");
    setFields(newFields);
  };
  const handleRemoveField = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

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

  const keysToRemove = ["word", "link"];
  const removeKeys = (obj, keysToRemove) => {
    const newObj = { ...obj };
    keysToRemove.forEach((key) => {
      delete newObj[key];
    });
    return newObj;
  };
  const handleSubmit = async () => {
    const isValidFields = fields.every((field) => {
      const cleanedEn = removeKeys(field.en, keysToRemove);
      const cleanedFa = removeKeys(field.fa, keysToRemove);
      return areAllStatesValid([cleanedEn]) && areAllStatesValid([cleanedFa]);
    });
    if (
      !isValidFields ||
      !title.fa ||
      !paragraph.fa ||
      !titleSeo.fa ||
      !descriptionSeo.fa ||
      !category.fa
    ) {
      showAlert("موارد ستاره‌دار الزامیست");
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
        paragraph: extractParagraphs(paragraph.fa).join("\n\n"),
        titleSeo: titleSeo.fa,
        descriptionSeo: descriptionSeo.fa,
        category: category.fa,
        date: date.fa,
      },
      en: {
        title: title.fa,
        paragraph: extractParagraphs(paragraph.fa).join("\n\n"),
        titleSeo: titleSeo.fa,
        descriptionSeo: descriptionSeo.fa,
        category: category.fa,
        date: date.fa,
      },
      dateString: dateString,
      fields: fields,
      media: mediaLinks,
      voice: voice,
      active: false,
      page: page,
      newsId: newsId,
    };
    if (editNews) {
      newsObject.id = editNews._id;
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
            fontFamily: "Farsi",
          }}
        >
          <div className={classes.input}>
            <div className={classes.barReverse}>
              <p className={classes.label}>
                <span>*</span>
                عنوان سئو
              </p>
              <CloseIcon
                className="icon"
                onClick={() =>
                  setTitleSeo((prevData) => ({
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
              id="titleSeoFa"
              name="titleSeo"
              onChange={(e) =>
                setTitleSeo((prevData) => ({
                  ...prevData,
                  fa: e.target.value,
                }))
              }
              value={titleSeo.fa}
              autoComplete="off"
              dir="rtl"
            ></input>
          </div>
          <div className={classes.inputTextArea}>
            <div className={classes.barReverse}>
              <p className={classes.label}>
                <span>*</span>
                توضیحات سئو
              </p>
              <CloseIcon
                className="icon"
                onClick={() =>
                  setDescriptionSeo((prevData) => ({
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
              id="descriptionSeoFa"
              name="descriptionSeo"
              onChange={(e) =>
                setDescriptionSeo((prevData) => ({
                  ...prevData,
                  fa: e.target.value,
                }))
              }
              value={descriptionSeo.fa}
              autoComplete="off"
              dir="rtl"
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
                توضیحات
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
                کلمات کلیدی | دسته‌بندی
              </p>
              <CloseIcon
                className="icon"
                onClick={() =>
                  setCategory((prevData) => ({
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
              placeholder="تبلیغات کمپین شرکت"
              type="text"
              id="categoryFa"
              name="category"
              onChange={(e) =>
                setCategory((prevData) => ({
                  ...prevData,
                  fa: e.target.value,
                }))
              }
              value={category.fa}
              autoComplete="off"
              dir="rtl"
            ></input>
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
          <div className={classes.input}>
            <div className={classes.barReverse}>
              <p className={classes.label}>خبر جدید برای صفحه عمومی است؟</p>
              <p className={classes.label}>
                {page === "portal" ? "خیر" : "بله"}
              </p>
              {page === "portal" ? (
                <Tooltip title="News">
                  <RadioButtonUncheckedIcon
                    className="icon"
                    onClick={() => setPage("news")}
                  />
                </Tooltip>
              ) : (
                <Tooltip title="Portal">
                  <RadioButtonCheckedIcon
                    className="icon"
                    onClick={() => setPage("portal")}
                  />
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={classes.form}>
        <button
          style={{
            fontFamily: "Farsi",
          }}
          className={classes.addField}
          onClick={handleAddField}
        >
          پاراگراف جدید
        </button>
      </div>
      <div className={classes.container}>
        {fields.map((field, index) => (
          <div key={index} className={classes.form}>
            <div
              className={classes.input}
              style={{
                fontFamily: "Farsi",
              }}
            >
              <div className={classes.barReverse}>
                <p className={classes.label}>
                  <span>*</span>
                  عنوان پاراگراف
                </p>
              </div>
              <input
                style={{
                  fontFamily: "Farsi",
                  marginBottom: "12px",
                }}
                id={index}
                placeholder="..."
                type="text"
                value={field.fa.title}
                dir="rtl"
                onChange={(e) => handleTitleChange(index, e.target.value)}
              />
              <select
                style={{
                  fontFamily: "English",
                  marginBottom: "12px",
                }}
                value={field.fa.tag}
                onChange={(e) => handleTagChange(index, e.target.value)}
              >
                {tags.map((tag, index) => {
                  return (
                    <option key={index} value={tag}>
                      {tag}
                    </option>
                  );
                })}
              </select>
              <div className={classes.barReverse}>
                <p className={classes.label}>
                  <span>*</span>
                  توضیحات پاراگراف
                </p>
              </div>
              <textarea
                style={{
                  fontFamily: "Farsi",
                }}
                id={index}
                placeholder="..."
                type="text"
                value={field.fa.description}
                dir="rtl"
                onChange={(e) => handleDescriptionChange(index, e.target.value)}
              />
              <div className={classes.barReverse}>
                <p className={classes.label}>لینک کلمه</p>
              </div>
              <input
                style={{
                  fontFamily: "Farsi",
                  marginBottom: "12px",
                }}
                id={index}
                placeholder="آژانس تبلیغاتی"
                type="text"
                value={field.fa.word}
                dir="rtl"
                onChange={(e) => handleWordChange(index, e.target.value)}
              />
              <input
                style={{
                  fontFamily: "English",
                  marginBottom: "12px",
                }}
                id={index}
                placeholder="Link address"
                type="text"
                value={field.fa.link}
                onChange={(e) => handleLinkChange(index, e.target.value)}
              />
            </div>
            <button
              className={classes.removeField}
              style={{
                fontFamily: "Farsi",
              }}
              onClick={() => handleRemoveField(index)}
            >
              حذف
            </button>
          </div>
        ))}
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
