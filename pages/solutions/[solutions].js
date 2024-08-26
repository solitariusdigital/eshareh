import { useState, useContext, Fragment, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { StateContext } from "@/context/stateContext";
import classes from "./solutions.module.scss";
import {
  replaceSpacesAndHyphens,
  applyFontToEnglishWords,
} from "@/services/utility";
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
  getCoversApi,
  updateCoverApi,
} from "@/services/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
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
  const [coverSlide, setCoverSlide] = useState(false);
  const [previousProject, setPreviousProject] = useState(null);
  const [nextProject, setNextProject] = useState(null);
  const [dropDown, setDropDpwn] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let getCovers = await getCoversApi();
        const foundCover = getCovers.find(
          (cover) => cover.title.en === project?.en.title
        );
        if (foundCover) {
          setCoverSlide(true);
        } else {
          setCoverSlide(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [project]);

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
    router.replace(router.asPath);
  };

  const moveItem = async (index, direction) => {
    if (index === "text") {
      const updatedProject = [
        ...project.media,
        {
          link: {
            fa: project.fa.solution,
            en: project.en.solution,
          },
          type: "text",
        },
      ];
      const itemToMove = updatedProject.splice(1, 1)[0];
      if (direction === "up") {
        updatedProject.splice(1 - 1, 0, itemToMove);
      } else {
        updatedProject.splice(1 + 1, 0, itemToMove);
      }
      let dataObject = {
        ...project,
        media: updatedProject,
      };
      await updateSolutionApi(dataObject);
    } else {
      const updatedProject = [...project.media];
      const itemToMove = updatedProject.splice(index, 1)[0];
      if (direction === "up") {
        updatedProject.splice(index - 1, 0, itemToMove);
      } else {
        updatedProject.splice(index + 1, 0, itemToMove);
      }
      let dataObject = {
        ...project,
        media: updatedProject,
      };
      await updateSolutionApi(dataObject);
    }
    router.replace(router.asPath);
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
    router.replace(router.asPath);
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
    router.replace(router.asPath);
  };

  const makeCover = async (index) => {
    project.media.push(project.coverMedia);
    let dataObject = {
      ...project,
      media: project.media.filter((item, i) => i !== index),
      coverMedia: project.media[index],
    };
    await updateSolutionApi(dataObject);

    let getCovers = await getCoversApi();
    const foundCover = getCovers.find(
      (cover) => cover.title.en === project.en.title
    );
    if (foundCover) {
      const cover = {
        ...foundCover,
        coverMedia: project.media[index],
      };
      await updateCoverApi(cover);
    }
    router.replace(router.asPath);
  };

  const manageCoverSlide = async () => {
    const cover = {
      title: {
        fa: project.fa.title,
        en: project.en.title,
      },
      coverMedia: project.coverMedia,
      link: `solutions/${replaceSpacesAndHyphens(project[languageType].title)}`,
      color: "000000",
      active: false,
      text: false,
    };
    await createCoverApi(cover);
    window.location.assign("/admin");
  };

  const makeDouble = async (index) => {
    let mediaDouble = [...project.mediaDouble, project.media[index]];
    let dataObject = {
      ...project,
      media: project.media.filter((item, i) => i !== index),
      mediaDouble: mediaDouble,
    };
    await updateSolutionApi(dataObject);
    router.replace(router.asPath);
  };

  const makeQuadruple = async (index) => {
    let mediaQuadruple = [...project.mediaQuadruple, project.media[index]];
    let dataObject = {
      ...project,
      media: project.media.filter((item, i) => i !== index),
      mediaQuadruple: mediaQuadruple,
    };
    await updateSolutionApi(dataObject);
    router.replace(router.asPath);
  };

  const removeDouble = async (index) => {
    let media = [...project.media, project.mediaDouble[index]];
    let findIndex = project.mediaDouble.indexOf(project.mediaDouble[index]);
    project.mediaDouble.splice(findIndex, 1);
    let dataObject = {
      ...project,
      media: media,
      mediaDouble: project.mediaDouble,
    };
    await updateSolutionApi(dataObject);
    router.replace(router.asPath);
  };

  const removeQuadruple = async (index) => {
    let media = [...project.media, project.mediaQuadruple[index]];
    let findIndex = project.mediaQuadruple.indexOf(
      project.mediaQuadruple[index]
    );
    project.mediaQuadruple.splice(findIndex, 1);
    let dataObject = {
      ...project,
      media: media,
      mediaQuadruple: project.mediaQuadruple,
    };
    await updateSolutionApi(dataObject);
    router.replace(router.asPath);
  };

  const imageActivation = async (value, index) => {
    project.media[index].active = value;
    let dataObject = {
      ...project,
      media: project.media,
    };
    await updateSolutionApi(dataObject);
    router.replace(router.asPath);
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
                {!coverSlide && (
                  <Tooltip title="Cover Slide">
                    <StarIcon
                      className="icon"
                      onClick={() => manageCoverSlide()}
                    />
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
                <h1
                  style={{
                    fontFamily: language ? "FarsiBold" : "EnglishBold",
                  }}
                >
                  {project[languageType].title}
                </h1>
                <h2>{project[languageType].subtitle}</h2>
                <div
                  style={{
                    fontFamily: language ? "FarsiLight" : "EnglishLight",
                  }}
                  className={classes.descriptionSolution}
                >
                  <h3
                    style={{
                      fontFamily: language ? "FarsiBold" : "EnglishBold",
                    }}
                  >
                    {language ? "صورت مسئله" : "Brief"}
                  </h3>
                  <h3
                    style={{
                      fontFamily: language ? "EnglishLight" : "EnglishLight",
                    }}
                    className={classes.seperation}
                  >
                    |
                  </h3>
                  <h3
                    className={classes.text}
                    dangerouslySetInnerHTML={{
                      __html: applyFontToEnglishWords(
                        project[languageType].brief,
                        "English",
                        "16px",
                        language
                      ),
                    }}
                  ></h3>
                </div>
              </div>
            </div>
            {project.voice && project.voice.length > 0 && (
              <div>
                <audio className={classes.voice} preload="metadata" controls>
                  <source src={project.voice[project.voice.length - 1].link} />
                </audio>
              </div>
            )}
            {project.slideMedia && project.slideMedia.length > 0 && (
              <div className={classes.swiper}>
                <Swiper
                  className={classes.slide}
                  slidesPerView="auto"
                  spaceBetween={0}
                  mousewheel={true}
                  loop={true}
                  modules={[Autoplay]}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: true,
                  }}
                  speed={1500}
                >
                  {project.slideMedia.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className={classes.control}
                        style={{
                          fontFamily: language ? "English" : "English",
                        }}
                      >
                        {permissionControl === "admin" &&
                          !displayGallerySlider && (
                            <p
                              className={classes.item}
                              onClick={() => removeSlide(index)}
                            >
                              Remove
                            </p>
                          )}
                      </div>
                      <div
                        className={classes.imageContainer}
                        onClick={() => gallerySlider()}
                      >
                        {image.type === "image" ? (
                          <Image
                            className={classes.image}
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
            {project.media
              .filter((image) => image.active || permissionControl === "admin")
              .map((image, index) => (
                <Fragment key={index}>
                  <div
                    className={classes.imageBox}
                    style={{
                      height: image.type === "text" ? "100%" : "none",
                    }}
                  >
                    {permissionControl === "admin" &&
                      !displayGallerySlider &&
                      image.type !== "text" && (
                        <div
                          className={classes.control}
                          style={{
                            fontFamily: language ? "English" : "English",
                          }}
                        >
                          <div className={classes.item}>
                            {image.active ? (
                              <Fragment>
                                <Tooltip title="Visible">
                                  <VerifiedUserIcon sx={{ color: "#57a361" }} />
                                </Tooltip>
                                <Tooltip title="Hide">
                                  <CloseIcon
                                    className="icon"
                                    onClick={() =>
                                      imageActivation(false, index)
                                    }
                                  />
                                </Tooltip>
                              </Fragment>
                            ) : (
                              <Fragment>
                                <Tooltip title="Hidden">
                                  <VisibilityOffIcon
                                    sx={{ color: "#d40d12" }}
                                  />
                                </Tooltip>
                                <Tooltip title="Show">
                                  <TaskAltIcon
                                    className="icon"
                                    onClick={() => imageActivation(true, index)}
                                  />
                                </Tooltip>
                              </Fragment>
                            )}
                          </div>
                          {image.active && (
                            <Fragment>
                              <p
                                className={classes.item}
                                onClick={() => makeCover(index)}
                              >
                                Cover
                              </p>
                              <p
                                className={classes.item}
                                onClick={() => makeSlide(index)}
                              >
                                Slide
                              </p>
                              <p
                                className={classes.item}
                                onClick={() => moveItem(index, "up")}
                              >
                                Up
                              </p>
                              <p
                                className={classes.item}
                                onClick={() => moveItem(index, "down")}
                              >
                                Down
                              </p>
                              {project.mediaDouble.length < 2 && (
                                <p
                                  className={classes.item}
                                  onClick={() => makeDouble(index)}
                                >
                                  2x
                                </p>
                              )}
                              {project.mediaQuadruple.length < 4 && (
                                <p
                                  className={classes.item}
                                  onClick={() => makeQuadruple(index)}
                                >
                                  4x
                                </p>
                              )}
                            </Fragment>
                          )}
                        </div>
                      )}
                    {image.type === "image" && (
                      <div
                        onClick={() => gallerySlider()}
                        className={classes.imageContainer}
                      >
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
                    )}
                    {image.type === "video" && (
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
                    {image.type === "text" && (
                      <div
                        className={
                          language
                            ? classes.information
                            : classes.informationReverse
                        }
                      >
                        {permissionControl === "admin" &&
                          !displayGallerySlider && (
                            <div className={classes.controlText}>
                              <p
                                style={{
                                  fontFamily: language ? "English" : "English",
                                }}
                                className={classes.item}
                                onClick={() => moveItem(index, "up")}
                              >
                                Up
                              </p>
                              <p
                                style={{
                                  fontFamily: language ? "English" : "English",
                                }}
                                className={classes.item}
                                onClick={() => moveItem(index, "down")}
                              >
                                Down
                              </p>
                            </div>
                          )}
                        <div
                          style={{
                            fontFamily: language
                              ? "FarsiLight"
                              : "EnglishLight",
                          }}
                          className={classes.descriptionSolution}
                        >
                          <h3
                            style={{
                              fontFamily: language
                                ? "FarsiBold"
                                : "EnglishBold",
                            }}
                          >
                            {language ? "راه‌کار" : "Solution"}
                          </h3>
                          <h3
                            style={{
                              fontFamily: language
                                ? "EnglishLight"
                                : "EnglishLight",
                            }}
                            className={classes.seperation}
                          >
                            |
                          </h3>
                          <h3
                            className={classes.text}
                            dangerouslySetInnerHTML={{
                              __html: applyFontToEnglishWords(
                                project[languageType].solution,
                                "English",
                                "16px",
                                language
                              ),
                            }}
                          ></h3>
                        </div>
                      </div>
                    )}
                  </div>
                  {index === 0 && project.mediaDouble.length > 0 && (
                    <div className={classes.imageBoxDouble}>
                      {project.mediaDouble.map((image, index) => (
                        <div key={index} className={classes.imageBox}>
                          {permissionControl === "admin" &&
                            !displayGallerySlider && (
                              <div
                                className={classes.control}
                                style={{
                                  fontFamily: language ? "English" : "English",
                                }}
                              >
                                <p
                                  className={classes.item}
                                  onClick={() => removeDouble(index)}
                                >
                                  Remove
                                </p>
                              </div>
                            )}
                          {image.type === "image" ? (
                            <div onClick={() => gallerySlider()}>
                              <Image
                                className={
                                  index === 0 && project.slideMedia.length === 0
                                    ? classes.image
                                    : classes.imageFrame
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
                      ))}
                    </div>
                  )}
                  {index === project.media.length - 1 &&
                    project.mediaQuadruple.length > 0 && (
                      <div className={classes.imageBoxQuadruple}>
                        {project.mediaQuadruple.map((image, index) => (
                          <div key={index} className={classes.imageBox}>
                            {permissionControl === "admin" &&
                              !displayGallerySlider && (
                                <div
                                  className={classes.control}
                                  style={{
                                    fontFamily: language
                                      ? "English"
                                      : "English",
                                  }}
                                >
                                  <p
                                    className={classes.item}
                                    onClick={() => removeQuadruple(index)}
                                  >
                                    Remove
                                  </p>
                                </div>
                              )}
                            {image.type === "image" ? (
                              <div onClick={() => gallerySlider()}>
                                <Image
                                  className={
                                    index === 0 &&
                                    project.slideMedia.length === 0
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
                        ))}
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
                  <h3>{project[languageType].title}</h3>
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
                {<h2>{project[languageType].title}</h2>}
                <GallerySlider
                  media={project.media
                    .concat(project.slideMedia)
                    .concat(project.mediaDouble)
                    .concat(project.mediaQuadruple)
                    .filter((item) => item.type !== "text")}
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
