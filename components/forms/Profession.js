import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import classes from "./Form.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { updatePageApi, updateMediaApi } from "@/services/api";
import Image from "next/legacy/image";
import loaderImage from "@/assets/loader.png";
import {
  areAllStatesValid,
  extractParagraphs,
  fourGenerator,
  uploadMedia,
} from "@/services/utility";

export default function Profession({ pages, mediaData }) {
  const [main, setMain] = useState({ en: "", fa: "" });
  const [paragraph, setParagraphs] = useState({ en: "", fa: "" });
  const [alert, setAlert] = useState("");
  const [professionContent, setProfessionContent] = useState({});
  const [mediaContent, setMediaContent] = useState({});
  const [mediaType, setMediaType] = useState("image" || "gif");
  const [media, setMedia] = useState("");
  const [loader, setLoader] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const sourceLink = "https://eshareh.storage.iran.liara.space";
  const router = useRouter();

  useEffect(() => {
    let professionContent = pages.find((page) => page.slug === "profession");
    const { content } = professionContent;
    setProfessionContent(professionContent);
    let mediaContent = mediaData.find((media) => media.slug === "profession");
    setMediaContent(mediaContent);
    setMain({
      en: content[0].data.en,
      fa: content[0].data.fa,
    });
    setParagraphs({
      en: content[1].data.en,
      fa: content[1].data.fa,
    });
  }, [mediaData, pages]);

  const handleSubmit = async () => {
    const isValid = areAllStatesValid([main, paragraph]);

    if (!isValid) {
      showAlert("همه موارد الزامیست");
      return;
    }

    setLoader(true);
    setDisableButton(true);

    // upload media
    if (media) {
      let mediaLink = "";
      let mediaFormat = mediaType === "image" ? ".jpg" : ".gif";
      let mediaFolder = "page";
      const subFolder = "profession";
      let mediaId = `img${fourGenerator()}`;
      mediaLink = `${sourceLink}/${mediaFolder}/${subFolder}/${mediaId}${mediaFormat}`;
      await uploadMedia(media, mediaId, mediaFolder, subFolder, mediaFormat);

      const mediaObject = {
        _id: mediaContent["_id"],
        slug: "profession",
        title: "What We Do",
        content: [
          {
            type: mediaType,
            link: mediaLink,
          },
        ],
      };
      await updateMediaApi(mediaObject);
    }

    const contentObject = {
      _id: professionContent["_id"],
      slug: "profession",
      title: "What We Do",
      content: [
        {
          type: "text",
          data: {
            fa: main.fa,
            en: main.en,
          },
        },
        {
          type: "text",
          data: {
            fa: extractParagraphs(paragraph.fa).join("\n\n"),
            en: extractParagraphs(paragraph.en).join("\n\n"),
          },
        },
      ],
    };
    await updatePageApi(contentObject);
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
          <div className={classes.inputTextArea}>
            <div className={classes.bar}>
              <p className={classes.label}>
                Main
                <span>*</span>
              </p>
              <CloseIcon
                className="icon"
                onClick={() =>
                  setMain((prevData) => ({
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
              type="main"
              id="mainEn"
              name="main"
              onChange={(e) =>
                setMain((prevData) => ({
                  ...prevData,
                  en: e.target.value,
                }))
              }
              value={main.en}
              autoComplete="off"
            ></textarea>
          </div>
          <div className={classes.inputTextArea}>
            <div className={classes.bar}>
              <p className={classes.label}>
                Paragraphs
                <span>*</span>
              </p>
              <CloseIcon
                className="icon"
                onClick={() =>
                  setParagraphs((prevData) => ({
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
              type="paragraph"
              id="paragraphEn"
              name="paragraph"
              onChange={(e) =>
                setParagraphs((prevData) => ({
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
          <div className={classes.inputTextArea}>
            <div className={classes.barReverse}>
              <p className={classes.label}>
                <span>*</span>
                اصلی
              </p>
              <CloseIcon
                className="icon"
                onClick={() =>
                  setMain((prevData) => ({
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
              type="main"
              id="mainFa"
              name="main"
              onChange={(e) =>
                setMain((prevData) => ({
                  ...prevData,
                  fa: e.target.value,
                }))
              }
              value={main.fa}
              autoComplete="off"
              dir="rtl"
            ></textarea>
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
                  setParagraphs((prevData) => ({
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
              type="paragraph"
              id="paragraphFa"
              name="paragraph"
              onChange={(e) =>
                setParagraphs((prevData) => ({
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
              className={mediaType === "gif" ? classes.navActive : classes.nav}
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
          <p className={classes.alert}>{alert}</p>
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
    </Fragment>
  );
}
