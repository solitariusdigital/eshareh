import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import classes from "./news.module.scss";
import dbConnect from "@/services/dbConnect";
import newsModel from "@/models/News";
import Image from "next/legacy/image";
import Router from "next/router";
import { NextSeo } from "next-seo";
import logoEnglish from "@/assets/logoEnglish.svg";
import logoFarsi from "@/assets/logoFarsi.svg";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import { getSingleNewsApi, updateNewsApi } from "@/services/api";
import {
  replaceSpacesAndHyphens,
  toFarsiNumber,
  applyFontToEnglishWords,
} from "@/services/utility";

export default function News({ news, newsTitle }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { displayMenu, setDisplayMenu } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { editNews, setEditNews } = useContext(StateContext);
  const [displayNews, setDisplayNews] = useState(null);
  const [dropDown, setDropDpwn] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const router = useRouter();

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
    if (!displayNews) {
      Router.push("/404");
      return;
    }
    setDisplayNews(displayNews);
  }, [permissionControl, displayNews, news, newsTitle]);

  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/);
    const wordCount = words.length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return {
      time: language
        ? `${toFarsiNumber(readingTime)} دقیقه مطالعه`
        : `${readingTime} min read`,
    };
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

  return (
    <Fragment>
      {displayNews && (
        <Fragment>
          <NextSeo
            title={displayNews[languageType].title}
            description={displayNews[languageType].subtitle}
            canonical={`https://eshareh.com/news/${replaceSpacesAndHyphens(
              displayNews[languageType].title
            )}`}
            openGraph={{
              type: "article",
              locale: "fa_IR",
              url: `https://eshareh.com/news/${replaceSpacesAndHyphens(
                displayNews[languageType].title
              )}`,
              title: `${displayNews[languageType].title}`,
              description: `${displayNews[languageType].subtitle}`,
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
                alt: language
                  ? "آژانس تبلیغاتی اشاره"
                  : "Eshareh Advertising Agency",
              },
            }}
            robotsProps={{
              maxSnippet: -1,
              maxImagePreview: "large",
              maxVideoPreview: -1,
            }}
          />
          {permissionControl === "admin" && (
            <Fragment>
              <div className={classes.controlPanel}>
                {displayNews.active ? (
                  <Tooltip title="Hide">
                    <VerifiedUserIcon
                      className="icon"
                      sx={{ color: "#57a361" }}
                      onClick={() => manageNews("hide")}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Publish">
                    <VisibilityOffIcon
                      className="icon"
                      sx={{ color: "#d40d12" }}
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
              </div>
              {dropDown && (
                <div
                  className={classes.dropDown}
                  style={{
                    fontFamily: language ? "English" : "English",
                  }}
                >
                  <h3>{confirmMessage}</h3>
                  <div className={classes.action}>
                    <p
                      className={classes.cancel}
                      onClick={() => setDropDpwn(false)}
                    >
                      Cancel
                    </p>
                    <p
                      className={classes.confirm}
                      onClick={() => updateNews(displayNews["_id"])}
                    >
                      Confirm
                    </p>
                  </div>
                </div>
              )}
            </Fragment>
          )}
          <div className={classes.container}>
            <div
              className={
                language ? classes.singleNews : classes.singleNewsReverse
              }
            >
              <h1
                style={{
                  fontFamily: language ? "FarsiBold" : "EnglishBold",
                }}
              >
                {displayNews[languageType].title}
              </h1>
              <h2>{displayNews[languageType].subtitle}</h2>
              <div className={classes.info}>
                <h3 className={language ? classes.date : classes.dateReverse}>
                  {displayNews[languageType].date}
                </h3>
                <p>
                  {
                    calculateReadingTime(displayNews[languageType].paragraph)
                      .time
                  }
                </p>
              </div>
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
                {displayNews.media[displayNews.media.length - 1].type ===
                "image" ? (
                  <Image
                    className={classes.image}
                    src={displayNews.media[displayNews.media.length - 1].link}
                    placeholder="blur"
                    blurDataURL={
                      displayNews.media[displayNews.media.length - 1].link
                    }
                    alt={displayNews[languageType].subtitle}
                    layout="fill"
                    objectFit="cover"
                    as="image"
                    priority
                  />
                ) : (
                  <video
                    className={classes.video}
                    src={displayNews.media[0].link + "#t=0.1"}
                    controls
                    playsInline
                    preload="metadata"
                  />
                )}
              </div>
              {displayNews[languageType].paragraph
                .split("\n\n")
                .map((desc, index) => (
                  <h3
                    key={index}
                    style={{
                      fontFamily: language ? "FarsiLight" : "EnglishLight",
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
                  ></h3>
                ))}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

// initial connection to db
export async function getServerSideProps(context) {
  try {
    await dbConnect();
    const news = await newsModel.find();
    return {
      props: {
        news: JSON.parse(JSON.stringify(news)),
        newsTitle: JSON.parse(
          JSON.stringify(replaceSpacesAndHyphens(context.query.news))
        ),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
