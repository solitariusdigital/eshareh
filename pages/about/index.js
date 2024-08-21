/* eslint-disable react/no-unescaped-entities */
import { Fragment, useContext, useState, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./about.module.scss";
import Image from "next/legacy/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { NextSeo } from "next-seo";
import { getUsersApi, deletetUserApi } from "@/services/api";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";

export default function About() {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);

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
      case "tablet-landscape":
        count = 7;
        break;
      case "tablet-portrait":
        count = 5;
        break;
      case "mobile":
        count = 3;
        break;
    }
    return count;
  };

  const setInformationHeight = () => {
    let height = "";
    switch (screenSize) {
      case "desktop":
        height = language ? "180px" : "270px";
        break;
      case "tablet-landscape":
      case "tablet-portrait":
        height = language ? "200px" : "270px";
        break;
      case "mobile":
        height = language ? "250px" : "380px";
        break;
    }
    return height;
  };

  const updateIndex = (swiperInstance) => {
    if (swiperInstance === null) return;
    const currentSlide = swiperInstance?.realIndex;
    setCurrent(currentSlide);
  };

  const deleteUser = async (index) => {
    let confirmationMessage = "  حذف مطمئنی؟";
    let confirm = window.confirm(confirmationMessage);
    if (confirm) {
      await deletetUserApi(users[index]["_id"]);
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
          style={{ height: setInformationHeight() }}
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
                شاکله آژانس اشاره از تیمی متخصص و منحصربه‌فرد تشکیل شده است که
                در کنار یکدیگر و با همکاری هم راه‌کارهایی خلاقانه ارائه می‌دهند
                و رویکردی راه‌حل‌محور دارند تا پاسخگوی نیاز مشتریانمان باشند.
                برای همین، کار تیمی برای آژانس تمام‌ خدمت اشاره در اولویت بوده و
                همیشه یکی از ارزش‌های اصلی این سازمان به حساب می‌آید.
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
                Eshareh's structure is made up of a specialized and unique team
                of experts who collaborate together to provide creative
                solutions and through a solution-centric approach, meet the
                needs of the clients. For this, teamwork is a top priority for
                Eshareh full service agency and is always considered as one of
                the fundamental values of the organization.
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
              mousewheel={true}
              loop={true}
              allowTouchMove={screenSize === "desktop" ? false : true}
              navigation={true}
              modules={[Navigation, Mousewheel, Autoplay]}
              onSlideChange={updateIndex}
              speed={1000}
              autoplay={{
                delay: 500,
                disableOnInteraction: true,
              }}
              // slideToClickedSlide={true}
            >
              {users.map((user, index) => (
                <SwiperSlide key={index} className={classes.swiperSlide}>
                  <Image
                    src={user.media}
                    blurDataURL={user.media}
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
              <h1
                style={{
                  fontFamily: language ? "FarsiMedium" : "EnglishMedium",
                }}
              >
                {users[current]["name"][languageType]}
              </h1>
              <h3>{users[current]["title"][languageType]}</h3>
              {permissionControl === "admin" && (
                <div>
                  <Tooltip title="Delete">
                    <CloseIcon
                      style={{
                        cursor: "pointer",
                      }}
                      sx={{ color: "#d40d12" }}
                      onClick={() => deleteUser(current)}
                    />
                  </Tooltip>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}
