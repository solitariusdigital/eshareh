import { useContext } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./NextProject.module.scss";
import Image from "next/legacy/image";
import { replaceSpacesAndHyphens } from "@/services/utility";
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
      <h4 className={classes.text}>
        {language ? "پروژه بعدی" : "Next Project"}
      </h4>
      <div
        className={language ? classes.information : classes.informationReverse}
      >
        <div>
          <h2
            style={{
              fontFamily: language ? "FarsiMedium" : "EnglishMedium",
            }}
          >
            {project[languageType].title}
          </h2>
          <h3>{project[languageType].subtitle}</h3>
          <p className={classes.description}>
            <span
              style={{
                fontFamily: language ? "FarsiMedium" : "EnglishMedium",
              }}
            >
              {language ? "خلاصه |" : "Brief |"}
            </span>{" "}
            {project[languageType].brief}
          </p>
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
