import { useState, useContext, Fragment, useEffect } from "react";
import classes from "./ImageSlider.module.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Image from "next/legacy/image";

export default function ImageSlider({ sliderData }) {
  const [current, setCurrent] = useState(0);
  const [displayInfo, setDisplayInfo] = useState(false);

  const length = sliderData.length;

  useEffect(() => {
    const slideTimer = setTimeout(() => {
      setDisplayInfo(false);
      setCurrent((current) => (current === length - 1 ? 0 : current + 1));
      setTimeout(() => {
        setDisplayInfo(true);
      }, 100);
    }, 5000);

    const initialDisplayTimer = setTimeout(() => {
      setDisplayInfo(true);
    }, 100);

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
    }, 100);
  };

  if (!Array.isArray(sliderData) || sliderData.length <= 0) {
    return null;
  }

  return (
    <section className={classes.slider}>
      <ArrowBackIosIcon
        className={classes.leftArrow}
        onClick={() => slideImage("prev")}
      />
      <ArrowForwardIosIcon
        className={classes.rightArrow}
        onClick={() => slideImage("next")}
      />
      {sliderData.map((slide, index) => {
        return (
          <div
            key={index}
            className={index === current ? classes.active : classes.slide}
          >
            {index === current && (
              <Image
                src={slide.image}
                blurDataURL={slide.image}
                placeholder="blur"
                alt="image"
                layout="fill"
                objectFit="cover"
                priority
              />
            )}
            {displayInfo && (
              <div className={classes.information}>
                <h1 className={`animate__animated animate__fadeInRight`}>
                  {slide.title}
                </h1>
                <h3 className={`animate__animated animate__fadeInRight`}>
                  {slide.project}
                </h3>
              </div>
            )}
            <h3 className={classes.count}>
              {current + 1} / {length}
            </h3>
          </div>
        );
      })}
    </section>
  );
}
