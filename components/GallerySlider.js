import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import Image from "next/legacy/image";
import classes from "./GallerySlider.module.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function GallerySlider({ images }) {
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [current, setCurrent] = useState(0);

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

  return (
    <div className={classes.slider}>
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

      {images.map((image, index) => {
        return (
          <div key={index} className={classes.imageBox}>
            {index === current && (
              <Image
                src={image}
                blurDataURL={image}
                placeholder="blur"
                alt="image"
                layout="fill"
                objectFit="cover"
                priority
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
