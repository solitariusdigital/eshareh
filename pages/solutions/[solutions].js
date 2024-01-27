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
import StarIcon from "@mui/icons-material/Star";
import Tooltip from "@mui/material/Tooltip";
import {
  getSolutionApi,
  updateSolutionApi,
  createCoverApi,
} from "@/services/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function Solution({ solutions, projectTitle }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { displayMenu, setDisplayMenu } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { displayFooter, setFooter } = useContext(StateContext);
  const { editSolution, setEditSolution } = useContext(StateContext);
  const [displayGallerySlider, setDisplayGallerySlider] = useState(false);
  const [displayNextController, setDisplayNextController] = useState(false);
  const [project, setProject] = useState(null);

  const [previousProject, setPreviousProject] = useState(null);
  const [nextProject, setNextProject] = useState(null);
  const [dropDown, setDropDpwn] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");

  useEffect(() => {
    let project = null;
    let nextProject = null;
    let previousProject = null;
    let solutionsData = null;

    if (permissionControl === "admin") {
      project = solutions.find(
        (p) => p.en.title === projectTitle || p.fa.title === projectTitle
      );
      solutionsData = solutions;
    } else {
      let activeSolutions = solutions
        .filter((project) => project.active)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      project = activeSolutions.find(
        (p) => p.en.title === projectTitle || p.fa.title === projectTitle
      );
      solutionsData = activeSolutions;
    }
    if (!project) {
      Router.push("/404");
      return;
    }
    // Find the index of the project with the given id
    let index = solutionsData.findIndex((p) => p["_id"] === project["_id"]);
    previousProject =
      index === 0
        ? solutionsData[solutionsData.length - 1]
        : solutionsData[index - 1];
    nextProject =
      index === solutionsData.length - 1
        ? solutionsData[0]
        : solutionsData[index + 1];

    setProject(project);
    setNextProject(nextProject);
    setPreviousProject(previousProject);
  }, [permissionControl, project, projectTitle, solutions]);

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
          setDisplayNextController(false);
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
          setFooter(false);
          setDisplayNextController(true);
        } else if (currentScrollY < prevScrollY) {
          setFooter(true);
          setDisplayNextController(false);
        }
        if (isScrollAtBottom) {
          setDisplayNextController(false);
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
    setDisplayNextController(false);
    setDisplayGallerySlider(true);
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
  };

  const manageSolution = (type) => {
    setDropDpwn(!dropDown);
    setConfirmMessage(type === "show" ? "Publish" : "Hide");
  };

  const updateSolution = async (id) => {
    let data = await getSolutionApi(id);
    switch (confirmMessage) {
      case "Publish":
        data.active = true;
        break;
      case "Hide":
        data.active = false;
        break;
    }
    await updateSolutionApi(data);
    window.location.reload();
  };

  const makeCover = async (index) => {
    project.media.push(project.coverMedia);
    let dataObject = {
      ...project,
      media: project.media.filter((item, i) => i !== index),
      coverMedia: project.media[index],
    };
    await updateSolutionApi(dataObject);
    window.location.reload();
  };

  const moveUp = async (index) => {
    const updatedProject = [...project.media];
    const itemToMove = updatedProject.splice(index, 1)[0];
    updatedProject.splice(index - 1, 0, itemToMove);
    let dataObject = {
      ...project,
      media: updatedProject,
    };
    await updateSolutionApi(dataObject);
    window.location.reload();
  };

  const makeSlide = async (index) => {
    let slideMedia = [...project.slideMedia, project.media[index]];
    let findIndex = project.media.indexOf(project.media[index]);
    project.media.splice(findIndex, 1);
    let dataObject = {
      ...project,
      media: project.media,
      slideMedia: slideMedia,
    };
    await updateSolutionApi(dataObject);
    window.location.reload();
  };

  const removeSlide = async (index) => {
    let media = [...project.media, project.slideMedia[index]];
    let findIndex = project.slideMedia.indexOf(project.slideMedia[index]);
    project.slideMedia.splice(findIndex, 1);
    let dataObject = {
      ...project,
      media: media,
      slideMedia: project.slideMedia,
    };
    await updateSolutionApi(dataObject);
    window.location.reload();
  };

  const manageCoverSlide = async () => {
    const cover = {
      title: {
        fa: project[languageType].title,
        en: project[languageType].title,
      },
      coverMedia: project.coverMedia,
      link: `solutions/${replaceSpacesAndHyphens(project[languageType].title)}`,
      color: "000000",
      active: false,
    };
    await createCoverApi(cover);
    window.location.assign("/admin");
  };

  return (
    <Fragment>
      {project && (
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
              url: `https://eshareh.com/solutions/${replaceSpacesAndHyphens(
                project[languageType].title
              )}`,
              siteName: "Eshareh Advertising Agency",
            }}
          />
          {permissionControl === "admin" && !displayGallerySlider && (
            <Fragment>
              <div className={classes.controlPanel}>
                {project.active ? (
                  <Tooltip title="Visible">
                    <VerifiedUserIcon sx={{ color: "#57a361" }} />
                  </Tooltip>
                ) : (
                  <Tooltip title="Hidden">
                    <VisibilityOffIcon sx={{ color: "#d40d12" }} />
                  </Tooltip>
                )}
                {!project.active ? (
                  <Tooltip title="Publish">
                    <TaskAltIcon
                      className="icon"
                      onClick={() => manageSolution("show")}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Hide">
                    <CloseIcon
                      className="icon"
                      onClick={() => manageSolution("hide")}
                    />
                  </Tooltip>
                )}
                <Tooltip title="Cover Slide">
                  <StarIcon
                    className="icon"
                    onClick={() => manageCoverSlide()}
                  />
                </Tooltip>
                <Tooltip title="Edit">
                  <EditIcon
                    className="icon"
                    onClick={() => {
                      Router.push("/admin");
                      setEditSolution(project);
                    }}
                  />
                </Tooltip>
              </div>
              {dropDown && (
                <div
                  className={classes.dropDown}
                  style={{
                    fontFamily: language ? "English" : "English",
                  }}
                >
                  <h3>{confirmMessage}</h3>
                  <div className={classes.action}>
                    <p
                      className={classes.cancel}
                      onClick={() => setDropDpwn(false)}
                    >
                      Cancel
                    </p>
                    <p
                      className={classes.confirm}
                      onClick={() => updateSolution(project["_id"])}
                    >
                      Confirm
                    </p>
                  </div>
                </div>
              )}
            </Fragment>
          )}
          <div className={classes.container}>
            <div
              className={
                language ? classes.information : classes.informationReverse
              }
            >
              <div>
                <h2
                  style={{
                    fontFamily: language ? "FarsiMedium" : "EnglishMedium",
                  }}
                  className={classes.title}
                >
                  {project[languageType].title}
                </h2>
                <h4>{project[languageType].subtitle}</h4>
                <h3 className={classes.description}>
                  <span
                    style={{
                      fontFamily: language ? "FarsiMedium" : "EnglishMedium",
                    }}
                  >
                    {language ? "خلاصه :" : "Brief :"}
                  </span>{" "}
                  {project[languageType].summary}
                </h3>
              </div>
            </div>
            {project.slideMedia && project.slideMedia.length > 0 && (
              <div className={classes.swiper}>
                <Swiper
                  className={classes.slide}
                  slidesPerView="auto"
                  spaceBetween={0}
                  navigation={true}
                  mousewheel={true}
                  loop={true}
                  modules={[Navigation, Mousewheel]}
                  style={{ "--swiper-navigation-color": "#ffffff" }}
                >
                  {project.slideMedia.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className={classes.control}>
                        {permissionControl === "admin" &&
                          !displayGallerySlider && (
                            <p
                              className={classes.removeGroup}
                              onClick={() => removeSlide(index)}
                            >
                              Remove
                            </p>
                          )}
                      </div>
                      <div
                        className={classes.image}
                        onClick={() => gallerySlider()}
                      >
                        {image.type === "image" ? (
                          <Image
                            src={image.link}
                            blurDataURL={image.link}
                            placeholder="blur"
                            alt={image.link}
                            layout="fill"
                            objectFit="cover"
                            as="image"
                            priority
                          />
                        ) : (
                          <video
                            className={classes.video}
                            src={image.link + "#t=0.1"}
                            controls
                            playsInline
                            preload="metadata"
                          />
                        )}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
            {project.media.map((image, index) => (
              <Fragment key={index}>
                <div className={classes.imageBox}>
                  {permissionControl === "admin" && !displayGallerySlider && (
                    <div
                      className={classes.control}
                      style={{
                        fontFamily: language ? "English" : "English",
                      }}
                    >
                      <p className={classes.move} onClick={() => moveUp(index)}>
                        Move up
                      </p>

                      <p
                        className={classes.cover}
                        onClick={() => makeCover(index)}
                      >
                        Cover
                      </p>

                      <p
                        className={classes.group}
                        onClick={() => makeSlide(index)}
                      >
                        Slide
                      </p>
                    </div>
                  )}
                  {image.type === "image" ? (
                    <div onClick={() => gallerySlider()}>
                      <Image
                        className={
                          index === 0 && project.slideMedia.length === 0
                            ? classes.image
                            : ""
                        }
                        src={image.link}
                        blurDataURL={image.link}
                        placeholder="blur"
                        alt={project[languageType].title}
                        layout="fill"
                        objectFit="cover"
                        as="image"
                        priority
                      />
                      <p className={classes.enlarge}>
                        {language ? "بزرگنمایی +" : "+ Enlarge"}
                      </p>
                    </div>
                  ) : (
                    <video
                      className={
                        index === 0 && project.slideMedia.length === 0
                          ? classes.videoRadius
                          : classes.video
                      }
                      src={image.link + "#t=0.1"}
                      controls
                      playsInline
                      preload="metadata"
                    />
                  )}
                </div>
                {index === 0 && (
                  <div
                    className={
                      language
                        ? classes.informationReverse
                        : classes.information
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
                      language
                        ? classes.informationReverse
                        : classes.information
                    }
                  >
                    <h2 style={{ textAlign: language ? "right" : "left" }}>
                      {project[languageType].problem}
                    </h2>
                  </div>
                )}
              </Fragment>
            ))}
            {displayNextController && (
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
                <GallerySlider
                  media={project.media.concat(project.slideMedia)}
                />
              </div>
            )}
            <div className={classes.nextProject} ref={targetRef}>
              <NextProject project={nextProject} />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

// initial connection to db
export async function getServerSideProps(context) {
  try {
    await dbConnect();
    const solutions = await solutionModel.find();
    return {
      props: {
        solutions: JSON.parse(JSON.stringify(solutions)),
        projectTitle: JSON.parse(
          JSON.stringify(replaceSpacesAndHyphens(context.query.solutions))
        ),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
