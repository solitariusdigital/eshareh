import { useContext } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./NextProject.module.scss";
import Image from "next/legacy/image";
import {
  replaceSpacesAndHyphens,
  applyFontToEnglishWords,
} from "@/services/utility";
import Router from "next/router";

export default function NextProject({ project }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);

  return (
    <div
      className={classes.container}
      onClick={() =>
        Router.push(
          `/solutions/${replaceSpacesAndHyphens(project[languageType].title)}`
        )
      }
    >
      <h4 className={classes.next}>
        {language ? "پروژه بعدی" : "Next Project"}
      </h4>
      <div
        className={language ? classes.information : classes.informationReverse}
      >
        <div>
          <h2
            style={{
              fontFamily: language ? "FarsiBold" : "EnglishBold",
            }}
          >
            {project[languageType].title}
          </h2>
          <h3>{project[languageType].subtitle}</h3>
          <div
            style={{
              fontFamily: language ? "FarsiLight" : "EnglishLight",
            }}
            className={classes.description}
          >
            <p
              className={language ? classes.brief : ""}
              style={{
                fontFamily: language ? "FarsiBold" : "EnglishBold",
              }}
            >
              {language ? "خلاصه" : "Brief"}
            </p>
            <p
              style={{
                fontFamily: language ? "EnglishLight" : "EnglishLight",
              }}
              className={classes.seperation}
            >
              |
            </p>
            <p
              className={classes.text}
              dangerouslySetInnerHTML={{
                __html: applyFontToEnglishWords(
                  project[languageType].brief,
                  "English"
                ),
              }}
            ></p>
          </div>
        </div>
      </div>
      <div className={classes.imageBox}>
        {project.coverMedia.type === "image" ? (
          <Image
            className={classes.image}
            src={project.coverMedia.link}
            blurDataURL={project.coverMedia.link}
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
            src={project.coverMedia.link + "#t=0.1"}
            playsInline
            preload="metadata"
          />
        )}
      </div>
    </div>
  );
}
