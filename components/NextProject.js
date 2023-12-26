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
        <h3 className={classes.description}>{project[languageType].summary}</h3>
        <div>
          <h2
            style={{
              fontFamily: language ? "FarsiMedium" : "EnglishMedium",
            }}
          >
            {project[languageType].title}
          </h2>
          <h4>{project[languageType].subtitle}</h4>
          <h4>{project[languageType].year}</h4>
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
            src={project.media[0].link + "#t=0.1"}
            playsInline
            preload="metadata"
          />
        )}
      </div>
    </div>
  );
}
