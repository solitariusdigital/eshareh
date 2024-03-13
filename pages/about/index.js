import { Fragment, useContext, useState, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./about.module.scss";
import Image from "next/legacy/image";
import { enToFaDigits } from "@/services/utility";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { NextSeo } from "next-seo";
import { getUsersApi, updateUserApi } from "@/services/api";
import balloon from "@/assets/balloon.png";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";

export default function About() {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);

  const [users, setUsers] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getUsersApi();
        setUsers(users.filter((user) => user.active));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

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

  const deactivateUser = async (index) => {
    let confirmationMessage = "آرشیو و پنهان، مطمئنی؟";
    let confirm = window.confirm(confirmationMessage);
    let user = {
      ...users[index],
      active: false,
    };
    if (confirm) {
      await updateUserApi(user);
      window.location.assign("/about");
    }
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
        {users.length > 0 && (
          <div className={classes.swiperContainer}>
            <Swiper
              className={classes.swiper}
              slidesPerView={generateSwipeCount()}
              spaceBetween={0}
              centeredSlides={true}
              // navigation={true}
              mousewheel={true}
              loop={true}
              allowTouchMove={false}
              modules={[Navigation, Mousewheel, Autoplay]}
              style={{ "--swiper-navigation-color": "#ffffff" }}
              onSlideChange={updateIndex}
              autoplay={{
                delay: 500,
                disableOnInteraction: true,
              }}
              speed={1000}
              // slideToClickedSlide={true}
              // onSlideChangeEnd={(swiper) => {
              //   swiper.fixLoop();
              // }}
            >
              {users.map((user, index) => (
                <SwiperSlide key={index} className={classes.swiperSlide}>
                  <Image
                    src={user.media ? user.media : balloon}
                    blurDataURL={user.media ? user.media : balloon}
                    placeholder="blur"
                    alt={user.name[languageType]}
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
                {users[current]["name"][languageType]}
              </h2>
              <p>{users[current]["title"][languageType]}</p>
              <Tooltip title="Remove">
                <CloseIcon
                  className="icon"
                  sx={{ color: "#d40d12" }}
                  onClick={() => deactivateUser(current)}
                />
              </Tooltip>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}
