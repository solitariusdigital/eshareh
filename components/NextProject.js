import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./NextProject.module.scss";
import Image from "next/legacy/image";
import { replaceSpacesAndHyphens } from "@/services/utility";
import Router from "next/router";
import two from "@/assets/two.jpg";

export default function NextProject() {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);

  const work = {
    fa: {
      image: two,
      type: "image",
      title: "صنعت خشکبار و حبوبات کوروش",
      descriptions: [
        "طراحی بسته‌بندی لانچ و معرفی کرم آبرسان گیاهی نوروزلانچ و معرفی کرم آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان آبرسان آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان گیاهی نوروز",
        "طراحی بسته‌بندی لانچ و معرفی کرم آبرسان گیاهی نوروزلانچ و معرفی کرم آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان آبرسان آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان گیاهی نوروز",
        "طراحی بسته‌بندی لانچ و معرفی کرم آبرسان گیاهی نوروزلانچ و معرفی کرم آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان آبرسان آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان گیاهی نوروز",
        "طراحی بسته‌بندی لانچ و معرفی کرم آبرسان گیاهی نوروزلانچ و معرفی کرم آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان آبرسان آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان گیاهی نوروز",
        "طراحی بسته‌بندی لانچ و معرفی کرم آبرسان گیاهی نوروزلانچ و معرفی کرم آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان آبرسان آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان گیاهی نوروز",
      ],
    },
    en: {
      image: two,
      type: "image",
      title: "Arian Kimia Company",
      descriptions: [
        "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups",
        "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups",
        "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups",
        "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups",
        "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups",
      ],
    },
  };

  return (
    <div
      className={classes.container}
      onClick={() =>
        Router.push(
          `/solutions/${replaceSpacesAndHyphens(work[languageType].title)}`
        )
      }
    >
      <h3 className={classes.text}>
        {language ? "پروژه بعدی" : "Next Project"}
      </h3>
      <div
        className={language ? classes.information : classes.informationReverse}
      >
        <h2>{work[languageType].descriptions[0]}</h2>
        <div>
          <h1>{work[languageType].title}</h1>
          <h3>{work[languageType].title}</h3>
        </div>
      </div>
      <div className={classes.imageBox}>
        <Image
          src={work[languageType].image}
          blurDataURL={work[languageType].image}
          placeholder="blur"
          alt={work[languageType].title}
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
    </div>
  );
}
