import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./CardGrid.module.scss";
import Image from "next/legacy/image";
import Router from "next/router";
import { replaceSpacesAndHyphens, sliceString } from "@/services/utility";

export default function CardGrid({ projects, direction }) {
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
                `/works/${replaceSpacesAndHyphens(projects[0].title)}`
              )
            }
            onMouseEnter={() => {
              setHoverItem(0);
            }}
            onMouseLeave={() => {
              setHoverItem(null);
            }}
          >
            <div>
              <Image
                className={classes.image}
                src={projects[0].image}
                blurDataURL={projects[0].image}
                placeholder="blur"
                alt={projects[0].title}
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
            <div className={classes.details}>
              {hoverItem === 0 ? (
                <h3>{sliceString(projects[0].description, 100)}</h3>
              ) : (
                <h3>{projects[0].title}</h3>
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
                      `/works/${replaceSpacesAndHyphens(project.title)}`
                    )
                  }
                  onMouseEnter={() => {
                    setHoverItem(index);
                  }}
                  onMouseLeave={() => {
                    setHoverItem(null);
                  }}
                >
                  <div>
                    <Image
                      className={classes.image}
                      src={project.image}
                      blurDataURL={project.image}
                      placeholder="blur"
                      alt={project.title}
                      layout="fill"
                      objectFit="cover"
                      priority
                    />
                  </div>
                  <div className={classes.details}>
                    {hoverItem === index ? (
                      <h3>{sliceString(project.description, 100)}</h3>
                    ) : (
                      <h3>{project.title}</h3>
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
                Router.push(`/works/${replaceSpacesAndHyphens(project.title)}`)
              }
              onMouseEnter={() => {
                setHoverItem(index);
              }}
              onMouseLeave={() => {
                setHoverItem(null);
              }}
            >
              <div>
                <Image
                  className={classes.image}
                  src={project.image}
                  blurDataURL={project.image}
                  placeholder="blur"
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
              <div className={classes.details}>
                {hoverItem === index ? (
                  <h3>{sliceString(project.description, 100)}</h3>
                ) : (
                  <h3>{project.title}</h3>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
}
