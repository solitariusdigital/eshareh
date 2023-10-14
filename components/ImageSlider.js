import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./ImageSlider.module.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Image from "next/legacy/image";
import { enToFaDigits } from "@/services/utility";

export default function ImageSlider({ sliderData }) {
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [current, setCurrent] = useState(0);
  const [displayInfo, setDisplayInfo] = useState(false);

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

  if (!Array.isArray(sliderData) || sliderData.length <= 0) {
    return null;
  }

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
              <Fragment>
                {slide.type === "image" ? (
                  <Image
                    src={slide.image}
                    blurDataURL={slide.image}
                    placeholder="blur"
                    alt="image"
                    layout="fill"
                    objectFit="cover"
                    priority
                  />
                ) : (
                  <div className={classes.mediaContainer}>
                    <video
                      className={classes.video}
                      preload="metadata"
                      src="https://delmare.storage.iran.liara.space/landingpage/video.MOV"
                      autoPlay
                      loop
                      muted
                    />
                  </div>
                )}
              </Fragment>
            )}
            {displayInfo && (
              <div className={classes.information}>
                <div
                  className={
                    screenSize !== "mobile"
                      ? `animate__animated animate__fadeInRight`
                      : ""
                  }
                >
                  <h2>{slide.title}</h2>
                  {screenSize !== "mobile" && <h2>{slide.project}</h2>}
                </div>
                <h3>
                  {enToFaDigits(current + 1)} / {enToFaDigits(length)}
                </h3>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
