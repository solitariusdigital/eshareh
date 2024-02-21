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
  const { heroHeight, setHeroHeight } = useContext(StateContext);
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

  useEffect(() => {
    let element = document.getElementById("detailsInformation");
    if (element) {
      let elemHeight = element.getBoundingClientRect().height;
      setHeroHeight(elemHeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        fontFamily: language ? "FarsiLight" : "English",
      }}
    >
      {screenSize === "desktop" && (
        <div
          className={
            direction ? classes.gridDesktop : classes.gridDesktopReverse
          }
        >
          <div
            className={classes.hero}
            style={{ height: `calc(100% - ${heroHeight}px)` }}
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
              {solutions[0].coverMedia.type === "image" ? (
                <Image
                  className={classes.image}
                  src={solutions[0].coverMedia.link}
                  blurDataURL={solutions[0].coverMedia.link}
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
                  src={solutions[0].coverMedia.link + "#t=0.1"}
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
                    solutions[0][languageType].brief,
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
                    id="detailsInformation"
                  >
                    {hoverItem === index ? (
                      <h4>
                        {sliceString(
                          project[languageType].brief,
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
                      project[languageType].brief,
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
    </div>
  );
}
