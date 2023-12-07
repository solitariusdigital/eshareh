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

export default function CoverSlider({ sliderData }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [current, setCurrent] = useState(0);

  const length = sliderData.length;

  const calculatePercentage = (index) => {
    return ((index + 1) / sliderData.length) * 100;
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
        style={{ "--swiper-navigation-color": "#ffffff" }}
        onSlideChange={updateIndex}
      >
        {sliderData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className={classes.media}
              onClick={() =>
                Router.push(
                  `/solutions/${replaceSpacesAndHyphens(
                    slide[languageType].title
                  )}`
                )
              }
            >
              {slide[languageType].type === "image" ? (
                <Image
                  src={slide[languageType].image}
                  blurDataURL={slide[languageType].image}
                  placeholder="blur"
                  alt={slide[languageType].title}
                  layout="fill"
                  objectFit="cover"
                  as="image"
                  priority
                />
              ) : (
                <div>
                  <video
                    className={classes.video}
                    preload="metadata"
                    src="https://www.eshareh.com/wp-content/uploads/2022/06/Fouman-Chimie_Movie_01.mp4"
                    autoPlay
                    loop
                    muted
                  />
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className={language ? classes.information : classes.informationReverse}
      >
        <div>
          <h2>{sliderData[current][languageType].title}</h2>
          {screenSize === "desktop" && (
            <h2>{sliderData[current][languageType].description}</h2>
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
