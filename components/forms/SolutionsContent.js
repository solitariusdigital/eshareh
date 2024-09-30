import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import classes from "./Form.module.scss";
import Image from "next/legacy/image";
import CloseIcon from "@mui/icons-material/Close";
import { updatePageApi } from "@/services/api";
import { areAllStatesValid, extractParagraphs } from "@/services/utility";
import building from "@/assets/building.png";

export default function SolutionsContent({ pages, mediaData }) {
  const [titleOne, setTitleOne] = useState({ en: "", fa: "" });
  const [paragraphOne, setParagraphOne] = useState({ en: "", fa: "" });
  const [titleTwo, setTitleTwo] = useState({ en: "", fa: "" });
  const [paragraphTwo, setParagraphTwo] = useState({ en: "", fa: "" });
  const [titleThree, setTitleThree] = useState({ en: "", fa: "" });
  const [paragraphThree, setParagraphThree] = useState({ en: "", fa: "" });
  const [solutionsContent, setSolutionsContent] = useState({});
  const [disableButton, setDisableButton] = useState(false);
  const [alert, setAlert] = useState("");
  const router = useRouter();
  const [development, setDevelopment] = useState(true);

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
      showAlert("همه موارد الزامیست");
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
            fa: extractParagraphs(paragraphTwo.fa).join("\n\n"),
            en: extractParagraphs(paragraphTwo.en).join("\n\n"),
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
                type="paragraphThree"
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
                type="paragraphThree"
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
