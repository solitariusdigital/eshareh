import { useState, useContext, Fragment, useEffect, useRef } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import classes from "./News.module.scss";
import Image from "next/legacy/image";
import Router from "next/router";
import { NextSeo } from "next-seo";
import logoEnglish from "@/assets/logoEnglish.svg";
import logoFarsi from "@/assets/logoFarsi.svg";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { getSingleNewsApi, updateNewsApi, deleteNewsApi } from "@/services/api";
import {
  replaceSpacesAndHyphens,
  toFarsiNumber,
  applyFontToEnglishWords,
  sliceString,
} from "@/services/utility";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function News({ news, newsTitle }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { editNews, setEditNews } = useContext(StateContext);
  const [displayNews, setDisplayNews] = useState(null);
  const [similarNews, setSimilarNews] = useState([]);
  const [dropDown, setDropDpwn] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [expandedItem, setExpandedItem] = useState(false);
  const router = useRouter();
  const refs = useRef([]);

  useEffect(() => {
    let displayNews = null;
    if (permissionControl === "admin") {
      displayNews = news.find(
        (p) => p.en.title === newsTitle || p.fa.title === newsTitle
      );
    } else {
      let activeNews = news.filter((news) => news.active);
      displayNews = activeNews.find(
        (p) => p.en.title === newsTitle || p.fa.title === newsTitle
      );
    }

    const categoriesArray = displayNews[languageType].category.split(" ");
    const filterSimilarNews = news
      .filter(
        (news) =>
          categoriesArray.some((word) =>
            news[languageType].category.includes(word)
          ) && news._id !== displayNews._id
      )
      .slice(0, 2);
    setSimilarNews(filterSimilarNews);

    if (!displayNews) {
      Router.push("/404");
      return;
    }
    setDisplayNews(displayNews);
  }, [permissionControl, displayNews, news, newsTitle, languageType]);

  const getTotalReadingTime = (data) => {
    const paragraph = data[languageType].paragraph;
    const descriptions = data.fields
      .map((field) => field[languageType].description)
      .join(" ");
    const combinedText = paragraph + " " + descriptions;
    const readingTime = calculateReadingTime(combinedText);
    return `${toFarsiNumber(readingTime)} دقیقه مطالعه`;
  };

  const calculateReadingTime = (text) => {
    const wordsPerMinute = 180;
    const words = text.trim().split(/\s+/);
    const wordCount = words.length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

  const manageNews = (type) => {
    setDropDpwn(!dropDown);
    setConfirmMessage(type === "show" ? "Publish" : "Hide");
  };

  const updateNews = async (id) => {
    let data = await getSingleNewsApi(id);
    switch (confirmMessage) {
      case "Publish":
        data.active = true;
        break;
      case "Hide":
        data.active = false;
        break;
    }
    await updateNewsApi(data);
    setDropDpwn(false);
    router.replace(router.asPath);
  };

  const applyFontAndReplaceKeywords = (
    string,
    fontType,
    size,
    language,
    keyword,
    link
  ) => {
    // Apply font to English words
    let fontSize = language ? size : null;
    const pattern = language ? /[a-zA-Z0-9۰-۹]+/g : /[0-9]+/g;
    // Find and replace English words with span tags for specific font type
    let outputString = string.replace(pattern, function (match) {
      return `<span style="font-family: ${fontType}; font-size: ${fontSize};">${match}</span>`;
    });
    // Replace specified keyword with a link
    if (keyword && link) {
      const linkTag = `<a style="color: #fdb714;" href="${link}" target="_blank" rel="noopener noreferrer">${keyword}</a>`;
      const regex = new RegExp(keyword, "g");
      outputString = outputString.replace(regex, linkTag);
    }
    return outputString;
  };

  const scrollToDiv = (index) => {
    if (refs.current[index]) {
      const element = refs.current[index];
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - 110;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const CombinedComponent = ({ list, languageType, language }) => {
    const Tag = list[languageType].tag;
    const title = list[languageType].title;
    return (
      <Tag>
        <div
          dangerouslySetInnerHTML={{
            __html: applyFontToEnglishWords(title, "English", "22px", language),
          }}
        />
      </Tag>
    );
  };

  const deleteNews = async (news) => {
    let confirmationMessage = "حذف مطمئنی؟";
    let confirm = window.confirm(confirmationMessage);
    if (confirm) {
      await deleteNewsApi(news._id);
      Router.push("/news");
    }
  };

  const deleteImage = async (index) => {
    let confirmationMessage = "حذف مطمئنی؟";
    let confirm = window.confirm(confirmationMessage);
    if (confirm) {
      let media = [...displayNews.media];
      media.splice(index, 1);
      let dataObject = {
        ...displayNews,
        media: media,
      };
      await updateNewsApi(dataObject);
      router.replace(router.asPath);
    }
  };

  const makeCover = async (index) => {
    let confirmationMessage = "کاور مطمئنی؟";
    let confirm = window.confirm(confirmationMessage);
    if (confirm) {
      let media = [...displayNews.media];
      let itemToMove = media.splice(index, 1)[0];
      media.push(itemToMove);
      let dataObject = {
        ...displayNews,
        media: media,
      };
      await updateNewsApi(dataObject);
      router.replace(router.asPath);
    }
  };

  return (
    <Fragment>
      {displayNews && (
        <Fragment>
          <NextSeo
            title={displayNews[languageType].titleSeo}
            description={displayNews[languageType].descriptionSeo}
            canonical={`https://eshareh.com/news/${replaceSpacesAndHyphens(
              displayNews[languageType].title
            )}`}
            openGraph={{
              type: "article",
              locale: "fa_IR",
              url: `https://eshareh.com/news/${replaceSpacesAndHyphens(
                displayNews[languageType].title
              )}`,
              title: `${displayNews[languageType].titleSeo}`,
              description: `${displayNews[languageType].descriptionSeo}`,
              siteName: language
                ? "آژانس تبلیغاتی اشاره"
                : "Eshareh Advertising Agency",
              article: {
                publishedTime: displayNews.createdAt,
                modifiedTime: displayNews.updatedAt,
                authors: ["https://www.eshareh.com"],
              },
              images: {
                url: language ? logoFarsi : logoEnglish,
                width: 1200,
                height: 630,
                alt: language ? "اشاره" : "Eshareh",
              },
            }}
            robots="index, follow"
            additionalMetaTags={[
              {
                name: "keywords",
                content: displayNews[languageType].category,
              },
            ]}
          />
          {permissionControl === "admin" && (
            <Fragment>
              <div className="controlPanel">
                {displayNews.active ? (
                  <Tooltip title="Hide">
                    <VerifiedUserIcon
                      className="icon"
                      sx={{ color: "#6b8745" }}
                      onClick={() => manageNews("hide")}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Publish">
                    <VisibilityOffIcon
                      className="icon"
                      sx={{ color: "#a70237" }}
                      onClick={() => manageNews("show")}
                    />
                  </Tooltip>
                )}
                <Tooltip title="Edit">
                  <EditIcon
                    className="icon"
                    onClick={() => {
                      Router.push("/admin");
                      setEditNews(displayNews);
                    }}
                  />
                </Tooltip>
                <Tooltip title="Delete">
                  <DeleteOutlineIcon
                    className="icon"
                    onClick={() => deleteNews(displayNews)}
                  />
                </Tooltip>
              </div>
              {dropDown && (
                <div
                  className="dropDown"
                  style={{
                    fontFamily: language ? "English" : "English",
                  }}
                >
                  <h3>{confirmMessage}</h3>
                  <div className="action">
                    <p className="cancel" onClick={() => setDropDpwn(false)}>
                      Cancel
                    </p>
                    <p
                      className="confirm"
                      onClick={() => updateNews(displayNews._id)}
                    >
                      Confirm
                    </p>
                  </div>
                </div>
              )}
            </Fragment>
          )}
          <article
            className={classes.container}
            style={{
              fontFamily: language ? "Farsi" : "Farsi",
            }}
          >
            <div className={classes.singleNews}>
              <h1
                style={{
                  fontFamily: language ? "FarsiBold" : "FarsiBold",
                }}
              >
                {displayNews[languageType].title}
              </h1>
              <h2>{displayNews[languageType].subtitle}</h2>
              <ul className={classes.info}>
                <Link href={"/news"} passHref>
                  <li className={classes.date}>
                    {displayNews[languageType].date}
                  </li>
                </Link>
                <li className={classes.gap}>|</li>
                <Link href={"/news"} passHref>
                  <li>{getTotalReadingTime(displayNews)}</li>
                </Link>
              </ul>
              {displayNews.voice?.length > 0 && (
                <div>
                  <audio className={classes.voice} preload="metadata" controls>
                    <source
                      src={displayNews.voice[displayNews.voice.length - 1].link}
                    />
                  </audio>
                </div>
              )}
              <div className={classes.cover}>
                <div className={classes.swiper}>
                  <Swiper
                    className={classes.slide}
                    slidesPerView="auto"
                    spaceBetween={0}
                    mousewheel={true}
                    loop={true}
                    modules={[Autoplay]}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: true,
                    }}
                    speed={1500}
                  >
                    {displayNews.media.map((image, index) => (
                      <SwiperSlide key={index}>
                        {permissionControl === "admin" && (
                          <div
                            className={classes.control}
                            style={{
                              fontFamily: language ? "English" : "English",
                            }}
                          >
                            <p
                              className={classes.item}
                              onClick={() => deleteImage(index)}
                            >
                              Delete
                            </p>
                            <p
                              className={classes.item}
                              onClick={() => makeCover(index)}
                            >
                              Cover
                            </p>
                          </div>
                        )}
                        <div className={classes.imageContainer}>
                          {image.type === "image" ? (
                            <Image
                              className={classes.image}
                              src={image.link}
                              blurDataURL={image.link}
                              placeholder="blur"
                              alt={image.link}
                              layout="fill"
                              objectFit="cover"
                              as="image"
                              priority
                            />
                          ) : (
                            <video
                              className={classes.video}
                              src={image.link + "#t=0.1"}
                              controls
                              playsInline
                              preload="metadata"
                            />
                          )}
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
              {displayNews[languageType].paragraph
                .split("\n\n")
                .map((desc, index) => (
                  <p
                    key={index}
                    style={{
                      fontFamily: language ? "FarsiLight" : "FarsiLight",
                    }}
                    className={classes.paragraph}
                    dangerouslySetInnerHTML={{
                      __html: applyFontToEnglishWords(
                        desc,
                        "English",
                        "16px",
                        language
                      ),
                    }}
                  ></p>
                ))}
              {displayNews.fields.length > 0 && (
                <div className={classes.table}>
                  <div
                    className={classes.main}
                    onClick={() => setExpandedItem(!expandedItem)}
                  >
                    <h4>فهرست مطالب</h4>
                    {expandedItem ? (
                      <ExpandLessIcon sx={{ fontSize: 20 }} />
                    ) : (
                      <ExpandMoreIcon sx={{ fontSize: 20 }} />
                    )}
                  </div>
                  {expandedItem && (
                    <ul className={classes.list}>
                      {displayNews.fields.map((list, index) => (
                        <li
                          key={index}
                          onClick={() => scrollToDiv(index)}
                          dangerouslySetInnerHTML={{
                            __html: applyFontToEnglishWords(
                              list[languageType].title,
                              "English",
                              "14px",
                              "fa"
                            ),
                          }}
                        ></li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              {displayNews.fields.map((list, index) => (
                <div
                  className={classes.paragraphs}
                  key={index}
                  ref={(el) => (refs.current[index] = el)}
                  id={`div-${index}`}
                >
                  <CombinedComponent
                    list={list}
                    languageType={"en"}
                    language={"english"}
                  />
                  {list[languageType].description
                    .split("\n\n")
                    .map((desc, index) => (
                      <p
                        key={index}
                        style={{
                          fontFamily: "FarsiLight",
                        }}
                        className={classes.paragraph}
                        dangerouslySetInnerHTML={{
                          __html: applyFontAndReplaceKeywords(
                            desc,
                            "English",
                            "16px",
                            "en",
                            list[languageType].word,
                            list[languageType].link
                          ),
                        }}
                      />
                    ))}
                </div>
              ))}
            </div>
          </article>
          <section
            className={classes.similar}
            style={{
              fontFamily: language ? "Farsi" : "Farsi",
            }}
          >
            {similarNews.map((news, index) => (
              <Link
                key={index}
                className={classes.cover}
                href={`/news/${replaceSpacesAndHyphens(
                  news[languageType].title
                )}`}
                passHref
              >
                <div className={classes.keywords}>
                  {displayNews[languageType].category
                    .split(" ")
                    .map((cat, index) => (
                      <p key={index}>{cat}</p>
                    ))}
                </div>
                <div className={classes.cover}>
                  {news.media[news.media.length - 1].type === "image" ? (
                    <Image
                      className={classes.image}
                      src={news.media[news.media.length - 1].link}
                      placeholder="blur"
                      blurDataURL={news.media[news.media.length - 1].link}
                      alt={news[languageType].subtitle}
                      layout="fill"
                      objectFit="cover"
                      as="image"
                      priority
                    />
                  ) : (
                    <video
                      className={classes.video}
                      src={news.media[0].link + "#t=0.1"}
                      controls
                      playsInline
                      preload="metadata"
                    />
                  )}
                </div>
                <h3>{news[languageType].title}</h3>
                <p
                  style={{
                    fontFamily: language ? "FarsiLight" : "FarsiLight",
                  }}
                >
                  {sliceString(news[languageType].paragraph, 150)}
                </p>
              </Link>
            ))}
          </section>
        </Fragment>
      )}
    </Fragment>
  );
}
