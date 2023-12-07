import { useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./profession.module.scss";
import { NextSeo } from "next-seo";

export default function Profession() {
  const { language, setLanguage } = useContext(StateContext);

  return (
    <Fragment>
      <NextSeo
        title={language ? "حرفه ما" : "What we do"}
        description={
          language
            ? "اشاره یک استودیوی طراحی چند رشته ای و مستقل است"
            : "Eshareh is a multidisciplinary, independently owned design studio"
        }
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://eshareh.com/profession",
          siteName: "Eshareh Advertising Agency",
        }}
      />
      <div className={classes.container}>
        <p>Profession</p>
      </div>
    </Fragment>
  );
}
