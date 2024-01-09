import { Fragment, useContext, useState } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./about.module.scss";
import Image from "next/legacy/image";
import { enToFaDigits } from "@/services/utility";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { NextSeo } from "next-seo";
import team from "@/assets/team.jpg";
import teamone from "@/assets/teamone.jpg";

export default function About() {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [current, setCurrent] = useState(0);

  const photos = [
    {
      fa: {
        image: teamone,
        title: "سحر",

        position: "1 مدیر",
      },
      en: {
        image: teamone,
        title: "Sahar",
        position: "Manager 1",
      },
    },
    {
      fa: {
        image: team,
        title: "سیامک",

        position: "مدیر واحد خلاقیت",
      },
      en: {
        image: team,
        title: "Siamak",
        position: "Accounts 1",
      },
    },
    {
      fa: {
        image: teamone,
        title: "سحر",

        position: "مدیر",
      },
      en: {
        image: teamone,
        title: "Sahar",
        position: "Manager",
      },
    },
    {
      fa: {
        image: team,
        title: "سیامک",

        position: "مدیر واحد خلاقیت",
      },
      en: {
        image: team,
        title: "Siamak",
        position: "Accounts",
      },
    },
    {
      fa: {
        image: teamone,
        title: "سحر",

        position: "مدیر",
      },
      en: {
        image: teamone,
        title: "Sahar",
        position: "Manager",
      },
    },
    {
      fa: {
        image: team,
        title: "سیامک",

        position: "مدیر واحد خلاقیت",
      },
      en: {
        image: team,
        title: "Siamak",
        position: "Accounts",
      },
    },
    {
      fa: {
        image: teamone,
        title: "سحر",

        position: "مدیر",
      },
      en: {
        image: teamone,
        title: "Sahar",
        position: "Manager",
      },
    },
    {
      fa: {
        image: team,
        title: "سیامک",

        position: "مدیر واحد خلاقیت",
      },
      en: {
        image: team,
        title: "Siamak",
        position: "Accounts",
      },
    },
    {
      fa: {
        image: teamone,
        title: "سحر",

        position: "مدیر",
      },
      en: {
        image: teamone,
        title: "Sahar",
        position: "Manager",
      },
    },
    {
      fa: {
        image: team,
        title: "سیامک",

        position: "مدیر واحد خلاقیت",
      },
      en: {
        image: team,
        title: "Siamak",
        position: "Accounts",
      },
    },
    {
      fa: {
        image: teamone,
        title: "سحر",

        position: "مدیر",
      },
      en: {
        image: teamone,
        title: "Sahar",
        position: "Manager",
      },
    },
    {
      fa: {
        image: team,
        title: "سیامک",

        position: "مدیر واحد خلاقیت",
      },
      en: {
        image: team,
        title: "Siamak",
        position: "Accounts",
      },
    },
    {
      fa: {
        image: teamone,
        title: "سحر",

        position: "مدیر",
      },
      en: {
        image: teamone,
        title: "Sahar",
        position: "Manager",
      },
    },
    {
      fa: {
        image: team,
        title: "سیامک",

        position: "مدیر واحد خلاقیت",
      },
      en: {
        image: team,
        title: "Siamak",
        position: "Accounts",
      },
    },
    {
      fa: {
        image: teamone,
        title: "سحر",

        position: "مدیر",
      },
      en: {
        image: teamone,
        title: "Sahar",
        position: "Manager",
      },
    },
    {
      fa: {
        image: team,
        title: "سیامک",

        position: "مدیر واحد خلاقیت",
      },
      en: {
        image: team,
        title: "Siamak",
        position: "Accounts",
      },
    },
  ];

  const generateSwipeCount = () => {
    let count = 0;
    switch (screenSize) {
      case "desktop":
        count = 11;
        break;
      case "tablet":
        count = 7;
        break;
      case "mobile":
        count = 3;
        break;
    }
    return count;
  };

  const updateIndex = (swiperInstance) => {
    if (swiperInstance === null) return;
    const currentSlide = swiperInstance?.realIndex;
    setCurrent(currentSlide);
  };

  return (
    <Fragment>
      <NextSeo
        title={language ? "درباره" : "About"}
        description={
          language
            ? "اشاره یک استودیوی طراحی چند رشته ای و مستقل است"
            : "Eshareh is a multidisciplinary, independently owned design studio"
        }
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://eshareh.com/about",
          siteName: "Eshareh Advertising Agency",
        }}
      />
      <div className={classes.container}>
        <div
          className={
            language ? classes.information : classes.informationReverse
          }
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
                اشاره در سال {enToFaDigits(1376)} به عنوان یک آژانس تبلیغاتی
                آغاز به کار کرد. در نتیجه‌ی فرآیندی اُرگانیک، به یک آژانس
                ارتباطات بازاریابی فول سرویس با رویکردی راه‌حل‌گرا تبدیل شد
              </p>
            </div>
          ) : (
            <div>
              <h3
                style={{
                  fontFamily: "EnglishMedium",
                }}
              >
                Eshareh is a multidisciplinary, independently owned design
                studio
              </h3>
              <p>
                Eshareh, was established in 1996 as an advertising agency.
                Through an organic growth the agency has transformed into a
                full-service marketing communications agency with a solution
                based approach
              </p>
            </div>
          )}
        </div>
        <div className={classes.swiperContainer}>
          <Swiper
            className={classes.swiper}
            slidesPerView={generateSwipeCount()}
            spaceBetween={0}
            centeredSlides={true}
            navigation={true}
            mousewheel={true}
            loop={true}
            modules={[Navigation, Mousewheel, Autoplay]}
            style={{ "--swiper-navigation-color": "#ffffff" }}
            onSlideChange={updateIndex}
            autoplay={{
              delay: 1000,
              disableOnInteraction: true,
            }}
            speed={1000}
            // slideToClickedSlide={true}
            // onSlideChangeEnd={(swiper) => {
            //   swiper.fixLoop();
            // }}
          >
            {photos.map((photo, index) => (
              <SwiperSlide key={index} className={classes.swiperSlide}>
                <Image
                  src={photo[languageType].image}
                  blurDataURL={photo[languageType].image}
                  placeholder="blur"
                  alt={photo[languageType].title}
                  layout="fill"
                  objectFit="cover"
                  as="image"
                  priority
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={classes.details}>
            <h2
              style={{
                fontFamily: language ? "FarsiMedium" : "EnglishMedium",
              }}
            >
              {photos[current][languageType].title}
            </h2>
            <p>{photos[current][languageType].position}</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
