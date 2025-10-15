import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./News.module.scss";
import { NextSeo } from "next-seo";
import logoEnglish from "@/assets/logoEnglish.svg";
import logoFarsi from "@/assets/logoFarsi.svg";
import Image from "next/legacy/image";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Tooltip from "@mui/material/Tooltip";
import {
  replaceSpacesAndHyphens,
  sliceString,
  parsePersianDate,
} from "@/services/utility";
import Link from "next/link";

export default function News({ adminNews, activeNews, portal }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const newsSource = permissionControl === "admin" ? adminNews : activeNews;
    const pageFilter = portal ? "portal" : "news";
    const filteredAndSortedNews = newsSource
      .filter((news) => news.page === pageFilter)
      .sort(
        (a, b) =>
          parsePersianDate(b.dateString) - parsePersianDate(a.dateString)
      );
    setNews(filteredAndSortedNews);
  }, [activeNews, adminNews, permissionControl, portal]);

  return (
    <Fragment>
      <NextSeo
        title={language ? "اخبار" : "News"}
        description={
          language
            ? "اشاره یک استودیوی طراحی چند رشته‌ای و مستقل است"
            : "Eshareh is a multidisciplinary, independently owned design studio"
        }
        canonical="https://eshareh.com/news"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://eshareh.com/news",
          title: language ? "اخبار" : "News",
          description: language
            ? "اشاره یک استودیوی طراحی چند رشته‌ای و مستقل است"
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
      <div className={portal ? classes.containerPortal : classes.container}>
        {!portal && (
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
                  <Link
                    className={classes.coverBox}
                    href={newsLink}
                    passHref
                    {...(portal
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
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
                          playsInline
                          preload="metadata"
                        />
                      )}
                      {permissionControl === "admin" && (
                        <div className={classes.visibility}>
                          {active ? (
                            <Tooltip title="Visible">
                              <VerifiedUserIcon sx={{ color: "#6b8745" }} />
                            </Tooltip>
                          ) : (
                            <Tooltip title="Hidden">
                              <VisibilityOffIcon sx={{ color: "#a70237" }} />
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
                    <h3
                      style={{
                        fontFamily: language ? "FarsiLight" : "FarsiLight",
                      }}
                    >
                      {sliceString(paragraph, 150)}
                    </h3>
                  </Link>
                );
              })()}
          </div>
        )}
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
                  {...(portal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {permissionControl === "admin" && (
                    <div className={classes.visibility}>
                      {item.active ? (
                        <Tooltip title="Visible">
                          <VerifiedUserIcon sx={{ color: "#6b8745" }} />
                        </Tooltip>
                      ) : (
                        <Tooltip title="Hidden">
                          <VisibilityOffIcon sx={{ color: "#a70237" }} />
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
            .slice(portal ? 0 : 1)}
        </section>
      </div>
    </Fragment>
  );
}
