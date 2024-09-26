import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import classes from "./Form.module.scss";
import Image from "next/legacy/image";
import CloseIcon from "@mui/icons-material/Close";
import loaderImage from "@/assets/loader.png";
import { updatePageApi } from "@/services/api";
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
  const [loader, setLoader] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [alert, setAlert] = useState("");
  const [development, setDevelopment] = useState(false);

  const router = useRouter();

  useEffect(() => {
    let homeContent = pages.find((page) => page.slug === "home");
    const { content } = homeContent;
    setHomeContent(homeContent);
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

  const handleSubmit = async () => {
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
              }}
              onClick={() => handleSubmit()}
            >
              ذخیره
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
