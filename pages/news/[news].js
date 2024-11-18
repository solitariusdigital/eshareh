import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import classes from "./news.module.scss";
import dbConnect from "@/services/dbConnect";
import newsModel from "@/models/News";
import { replaceSpacesAndHyphens } from "@/services/utility";
import Image from "next/legacy/image";
import Router from "next/router";
import { NextSeo } from "next-seo";
import logoEnglish from "@/assets/logoEnglish.svg";
import logoFarsi from "@/assets/logoFarsi.svg";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Tooltip from "@mui/material/Tooltip";
import { getSingleNewsApi, updateNewsApi } from "@/services/api";

export default function News({ news, newsTitle }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { displayMenu, setDisplayMenu } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
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
    const wordsPerMinute = 150;
    const words = text.trim().split(/\s+/);
    const wordCount = words.length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return {
      minutes: readingTime,
      totalTime: `${readingTime} minute(s)`,
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
              <h3 className={language ? classes.date : null}>
                {displayNews[languageType].date}
              </h3>
              {/* <p>
                {
                  calculateReadingTime(displayNews[languageType].paragraph)
                    .totalTime
                }
              </p> */}
              <div className={classes.cover}>
                <Image
                  className={classes.image}
                  src={displayNews.media[0].link}
                  placeholder="blur"
                  blurDataURL={displayNews.media[0].link}
                  alt={displayNews[languageType].subtitle}
                  layout="fill"
                  objectFit="cover"
                  as="image"
                  priority
                />
              </div>
              <h3
                style={{
                  fontFamily: language ? "FarsiLight" : "EnglishLight",
                }}
              >
                {displayNews[languageType].paragraph}
              </h3>
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
