import { useContext, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./CardGrid.module.scss";
import Image from "next/legacy/image";
import { replaceSpacesAndHyphens } from "@/services/utility";
import Link from "next/link";

export default function CardGrid({ solutions, direction }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { heroHeight, setHeroHeight } = useContext(StateContext);

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
        fontFamily: language ? "Farsi" : "English",
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
          >
            <Link
              className={classes.box}
              href={`/solutions/${replaceSpacesAndHyphens(
                solutions[0][languageType].title
              )}`}
              passHref
            >
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
            </Link>
            <Link
              className={language ? classes.details : classes.detailsReverse}
              href={`/solutions/${replaceSpacesAndHyphens(
                solutions[0][languageType].title
              )}`}
              passHref
            >
              <h4>{solutions[0][languageType].title}</h4>
            </Link>
          </div>
          <div className={classes.grid}>
            {solutions
              .map((project, index) => (
                <div key={index}>
                  <div className={classes.box}>
                    <Link
                      href={`/solutions/${replaceSpacesAndHyphens(
                        project[languageType].title
                      )}`}
                      passHref
                    >
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
                    </Link>
                  </div>
                  <Link
                    id="detailsInformation"
                    className={
                      language ? classes.details : classes.detailsReverse
                    }
                    href={`/solutions/${replaceSpacesAndHyphens(
                      project[languageType].title
                    )}`}
                    passHref
                  >
                    <h4>{project[languageType].title}</h4>
                  </Link>
                </div>
              ))
              .slice(1, 5)}
          </div>
        </div>
      )}
      {screenSize !== "desktop" && (
        <div className={classes.responsive}>
          {solutions.map((project, index) => (
            <div key={index}>
              <div className={classes.box}>
                <Link
                  href={`/solutions/${replaceSpacesAndHyphens(
                    project[languageType].title
                  )}`}
                  passHref
                >
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
                </Link>
              </div>
              <Link
                className={language ? classes.details : classes.detailsReverse}
                href={`/solutions/${replaceSpacesAndHyphens(
                  project[languageType].title
                )}`}
                passHref
              >
                <h4>{project[languageType].title}</h4>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
