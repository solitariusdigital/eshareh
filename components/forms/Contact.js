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
  const [headOfficeSetting, setHeadOfficeSetting] = useState("");
  const [headAddressSetting, setHeadAddressSetting] = useState("");
  const [headContactSetting, setHeadContactSetting] = useState("");
  const [secOfficeSetting, setSecOfficeSetting] = useState("");
  const [secAddressSetting, setSecAddressSetting] = useState("");
  const [secContactSetting, setSecContactSetting] = useState("");
  const [contactContent, setContactContent] = useState({});
  const [mediaContent, setMediaContent] = useState({});
  const [mediaTwoType, setMediaTwoType] = useState("image" || "gif");
  const [mediaOne, setMediaOne] = useState("");
  const [mediaTwo, setMediaTwo] = useState("");
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
    setHeadOfficeSetting(content[0].setting);
    setHeadAddressSetting(content[1].setting);
    setHeadContactSetting(content[2].setting);
    setSecOfficeSetting(content[4].setting);
    setSecAddressSetting(content[5].setting);
    setSecContactSetting(content[6].setting);
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
          setting: headOfficeSetting,
          data: {
            fa: headOffice.fa,
            en: headOffice.en,
          },
        },
        {
          type: "text",
          setting: headAddressSetting,
          data: {
            fa: extractParagraphs(headAddress.fa).join("\n\n"),
            en: extractParagraphs(headAddress.en).join("\n\n"),
          },
        },
        {
          type: "text",
          setting: headContactSetting,
          data: {
            fa: extractParagraphs(headContact.fa).join("\n\n"),
            en: extractParagraphs(headContact.en).join("\n\n"),
          },
        },
        {
          type: "text",
          setting: "",
          data: {
            fa: headLocationLink.fa,
            en: headLocationLink.en,
          },
        },
        {
          type: "text",
          setting: secOfficeSetting,
          data: {
            fa: secOffice.fa,
            en: secOffice.en,
          },
        },
        {
          type: "text",
          setting: secAddressSetting,
          data: {
            fa: extractParagraphs(secAddress.fa).join("\n\n"),
            en: extractParagraphs(secAddress.en).join("\n\n"),
          },
        },
        {
          type: "text",
          setting: secContactSetting,
          data: {
            fa: extractParagraphs(secContact.fa).join("\n\n"),
            en: extractParagraphs(secContact.en).join("\n\n"),
          },
        },
        {
          type: "text",
          setting: "",
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
    if (mediaOne || mediaTwo) {
      const currentMediaOneLink = mediaContent.content[0].link;
      const currentMediaTwiLink = mediaContent.content[1].link;
      const mediaFolder = "page";
      const subFolder = "contact";
      const mediaOneFormat = ".jpg";
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
        slug: "contact",
        title: "Contact Us",
        content: [
          { type: "image", link: mediaOneLink },
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
                type="text"
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
                type="text"
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
                type="text"
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
                type="text"
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
                type="text"
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
                type="text"
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
                type="text"
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
                type="text"
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
                type="text"
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
                type="text"
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
                type="text"
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
                type="text"
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
                type="text"
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
                type="text"
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
                <p className={classes.label}>رنگ و سایز دفتر مرکزی</p>
                <CloseIcon
                  className="icon"
                  onClick={() => setHeadOfficeSetting("")}
                  sx={{ fontSize: 16 }}
                />
              </div>
              <input
                style={{
                  fontFamily: "English",
                }}
                placeholder="000000 16"
                type="text"
                id="headOfficeSetting"
                name="headOfficeSetting"
                onChange={(e) => setHeadOfficeSetting(e.target.value)}
                value={headOfficeSetting}
                autoComplete="off"
              ></input>
            </div>
            <div className={classes.input}>
              <div className={classes.barReverse}>
                <p className={classes.label}>رنگ و سایز آدرس مرکزی</p>
                <CloseIcon
                  className="icon"
                  onClick={() => setHeadAddressSetting("")}
                  sx={{ fontSize: 16 }}
                />
              </div>
              <input
                style={{
                  fontFamily: "English",
                }}
                placeholder="000000 16"
                type="text"
                id="headAddressSetting"
                name="headAddressSetting"
                onChange={(e) => setHeadAddressSetting(e.target.value)}
                value={headAddressSetting}
                autoComplete="off"
              ></input>
            </div>
            <div className={classes.input}>
              <div className={classes.barReverse}>
                <p className={classes.label}>رنگ و سایز تماس مرکزی</p>
                <CloseIcon
                  className="icon"
                  onClick={() => setHeadContactSetting("")}
                  sx={{ fontSize: 16 }}
                />
              </div>
              <input
                style={{
                  fontFamily: "English",
                }}
                placeholder="000000 16"
                type="text"
                id="headContactSetting"
                name="headContactSetting"
                onChange={(e) => setHeadContactSetting(e.target.value)}
                value={headContactSetting}
                autoComplete="off"
              ></input>
            </div>
            <div className={classes.input}>
              <div className={classes.barReverse}>
                <p className={classes.label}>رنگ و سایز دفتر استودیو</p>
                <CloseIcon
                  className="icon"
                  onClick={() => setSecOfficeSetting("")}
                  sx={{ fontSize: 16 }}
                />
              </div>
              <input
                style={{
                  fontFamily: "English",
                }}
                placeholder="000000 16"
                type="text"
                id="secOfficeSetting"
                name="secOfficeSetting"
                onChange={(e) => setSecOfficeSetting(e.target.value)}
                value={secOfficeSetting}
                autoComplete="off"
              ></input>
            </div>
            <div className={classes.input}>
              <div className={classes.barReverse}>
                <p className={classes.label}>رنگ و سایز آدرس استودیو</p>
                <CloseIcon
                  className="icon"
                  onClick={() => setSecAddressSetting("")}
                  sx={{ fontSize: 16 }}
                />
              </div>
              <input
                style={{
                  fontFamily: "English",
                }}
                placeholder="000000 16"
                type="text"
                id="secAddressSetting"
                name="secAddressSetting"
                onChange={(e) => setSecAddressSetting(e.target.value)}
                value={secAddressSetting}
                autoComplete="off"
              ></input>
            </div>
            <div className={classes.input}>
              <div className={classes.barReverse}>
                <p className={classes.label}>رنگ و سایز تماس استودیو</p>
                <CloseIcon
                  className="icon"
                  onClick={() => setSecContactSetting("")}
                  sx={{ fontSize: 16 }}
                />
              </div>
              <input
                style={{
                  fontFamily: "English",
                }}
                placeholder="000000 16"
                type="text"
                id="secContactSetting"
                name="secContactSetting"
                onChange={(e) => setSecContactSetting(e.target.value)}
                value={secContactSetting}
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
                onClick={() => updateContactContent()}
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
              <div
                className={classes.input}
                style={{
                  fontFamily: "Farsi",
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
                  <p>عکس کاور اصلی</p>
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
                marginTop: "20px",
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
