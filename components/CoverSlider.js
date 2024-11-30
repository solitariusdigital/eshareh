import { useState, useContext } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./CoverSlider.module.scss";
import Image from "next/legacy/image";
import { toFarsiNumber } from "@/services/utility";
import Router from "next/router";
import Progress from "@/components/Progress";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function CoverSlider({ covers }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [current, setCurrent] = useState(0);

  const length = covers.length;

  const calculatePercentage = (index) => {
    return ((index + 1) / covers.length) * 100;
  };

  const updateIndex = (swiperInstance) => {
    if (swiperInstance === null) return;
    const currentSlide = swiperInstance?.realIndex;
    setCurrent(currentSlide);
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
        onSlideChange={updateIndex}
      >
        {covers
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          .map((project, index) => (
            <SwiperSlide key={index}>
              <div
                className={classes.media}
                onClick={() => Router.push(project.link)}
              >
                {project.coverMedia.type === "image" ? (
                  <Image
                    src={project.coverMedia.link}
                    blurDataURL={project.coverMedia.link}
                    placeholder="blur"
                    alt={project.title[languageType]}
                    layout="fill"
                    objectFit="cover"
                    as="image"
                    priority
                  />
                ) : (
                  <video
                    className={classes.video}
                    src={project.coverMedia.link + "#t=0.1"}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  />
                )}
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div
        style={{ color: `#${covers[current].color}` }}
        className={language ? classes.information : classes.informationReverse}
      >
        {covers[current].text && screenSize !== "mobile" && (
          <h2
            style={{
              fontFamily: language ? "FarsiLight" : "EnglishLight",
            }}
          >
            {covers[current].title[languageType]}
          </h2>
        )}
        <div
          className={classes.loader}
          style={{
            fontFamily: language ? "Farsi" : "English",
          }}
        >
          <h2>{language ? toFarsiNumber(current + 1) : current + 1}</h2>
          <span
            style={{
              fontFamily: language ? "English" : "English",
            }}
          >
            /
          </span>
          <h2>{language ? toFarsiNumber(length) : length}</h2>
        </div>
      </div>
    </div>
  );
}
