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
  const [development, setDevelopment] = useState(true);

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
  }, [mediaData, pages]);

  const updateHomeContent = async () => {
    setLoader(false);
    setDisableButton(false);
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
          data: {
            fa: titleOne.fa,
            en: titleOne.en,
          },
        },
        {
          type: "text",
          data: {
            fa: extractParagraphs(paragraphOne.fa).join("\n\n"),
            en: extractParagraphs(paragraphOne.en).join("\n\n"),
          },
        },
        {
          type: "text",
          data: {
            fa: titleTwo.fa,
            en: titleTwo.en,
          },
        },
        {
          type: "text",
          data: {
            fa: titleThree.fa,
            en: titleThree.en,
          },
        },
        {
          type: "text",
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
      showAlert("ذخیره شد");
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
                type="titleOne"
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
                type="paragraphOne"
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
                type="titleTwo"
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
                type="titleOne"
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
                type="paragraphOne"
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
                type="titleTwo"
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
                type="titleThree"
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
                type="paragraphTwo"
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
                type="titleThree"
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
                type="paragraphTwo"
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
            className={classes.formAction}
            style={{
              fontFamily: "English",
            }}
          >
            <p className={classes.alert}>{alert}</p>
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
            <div
              style={{
                paddingBottom: "20px",
                paddingTop: "20px",
                borderBottom: "1px solid #d6d6d6",
                borderTop: "1px solid #d6d6d6",
              }}
            >
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
