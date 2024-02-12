import { useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./news.module.scss";
import { NextSeo } from "next-seo";

export default function News() {
  const { language, setLanguage } = useContext(StateContext);

  return (
    <Fragment>
      <NextSeo
        title={language ? "اخبار" : "News"}
        description={
          language
            ? "اشاره یک استودیوی طراحی چند رشته ای و مستقل است"
            : "Eshareh is a multidisciplinary, independently owned design studio"
        }
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://eshareh.com/news",
          siteName: "Eshareh Advertising Agency",
        }}
      />
      <div
        className={classes.container}
        style={{
          fontFamily: language ? "English" : "English",
        }}
      >
        <p>News ... coming soon</p>
      </div>
    </Fragment>
  );
}
