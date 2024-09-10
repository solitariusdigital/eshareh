import { useContext, Fragment, useEffect, useState, useMemo } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./therighthint.module.scss";
import { NextSeo } from "next-seo";
import { getCharityApi, updateCharityApi } from "@/services/api";
import secureLocalStorage from "react-secure-storage";
import logoEnglish from "@/assets/logoEnglish.svg";
import logoFarsi from "@/assets/logoFarsi.svg";
import Progress from "@/components/Progress";
import cover from "@/assets/therighthint/cover.png";
import star from "@/assets/therighthint/star.png";
import starFlip from "@/assets/therighthint/starFlip.png";
import popup from "@/assets/therighthint/popup.png";
import button from "@/assets/therighthint/button.png";
import Image from "next/legacy/image";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IosShareIcon from "@mui/icons-material/IosShare";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TelegramShareButton,
} from "react-share";

export default function Therighthint() {
  const { language, setLanguage } = useContext(StateContext);
  const [charity, setCharity] = useState({});
  const textsArray = useMemo(
    () => [
      "خلاقیــت",
      "پیشــرفت",
      "یادگیـــری",
      "آمــــوزش",
      "درســـــتی",
      "نیکــــــــی",
    ],
    []
  );
  const [dynamicText, setDynamicText] = useState(textsArray[0]);
  const [animate, setAnimate] = useState(false);
  const [displayPopup, setDisplayPopup] = useState(false);
  const [displaySocial, setDisplaySocial] = useState(false);

  const shareUrl = "https://eshareh.com/therighthint";
  const titleCampaign = "اشاره‌ای درست!";
  const summaryCampaign = "اشاره‌ای درست!";
  const hashtagCampaign = ["therighthint", "اشاره‌ای_درست"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCharityApi();
        setCharity(data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const calculatePercentage = (count) => {
    return ((count + 1) / charity.maxCount) * 100;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false);
      setDynamicText((prevFruit) => {
        const currentIndex = textsArray.indexOf(prevFruit);
        const nextIndex = (currentIndex + 1) % textsArray.length;
        return textsArray[nextIndex];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [textsArray]);

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 10);
  }, [dynamicText]);

  useEffect(() => {
    // Enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const updateCharityCount = async () => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    setDisplayPopup(true);
    let checkCharityUser = secureLocalStorage.getItem("charityUser");
    // if (!checkCharityUser) {
    let count = charity.count;
    count += 1;
    let dataObject = {
      id: charity["_id"],
      count: count,
    };
    await updateCharityApi(dataObject);
    setCharity(dataObject);
    secureLocalStorage.setItem("charityUser", true);
    // }
  };

  return (
    <Fragment>
      <NextSeo
        title={language ? "اشاره‌ای درست!" : "The Right Hint"}
        description={
          language
            ? "اشاره یک استودیوی طراحی چند رشته ای و مستقل است"
            : "Eshareh is a multidisciplinary, independently owned design studio"
        }
        canonical="https://eshareh.com/therighthint"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://eshareh.com/therighthint",
          title: language ? "اشاره‌ای درست!" : "The Right Hint",
          description: language
            ? "اشاره یک استودیوی طراحی چند رشته ای و مستقل است"
            : "Eshareh is a multidisciplinary, independently owned design studio",
          siteName: language
            ? "آژانس تبلیغاتی اشاره"
            : "Eshareh Advertising Agency",
          images: [
            {
              url: language ? logoFarsi : logoEnglish,
              width: 1200,
              height: 630,
              alt: language
                ? "آژانس تبلیغاتی اشاره"
                : "Eshareh Advertising Agency",
            },
          ],
        }}
        robotsProps={{
          maxSnippet: -1,
          maxImagePreview: "large",
          maxVideoPreview: -1,
        }}
      />

      <div
        className={classes.container}
        style={{
          fontFamily: language ? "FarsiBold" : "FarsiBold",
        }}
      >
        <div className={classes.cover}>
          <div className={classes.starRight}>
            <Image
              src={starFlip}
              blurDataURL={starFlip}
              placeholder="blur"
              alt="star"
              layout="responsive"
              objectFit="contain"
              as="image"
              priority
            />
          </div>
          <Image
            className={classes.cover}
            src={cover}
            blurDataURL={cover}
            placeholder="blur"
            alt="cover"
            layout="responsive"
            objectFit="contain"
            as="image"
            priority
          />
          <div className={classes.star}>
            <Image
              src={star}
              blurDataURL={star}
              placeholder="blur"
              alt="star"
              layout="responsive"
              objectFit="contain"
              as="image"
              priority
            />
          </div>
        </div>
        <div
          className={classes.content}
          style={{
            fontFamily: language ? "FarsiLight" : "FarsiLight",
          }}
        >
          <div
            className={classes.bigTitle}
            style={{
              fontFamily: language ? "FarsiFat" : "FarsiFat",
            }}
          >
            اشــــــــاره‌ای درست
            <span>!</span>
            <div className={classes.starRight}>
              <Image
                src={star}
                blurDataURL={star}
                placeholder="blur"
                alt="star"
                layout="responsive"
                objectFit="contain"
                as="image"
                priority
              />
            </div>
            <div className={classes.star}>
              <Image
                src={starFlip}
                blurDataURL={starFlip}
                placeholder="blur"
                alt="star"
                layout="responsive"
                objectFit="contain"
                as="image"
                priority
              />
            </div>
          </div>
          <h2>
            ما معتقدیم یادگیری مستمر می‌تواند در کیفیت هر لحظه‌ تاثیر‌گذار باشد
            و خاستگاه فردی را ارتقا دهد.
          </h2>
          <h2>
            با دنبال کردن این تفکر بدین نتیجه رسیدیم که یادگیری و آموزش در بالا
            بردن سطح اجتماعی همانند بالا رفتن خاستگاه فردی، موثر بوده و روند رو
            به رشدتری را در بر خواهد داشت.
          </h2>
          <h2>
            با اشاره‌ای درست به اهداف درست‌تر و کمک به نوجوانان؛ نسلی که به این
            حد از تفکرات و فعالیت‌ ها نزدیک‌تر هستند، می‌توان پایه‌های محکم‌تری
            را در این مسیر برداشت و آن را هدایت کرد.
          </h2>
          <h2>
            اینکه همه‌ی نوجوانان و افراد جامعه در جایگاه درست خود قرار گیرند و
            بتوانند استعدادها و افکار خود را پرورش دهند، مهم‌ترین اصل در این هدف
            است.
          </h2>
          <h2>
            برای اینکه بتوانیم به این روند کمک کوچکی کرده باشیم؛ با تیم اشاره در
            کمپین اشاره‌ای درست! شرکت کنید و نوجوانان را برای یادگیری در جای
            درست خود قرار دهید.
          </h2>
          <h2
            className={classes.yellowTitle}
            style={{
              fontFamily: language ? "FarsiBold" : "FarsiBold",
            }}
          >
            یادمان باشد که همیشه در حال یادگیری باشیم!
          </h2>
          <h2>
            بر روی دکمه‌ی نشانه‌دار بزنید و با هر کلیک، نمودار مربوط را برای کمک
            به سقف نهایی برسانید.
          </h2>
          <h2>
            تنها با یک کلیک ساده، مبلغی از سمت تیم اشاره به{" "}
            <span
              style={{
                fontFamily: language ? "FarsiBold" : "FarsiBold",
              }}
            >
              *بنیاد نیکوکاری حکمت
            </span>{" "}
            برای کمک به یادگیری نوجونان در زمینه‌های مختلف کمک خواهد شد.
          </h2>
          <div className={classes.actionContainer}>
            <h2
              className={classes.bigTitle}
              style={{
                fontFamily: language ? "FarsiBold" : "FarsiBold",
              }}
            >
              به
            </h2>
            <div className={classes.star}>
              <Image
                src={starFlip}
                blurDataURL={starFlip}
                placeholder="blur"
                alt="star"
                layout="responsive"
                objectFit="contain"
                as="image"
                priority
              />
            </div>
            <div className={classes.click} onClick={() => updateCharityCount()}>
              <h2
                className={classes.bigTitle}
                style={{
                  fontFamily: language ? "FarsiFat" : "FarsiFat",
                }}
              >
                {dynamicText}
              </h2>
              <div className={classes.button}>
                <Image
                  className={classes.buttonShadow}
                  src={button}
                  blurDataURL={button}
                  placeholder="blur"
                  alt="button"
                  layout="responsive"
                  objectFit="cover"
                  as="image"
                  priority
                />
              </div>
            </div>
            <h2
              className={classes.bigTitle}
              style={{
                fontFamily: language ? "FarsiBold" : "FarsiBold",
              }}
            >
              اشــــــــاره کنید
              <span>!</span>
            </h2>
          </div>
          <div className={classes.progress}>
            <Progress
              color={"#fdb714"}
              completed={calculatePercentage(charity.count)}
              height={10}
              border={true}
            />
          </div>
          <div className={classes.star}>
            <Image
              src={star}
              blurDataURL={star}
              placeholder="blur"
              alt="star"
              layout="responsive"
              objectFit="contain"
              as="image"
              priority
            />
          </div>
          <div
            className={classes.hekmat}
            onClick={() =>
              window.open("https://www.instagram.com/hekmattoos_", "_ self")
            }
          >
            <h3>آشنایی بیشتر با بنیاد حکمت</h3>
            <ArrowBackIosNewIcon />
          </div>
        </div>
      </div>

      {displayPopup && (
        <div className={classes.popup}>
          <div className={classes.graphic}>
            <div className={classes.text}>
              <h2
                style={{
                  fontFamily: language ? "FarsiHeavy" : "FarsiHeavy",
                }}
              >
                با این اشــــــــــاره نیکی اتفاق افتاد!
              </h2>
              <h3
                style={{
                  fontFamily: language ? "FarsiMedium" : "FarsiMedium",
                }}
              >
                سپاس از همراهی شما
              </h3>
            </div>
            <Image
              src={popup}
              blurDataURL={popup}
              placeholder="blur"
              alt="popup"
              layout="responsive"
              objectFit="contain"
              as="image"
              priority
            />
            <div className={classes.star}>
              <Image
                src={starFlip}
                blurDataURL={starFlip}
                placeholder="blur"
                alt="star"
                layout="responsive"
                objectFit="contain"
                as="image"
                priority
              />
            </div>
          </div>
          <div
            className={classes.share}
            onClick={() => {
              setDisplaySocial(!displaySocial);
              navigator.clipboard.writeText(shareUrl);
            }}
          >
            <h4>یاری بیشتر با به اشتراک گذاشتن صفحه‌ی اشاره</h4>
            <IosShareIcon sx={{ fontSize: 16 }} />
            {displaySocial && (
              <div
                className={`${classes.social} animate__animated animate__slideInDown`}
              >
                <LinkedinShareButton
                  title={titleCampaign}
                  url={shareUrl}
                  summary={summaryCampaign}
                  source={shareUrl}
                >
                  <LinkedInIcon className={classes.icon} />
                </LinkedinShareButton>
                <TwitterShareButton
                  title={titleCampaign}
                  url={shareUrl}
                  hashtags={hashtagCampaign}
                >
                  <XIcon className={classes.icon} />
                </TwitterShareButton>
                <WhatsappShareButton url={shareUrl} title={titleCampaign}>
                  <WhatsAppIcon className={classes.icon} />
                </WhatsappShareButton>
                <TelegramShareButton url={shareUrl} title={titleCampaign}>
                  <TelegramIcon className={classes.icon} />
                </TelegramShareButton>
                <FacebookShareButton
                  url={shareUrl}
                  quote={titleCampaign}
                  title={titleCampaign}
                  hashtag={hashtagCampaign[0]}
                >
                  <FacebookIcon className={classes.icon} />
                </FacebookShareButton>
                <div className={classes.icon}>
                  <InstagramIcon
                    className={classes.icon}
                    onClick={() =>
                      window.open("https://www.instagram.com/", "_ self")
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
}
