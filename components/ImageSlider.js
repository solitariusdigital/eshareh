import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./ImageSlider.module.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Image from "next/legacy/image";
import { enToFaDigits, replaceSpacesAndHyphens } from "@/services/utility";
import Router from "next/router";
import Loader from "./Loader";

export default function ImageSlider({ sliderData }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [current, setCurrent] = useState(0);
  const [displayInfo, setDisplayInfo] = useState(false);

  const [startX, setStartX] = useState(null);
  const [endX, setEndX] = useState(null);
  const length = sliderData.length;

  useEffect(() => {
    const slideTimer = setTimeout(() => {
      setDisplayInfo(false);
      setCurrent((current) => (current === length - 1 ? 0 : current + 1));
      setTimeout(() => {
        setDisplayInfo(true);
      }, 20);
    }, 5000);

    const initialDisplayTimer = setTimeout(() => {
      setDisplayInfo(true);
    }, 20);

    return () => {
      clearTimeout(slideTimer);
      clearTimeout(initialDisplayTimer);
    };
  }, [current, length]);

  const slideImage = (type) => {
    setDisplayInfo(false);
    switch (type) {
      case "next":
        setCurrent((current) => (current === length - 1 ? 0 : current + 1));
        break;
      case "prev":
        setCurrent((current) => (current === 0 ? length - 1 : current - 1));
        break;
    }
    setTimeout(() => {
      setDisplayInfo(true);
    }, 20);
  };

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (startX && endX) {
      const deltaX = endX - startX;

      if (deltaX > 0) {
        slideImage("prev");
      } else if (deltaX < 0) {
        slideImage("next");
      }
    }

    setStartX(null);
    setEndX(null);
  };

  return (
    <div className={classes.slider}>
      {screenSize !== "mobile" && (
        <Fragment>
          <ArrowBackIosIcon
            className={classes.leftArrow}
            onClick={() => slideImage("prev")}
          />
          <ArrowForwardIosIcon
            className={classes.rightArrow}
            onClick={() => slideImage("next")}
          />
        </Fragment>
      )}
      {sliderData.map((slide, index) => {
        return (
          <div
            key={index}
            className={index === current ? classes.active : classes.slide}
          >
            {index === current && (
              <div
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onClick={() =>
                  Router.push(
                    `/work/${replaceSpacesAndHyphens(
                      slide[languageType].title
                    )}`
                  )
                }
              >
                {slide[languageType].type === "image" ? (
                  <Image
                    className={classes.image}
                    src={slide[languageType].image}
                    blurDataURL={slide[languageType].image}
                    placeholder="blur"
                    alt={slide[languageType].title}
                    layout="fill"
                    objectFit="cover"
                    priority
                  />
                ) : (
                  <div className={classes.mediaContainer}>
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
            )}
            <div
              className={
                language ? classes.information : classes.informationReverse
              }
            >
              <div
                key={displayInfo}
                className="animate__animated animate__fadeIn"
              >
                <h2>{slide[languageType].title}</h2>
                {screenSize === "desktop" && (
                  <h2>{slide[languageType].description}</h2>
                )}
              </div>
              <div
                className={classes.loader}
                onClick={() => slideImage("next")}
              >
                <h2>{language ? enToFaDigits(current + 1) : current + 1}</h2>
                <Loader key={displayInfo} />
                <h2>{language ? enToFaDigits(length) : length}</h2>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
