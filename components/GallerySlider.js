import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import Image from "next/legacy/image";
import classes from "./GallerySlider.module.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Progress from "@/components/Progress";

export default function GallerySlider({ images }) {
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [progressCompleted, setProgressCompleted] = useState(34);
  const [current, setCurrent] = useState(0);
  const length = images.length;

  const [startX, setStartX] = useState(null);
  const [endX, setEndX] = useState(null);

  const slideImage = (type) => {
    switch (type) {
      case "next":
        setCurrent((current) => (current === length - 1 ? 0 : current + 1));
        break;
      case "prev":
        setCurrent((current) => (current === 0 ? length - 1 : current - 1));
        break;
    }
  };

  const calculatePercentage = (index) => {
    return ((index + 1) / images.length) * 100;
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
      <div className={classes.progress}>
        <Progress color={"#fdb714"} completed={calculatePercentage(current)} />
      </div>
      <div
        className={classes.image}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          onClick={() => slideImage("next")}
          src={images[current]}
          blurDataURL={images[current]}
          placeholder="blur"
          layout="fill"
          objectFit="contain"
          alt="image"
          priority
        />
      </div>
    </div>
  );
}
