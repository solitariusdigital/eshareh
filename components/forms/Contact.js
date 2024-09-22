import { Fragment, useContext, useState, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import classes from "./Form.module.scss";
import Image from "next/legacy/image";
import CloseIcon from "@mui/icons-material/Close";
import loaderImage from "@/assets/loader.png";
import { updatePageApi } from "@/services/api";
import {
  fourGenerator,
  sixGenerator,
  uploadMedia,
  areAllStatesValid,
  extractParagraphs,
} from "@/services/utility";

export default function Contact({ pages, mediaData }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const [headOffice, setHeadOffice] = useState({ en: "", fa: "" });
  const [headAddress, setHeadAddress] = useState({ en: "", fa: "" });
  const [headContact, setHeadContact] = useState({ en: "", fa: "" });
  const [secOffice, setSecOffice] = useState({ en: "", fa: "" });
  const [secAddress, setSecAddress] = useState({ en: "", fa: "" });
  const [secContact, setSecContact] = useState({ en: "", fa: "" });
  const [contactContent, setContactContent] = useState({});
  const [loader, setLoader] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [alert, setAlert] = useState("");
  const sourceLink = "https://eshareh.storage.iran.liara.space";
  const router = useRouter();

  useEffect(() => {
    let contactContent = pages.find((page) => page.slug === "contact");
    const { content } = contactContent;
    setContactContent(contactContent);
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
    setSecOffice({
      en: content[3].data.en,
      fa: content[3].data.fa,
    });
    setSecAddress({
      en: content[4].data.en,
      fa: content[4].data.fa,
    });
    setSecContact({
      en: content[5].data.en,
      fa: content[5].data.fa,
    });
  }, [pages]);

  const updateContactContent = async () => {
    const isValid = areAllStatesValid([
      headOffice,
      headAddress,
      headContact,
      secOffice,
      secAddress,
      secContact,
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
          onClick={() => updateContactContent()}
        >
          ذخیره
        </button>
      </div>
    </div>
  );
}
