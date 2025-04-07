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
import {
  replaceSpacesAndHyphens,
  sliceString,
  parsePersianDate,
} from "@/services/utility";
import Link from "next/link";

export default function News({ adminNews, activeNews }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const [news, setNews] = useState([]);

  useEffect(() => {
    if (permissionControl === "admin") {
      setNews(
        adminNews.sort(
          (a, b) =>
            parsePersianDate(b.dateString) - parsePersianDate(a.dateString)
        )
      );
    } else {
      setNews(
        activeNews.sort(
          (a, b) =>
            parsePersianDate(b.dateString) - parsePersianDate(a.dateString)
        )
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
        robots="index, follow"
      />
      <div className={classes.container}>
        <div className={classes.newsCover}>
          <h1
            style={{
              fontFamily: language ? "Farsi" : "Farsi",
            }}
          >
            اخبار
          </h1>
          {news[0] &&
            (() => {
              const {
                media,
                [languageType]: { title, paragraph },
                active,
              } = news[0];
              const lastMedia = media[media.length - 1];
              const newsLink = `/news/${replaceSpacesAndHyphens(
                news[0][languageType].title
              )}`;
              return (
                <Link className={classes.coverBox} href={newsLink} passHref>
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
                        // controls
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
                  <h2
                    style={{
                      fontFamily: language ? "FarsiLight" : "FarsiLight",
                    }}
                  >
                    {title}
                  </h2>
                  <p
                    style={{
                      fontFamily: language ? "FarsiLight" : "FarsiLight",
                    }}
                  >
                    {sliceString(paragraph, 150)}
                  </p>
                </Link>
              );
            })()}
        </div>
        <section className={classes.gridList}>
          {news
            .map((item, index) => {
              const { title, paragraph } = item[languageType];
              const { media } = item;
              const lastMedia = media[media.length - 1];
              const newsLink = `/news/${replaceSpacesAndHyphens(
                item[languageType].title
              )}`;
              return (
                <Link
                  key={index}
                  className={classes.item}
                  href={newsLink}
                  passHref
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
                        // controls
                        playsInline
                        preload="metadata"
                      />
                    )}
                  </div>
                  <h2
                    style={{
                      fontFamily: language ? "FarsiLight" : "FarsiLight",
                    }}
                  >
                    {title}
                  </h2>
                  <p
                    style={{
                      fontFamily: language ? "FarsiLight" : "FarsiLight",
                    }}
                  >
                    {sliceString(paragraph, 100)}
                  </p>
                </Link>
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
