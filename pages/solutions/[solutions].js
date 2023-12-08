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
import dbConnect from "@/services/dbConnect";
import solutionModel from "@/models/Solution";

export default function Solution({ project }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { displayMenu, setDisplayMenu } = useContext(StateContext);
  const { displayFooter, setFooter } = useContext(StateContext);
  const [isFullWidth, setIsFullWidth] = useState([]);
  const [displayGallerySlider, setDisplayGallerySlider] = useState(false);
  const [displayController, setDisplayController] = useState(false);

  useEffect(() => {
    setIsFullWidth(Array(project.media.length).fill(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            </div>
            {index === 0 && (
              <div
                className={
                  language ? classes.informationReverse : classes.information
                }
              >
                <h2
                  className={classes.info}
                  style={{ textAlign: language ? "right" : "left" }}
                >
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
                <h2
                  className={classes.info}
                  style={{ textAlign: language ? "right" : "left" }}
                >
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
              <ArrowBackIosIcon className="icon" />
              <p>NEXT</p>
              <ArrowForwardIosIcon className="icon" />
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
            <GallerySlider images={project.media} />
          </div>
        )}
        <div className={classes.nextProject} ref={targetRef}>
          <NextProject />
        </div>
      </div>
    </Fragment>
  );
}

// initial connection to db
export async function getServerSideProps(context) {
  try {
    await dbConnect();
    const projects = await solutionModel.find();
    let project = projects.find(
      (p) =>
        p.en.title === replaceSpacesAndHyphens(context.query.solutions) ||
        p.fa.title === replaceSpacesAndHyphens(context.query.solutions)
    );
    return {
      props: {
        project: JSON.parse(JSON.stringify(project)),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
