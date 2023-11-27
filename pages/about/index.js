import { useContext, useState, useEffect, useRef } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./about.module.scss";
import Image from "next/legacy/image";
import Router from "next/router";
import team from "@/assets/team.jpg";
import teamone from "@/assets/teamone.jpg";
import { enToFaDigits } from "@/services/utility";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function About() {
  const { language, setLanguage } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [activeSwipe, setActiveSwipe] = useState(null);

  const photos = [
    {
      image: teamone,
      title: "سیامک 1",
      position: "مدیر واحد خلاقیت",
    },
    {
      image: team,
      title: "سیامک 2",
      position: "مدیر واحد خلاقیت",
    },
    {
      image: team,
      title: "سیامک 3",
      position: "مدیر واحد خلاقیت",
    },
    {
      image: team,
      title: "سیامک 4",
      position: "مدیر واحد خلاقیت",
    },
    {
      image: team,
      title: "سیامک 5",
      position: "مدیر واحد خلاقیت",
    },
    {
      image: team,
      title: "سیامک 6",
      position: "مدیر واحد خلاقیت",
    },
    {
      image: team,
      title: "سیامک 7",
      position: "مدیر واحد خلاقیت",
    },
    {
      image: team,
      title: "سیامک 8",
      position: "مدیر واحد خلاقیت",
    },
    {
      image: team,
      title: "سیامک 9",
      position: "مدیر واحد خلاقیت",
    },
    {
      image: team,
      title: "سیامک 10",
      position: "مدیر واحد خلاقیت",
    },
  ];

  const generateSwipeCount = () => {
    let count = 0;
    switch (screenSize) {
      case "desktop":
        count = 7;
        break;
      case "tablet":
        count = 3;
        break;
      case "mobile":
        count = 1;
        break;
    }
    return count;
  };

  const updateIndex = (swiperInstance) => {
    if (swiperInstance === null) return;
    const currentSlide = swiperInstance?.realIndex;
    setActiveSwipe(currentSlide);
  };

  return (
    <div className={classes.container}>
      <div
        className={language ? classes.information : classes.informationReverse}
      >
        <h1>{language ? "تیم" : "Team"}</h1>
        {language ? (
          <div>
            <h3
              style={{
                fontFamily: "FarsiBold",
              }}
            >
              اشاره یک استودیوی طراحی چند رشته ای و مستقل است
            </h3>
            <p>
              اشاره در سال {enToFaDigits(1376)} به عنوان یک آژانس تبلیغاتی آغاز
              به کار کرد. در نتیجه‌ی فرآیندی اُرگانیک، به یک آژانس ارتباطات
              بازاریابی فول سرویس با رویکردی راه‌حل‌گرا تبدیل شد
            </p>
          </div>
        ) : (
          <div>
            <h3
              style={{
                fontFamily: "EnglishMedium",
              }}
            >
              Eshareh is a multidisciplinary, independently owned design studio
            </h3>
            <p>
              Eshareh, was established in 1996 as an advertising agency. Through
              an organic growth the agency has transformed into a full-service
              marketing communications agency with a solution based approach
            </p>
          </div>
        )}
      </div>
      <div className={classes.swiper}>
        <Swiper
          slidesPerView={generateSwipeCount()}
          spaceBetween={0}
          centeredSlides={true}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          loop={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          style={{ "--swiper-navigation-color": "#ffffff" }}
          onSlideChange={updateIndex}
        >
          {photos.map((photo, index) => (
            <SwiperSlide key={index}>
              <div className={classes.image}>
                <Image
                  src={photo.image}
                  blurDataURL={photo.image}
                  placeholder="blur"
                  alt={photo.title}
                  layout="fill"
                  objectFit="cover"
                  as="image"
                  priority
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <h2>{photos[activeSwipe]?.title}</h2>
        <p>{photos[activeSwipe]?.position}</p>
      </div>
    </div>
  );
}
