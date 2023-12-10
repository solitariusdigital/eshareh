import { Fragment, useContext, useState } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./SolutionsForm.module.scss";
import Image from "next/legacy/image";
import CloseIcon from "@mui/icons-material/Close";
import loaderImage from "@/assets/loader.png";
import { fourGenerator, sixGenerator, uploadMedia } from "@/services/utility";
import { createSolutionApi } from "@/services/api";

export default function SolutionsForm() {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { editSolution, setEditSolution } = useContext(StateContext);

  const [title, setTitle] = useState(
    editSolution
      ? { en: editSolution.en.title, fa: editSolution.fa.title }
      : { en: "", fa: "" }
  );
  const [subtitle, setSubtitle] = useState(
    editSolution
      ? { en: editSolution.en.subtitle, fa: editSolution.fa.subtitle }
      : { en: "", fa: "" }
  );
  const [summary, setSummary] = useState(
    editSolution
      ? { en: editSolution.en.summary, fa: editSolution.fa.summary }
      : { en: "", fa: "" }
  );
  const [problem, setProblem] = useState(
    editSolution
      ? { en: editSolution.en.problem, fa: editSolution.fa.problem }
      : { en: "", fa: "" }
  );
  const [solution, setSolution] = useState(
    editSolution
      ? { en: editSolution.en.solution, fa: editSolution.fa.solution }
      : { en: "", fa: "" }
  );
  const [year, setYear] = useState(
    editSolution
      ? { en: editSolution.en.year, fa: editSolution.fa.year }
      : { en: "", fa: "" }
  );
  const [category, setCategory] = useState("");

  const [imagesPreview, setImagesPreview] = useState([]);
  const [videosPreview, setVideosPreview] = useState([]);
  const categories = ["Advertising", "Media", "Digital"];

  const [uploadImages, setUploadImages] = useState([]);
  const [uploadVideos, setUploadVideos] = useState([]);

  const [alert, setAlert] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [loader, setLoader] = useState(false);

  const sourceLink = "https://eshareh.storage.iran.liara.space";

  const selectCategories = {
    Advertising: {
      fa: "تبلیغات",
      en: "advertising",
    },
    Media: {
      fa: "رسانه",
      en: "media",
    },
    Digital: {
      fa: "دیجیتال",
      en: "digital",
    },
  };

  const handleImageChange = (event) => {
    const array = Array.from(event.target.files);
    setUploadImages(array);
    setImagesPreview(
      array.map((item) => ({
        file: item,
        url: URL.createObjectURL(item),
      }))
    );
  };
  const handleVideoChange = (event) => {
    const array = Array.from(event.target.files);
    setUploadVideos(array);
    setVideosPreview(
      array.map((item) => ({
        file: item,
        url: URL.createObjectURL(item),
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

  const handleSubmit = async () => {
    const isValid = areAllStatesValid([
      title,
      subtitle,
      summary,
      problem,
      solution,
      year,
      category,
    ]);

    if (!isValid) {
      showAlert("همه موارد الزامیست");
      return;
    }

    if (imagesPreview.length === 0 && videosPreview.length === 0) {
      showAlert("انتخاب عکس یا ویدئو");
      return;
    }

    setDisableButton(true);
    setLoader(true);

    let mediaLinks = [];
    const mediaFolder = "solutions";
    const subFolder = `sol${sixGenerator()}`;

    if (imagesPreview.length > 0) {
      const imageFormat = ".jpg";
      for (const media of uploadImages) {
        const mediaId = `img${fourGenerator()}`;
        const mediaLink = `${sourceLink}/${mediaFolder}/${subFolder}/${mediaId}${imageFormat}`;
        await uploadMedia(media, mediaId, mediaFolder, subFolder, imageFormat);
        mediaLinks.push({
          link: mediaLink,
          type: "image",
        });
      }
    }

    if (videosPreview.length > 0) {
      const videoFormat = ".mp4";
      for (const media of uploadVideos) {
        const mediaId = `vid${fourGenerator()}`;
        const mediaLink = `${sourceLink}/${mediaFolder}/${subFolder}/${mediaId}${videoFormat}`;
        await uploadMedia(media, mediaId, mediaFolder, subFolder, videoFormat);
        mediaLinks.push({
          link: mediaLink,
          type: "video",
        });
      }
    }

    let solutionData = {
      fa: {
        title: title.fa,
        subtitle: subtitle.fa,
        summary: summary.fa,
        problem: problem.fa,
        solution: solution.fa,
        year: year.fa,
        category: selectCategories[category].fa,
      },
      en: {
        title: title.en,
        subtitle: subtitle.en,
        summary: summary.en,
        problem: problem.en,
        solution: solution.en,
        year: year.en,
        category: selectCategories[category].en,
      },
      media: mediaLinks,
      active: false,
    };

    await createSolutionApi(solutionData);
    window.location.assign("/solutions");
  };

  const areAllStatesValid = (states) => {
    for (const state of states) {
      const values = Object.values(state);
      for (const value of values) {
        if (value === "") {
          return false;
        }
      }
    }
    return true;
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
            fontFamily: language ? "English" : "English",
          }}
        >
          <p className={classes.title}>English</p>
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
              id="title"
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
              type="text"
              id="subtitle"
              name="subtitle"
              onChange={(e) =>
                setSubtitle((prevData) => ({
                  ...prevData,
                  en: e.target.value,
                }))
              }
              value={subtitle.en}
              autoComplete="off"
            />
          </div>
          <div className={classes.input}>
            <div className={classes.bar}>
              <p className={classes.label}>
                Summary
                <span>*</span>
              </p>
              <CloseIcon
                className="icon"
                onClick={() =>
                  setSummary((prevData) => ({
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
              id="summary"
              name="summary"
              onChange={(e) =>
                setSummary((prevData) => ({
                  ...prevData,
                  en: e.target.value,
                }))
              }
              value={summary.en}
              autoComplete="off"
            ></textarea>
          </div>
          <div className={classes.input}>
            <div className={classes.bar}>
              <p className={classes.label}>
                Problem
                <span>*</span>
              </p>
              <CloseIcon
                className="icon"
                onClick={() =>
                  setProblem((prevData) => ({
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
              id="problem"
              name="problem"
              onChange={(e) =>
                setProblem((prevData) => ({
                  ...prevData,
                  en: e.target.value,
                }))
              }
              value={problem.en}
              autoComplete="off"
            ></textarea>
          </div>
          <div className={classes.input}>
            <div className={classes.bar}>
              <p className={classes.label}>
                Solution
                <span>*</span>
              </p>
              <CloseIcon
                className="icon"
                onClick={() =>
                  setSolution((prevData) => ({
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
              id="solution"
              name="solution"
              onChange={(e) =>
                setSolution((prevData) => ({
                  ...prevData,
                  en: e.target.value,
                }))
              }
              value={solution.en}
              autoComplete="off"
            ></textarea>
          </div>
          <div className={classes.input}>
            <div className={classes.bar}>
              <p className={classes.label}>
                Year
                <span>*</span>
              </p>
              <CloseIcon
                className="icon"
                onClick={() =>
                  setYear((prevData) => ({
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
              type="tel"
              id="year"
              name="year"
              onChange={(e) =>
                setYear((prevData) => ({
                  ...prevData,
                  en: e.target.value,
                }))
              }
              value={year.en}
              autoComplete="off"
            />
          </div>
          <div className={classes.input}>
            <div className={classes.bar}>
              <p className={classes.label}>
                Category
                <span>*</span>
              </p>
            </div>
            <select
              defaultValue={"default"}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="default" disabled>
                {editSolution
                  ? editSolution.en.category.charAt(0).toUpperCase() +
                    editSolution.en.category.slice(1)
                  : "Select"}
              </option>
              {categories.map((category, index) => {
                return (
                  <option key={index} value={category}>
                    {category}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div
          className={classes.form}
          style={{
            fontFamily: language ? "Farsi" : "Farsi",
          }}
        >
          <p className={classes.title}>فارسی</p>
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
              id="title"
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
              type="text"
              id="subtitle"
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
            />
          </div>
          <div className={classes.input}>
            <div className={classes.barReverse}>
              <p className={classes.label}>
                <span>*</span>
                خلاصه
              </p>
              <CloseIcon
                className="icon"
                onClick={() =>
                  setSummary((prevData) => ({
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
              id="summary"
              name="summary"
              onChange={(e) =>
                setSummary((prevData) => ({
                  ...prevData,
                  fa: e.target.value,
                }))
              }
              value={summary.fa}
              autoComplete="off"
              dir="rtl"
            ></textarea>
          </div>
          <div className={classes.input}>
            <div className={classes.barReverse}>
              <p className={classes.label}>
                <span>*</span>
                صورت مساله
              </p>
              <CloseIcon
                className="icon"
                onClick={() =>
                  setProblem((prevData) => ({
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
              id="problem"
              name="problem"
              onChange={(e) =>
                setProblem((prevData) => ({
                  ...prevData,
                  fa: e.target.value,
                }))
              }
              value={problem.fa}
              autoComplete="off"
              dir="rtl"
            ></textarea>
          </div>
          <div className={classes.input}>
            <div className={classes.barReverse}>
              <p className={classes.label}>
                <span>*</span>
                راه حل
              </p>
              <CloseIcon
                className="icon"
                onClick={() =>
                  setSolution((prevData) => ({
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
              id="solution"
              name="solution"
              onChange={(e) =>
                setSolution((prevData) => ({
                  ...prevData,
                  fa: e.target.value,
                }))
              }
              value={solution.fa}
              autoComplete="off"
              dir="rtl"
            ></textarea>
          </div>
          <div className={classes.input}>
            <div className={classes.barReverse}>
              <p className={classes.label}>
                <span>*</span>
                سال
              </p>
              <CloseIcon
                className="icon"
                onClick={() =>
                  setYear((prevData) => ({
                    ...prevData,
                    fa: "",
                  }))
                }
                sx={{ fontSize: 16 }}
              />
            </div>
            <input
              style={{
                fontFamily: "English",
              }}
              type="tel"
              id="year"
              name="year"
              onChange={(e) =>
                setYear((prevData) => ({
                  ...prevData,
                  fa: e.target.value,
                }))
              }
              value={year.fa}
              autoComplete="off"
              dir="rtl"
            />
          </div>
        </div>
      </div>
      <div
        className={classes.formAction}
        style={{
          fontFamily: language ? "Farsi" : "Farsi",
        }}
      >
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
                  src={image.url}
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
                  preload="metadata"
                  src={video.url}
                  controls
                />
              ))}
            </div>
          </div>
        </div>
        <p className={classes.alert}>{alert}</p>
        {loader && (
          <div>
            <Image width={50} height={50} src={loaderImage} alt="isLoading" />
          </div>
        )}
        <button
          disabled={disableButton}
          onClick={() => handleSubmit()}
          style={{
            fontFamily: language ? "FarsiMedium" : "FarsiMedium",
          }}
        >
          ذخیره
        </button>
      </div>
    </Fragment>
  );
}
