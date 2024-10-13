import { useState, useEffect, useContext } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import classes from "./Form.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import Image from "next/legacy/image";
import loaderImage from "@/assets/loader.png";
import Router from "next/router";
import {
  createCoverApi,
  updateCoverApi,
  deleteCoverApi,
  getCoversApi,
} from "@/services/api";
import {
  fourGenerator,
  sixGenerator,
  uploadMedia,
  areAllStatesValid,
} from "@/services/utility";

export default function Cover({ covers }) {
  const { languageType, setLanguageType } = useContext(StateContext);
  const { language, setLanguage } = useContext(StateContext);
  const [title, setTitle] = useState({ en: "", fa: "" });
  const [media, setMedia] = useState("");
  const [link, setLink] = useState("");
  const [color, setColor] = useState("");
  const [mediaType, setMediaType] = useState("image" || "video");
  const [alert, setAlert] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [loader, setLoader] = useState(false);
  const [text, setText] = useState({});
  const [coversGrid, setCoversGrid] = useState(covers);
  const sourceLink = "https://eshareh.storage.iran.liara.space";
  const router = useRouter();

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

    let mediaLink = "";
    let mediaFormat = mediaType === "image" ? ".jpg" : ".mp4";
    let mediaFolder = "cover";
    const subFolder = `cov${sixGenerator()}`;
    let mediaId = `img${fourGenerator()}`;
    mediaLink = `${sourceLink}/${mediaFolder}/${subFolder}/${mediaId}${mediaFormat}`;
    await uploadMedia(media, mediaId, mediaFolder, subFolder, mediaFormat);

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

  useEffect(() => {
    const textObject = covers.reduce((acc, entry) => {
      acc[entry["_id"]] = entry.text;
      return acc;
    }, {});
    setText(textObject);
  }, [covers]);

  const updateCover = async (index) => {
    const coverObject = {
      ...coversGrid[index],
      color: coversGrid[index].color,
      text: text[coversGrid[index]["_id"]],
    };
    await updateCoverApi(coverObject);
    let updatedCovers = await getCoversApi(coverObject);
    setCoversGrid(updatedCovers);
  };

  const manageVisibility = async (type, index) => {
    const coverObject = {
      ...coversGrid[index],
      active: type === "show" ? true : false,
    };
    await updateCoverApi(coverObject);
    let updatedCovers = await getCoversApi(coverObject);
    setCoversGrid(updatedCovers);
  };

  const handleColorChange = (value, id) => {
    const newCovers = [...coversGrid];
    const coverIndex = newCovers.findIndex((object) => object["_id"] === id);
    newCovers[coverIndex].color = value;
    setCoversGrid(newCovers);
    setText(false);
  };

  const handleText = (id, newValue) => {
    setText((prevText) => ({
      ...prevText,
      [id]: newValue,
    }));
  };

  const deleteCover = async (index) => {
    let confirmationMessage = "حذف مطمئنی؟";
    let confirm = window.confirm(confirmationMessage);
    if (confirm) {
      await deleteCoverApi(coversGrid[index]["_id"]);
      router.reload(router.asPath);
    }
  };

  return (
    <>
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
            <div
              className={classes.input}
              style={{
                fontFamily: "Farsi",
              }}
            >
              <div className={classes.barReverse}>
                <p className={classes.label}>
                  <span>*</span>
                  لینک
                </p>
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
                fontFamily: "Farsi",
              }}
            >
              <div className={classes.barReverse}>
                <p className={classes.label}>
                  <span>*</span>
                  رنگ
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
                placeholder="000000"
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
              className={
                mediaType === "video" ? classes.navActive : classes.nav
              }
              onClick={() => {
                setMediaType("video");
                setMedia("");
              }}
            >
              ویدئو
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
                <p>عکس الزامی</p>
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
                <p>ویدئو الزامی</p>
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
            ذخیره داده
          </button>
        </div>
      </div>
      <div className={classes.coversGrid}>
        {coversGrid
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          .map((cover, index) => (
            <div key={index} className={classes.cover}>
              <p
                className={language ? classes.titleReverse : classes.title}
                style={{
                  fontFamily: language ? "Farsi" : "English",
                }}
                onClick={() => Router.push(cover.link)}
              >
                {cover.title[languageType]}
              </p>
              <div className={classes.action}>
                <div>
                  <Tooltip title="Delete">
                    <DeleteOutlineIcon
                      className="icon"
                      sx={{ color: "#d40d12" }}
                      onClick={() => deleteCover(index)}
                    />
                  </Tooltip>
                  {cover.active ? (
                    <Tooltip title="Hide">
                      <VerifiedUserIcon
                        className="icon"
                        sx={{ color: "#57a361" }}
                        onClick={() => manageVisibility("hide", index)}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Show">
                      <VisibilityOffIcon
                        className="icon"
                        sx={{ color: "#d40d12" }}
                        onClick={() => manageVisibility("show", index)}
                      />
                    </Tooltip>
                  )}
                </div>
                <div className={classes.input}>
                  <input
                    style={{
                      fontFamily: "English",
                    }}
                    type="text"
                    id="color"
                    name="color"
                    onChange={(e) =>
                      handleColorChange(e.target.value, cover["_id"])
                    }
                    value={cover.color}
                    autoComplete="off"
                    maxLength={6}
                  />
                  {text[cover["_id"]] ? (
                    <Tooltip title="Hide Text">
                      <RadioButtonCheckedIcon
                        className="icon"
                        onClick={() =>
                          handleText(cover["_id"], !text[cover["_id"]])
                        }
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Show Text">
                      <RadioButtonUncheckedIcon
                        className="icon"
                        onClick={() =>
                          handleText(cover["_id"], !text[cover["_id"]])
                        }
                      />
                    </Tooltip>
                  )}
                  <Tooltip title="Update">
                    <UpdateIcon
                      className="icon"
                      onClick={() => updateCover(index)}
                    />
                  </Tooltip>
                </div>
              </div>
              <div className={classes.media}>
                {cover.coverMedia.type === "image" ? (
                  <Image
                    src={cover.coverMedia.link}
                    blurDataURL={cover.coverMedia.link}
                    placeholder="blur"
                    alt={cover.title[languageType]}
                    layout="fill"
                    objectFit="cover"
                    as="image"
                    priority
                  />
                ) : (
                  <video
                    className={classes.media}
                    src={cover.coverMedia.link + "#t=0.1"}
                    controls
                    playsInline
                    preload="metadata"
                  />
                )}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
