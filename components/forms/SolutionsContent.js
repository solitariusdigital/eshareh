import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import classes from "./Form.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { updatePageApi } from "@/services/api";
import { areAllStatesValid, extractParagraphs } from "@/services/utility";

export default function SolutionsContent({ pages, mediaData }) {
  const [titleOne, setTitleOne] = useState({ en: "", fa: "" });
  const [paragraphOne, setParagraphOne] = useState({ en: "", fa: "" });
  const [titleTwo, setTitleTwo] = useState({ en: "", fa: "" });
  const [paragraphTwo, setParagraphTwo] = useState({ en: "", fa: "" });
  const [titleThree, setTitleThree] = useState({ en: "", fa: "" });
  const [paragraphThree, setParagraphThree] = useState({ en: "", fa: "" });

  const [titleOneSetting, setTitleOneSetting] = useState("");
  const [paragraphOneSetting, setParagraphOneSetting] = useState("");
  const [titleTwoSetting, setTitleTwoSetting] = useState("");
  const [paragraphTwoSetting, setParagraphTwoSetting] = useState("");
  const [titleThreeSetting, setTitleThreeSetting] = useState("");
  const [paragraphThreeSetting, setParagraphThreeSetting] = useState("");

  const [solutionsContent, setSolutionsContent] = useState({});
  const [disableButton, setDisableButton] = useState(false);
  const [alert, setAlert] = useState("");
  const router = useRouter();

  useEffect(() => {
    let solutionsContent = pages.find((page) => page.slug === "solutions");
    const { content } = solutionsContent;
    setSolutionsContent(solutionsContent);
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
    setParagraphTwo({
      en: content[3].data.en,
      fa: content[3].data.fa,
    });
    setTitleThree({
      en: content[4].data.en,
      fa: content[4].data.fa,
    });
    setParagraphThree({
      en: content[5].data.en,
      fa: content[5].data.fa,
    });
    setTitleOneSetting(content[0].setting);
    setParagraphOneSetting(content[1].setting);
    setTitleTwoSetting(content[2].setting);
    setParagraphTwoSetting(content[3].setting);
    setTitleThreeSetting(content[4].setting);
    setParagraphThreeSetting(content[5].setting);
  }, [pages]);

  const updateSolutionsContent = async () => {
    const isValid = areAllStatesValid([
      titleOne,
      paragraphOne,
      titleTwo,
      paragraphTwo,
      titleThree,
      paragraphThree,
    ]);

    if (!isValid) {
      showAlert("موارد ستاره‌دار الزامیست");
      return;
    }

    setDisableButton(true);

    const contentObject = {
      _id: solutionsContent["_id"],
      slug: "solutions",
      title: "Solutions",
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
          setting: paragraphTwoSetting,
          data: {
            fa: extractParagraphs(paragraphTwo.fa).join("\n\n"),
            en: extractParagraphs(paragraphTwo.en).join("\n\n"),
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
          setting: paragraphThreeSetting,
          data: {
            fa: extractParagraphs(paragraphThree.fa).join("\n\n"),
            en: extractParagraphs(paragraphThree.en).join("\n\n"),
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
              Paragraph Three
              <span>*</span>
            </p>
            <CloseIcon
              className="icon"
              onClick={() =>
                setParagraphThree((prevData) => ({
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
            id="paragraphThreeEn"
            name="paragraphThree"
            onChange={(e) =>
              setParagraphThree((prevData) => ({
                ...prevData,
                en: e.target.value,
              }))
            }
            value={paragraphThree.en}
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
              پاراگراف سه
            </p>
            <CloseIcon
              className="icon"
              onClick={() =>
                setParagraphThree((prevData) => ({
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
            id="paragraphThreeFa"
            name="paragraphThree"
            onChange={(e) =>
              setParagraphThree((prevData) => ({
                ...prevData,
                fa: e.target.value,
              }))
            }
            value={paragraphThree.fa}
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
            <p className={classes.label}>رنگ و سایز پاراگراف سه</p>
            <CloseIcon
              className="icon"
              onClick={() => setParagraphThreeSetting("")}
              sx={{ fontSize: 16 }}
            />
          </div>
          <input
            style={{
              fontFamily: "English",
            }}
            placeholder="000000 16"
            type="text"
            id="paragraphThreeSetting"
            name="paragraphThreeSetting"
            onChange={(e) => setParagraphThreeSetting(e.target.value)}
            value={paragraphThreeSetting}
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
            onClick={() => updateSolutionsContent()}
          >
            ذخیره داده
          </button>
        </div>
      </div>
    </div>
  );
}
