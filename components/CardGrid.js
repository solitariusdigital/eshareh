import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./CardGrid.module.scss";
import Image from "next/legacy/image";
import Router from "next/router";
import { replaceSpacesAndHyphens, sliceString } from "@/services/utility";

export default function CardGrid({ projects, direction }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [hoverItem, setHoverItem] = useState(null);

  return (
    <Fragment>
      {screenSize === "desktop" && (
        <div className={direction ? classes.gridDesktop : classes.reverse}>
          <div
            className={classes.hero}
            onClick={() =>
              Router.push(
                `/solutions/${replaceSpacesAndHyphens(
                  projects[0][languageType].title
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
              <Image
                className={classes.image}
                src={projects[0][languageType].image}
                blurDataURL={projects[0][languageType].image}
                placeholder="blur"
                alt={projects[0].title}
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
            <div
              className={language ? classes.details : classes.detailsReverse}
            >
              {hoverItem === 0 ? (
                <h3>
                  {sliceString(
                    projects[0][languageType].description,
                    language ? 150 : 100
                  )}
                </h3>
              ) : (
                <h3>{projects[0][languageType].title}</h3>
              )}
            </div>
          </div>
          <div className={classes.grid}>
            {projects
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
                    <Image
                      className={classes.image}
                      src={project[languageType].image}
                      blurDataURL={project[languageType].image}
                      placeholder="blur"
                      alt={project[languageType].title}
                      layout="fill"
                      objectFit="cover"
                      priority
                    />
                  </div>
                  <div
                    className={
                      language ? classes.details : classes.detailsReverse
                    }
                  >
                    {hoverItem === index ? (
                      <h3>
                        {sliceString(
                          project[languageType].description,
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
          {projects.map((project, index) => (
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
                <Image
                  className={classes.image}
                  src={project[languageType].image}
                  blurDataURL={project[languageType].image}
                  placeholder="blur"
                  alt={project[languageType].title}
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
              <div
                className={language ? classes.details : classes.detailsReverse}
              >
                {hoverItem === index ? (
                  <h3>
                    {sliceString(
                      project[languageType].description,
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
