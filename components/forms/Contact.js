import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import classes from "./Form.module.scss";
import Image from "next/legacy/image";
import CloseIcon from "@mui/icons-material/Close";
import loaderImage from "@/assets/loader.png";
import { updatePageApi, updateMediaApi } from "@/services/api";
import {
  fourGenerator,
  uploadMedia,
  areAllStatesValid,
  extractParagraphs,
} from "@/services/utility";
import building from "@/assets/building.png";

export default function Contact({ pages, mediaData }) {
  const [headOffice, setHeadOffice] = useState({ en: "", fa: "" });
  const [headAddress, setHeadAddress] = useState({ en: "", fa: "" });
  const [headContact, setHeadContact] = useState({ en: "", fa: "" });
  const [headLocationLink, setHeadLocationLink] = useState({ en: "", fa: "" });
  const [secOffice, setSecOffice] = useState({ en: "", fa: "" });
  const [secAddress, setSecAddress] = useState({ en: "", fa: "" });
  const [secContact, setSecContact] = useState({ en: "", fa: "" });
  const [secLocationLink, setSecLocationLink] = useState({ en: "", fa: "" });
  const [contactContent, setContactContent] = useState({});
  const [mediaContent, setMediaContent] = useState({});
  const [graphicType, setGraphicType] = useState("image" || "gif");
  const [mainMedia, setMainMedia] = useState("");
  const [graphicMedia, setGraphicMedia] = useState("");
  const [loader, setLoader] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [alert, setAlert] = useState("");
  const sourceLink = "https://eshareh.storage.iran.liara.space";
  const router = useRouter();
  const [development, setDevelopment] = useState(false);

  useEffect(() => {
    let contactContent = pages.find((page) => page.slug === "contact");
    const { content } = contactContent;
    setContactContent(contactContent);
    let mediaContent = mediaData.find((media) => media.slug === "contact");
    setMediaContent(mediaContent);
    setHeadOffice({
      en: content[0].data.en,
      fa: content[0].data.fa,
    });
    setHeadAddress({
      en: content[1].data.en,
      fa: content[1].data.fa,
    });
    setHeadContact({
      en: content[2].data.en,
      fa: content[2].data.fa,
    });
    setHeadLocationLink({
      en: content[3].data.en,
      fa: content[3].data.fa,
    });
    setSecOffice({
      en: content[4].data.en,
      fa: content[4].data.fa,
    });
    setSecAddress({
      en: content[5].data.en,
      fa: content[5].data.fa,
    });
    setSecContact({
      en: content[6].data.en,
      fa: content[6].data.fa,
    });
    setSecLocationLink({
      en: content[7].data.en,
      fa: content[7].data.fa,
    });
  }, [mediaData, pages]);

  const updateContactContent = async () => {
    const isValid = areAllStatesValid([
      headOffice,
      headAddress,
      headContact,
      headLocationLink,
      secOffice,
      secAddress,
      secContact,
      secLocationLink,
    ]);

    if (!isValid) {
      showAlert("همه موارد الزامیست");
      return;
    }

    setLoader(true);
    setDisableButton(true);

    const contentObject = {
      _id: contactContent["_id"],
      slug: "contact",
      title: "Contact Us",
      content: [
        {
          type: "text",
          data: {
            fa: headOffice.fa,
            en: headOffice.en,
          },
        },
        {
          type: "text",
          data: {
            fa: extractParagraphs(headAddress.fa).join("\n\n"),
            en: extractParagraphs(headAddress.en).join("\n\n"),
          },
        },
        {
          type: "text",
          data: {
            fa: extractParagraphs(headContact.fa).join("\n\n"),
            en: extractParagraphs(headContact.en).join("\n\n"),
          },
        },
        {
          type: "text",
          data: {
            fa: headLocationLink.fa,
            en: headLocationLink.en,
          },
        },
        {
          type: "text",
          data: {
            fa: secOffice.fa,
            en: secOffice.en,
          },
        },
        {
          type: "text",
          data: {
            fa: extractParagraphs(secAddress.fa).join("\n\n"),
            en: extractParagraphs(secAddress.en).join("\n\n"),
          },
        },
        {
          type: "text",
          data: {
            fa: extractParagraphs(secContact.fa).join("\n\n"),
            en: extractParagraphs(secContact.en).join("\n\n"),
          },
        },
        {
          type: "text",
          data: {
            fa: secLocationLink.fa,
            en: secLocationLink.en,
          },
        },
      ],
    };
    await updatePageApi(contentObject);
    showAlert("ذخیره شد");
    router.reload(router.asPath);
  };

  const updateContactMedia = async () => {
    setLoader(true);
    setDisableButton(true);
    if (mainMedia || graphicMedia) {
      const currentMediaLink = mediaContent.content[0].link;
      const currentGraphicLink = mediaContent.content[1].link;
      const mediaFormat = ".jpg";
      const graphicFormat = graphicType === "image" ? ".jpg" : ".gif";
      const mediaFolder = "page";
      const subFolder = "contact";
      const mediaId = `img${fourGenerator()}`;
      const graphicId = `img${fourGenerator()}`;

      // Create new media links if mainMedia or graphicMedia is provided
      const mediaLink = mainMedia
        ? `${sourceLink}/${mediaFolder}/${subFolder}/${mediaId}${mediaFormat}`
        : currentMediaLink;
      const graphicLink = graphicMedia
        ? `${sourceLink}/${mediaFolder}/${subFolder}/${graphicId}${graphicFormat}`
        : currentGraphicLink;

      // Upload media if it's provided
      const uploadPromises = [];
      if (mainMedia) {
        uploadPromises.push(
          uploadMedia(mainMedia, mediaId, mediaFolder, subFolder, mediaFormat)
        );
      }
      if (graphicMedia) {
        uploadPromises.push(
          uploadMedia(
            graphicMedia,
            graphicId,
            mediaFolder,
            subFolder,
            graphicFormat
          )
        );
      }
      await Promise.all(uploadPromises);
      const mediaObject = {
        _id: mediaContent["_id"],
        slug: "contact",
        title: "Contact Us",
        content: [
          { type: "image", link: mediaLink },
          { type: graphicType, link: graphicLink },
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
                  Head Office
                  <span>*</span>
                </p>
                <CloseIcon
                  className="icon"
                  onClick={() =>
                    setHeadOffice((prevData) => ({
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
                type="headOffice"
                id="headOfficeEn"
                name="headOffice"
                onChange={(e) =>
                  setHeadOffice((prevData) => ({
                    ...prevData,
                    en: e.target.value,
                  }))
                }
                value={headOffice.en}
                autoComplete="off"
              ></input>
            </div>
            <div className={classes.inputTextArea}>
              <div className={classes.bar}>
                <p className={classes.label}>
                  Head Address
                  <span>*</span>
                </p>
                <CloseIcon
                  className="icon"
                  onClick={() =>
                    setHeadAddress((prevData) => ({
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
                type="headAddress"
                id="headAddressEn"
                name="headAddress"
                onChange={(e) =>
                  setHeadAddress((prevData) => ({
                    ...prevData,
                    en: e.target.value,
                  }))
                }
                value={headAddress.en}
                autoComplete="off"
              ></textarea>
            </div>
            <div className={classes.inputTextArea}>
              <div className={classes.bar}>
                <p className={classes.label}>
                  Head Contact
                  <span>*</span>
                </p>
                <CloseIcon
                  className="icon"
                  onClick={() =>
                    setHeadContact((prevData) => ({
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
                type="headContact"
                id="headContactEn"
                name="headContact"
                onChange={(e) =>
                  setHeadContact((prevData) => ({
                    ...prevData,
                    en: e.target.value,
                  }))
                }
                value={headContact.en}
                autoComplete="off"
              ></textarea>
            </div>
            <div className={classes.input}>
              <div className={classes.bar}>
                <p className={classes.label}>
                  Head Location Link
                  <span>*</span>
                </p>
                <CloseIcon
                  className="icon"
                  onClick={() =>
                    setHeadLocationLink({
                      fa: "",
                      en: "",
                    })
                  }
                  sx={{ fontSize: 16 }}
                />
              </div>
              <input
                style={{
                  fontFamily: "English",
                }}
                placeholder="..."
                type="headLocationLink"
                id="headLocationLink"
                name="headLocationLink"
                onChange={(e) =>
                  setHeadLocationLink({
                    fa: e.target.value,
                    en: e.target.value,
                  })
                }
                value={headLocationLink.en}
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
                  دفتر مرکزی
                </p>
                <CloseIcon
                  className="icon"
                  onClick={() =>
                    setHeadOffice((prevData) => ({
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
                type="headOffice"
                id="headOfficeFa"
                name="headOffice"
                onChange={(e) =>
                  setHeadOffice((prevData) => ({
                    ...prevData,
                    fa: e.target.value,
                  }))
                }
                value={headOffice.fa}
                autoComplete="off"
                dir="rtl"
              ></input>
            </div>
            <div className={classes.inputTextArea}>
              <div className={classes.barReverse}>
                <p className={classes.label}>
                  <span>*</span>
                  آدرس مرکزی
                </p>
                <CloseIcon
                  className="icon"
                  onClick={() =>
                    setHeadAddress((prevData) => ({
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
                type="headAddress"
                id="headAddressFa"
                name="headAddress"
                onChange={(e) =>
                  setHeadAddress((prevData) => ({
                    ...prevData,
                    fa: e.target.value,
                  }))
                }
                value={headAddress.fa}
                autoComplete="off"
                dir="rtl"
              ></textarea>
            </div>
            <div className={classes.inputTextArea}>
              <div className={classes.barReverse}>
                <p className={classes.label}>
                  <span>*</span>
                  تماس مرکزی
                </p>
                <CloseIcon
                  className="icon"
                  onClick={() =>
                    setHeadContact((prevData) => ({
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
                type="headContact"
                id="headContactFa"
                name="headContact"
                onChange={(e) =>
                  setHeadContact((prevData) => ({
                    ...prevData,
                    fa: e.target.value,
                  }))
                }
                value={headContact.fa}
                autoComplete="off"
                dir="rtl"
              ></textarea>
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
                  Studio Office
                  <span>*</span>
                </p>
                <CloseIcon
                  className="icon"
                  onClick={() =>
                    setSecOffice((prevData) => ({
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
                type="secOffice"
                id="secOfficeEn"
                name="secOffice"
                onChange={(e) =>
                  setSecOffice((prevData) => ({
                    ...prevData,
                    en: e.target.value,
                  }))
                }
                value={secOffice.en}
                autoComplete="off"
              ></input>
            </div>
            <div className={classes.inputTextArea}>
              <div className={classes.bar}>
                <p className={classes.label}>
                  Studio Address
                  <span>*</span>
                </p>
                <CloseIcon
                  className="icon"
                  onClick={() =>
                    setSecAddress((prevData) => ({
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
                type="secAddress"
                id="secAddressEn"
                name="secAddress"
                onChange={(e) =>
                  setSecAddress((prevData) => ({
                    ...prevData,
                    en: e.target.value,
                  }))
                }
                value={secAddress.en}
                autoComplete="off"
              ></textarea>
            </div>
            <div className={classes.inputTextArea}>
              <div className={classes.bar}>
                <p className={classes.label}>
                  Studio Contact
                  <span>*</span>
                </p>
                <CloseIcon
                  className="icon"
                  onClick={() =>
                    setSecContact((prevData) => ({
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
                type="secContact"
                id="secContactEn"
                name="secContact"
                onChange={(e) =>
                  setSecContact((prevData) => ({
                    ...prevData,
                    en: e.target.value,
                  }))
                }
                value={secContact.en}
                autoComplete="off"
              ></textarea>
            </div>
            <div className={classes.input}>
              <div className={classes.bar}>
                <p className={classes.label}>
                  Studio Location Link
                  <span>*</span>
                </p>
                <CloseIcon
                  className="icon"
                  onClick={() =>
                    setSecLocationLink({
                      fa: "",
                      en: "",
                    })
                  }
                  sx={{ fontSize: 16 }}
                />
              </div>
              <input
                style={{
                  fontFamily: "English",
                }}
                placeholder="..."
                type="secLocationLink"
                id="secLocationLink"
                name="secLocationLink"
                onChange={(e) =>
                  setSecLocationLink({
                    fa: e.target.value,
                    en: e.target.value,
                  })
                }
                value={secLocationLink.en}
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
                  دفتر استودیو
                </p>
                <CloseIcon
                  className="icon"
                  onClick={() =>
                    setSecOffice((prevData) => ({
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
                type="secOffice"
                id="secOfficeFa"
                name="secOffice"
                onChange={(e) =>
                  setSecOffice((prevData) => ({
                    ...prevData,
                    fa: e.target.value,
                  }))
                }
                value={secOffice.fa}
                autoComplete="off"
                dir="rtl"
              ></input>
            </div>
            <div className={classes.inputTextArea}>
              <div className={classes.barReverse}>
                <p className={classes.label}>
                  <span>*</span>
                  آدرس استودیو
                </p>
                <CloseIcon
                  className="icon"
                  onClick={() =>
                    setSecAddress((prevData) => ({
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
                type="secAddress"
                id="secAddressFa"
                name="secAddress"
                onChange={(e) =>
                  setSecAddress((prevData) => ({
                    ...prevData,
                    fa: e.target.value,
                  }))
                }
                value={secAddress.fa}
                autoComplete="off"
                dir="rtl"
              ></textarea>
            </div>
            <div className={classes.inputTextArea}>
              <div className={classes.barReverse}>
                <p className={classes.label}>
                  <span>*</span>
                  تماس استودیو
                </p>
                <CloseIcon
                  className="icon"
                  onClick={() =>
                    setSecContact((prevData) => ({
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
                type="secContact"
                id="secContactFa"
                name="secContact"
                onChange={(e) =>
                  setSecContact((prevData) => ({
                    ...prevData,
                    fa: e.target.value,
                  }))
                }
                value={secContact.fa}
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
              onClick={() => updateContactContent()}
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
              <div
                className={classes.input}
                style={{
                  fontFamily: "Farsi",
                }}
              >
                <label className="file">
                  <input
                    onChange={(e) => {
                      setMainMedia(e.target.files[0]);
                    }}
                    type="file"
                    accept="image/*"
                  />
                  <p>عکس کاور اصلی</p>
                </label>
                {mainMedia !== "" && (
                  <div className={classes.preview}>
                    <CloseIcon
                      className="icon"
                      onClick={() => setMainMedia("")}
                      sx={{ fontSize: 16 }}
                    />
                    <Image
                      className={classes.media}
                      width={170}
                      height={200}
                      objectFit="contain"
                      src={URL.createObjectURL(mainMedia)}
                      alt="image"
                      priority
                    />
                  </div>
                )}
              </div>
            </div>
            <div
              style={{
                marginTop: "20px",
              }}
            >
              <div className={classes.navigation}>
                <p
                  className={
                    graphicType === "gif" ? classes.navActive : classes.nav
                  }
                  onClick={() => {
                    setGraphicType("gif");
                    setGraphicMedia("");
                  }}
                >
                  gif
                </p>
                <p
                  className={
                    graphicType === "image" ? classes.navActive : classes.nav
                  }
                  onClick={() => {
                    setGraphicType("image");
                    setGraphicMedia("");
                  }}
                >
                  عکس
                </p>
              </div>
              <div
                className={classes.input}
                style={{
                  fontFamily: `${
                    graphicType === "image" ? "Farsi" : "English"
                  }`,
                }}
              >
                <label className="file">
                  <input
                    onChange={(e) => {
                      setGraphicMedia(e.target.files[0]);
                    }}
                    type="file"
                    accept="image/*"
                  />
                  <p>{graphicType === "image" ? "عکس" : "gif"}</p>
                </label>
                {graphicMedia !== "" && (
                  <div className={classes.preview}>
                    <CloseIcon
                      className="icon"
                      onClick={() => setGraphicMedia("")}
                      sx={{ fontSize: 16 }}
                    />
                    <Image
                      className={classes.media}
                      width={170}
                      height={200}
                      objectFit="contain"
                      src={URL.createObjectURL(graphicMedia)}
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
              onClick={() => updateContactMedia()}
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
