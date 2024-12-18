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
import Link from "next/link";

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
            alt: language ? "اشاره" : "Eshareh",
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
          {news[0] &&
            (() => {
              const {
                media,
                [languageType]: { title },
                active,
              } = news[0];
              const lastMedia = media[media.length - 1];
              const newsLink = `/news/${replaceSpacesAndHyphens(
                news[0][languageType].title
              )}`;
              return (
                <div
                  className={classes.coverBox}
                  onClick={() => Router.push(newsLink)}
                >
                  <Link href={newsLink} passHref>
                    <div className={classes.cover}>
                      {lastMedia.type === "image" ? (
                        <Image
                          src={lastMedia.link}
                          placeholder="blur"
                          blurDataURL={lastMedia.link}
                          alt={title}
                          layout="fill"
                          objectFit="cover"
                          as="image"
                          priority
                        />
                      ) : (
                        <video
                          className={classes.video}
                          src={`${lastMedia.link}#t=0.1`}
                          controls
                          playsInline
                          preload="metadata"
                        />
                      )}
                      {permissionControl === "admin" && (
                        <div className={classes.visibility}>
                          {active ? (
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
                    <h3>{title}</h3>
                  </Link>
                </div>
              );
            })()}
        </div>
        <section
          className={language ? classes.gridList : classes.gridListReverse}
        >
          {news
            .map((item, index) => {
              const { title } = item[languageType];
              const { media } = item;
              const lastMedia = media[media.length - 1];
              const newsLink = `/news/${replaceSpacesAndHyphens(
                item[languageType].title
              )}`;
              return (
                <Fragment key={index}>
                  <Link href={newsLink} passHref>
                    <div
                      className={classes.item}
                      onClick={() => Router.push(newsLink)}
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
                        {lastMedia.type === "image" ? (
                          <Image
                            src={lastMedia.link}
                            placeholder="blur"
                            blurDataURL={lastMedia.link}
                            alt={title}
                            layout="fill"
                            objectFit="cover"
                            as="image"
                            priority
                          />
                        ) : (
                          <video
                            className={classes.video}
                            src={lastMedia.link + "#t=0.1"}
                            controls
                            playsInline
                            preload="metadata"
                          />
                        )}
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
                  </Link>
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
