import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import classes from "./Form.module.scss";
import Image from "next/legacy/image";
import CloseIcon from "@mui/icons-material/Close";
import loaderImage from "@/assets/loader.png";
import { updatePageApi, updateMediaApi } from "@/services/api";
import {
  areAllStatesValid,
  extractParagraphs,
  fourGenerator,
  uploadMedia,
} from "@/services/utility";
import building from "@/assets/building.png";

export default function Home({ pages, mediaData }) {
  const [titleOne, setTitleOne] = useState({ en: "", fa: "" });
  const [paragraphOne, setParagraphOne] = useState({ en: "", fa: "" });
  const [titleTwo, setTitleTwo] = useState({ en: "", fa: "" });
  const [titleThree, setTitleThree] = useState({ en: "", fa: "" });
  const [paragraphTwo, setParagraphTwo] = useState({ en: "", fa: "" });
  const [titleOneSetting, setTitleOneSetting] = useState("");
  const [paragraphOneSetting, setParagraphOneSetting] = useState("");
  const [titleTwoSetting, setTitleTwoSetting] = useState("");
  const [titleThreeSetting, setTitleThreeSetting] = useState("");
  const [paragraphTwoSetting, setParagraphTwoSetting] = useState("");
  const [homeContent, setHomeContent] = useState({});
  const [mediaContent, setMediaContent] = useState({});
  const [loader, setLoader] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [alert, setAlert] = useState("");
  const [mediaOne, setMediaOne] = useState("");
  const [mediaTwo, setMediaTwo] = useState("");
  const [mediaOneType, setMediaOneType] = useState("image" || "gif");
  const [mediaTwoType, setMediaTwoType] = useState("image" || "gif");
  const sourceLink = "https://eshareh.storage.iran.liara.space";
  const router = useRouter();
  const [development, setDevelopment] = useState(false);

  useEffect(() => {
    let homeContent = pages.find((page) => page.slug === "home");
    const { content } = homeContent;
    setHomeContent(homeContent);
    let mediaContent = mediaData.find((media) => media.slug === "home");
    setMediaContent(mediaContent);
    setTitleOne({
      en: content[0].data.en,
      fa: content[0].data.fa,
    });
    setParagraphOne({
      en: content[1].data.en,
      fa: content[1].data.fa,
    });
    setTitleTwo({
      en: content[2].data.en,
      fa: content[2].data.fa,
    });
    setTitleThree({
      en: content[3].data.en,
      fa: content[3].data.fa,
    });
    setParagraphTwo({
      en: content[4].data.en,
      fa: content[4].data.fa,
    });
    setTitleOneSetting(content[0].setting);
    setParagraphOneSetting(content[1].setting);
    setTitleTwoSetting(content[2].setting);
    setTitleThreeSetting(content[3].setting);
    setParagraphTwoSetting(content[4].setting);
  }, [mediaData, pages]);

  const updateHomeContent = async () => {
    const isValid = areAllStatesValid([
      titleOne,
      paragraphOne,
      titleTwo,
      titleThree,
      paragraphTwo,
    ]);

    if (!isValid) {
      showAlert("همه موارد الزامیست");
      return;
    }

    setLoader(true);
    setDisableButton(true);

    const contentObject = {
      _id: homeContent["_id"],
      slug: "home",
      title: "Home",
      content: [
        {
          type: "text",
          setting: titleOneSetting,
          data: {
            fa: titleOne.fa,
            en: titleOne.en,
          },
        },
        {
          type: "text",
          setting: paragraphOneSetting,
          data: {
            fa: extractParagraphs(paragraphOne.fa).join("\n\n"),
            en: extractParagraphs(paragraphOne.en).join("\n\n"),
          },
        },
        {
          type: "text",
          setting: titleTwoSetting,
          data: {
            fa: titleTwo.fa,
            en: titleTwo.en,
          },
        },
        {
          type: "text",
          setting: titleThreeSetting,
          data: {
            fa: titleThree.fa,
            en: titleThree.en,
          },
        },
        {
          type: "text",
          setting: paragraphTwoSetting,
          data: {
            fa: extractParagraphs(paragraphTwo.fa).join("\n\n"),
            en: extractParagraphs(paragraphTwo.en).join("\n\n"),
          },
        },
      ],
    };
    await updatePageApi(contentObject);
    showAlert("ذخیره شد");
    router.reload(router.asPath);
  };

  const updateHomeMedia = async () => {
    setLoader(true);
    setDisableButton(true);
    if (mediaOne || mediaTwo) {
      const currentMediaOneLink = mediaContent.content[0].link;
      const currentMediaTwiLink = mediaContent.content[1].link;
      const mediaFolder = "page";
      const subFolder = "home";
      const mediaOneFormat = mediaOneType === "image" ? ".jpg" : ".gif";
      const mediaTwoFormat = mediaTwoType === "image" ? ".jpg" : ".gif";
      const mediaOneId = `img${fourGenerator()}`;
      const mediaTwoId = `img${fourGenerator()}`;

      // Create new media links if mediaOne or mediaTwo is provided
      const mediaOneLink = mediaOne
        ? `${sourceLink}/${mediaFolder}/${subFolder}/${mediaOneId}${mediaOneFormat}`
        : currentMediaOneLink;
      const mediaTwoLink = mediaTwo
        ? `${sourceLink}/${mediaFolder}/${subFolder}/${mediaTwoId}${mediaTwoFormat}`
        : currentMediaTwiLink;

      // Upload media if it's provided
      const uploadPromises = [];
      if (mediaOne) {
        uploadPromises.push(
          uploadMedia(
            mediaOne,
            mediaOneId,
            mediaFolder,
            subFolder,
            mediaOneFormat
          )
        );
      }
      if (mediaTwo) {
        uploadPromises.push(
          uploadMedia(
            mediaTwo,
            mediaTwoId,
            mediaFolder,
            subFolder,
            mediaTwoFormat
          )
        );
      }
      await Promise.all(uploadPromises);
      const mediaObject = {
        _id: mediaContent["_id"],
        slug: "home",
        title: "Home",
        content: [
          { type: mediaOneType, link: mediaOneLink },
          { type: mediaTwoType, link: mediaTwoLink },
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
                  Title One
                  <span>*</span>
                </p>
                <CloseIcon
                  className="icon"
                  onClick={() =>
                    setTitleOne((prevData) => ({
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
                id="titleOneEn"
                name="titleOne"
                onChange={(e) =>
                  setTitleOne((prevData) => ({
                    ...prevData,
                    en: e.target.value,
                  }))
                }
                value={titleOne.en}
                autoComplete="off"
              ></input>
            </div>
            <div className={classes.inputTextArea}>
              <div className={classes.bar}>
                <p className={classes.label}>
                  Paragraph One
                  <span>*</span>
                </p>
                <CloseIcon
                  className="icon"
                  onClick={() =>
                    setParagraphOne((prevData) => ({
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
                id="paragraphOneEn"
                name="paragraphOne"
                onChange={(e) =>
                  setParagraphOne((prevData) => ({
                    ...prevData,
                    en: e.target.value,
                  }))
                }
                value={paragraphOne.en}
                autoComplete="off"
              ></textarea>
            </div>
            <div className={classes.input}>
              <div className={classes.bar}>
                <p className={classes.label}>
                  Title Two
                  <span>*</span>
                </p>
                <CloseIcon
                  className="icon"
                  onClick={() =>
                    setTitleTwo((prevData) => ({
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
                id="titleTwoEn"
                name="titleTwo"
                onChange={(e) =>
                  setTitleTwo((prevData) => ({
                    ...prevData,
                    en: e.target.value,
                  }))
                }
                value={titleTwo.en}
                autoComplete="off"
              ></input>
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
                  عنوان یک
                </p>
                <CloseIcon
                  className="icon"
                  onClick={() =>
                    setTitleOne((prevData) => ({
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
                id="titleOneFa"
                name="titleOne"
                onChange={(e) =>
                  setTitleOne((prevData) => ({
                    ...prevData,
                    fa: e.target.value,
                  }))
                }
                value={titleOne.fa}
                autoComplete="off"
                dir="rtl"
              ></input>
            </div>
            <div className={classes.inputTextArea}>
              <div className={classes.barReverse}>
                <p className={classes.label}>
                  <span>*</span>
                  پاراگراف یک
                </p>
                <CloseIcon
                  className="icon"
                  onClick={() =>
                    setParagraphOne((prevData) => ({
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
                id="paragraphOneFa"
                name="paragraphOne"
                onChange={(e) =>
                  setParagraphOne((prevData) => ({
                    ...prevData,
                    fa: e.target.value,
                  }))
                }
                value={paragraphOne.fa}
                autoComplete="off"
                dir="rtl"
              ></textarea>
            </div>
            <div className={classes.input}>
              <div className={classes.barReverse}>
                <p className={classes.label}>
                  <span>*</span>
                  عنوان دو
                </p>
                <CloseIcon
                  className="icon"
                  onClick={() =>
                    setTitleTwo((prevData) => ({
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
                id="titleTwoFa"
                name="titleTwo"
                onChange={(e) =>
                  setTitleTwo((prevData) => ({
                    ...prevData,
                    fa: e.target.value,
                  }))
                }
                value={titleTwo.fa}
                autoComplete="off"
                dir="rtl"
              ></input>
            </div>
          </div>
          <div
            className={classes.form}
            style={{
              fontFamily: "English",
            }}
          >
            <div className={classes.input}>
              <div className={classes.bar}>
                <p className={classes.label}>
                  Title Three
                  <span>*</span>
                </p>
                <CloseIcon
                  className="icon"
                  onClick={() =>
                    setTitleThree((prevData) => ({
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
                id="titleThreeEn"
                name="titleThree"
                onChange={(e) =>
                  setTitleThree((prevData) => ({
                    ...prevData,
                    en: e.target.value,
                  }))
                }
                value={titleThree.en}
                autoComplete="off"
              ></input>
            </div>
            <div className={classes.inputTextArea}>
              <div className={classes.bar}>
                <p className={classes.label}>
                  Paragraph Two
                  <span>*</span>
                </p>
                <CloseIcon
                  className="icon"
                  onClick={() =>
                    setParagraphTwo((prevData) => ({
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
                id="paragraphTwoEn"
                name="paragraphTwo"
                onChange={(e) =>
                  setParagraphTwo((prevData) => ({
                    ...prevData,
                    en: e.target.value,
                  }))
                }
                value={paragraphTwo.en}
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
                  عنوان سه
                </p>
                <CloseIcon
                  className="icon"
                  onClick={() =>
                    setTitleThree((prevData) => ({
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
                id="titleThreeFa"
                name="titleThree"
                onChange={(e) =>
                  setTitleThree((prevData) => ({
                    ...prevData,
                    fa: e.target.value,
                  }))
                }
                value={titleThree.fa}
                autoComplete="off"
                dir="rtl"
              ></input>
            </div>
            <div className={classes.inputTextArea}>
              <div className={classes.barReverse}>
                <p className={classes.label}>
                  <span>*</span>
                  پاراگراف دو
                </p>
                <CloseIcon
                  className="icon"
                  onClick={() =>
                    setParagraphTwo((prevData) => ({
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
                id="paragraphTwoFa"
                name="paragraphTwo"
                onChange={(e) =>
                  setParagraphTwo((prevData) => ({
                    ...prevData,
                    fa: e.target.value,
                  }))
                }
                value={paragraphTwo.fa}
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
                <p className={classes.label}>رنگ و سایز عنوان یک</p>
                <CloseIcon
                  className="icon"
                  onClick={() => setTitleOneSetting("")}
                  sx={{ fontSize: 16 }}
                />
              </div>
              <input
                style={{
                  fontFamily: "English",
                }}
                placeholder="000000 16"
                type="text"
                id="titleOneSetting"
                name="titleOneSetting"
                onChange={(e) => setTitleOneSetting(e.target.value)}
                value={titleOneSetting}
                autoComplete="off"
              ></input>
            </div>
            <div className={classes.input}>
              <div className={classes.barReverse}>
                <p className={classes.label}>رنگ و سایز پاراگراف یک</p>
                <CloseIcon
                  className="icon"
                  onClick={() => setParagraphOneSetting("")}
                  sx={{ fontSize: 16 }}
                />
              </div>
              <input
                style={{
                  fontFamily: "English",
                }}
                placeholder="000000 16"
                type="text"
                id="paragraphOneSetting"
                name="paragraphOneSetting"
                onChange={(e) => setParagraphOneSetting(e.target.value)}
                value={paragraphOneSetting}
                autoComplete="off"
              ></input>
            </div>
            <div className={classes.input}>
              <div className={classes.barReverse}>
                <p className={classes.label}>رنگ و سایز عنوان دو</p>
                <CloseIcon
                  className="icon"
                  onClick={() => setTitleTwoSetting("")}
                  sx={{ fontSize: 16 }}
                />
              </div>
              <input
                style={{
                  fontFamily: "English",
                }}
                placeholder="000000 16"
                type="text"
                id="titleTwoSetting"
                name="titleTwoSetting"
                onChange={(e) => setTitleTwoSetting(e.target.value)}
                value={titleTwoSetting}
                autoComplete="off"
              ></input>
            </div>
            <div className={classes.input}>
              <div className={classes.barReverse}>
                <p className={classes.label}>رنگ و سایز عنوان سه</p>
                <CloseIcon
                  className="icon"
                  onClick={() => setTitleThreeSetting("")}
                  sx={{ fontSize: 16 }}
                />
              </div>
              <input
                style={{
                  fontFamily: "English",
                }}
                placeholder="000000 16"
                type="text"
                id="titleThreeSetting"
                name="titleThreeSetting"
                onChange={(e) => setTitleThreeSetting(e.target.value)}
                value={titleThreeSetting}
                autoComplete="off"
              ></input>
            </div>
            <div className={classes.input}>
              <div className={classes.barReverse}>
                <p className={classes.label}>رنگ و سایز پاراگراف دو</p>
                <CloseIcon
                  className="icon"
                  onClick={() => setParagraphTwoSetting("")}
                  sx={{ fontSize: 16 }}
                />
              </div>
              <input
                style={{
                  fontFamily: "English",
                }}
                placeholder="000000 16"
                type="text"
                id="paragraphTwoSetting"
                name="paragraphTwoSetting"
                onChange={(e) => setParagraphTwoSetting(e.target.value)}
                value={paragraphTwoSetting}
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
                  marginBottom: "20px",
                }}
                onClick={() => updateHomeContent()}
              >
                ذخیره داده
              </button>
            </div>
          </div>
          <div
            className={classes.formAction}
            style={{
              fontFamily: "English",
            }}
          >
            <div>
              <p
                className={classes.message}
                style={{
                  fontFamily: "Farsi",
                  marginBottom: "12px",
                }}
              >
                در صورت تغییر در مدیا انتخاب کنید
              </p>
              <div className={classes.navigation}>
                <p
                  className={
                    mediaOneType === "gif" ? classes.navActive : classes.nav
                  }
                  onClick={() => {
                    setMediaOneType("gif");
                    setMediaOne("");
                  }}
                >
                  gif
                </p>
                <p
                  className={
                    mediaOneType === "image" ? classes.navActive : classes.nav
                  }
                  onClick={() => {
                    setMediaOneType("image");
                    setMediaOne("");
                  }}
                >
                  عکس
                </p>
              </div>
              <div
                className={classes.input}
                style={{
                  fontFamily: `${
                    mediaOneType === "image" ? "Farsi" : "English"
                  }`,
                }}
              >
                <label className="file">
                  <input
                    onChange={(e) => {
                      setMediaOne(e.target.files[0]);
                    }}
                    type="file"
                    accept="image/*"
                  />
                  <p>{mediaOneType === "image" ? "عکس" : "gif"}</p>
                </label>
                {mediaOne !== "" && (
                  <div className={classes.preview}>
                    <CloseIcon
                      className="icon"
                      onClick={() => setMediaOne("")}
                      sx={{ fontSize: 16 }}
                    />
                    <Image
                      className={classes.media}
                      width={170}
                      height={200}
                      objectFit="contain"
                      src={URL.createObjectURL(mediaOne)}
                      alt="image"
                      priority
                    />
                  </div>
                )}
              </div>
            </div>
            <div
              style={{
                paddingTop: "20px",
              }}
            >
              <div className={classes.navigation}>
                <p
                  className={
                    mediaTwoType === "gif" ? classes.navActive : classes.nav
                  }
                  onClick={() => {
                    setMediaTwoType("gif");
                    setMediaTwo("");
                  }}
                >
                  gif
                </p>
                <p
                  className={
                    mediaTwoType === "image" ? classes.navActive : classes.nav
                  }
                  onClick={() => {
                    setMediaTwoType("image");
                    setMediaTwo("");
                  }}
                >
                  عکس
                </p>
              </div>
              <div
                className={classes.input}
                style={{
                  fontFamily: `${
                    mediaTwoType === "image" ? "Farsi" : "English"
                  }`,
                }}
              >
                <label className="file">
                  <input
                    onChange={(e) => {
                      setMediaTwo(e.target.files[0]);
                    }}
                    type="file"
                    accept="image/*"
                  />
                  <p>{mediaTwoType === "image" ? "عکس" : "gif"}</p>
                </label>
                {mediaTwo !== "" && (
                  <div className={classes.preview}>
                    <CloseIcon
                      className="icon"
                      onClick={() => setMediaTwo("")}
                      sx={{ fontSize: 16 }}
                    />
                    <Image
                      className={classes.media}
                      width={170}
                      height={200}
                      objectFit="contain"
                      src={URL.createObjectURL(mediaTwo)}
                      alt="image"
                      priority
                    />
                  </div>
                )}
              </div>
            </div>
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
                marginTop: "20px",
              }}
              onClick={() => updateHomeMedia()}
            >
              ذخیره مدیا
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
