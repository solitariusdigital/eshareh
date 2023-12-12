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
                  src={solutions[0].media[0].link}
                  muted
                  playsInline
                  preload="auto"
                />
              )}
            </div>
            <div
              className={language ? classes.details : classes.detailsReverse}
            >
              {hoverItem === 0 ? (
                <h3>
                  {sliceString(
                    solutions[0][languageType].summary,
                    language ? 150 : 100
                  )}
                </h3>
              ) : (
                <h3>{solutions[0][languageType].title}</h3>
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
                        src={project.media[0].link}
                        muted
                        playsInline
                        preload="auto"
                      />
                    )}
                  </div>
                  <div
                    className={
                      language ? classes.details : classes.detailsReverse
                    }
                  >
                    {hoverItem === index ? (
                      <h3>
                        {sliceString(
                          project[languageType].summary,
                          language ? 50 : 40
                        )}
                      </h3>
                    ) : (
                      <h3>{project[languageType].title}</h3>
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
                    src={project.media[0].link}
                    muted
                    playsInline
                    preload="auto"
                  />
                )}
              </div>
              <div
                className={language ? classes.details : classes.detailsReverse}
              >
                {hoverItem === index ? (
                  <h3>
                    {sliceString(
                      project[languageType].summary,
                      language ? 100 : 70
                    )}
                  </h3>
                ) : (
                  <h3>{project[languageType].title}</h3>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
}
