import { useState, useEffect } from "react";
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
  const [paragraph, setParagraph] = useState({ en: "", fa: "" });
  const [mainSetting, setMainSetting] = useState("");
  const [paragraphSetting, setParagraphSetting] = useState("");
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
    setParagraph({
      en: content[1].data.en,
      fa: content[1].data.fa,
    });
    setMainSetting(content[0].setting);
    setParagraphSetting(content[1].setting);
  }, [mediaData, pages]);

  const updateProfessionContent = async () => {
    const isValid = areAllStatesValid([main, paragraph]);

    if (!isValid) {
      showAlert("همه موارد الزامیست");
      return;
    }

    setDisableButton(true);

    const contentObject = {
      _id: professionContent["_id"],
      slug: "profession",
      title: "What We Do",
      content: [
        {
          type: "text",
          setting: mainSetting,
          data: {
            fa: main.fa,
            en: main.en,
          },
        },
        {
          type: "text",
          setting: paragraphSetting,
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

  const updateProfessionMedia = async () => {
    setLoader(true);
    setDisableButton(true);
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
      router.reload(router.asPath);
    }
    setLoader(false);
    setDisableButton(false);
  };

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };

  return (
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
              Title
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
            type="text"
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
        <div className={classes.inputTextArea}>
          <div className={classes.barReverse}>
            <p className={classes.label}>
              <span>*</span>
              عنوان
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
            type="text"
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
        className={classes.form}
        style={{
          fontFamily: "Farsi",
        }}
      >
        <p className={classes.message}>
          در صورت خالی بودن رنگ و سایز، پیش فرض سیستم اعمال میشود
        </p>
        <div className={classes.input}>
          <div className={classes.barReverse}>
            <p className={classes.label}>رنگ و سایز عنوان</p>
            <CloseIcon
              className="icon"
              onClick={() => setMainSetting("")}
              sx={{ fontSize: 16 }}
            />
          </div>
          <input
            style={{
              fontFamily: "English",
            }}
            placeholder="000000 16"
            type="text"
            id="mainSetting"
            name="mainSetting"
            onChange={(e) => setMainSetting(e.target.value)}
            value={mainSetting}
            autoComplete="off"
          ></input>
        </div>
        <div className={classes.input}>
          <div className={classes.barReverse}>
            <p className={classes.label}>رنگ و سایز پاراگراف</p>
            <CloseIcon
              className="icon"
              onClick={() => setParagraphSetting("")}
              sx={{ fontSize: 16 }}
            />
          </div>
          <input
            style={{
              fontFamily: "English",
            }}
            placeholder="000000 16"
            type="text"
            id="paragraphSetting"
            name="paragraphSetting"
            onChange={(e) => setParagraphSetting(e.target.value)}
            value={paragraphSetting}
            autoComplete="off"
          ></input>
        </div>
        <div
          className={classes.formAction}
          style={{
            fontFamily: "English",
          }}
        >
          <p
            className={classes.alert}
            style={{
              fontFamily: "Farsi",
            }}
          >
            {alert}
          </p>
          <button
            disabled={disableButton}
            style={{
              fontFamily: "FarsiMedium",
            }}
            onClick={() => updateProfessionContent()}
          >
            ذخیره داده
          </button>
        </div>
      </div>
      <div className={classes.formAction}>
        <p
          className={classes.message}
          style={{
            fontFamily: "Farsi",
          }}
        >
          در صورت تغییر در مدیا انتخاب کنید
        </p>
        <div className={classes.navigation}>
          <p
            className={mediaType === "gif" ? classes.navActive : classes.nav}
            style={{
              fontFamily: "English",
            }}
            onClick={() => {
              setMediaType("gif");
              setMedia("");
            }}
          >
            gif
          </p>
          <p
            className={mediaType === "image" ? classes.navActive : classes.nav}
            style={{
              fontFamily: "Farsi",
            }}
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
          onClick={() => updateProfessionMedia()}
        >
          ذخیره مدیا
        </button>
      </div>
    </div>
  );
}
