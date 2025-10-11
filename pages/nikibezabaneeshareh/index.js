import { useContext, Fragment, useEffect, useState } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./nikibezabaneeshareh.module.scss";
import { NextSeo } from "next-seo";
import logoEnglish from "@/assets/logoEnglish.svg";
import logoFarsi from "@/assets/logoFarsi.svg";
import { getCharityApi, updateCharityApi } from "@/services/api";

export default function Nikibezabaneeshareh() {
  const { language, setLanguage } = useContext(StateContext);
  const { displayFooter, setFooter } = useContext(StateContext);
  const { displayMenu, setDisplayMenu } = useContext(StateContext);

  useEffect(() => {
    setFooter(false);
    setDisplayMenu(false);
    document.body.style.marginTop = "0px";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <NextSeo
        title={language ? "نیکی به زبان اشاره" : "Niki be zabane Eshareh"}
        description={
          language
            ? "اشاره یک استودیوی طراحی چند رشته ای و مستقل است"
            : "Eshareh is a multidisciplinary, independently owned design studio"
        }
        canonical="https://eshareh.com/nikibezabaneeshareh"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://eshareh.com/nikibezabaneeshareh",
          title: language ? "نیکی به زبان اشاره" : "Niki be zabane Eshareh",
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
      <div
        className={classes.container}
        style={{
          fontFamily: language ? "FarsiBold" : "FarsiBold",
        }}
      >
        nikibezabaneeshareh
      </div>
      ;
    </Fragment>
  );
}
