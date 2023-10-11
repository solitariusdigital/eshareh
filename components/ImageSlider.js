import { useState, useContext, Fragment, useEffect } from "react";
import classes from "./ImageSlider.module.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Image from "next/legacy/image";

export default function ImageSlider({ sliderData }) {
  const [current, setCurrent] = useState(0);
  const length = sliderData.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(sliderData) || sliderData.length <= 0) {
    return null;
  }

  return (
    <section className={classes.slider}>
      <ArrowBackIosIcon className={classes.leftArrow} onClick={prevSlide} />
      <ArrowForwardIosIcon className={classes.rightArrow} onClick={nextSlide} />
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
                loading="eager"
                priority
              />
            )}
          </div>
        );
      })}
    </section>
  );
}
