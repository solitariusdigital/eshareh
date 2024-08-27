import { Fragment, useContext, useState, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./Form.module.scss";
import Image from "next/legacy/image";
import CloseIcon from "@mui/icons-material/Close";
import loaderImage from "@/assets/loader.png";
import { areAllStatesValid, extractParagraphs } from "@/services/utility";
import { updatePageApi } from "@/services/api";

export default function Profession({ pages }) {
  const [main, setMain] = useState({ en: "", fa: "" });
  const [paragraph, setParagraphs] = useState({ en: "", fa: "" });
  const [alert, setAlert] = useState("");
  const [professionData, setProfessionData] = useState(false);

  useEffect(() => {
    let professionData = pages.find((page) => page.slug === "profession");
    const { content } = professionData;
    setProfessionData(professionData);
    setMain({
      en: content[0].data.en,
      fa: content[0].data.fa,
    });
    setParagraphs({
      en: content[1].data.en,
      fa: content[1].data.fa,
    });
  }, [pages]);

  const handleSubmit = async () => {
    const isValid = areAllStatesValid([main, paragraph]);

    if (!isValid) {
      showAlert("همه موارد الزامیست");
      return;
    }

    const dataObject = {
      _id: professionData["_id"],
      slug: "profession",
      title: "What we do",
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
    await updatePageApi(dataObject);
    showAlert("داده ذخیره شد");
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
              id="main"
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
              id="paragraph"
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
              id="main"
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
              id="paragraph"
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
      </div>
      <div
        className={classes.formAction}
        style={{
          fontFamily: "Farsi",
        }}
      >
        <p className={classes.alert}>{alert}</p>
        <button
          onClick={() => handleSubmit()}
          style={{
            fontFamily: "FarsiMedium",
          }}
        >
          ذخیره
        </button>
      </div>
    </Fragment>
  );
}
