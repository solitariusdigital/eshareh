import { useState, useContext } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./CoverSlider.module.scss";
import Image from "next/legacy/image";
import { enToFaDigits, replaceSpacesAndHyphens } from "@/services/utility";
import Router from "next/router";
import Progress from "@/components/Progress";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function CoverSlider({ solutions }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [current, setCurrent] = useState(0);

  const length = solutions.length;

  const calculatePercentage = (index) => {
    return ((index + 1) / solutions.length) * 100;
  };

  const updateIndex = (swiperInstance) => {
    if (swiperInstance === null) return;
    const currentSlide = swiperInstance?.realIndex;
    setCurrent(currentSlide);
  };

  const directSolution = (project) => {
    let link = `/solutions/${replaceSpacesAndHyphens(
      project[languageType].title
    )}`;
    Router.push(link);
  };

  return (
    <div className={classes.slider}>
      <div className={classes.progress}>
        <Progress color={"#fdb714"} completed={calculatePercentage(current)} />
      </div>
      <Swiper
        spaceBetween={0}
        navigation={screenSize !== "mobile" ? true : false}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Autoplay]}
        style={{ "--swiper-navigation-color": "#ffffff" }}
        onSlideChange={updateIndex}
      >
        {solutions.map((project, index) => (
          <SwiperSlide key={index}>
            <div
              className={classes.media}
              onClick={() => directSolution(project)}
            >
              {project.media[0].type === "image" ? (
                <Image
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
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className={language ? classes.information : classes.informationReverse}
      >
        <div>
          <h2>{solutions[current][languageType].title}</h2>
          {screenSize === "desktop" && (
            <h2>{solutions[current][languageType].summary}</h2>
          )}
        </div>
        <div className={classes.loader}>
          <h2>{language ? enToFaDigits(current + 1) : current + 1}</h2>
          <span> / </span>
          <h2>{language ? enToFaDigits(length) : length}</h2>
        </div>
      </div>
    </div>
  );
}
