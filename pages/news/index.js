import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./news.module.scss";
import { NextSeo } from "next-seo";
import logoEnglish from "@/assets/logoEnglish.svg";
import logoFarsi from "@/assets/logoFarsi.svg";
import Image from "next/legacy/image";
import dbConnect from "@/services/dbConnect";
import newsModel from "@/models/News";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Tooltip from "@mui/material/Tooltip";
import { replaceSpacesAndHyphens } from "@/services/utility";
import Router from "next/router";

export default function News({ adminNews, activeNews }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const [news, setNews] = useState([]);

  useEffect(() => {
    if (permissionControl === "admin") {
      setNews(
        adminNews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } else {
      setNews(
        activeNews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    }
  }, [activeNews, adminNews, languageType, permissionControl]);

  const directNews = (item) => {
    let link = `/news/${replaceSpacesAndHyphens(item[languageType].title)}`;
    Router.push(link);
  };

  return (
    <Fragment>
      <NextSeo
        title={language ? "اخبار" : "News"}
        description={
          language
            ? "اشاره یک استودیوی طراحی چند رشته ای و مستقل است"
            : "Eshareh is a multidisciplinary, independently owned design studio"
        }
        canonical="https://eshareh.com/news"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://eshareh.com/news",
          title: language ? "اخبار" : "News",
          description: language
            ? "اشاره یک استودیوی طراحی چند رشته ای و مستقل است"
            : "Eshareh is a multidisciplinary, independently owned design studio",
          siteName: language
            ? "آژانس تبلیغاتی اشاره"
            : "Eshareh Advertising Agency",
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
      <div className={classes.container}>
        <div
          className={language ? classes.newsCover : classes.newsCoverReverse}
        >
          <h1>{language ? "اخبار" : "News"}</h1>
          {news[0] && (
            <div onClick={() => directNews(news[0])}>
              <div className={classes.cover}>
                <Image
                  src={news[0].media[0].link}
                  placeholder="blur"
                  blurDataURL={news[0].media[0].link}
                  alt={news[0][languageType].subtitle}
                  layout="fill"
                  objectFit="cover"
                  as="image"
                  priority
                />
                {permissionControl === "admin" && (
                  <div className={classes.visibility}>
                    {news[0].active ? (
                      <Tooltip title="Visible">
                        <VerifiedUserIcon sx={{ color: "#57a361" }} />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Hidden">
                        <VisibilityOffIcon sx={{ color: "#d40d12" }} />
                      </Tooltip>
                    )}
                  </div>
                )}
              </div>
              <h3>{news[0][languageType].title}</h3>
            </div>
          )}
        </div>
        <section
          className={language ? classes.gridList : classes.gridListReverse}
        >
          {news
            .map((item, index) => {
              const { title } = item[languageType];
              const { media } = item;
              return (
                <Fragment key={index}>
                  <div
                    className={classes.item}
                    onClick={() => directNews(item)}
                  >
                    {permissionControl === "admin" && (
                      <div className={classes.visibility}>
                        {item.active ? (
                          <Tooltip title="Visible">
                            <VerifiedUserIcon sx={{ color: "#57a361" }} />
                          </Tooltip>
                        ) : (
                          <Tooltip title="Hidden">
                            <VisibilityOffIcon sx={{ color: "#d40d12" }} />
                          </Tooltip>
                        )}
                      </div>
                    )}
                    <div className={classes.box}>
                      <Image
                        src={media[0].link}
                        placeholder="blur"
                        blurDataURL={media[0].link}
                        alt={title}
                        layout="fill"
                        objectFit="cover"
                        as="image"
                        priority
                      />
                    </div>
                    <div
                      className={
                        language ? classes.title : classes.titleReverse
                      }
                      style={{
                        fontFamily: language ? "FarsiLight" : "EnglishLight",
                      }}
                    >
                      <h3>{title}</h3>
                    </div>
                  </div>
                </Fragment>
              );
            })
            .slice(1)}
        </section>
      </div>
    </Fragment>
  );
}

// initial connection to db
export async function getServerSideProps(context) {
  try {
    await dbConnect();
    const news = await newsModel.find();
    let activeNews = news.filter((project) => project.active);

    return {
      props: {
        activeNews: JSON.parse(JSON.stringify(activeNews)),
        adminNews: JSON.parse(JSON.stringify(news)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
