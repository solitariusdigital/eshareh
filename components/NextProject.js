import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./NextProject.module.scss";
import Image from "next/legacy/image";
import { replaceSpacesAndHyphens } from "@/services/utility";
import Router from "next/router";
import two from "@/assets/two.jpg";

export default function NextProject({ project }) {
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
          `/solutions/${replaceSpacesAndHyphens(project[languageType].title)}`
        )
      }
    >
      <p className={classes.text}>{language ? "پروژه بعدی" : "Next Project"}</p>
      <div
        className={language ? classes.information : classes.informationReverse}
      >
        <h3>{project[languageType].summary}</h3>
        <div>
          <h2
            style={{
              fontFamily: language ? "FarsiMedium" : "EnglishMedium",
            }}
          >
            {project[languageType].title}
          </h2>
          <h3>{project[languageType].title}</h3>
        </div>
      </div>
      <div className={classes.imageBox}>
        {project.media[0].type === "image" ? (
          <Image
            className={classes.image}
            src={project.media[0].link}
            blurDataURL={project.media[0].link}
            placeholder="blur"
            alt={project[languageType].title}
            layout="fill"
            objectFit="cover"
            as="image"
            priority
          />
        ) : (
          <video
            className={classes.video}
            preload="metadata"
            src={project.media[0].link}
          />
        )}
      </div>
    </div>
  );
}
