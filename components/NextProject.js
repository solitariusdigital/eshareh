import { useContext } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./NextProject.module.scss";
import Image from "next/legacy/image";
import Link from "next/link";
import {
  replaceSpacesAndHyphens,
  applyFontToEnglishWords,
} from "@/services/utility";

export default function NextProject({ project }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);

  return (
    <Link
      className={classes.container}
      href={`/solutions/${replaceSpacesAndHyphens(
        project[languageType].title
      )}`}
      passHref
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
          <h3 className={classes.subtitle}>{project[languageType].subtitle}</h3>
          <div
            style={{
              fontFamily: language ? "FarsiLight" : "EnglishLight",
            }}
            className={classes.description}
          >
            <h3
              style={{
                fontFamily: language ? "FarsiBold" : "EnglishBold",
                width: language && screenSize === "mobile" ? "90px" : "",
              }}
            >
              {language ? "صورت مسئله" : "Brief"}
            </h3>
            <h3
              style={{
                fontFamily: language ? "FarsiLight" : "EnglishLight",
              }}
              className={classes.seperation}
            >
              |
            </h3>
            <h3
              className={classes.text}
              dangerouslySetInnerHTML={{
                __html: applyFontToEnglishWords(
                  project[languageType].brief,
                  "English",
                  "16px",
                  language
                ),
              }}
            ></h3>
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
    </Link>
  );
}
