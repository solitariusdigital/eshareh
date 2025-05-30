/* eslint-disable react/no-unescaped-entities */
import { Fragment, useContext, useState, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./about.module.scss";
import Image from "next/legacy/image";
import { NextSeo } from "next-seo";
import { getUsersApi } from "@/services/api";
import logoEnglish from "@/assets/logoEnglish.svg";
import logoFarsi from "@/assets/logoFarsi.svg";
import dbConnect from "@/services/dbConnect";
import pageModel from "@/models/Page";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Autoplay, Navigation } from "swiper/modules";
import { applyFontToEnglishWords } from "@/services/utility";
import "swiper/css";
import "swiper/css/navigation";

export default function About({ pageData }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [users, setUsers] = useState([]);
  const [current, setCurrent] = useState(0);
  const [pageContent, setPageContent] = useState(pageData.content);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getUsersApi();
        let setOne = shuffleUsers(users.filter((user) => user.display));
        let setTwo = [...setOne];
        setUsers(setOne.concat(setTwo));
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
        count = 9;
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
        height = language ? "140px" : "250px";
        break;
      case "tablet-landscape":
      case "tablet-portrait":
        height = language ? "160px" : "250px";
        break;
      case "mobile":
        height = language ? "250px" : "400px";
        break;
    }
    return height;
  };

  const updateIndex = (swiperInstance) => {
    if (swiperInstance === null) return;
    const currentSlide = swiperInstance?.realIndex;
    setCurrent(currentSlide);
  };

  const shuffleUsers = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      // Generate a random index from 0 to i
      const j = Math.floor(Math.random() * (i + 1));
      // Swap elements at indices i and j
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <Fragment>
      <NextSeo
        title={language ? "درباره ما" : "About Us"}
        description={
          language
            ? "اشاره یک استودیوی طراحی چند رشته ای و مستقل است"
            : "Eshareh is a multidisciplinary, independently owned design studio"
        }
        canonical="https://eshareh.com/about"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://eshareh.com/about",
          title: language ? "درباره ما" : "About Us",
          description: language
            ? "اشاره یک استودیوی طراحی چند رشته ای و مستقل است"
            : "Eshareh is a multidisciplinary, independently owned design studio",
          siteName: language
            ? "آژانس تبلیغاتی اشاره"
            : "Eshareh Advertising Agency",
          images: {
            url: language ? logoFarsi : logoEnglish,
            width: 1200,
            height: 630,
            alt: language ? "اشاره" : "Eshareh",
          },
        }}
        robots="index, follow"
      />
      <div className={classes.container}>
        <div className={language ? classes.title : classes.titleReverse}>
          <h3
            style={{
              fontFamily: language ? "FarsiBold" : "EnglishMedium",
              color: `#${pageContent[0].setting.split(" ")[0]}`,
              fontSize: `${pageContent[0].setting.split(" ")[1]}px`,
            }}
            dangerouslySetInnerHTML={{
              __html: applyFontToEnglishWords(
                pageContent[0].data[languageType],
                language ? "FarsiBold" : "EnglishMedium",
                `${pageContent[0].setting.split(" ")[1]}px`,
                language
              ),
            }}
          ></h3>
        </div>
        <div
          className={
            language ? classes.information : classes.informationReverse
          }
          style={{ height: setInformationHeight() }}
        >
          <h1
            style={{
              color: `#${pageContent[1].setting.split(" ")[0]}`,
              fontSize: `${pageContent[1].setting.split(" ")[1]}px`,
            }}
          >
            {pageContent[1].data[languageType]}
          </h1>
          <div>
            <h3
              style={{
                color: `#${pageContent[2].setting.split(" ")[0]}`,
                fontSize: `${pageContent[2].setting.split(" ")[1]}px`,
              }}
            >
              {pageContent[2].data[languageType]}
            </h3>
          </div>
        </div>
        {users.length > 0 && (
          <div className={classes.swiperContainer}>
            <Swiper
              className={classes.swiper}
              slidesPerView={generateSwipeCount()}
              spaceBetween={screenSize === "desktop" ? 25 : 0}
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
              <h3
                dangerouslySetInnerHTML={{
                  __html: applyFontToEnglishWords(
                    users[current]["title"][languageType],
                    "English",
                    "20px",
                    language
                  ),
                }}
              ></h3>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}

// initial connection to db
export async function getServerSideProps(context) {
  try {
    await dbConnect();
    const pageData = await pageModel.findOne({ slug: "about" });

    return {
      props: {
        pageData: JSON.parse(JSON.stringify(pageData)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
