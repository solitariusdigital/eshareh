import { useState, useContext, Fragment, useEffect, useRef } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./solutions.module.scss";
import { replaceSpacesAndHyphens } from "@/services/utility";
import Image from "next/legacy/image";
import GallerySlider from "@/components/GallerySlider";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import NextProject from "@/components/NextProject";
import { NextSeo } from "next-seo";
import Router from "next/router";
import dbConnect from "@/services/dbConnect";
import solutionModel from "@/models/Solution";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { getSolutionApi, updateSolutionApi } from "@/services/api";

export default function Solution({ project, previousProject, nextProject }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { displayMenu, setDisplayMenu } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { displayFooter, setFooter } = useContext(StateContext);
  const [displayGallerySlider, setDisplayGallerySlider] = useState(false);
  const [displayController, setDisplayController] = useState(false);

  const targetRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setDisplayController(false);
          setFooter(false);
        }
      });
    }, options);
    if (targetRef.current) {
      observer.observe(targetRef.current);
    }
    return () => {
      if (targetRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(targetRef.current);
      }
    };
  }, [setFooter]);

  useEffect(() => {
    if (!displayGallerySlider) {
      let prevScrollY = window.scrollY;
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const isScrollAtBottom =
          window.innerHeight + window.scrollY >= document.body.offsetHeight;
        if (currentScrollY > prevScrollY) {
          setDisplayController(true);
        } else if (currentScrollY < prevScrollY) {
          setFooter(true);
          setDisplayController(false);
        }
        if (isScrollAtBottom) {
          setDisplayController(false);
          setFooter(false);
        }
        prevScrollY = currentScrollY;
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [displayGallerySlider, setFooter]);

  const gallerySlider = () => {
    setDisplayMenu(false);
    setDisplayController(false);
    setDisplayGallerySlider(true);
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
  };

  const manageSolution = async (id, type) => {
    const message = `${type === "show" ? "انتشار مطمئنی؟" : "پنهان مطمئنی؟"}`;
    const confirm = window.confirm(message);
    if (confirm) {
      let data = await getSolutionApi(id);
      switch (type) {
        case "show":
          data.active = true;
          break;
        case "hide":
          data.active = false;
          break;
      }
      await updateSolutionApi(data);
      window.location.reload();
    }
  };

  return (
    <Fragment>
      <NextSeo
        title={project[languageType].title}
        description={
          language
            ? "اشاره یک استودیوی طراحی چند رشته ای و مستقل است"
            : "Eshareh is a multidisciplinary, independently owned design studio"
        }
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: `https://eshareh.com/${replaceSpacesAndHyphens(
            project[languageType].title
          )}`,
          siteName: "Eshareh Advertising Agency",
        }}
      />
      <div className={classes.container}>
        {permissionControl === "admin" && (
          <div className={classes.controlPanel}>
            {project.active ? (
              <VerifiedUserIcon sx={{ color: "#57a361" }} />
            ) : (
              <VisibilityOffIcon sx={{ color: "#d40d12" }} />
            )}
            {!project.active ? (
              <TaskAltIcon
                className="icon"
                sx={{ color: "#57a361" }}
                onClick={() => manageSolution(project["_id"], "show")}
              />
            ) : (
              <CloseIcon
                className="icon"
                sx={{ color: "#cd3d2c" }}
                onClick={() => manageSolution(project["_id"], "hide")}
              />
            )}
            <EditIcon className="icon" sx={{ color: "#fdb714" }} />
          </div>
        )}
        <div
          className={
            language ? classes.information : classes.informationReverse
          }
        >
          <h3 className={classes.description}>
            {project[languageType].summary}
          </h3>
          <div>
            <h2
              style={{
                fontFamily: language ? "FarsiMedium" : "EnglishMedium",
              }}
              className={classes.title}
            >
              {project[languageType].title}
            </h2>
            <h3>{project[languageType].subtitle}</h3>
          </div>
        </div>
        {project.media.map((image, index) => (
          <Fragment key={index}>
            <div className={classes.imageBox} onClick={() => gallerySlider()}>
              {image.type === "image" ? (
                <Fragment>
                  <Image
                    src={image.link}
                    blurDataURL={image.link}
                    placeholder="blur"
                    alt={project[languageType].title}
                    layout="fill"
                    objectFit="cover"
                    as="image"
                    priority
                  />
                  <p className={classes.text}>
                    {language ? "بزرگنمایی +" : "+ Enlarge"}
                  </p>
                </Fragment>
              ) : (
                <video
                  className={classes.video}
                  src={image.link}
                  preload="metadata"
                  controls
                />
              )}
            </div>
            {index === 0 && (
              <div
                className={
                  language ? classes.informationReverse : classes.information
                }
              >
                <h2 style={{ textAlign: language ? "right" : "left" }}>
                  {project[languageType].solution}
                </h2>
              </div>
            )}
            {index === 2 && (
              <div
                className={
                  language ? classes.informationReverse : classes.information
                }
              >
                <h2 style={{ textAlign: language ? "right" : "left" }}>
                  {project[languageType].problem}
                </h2>
              </div>
            )}
          </Fragment>
        ))}
        {displayController && (
          <div
            className={`${classes.projectController}  animate__animated animate__slideInUp`}
          >
            <div className={classes.controller}>
              <ArrowBackIosIcon
                className={classes.icon}
                onClick={() =>
                  Router.push(
                    `/solutions/${replaceSpacesAndHyphens(
                      previousProject[languageType].title
                    )}`
                  )
                }
              />
              <p>{project[languageType].title}</p>
              <ArrowForwardIosIcon
                className={classes.icon}
                onClick={() =>
                  Router.push(
                    `/solutions/${replaceSpacesAndHyphens(
                      nextProject[languageType].title
                    )}`
                  )
                }
              />
            </div>
          </div>
        )}
        {displayGallerySlider && (
          <div className={classes.gallerySlider}>
            <div className={classes.icon}>
              <CloseIcon
                onClick={() => {
                  setDisplayMenu(true);
                  setDisplayGallerySlider(false);
                  document.body.style.overflow = "auto";
                }}
              />
            </div>
            {<h3>{project[languageType].title}</h3>}
            <GallerySlider media={project.media} />
          </div>
        )}
        <div className={classes.nextProject} ref={targetRef}>
          <NextProject project={nextProject} />
        </div>
      </div>
    </Fragment>
  );
}

// initial connection to db
export async function getServerSideProps(context) {
  try {
    await dbConnect();
    const solutions = await solutionModel.find();
    let activeSolutions = solutions
      .filter((project) => project.active)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    let project = activeSolutions.find(
      (p) =>
        p.en.title === replaceSpacesAndHyphens(context.query.solutions) ||
        p.fa.title === replaceSpacesAndHyphens(context.query.solutions)
    );
    // Find the index of the project with the given id
    let index = activeSolutions.findIndex((p) => p["_id"] === project["_id"]);
    let previousProject =
      index === 0
        ? activeSolutions[activeSolutions.length - 1]
        : activeSolutions[index - 1];
    let nextProject =
      index === activeSolutions.length - 1
        ? activeSolutions[0]
        : activeSolutions[index + 1];
    return {
      props: {
        project: JSON.parse(JSON.stringify(project)),
        previousProject: JSON.parse(JSON.stringify(previousProject)),
        nextProject: JSON.parse(JSON.stringify(nextProject)),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
