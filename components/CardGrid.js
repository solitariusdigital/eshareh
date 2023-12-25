import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./CardGrid.module.scss";
import Image from "next/legacy/image";
import Router from "next/router";
import { replaceSpacesAndHyphens, sliceString } from "@/services/utility";

export default function CardGrid({ solutions, direction }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [hoverItem, setHoverItem] = useState(null);

  useEffect(() => {
    let videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      video.addEventListener("mouseover", () => {
        video.play();
      });
      video.addEventListener("mouseout", () => {
        video.pause();
      });
    });
  }, []);

  return (
    <Fragment>
      {screenSize === "desktop" && (
        <div className={direction ? classes.gridDesktop : classes.reverse}>
          <div
            className={classes.hero}
            onClick={() =>
              Router.push(
                `/solutions/${replaceSpacesAndHyphens(
                  solutions[0][languageType].title
                )}`
              )
            }
            onMouseEnter={() => {
              setHoverItem(0);
            }}
            onMouseLeave={() => {
              setHoverItem(null);
            }}
          >
            <div className={classes.box}>
              {solutions[0].media[0].type === "image" ? (
                <Image
                  className={classes.image}
                  src={solutions[0].media[0].link}
                  blurDataURL={solutions[0].media[0].link}
                  placeholder="blur"
                  alt={solutions[0][languageType].title}
                  layout="fill"
                  objectFit="cover"
                  as="image"
                  priority
                />
              ) : (
                <video
                  className={classes.video}
                  src={solutions[0].media[0].link + "#t=0.1"}
                  muted
                  playsInline
                  preload="metadata"
                />
              )}
            </div>
            <div
              className={language ? classes.details : classes.detailsReverse}
            >
              {hoverItem === 0 ? (
                <h4>
                  {sliceString(
                    solutions[0][languageType].summary,
                    language ? 150 : 120
                  )}
                </h4>
              ) : (
                <h4>{solutions[0][languageType].title}</h4>
              )}
            </div>
          </div>
          <div className={classes.grid}>
            {solutions
              .map((project, index) => (
                <div
                  key={index}
                  onClick={() =>
                    Router.push(
                      `/solutions/${replaceSpacesAndHyphens(
                        project[languageType].title
                      )}`
                    )
                  }
                  onMouseEnter={() => {
                    setHoverItem(index);
                  }}
                  onMouseLeave={() => {
                    setHoverItem(null);
                  }}
                >
                  <div className={classes.box}>
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
                        muted
                        playsInline
                        preload="metadata"
                      />
                    )}
                  </div>
                  <div
                    className={
                      language ? classes.details : classes.detailsReverse
                    }
                  >
                    {hoverItem === index ? (
                      <h4>
                        {sliceString(
                          project[languageType].summary,
                          language ? 80 : 60
                        )}
                      </h4>
                    ) : (
                      <h4>{project[languageType].title}</h4>
                    )}
                  </div>
                </div>
              ))
              .slice(1, 5)}
          </div>
        </div>
      )}
      {screenSize !== "desktop" && (
        <div className={classes.responsive}>
          {solutions.map((project, index) => (
            <div
              key={index}
              onClick={() =>
                Router.push(
                  `/solutions/${replaceSpacesAndHyphens(
                    project[languageType].title
                  )}`
                )
              }
              onMouseEnter={() => {
                setHoverItem(index);
              }}
              onMouseLeave={() => {
                setHoverItem(null);
              }}
            >
              <div className={classes.box}>
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
                    muted
                    playsInline
                    preload="metadata"
                  />
                )}
              </div>
              <div
                className={language ? classes.details : classes.detailsReverse}
              >
                {hoverItem === index ? (
                  <h4>
                    {sliceString(
                      project[languageType].summary,
                      language ? 120 : 90
                    )}
                  </h4>
                ) : (
                  <h4>{project[languageType].title}</h4>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
}
