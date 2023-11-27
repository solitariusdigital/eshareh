import { useState } from "react";
import Image from "next/legacy/image";
import classes from "./GallerySlider.module.scss";
import Progress from "@/components/Progress";
import Router from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function GallerySlider({ images }) {
  const [current, setCurrent] = useState(0);

  const calculatePercentage = (index) => {
    return ((index + 1) / images.length) * 100;
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
      <div className={classes.swiper}>
        <Swiper
          slidesPerView="auto"
          spaceBetween={0}
          navigation={true}
          mousewheel={true}
          keyboard={true}
          loop={true}
          modules={[Navigation, Mousewheel, Keyboard]}
          style={{ "--swiper-navigation-color": "#ffffff" }}
          onSlideChange={updateIndex}
        >
          {images.map((photo, index) => (
            <SwiperSlide key={index}>
              <div className={classes.image}>
                <Image
                  src={photo}
                  blurDataURL={photo}
                  placeholder="blur"
                  alt={photo}
                  layout="fill"
                  objectFit="cover"
                  as="image"
                  priority
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
