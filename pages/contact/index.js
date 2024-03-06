import { useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./contact.module.scss";
import Image from "next/legacy/image";
import mapEnglish from "@/assets/mapEnglish.png";
import mapFarsi from "@/assets/mapFarsi.png";
import { NextSeo } from "next-seo";

export default function Contact() {
  const { language, setLanguage } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);

  const locationLink =
    "https://www.google.com/maps/place/Eshareh+Advertising+Agency/@35.7743132,51.3941519,17z/data=!4m6!3m5!1s0x3f8e0651f88334cf:0xbf2b6076f1e9fc52!8m2!3d35.7746884!4d51.3941131!16s%2Fg%2F1tg6j0hh?entry=ttu";

  return (
    <Fragment>
      <NextSeo
        title={language ? "تماس با ما" : "Contact"}
        description={
          language
            ? "اشاره یک استودیوی طراحی چند رشته ای و مستقل است"
            : "Eshareh is a multidisciplinary, independently owned design studio"
        }
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://eshareh.com/contact",
          siteName: "Eshareh Advertising Agency",
        }}
      />
      <div className={classes.container}>
        <div
          className={language ? classes.resume : classes.resumeReverse}
          style={{
            fontFamily: language ? "FarsiLight" : "English",
          }}
        >
          {language ? <p>ارسال رزومه</p> : <p>Send your resume</p>}
        </div>
        <div onClick={() => window.open(locationLink)}>
          <Image
            src={language ? mapFarsi : mapEnglish}
            blurDataURL={language ? mapFarsi : mapEnglish}
            placeholder="blur"
            alt="map"
            layout="responsive"
            objectFit="contain"
            as="image"
            priority
          />
        </div>
        {screenSize === "desktop" && (
          <h3
            className={language ? classes.mapTag : classes.mapTagReverse}
            style={{
              fontFamily: language ? "FarsiBold" : "EnglishBold",
            }}
          >
            {language ? "شرکت تبلیغاتی اشاره" : "Eshareh Advertising Agency"}
          </h3>
        )}
        <div
          className={language ? classes.location : classes.locationReverse}
          style={{
            fontFamily: language ? "FarsiLight" : "English",
          }}
        >
          {language ? <p>ما را پیدا کنید</p> : <p>Find our office</p>}
        </div>
        <div
          className={
            language ? classes.information : classes.informationReverse
          }
          style={{
            fontFamily: language ? "FarsiLight" : "English",
          }}
        >
          <div className={classes.details}>
            <div
              className={language ? classes.row : classes.rowReverse}
              onClick={() => window.open(locationLink)}
            >
              {language ? (
                <p className={classes.click}>،تهران، انتهای شیخ بهایی شمالی</p>
              ) : (
                <p className={classes.click}>No. 2, 21st Alley,</p>
              )}
            </div>
            <div
              className={language ? classes.row : classes.rowReverse}
              onClick={() => window.open(locationLink)}
            >
              {language ? (
                <p className={classes.click}>
                  نبش بزرگراه نیایش کوچه ۲۱، پلاک ۲
                </p>
              ) : (
                <p className={classes.click}>North Sheikh Bahaei St.</p>
              )}
            </div>
            <div
              className={language ? classes.row : classes.rowReverse}
              onClick={() => window.open(locationLink)}
            >
              {language ? (
                <p className={classes.click}>کد پستی: ۱۹۹۵۷۷۵۳۵۳</p>
              ) : (
                <p className={classes.click}>Tehran, 1995775353, Iran</p>
              )}
            </div>
          </div>
          <div className={classes.details}>
            <div
              className={language ? classes.row : classes.rowReverse}
              onClick={() => window.open("tel:+982188044244", "_self")}
            >
              <p className={classes.click}>{language ? ": تماس" : "Tel :"}</p>
              <p className={classes.click}>
                {language ? "۰۲۱ ۸۸۰ ۴۴ ۲۴۴" : "+98 (21) 880 44 244"}
              </p>
            </div>
            <div className={language ? classes.row : classes.rowReverse}>
              <p>{language ? ": فکس" : "Fax :"}</p>
              <p>{language ? "۰۲۱ ۸۸۰ ۶۰ ۶۶۶" : "+98 (21) 880 60 666"}</p>
            </div>
            <div className={language ? classes.row : classes.rowReverse}>
              <p
                className={classes.email}
                style={{
                  fontFamily: language ? "English" : "English",
                }}
              >
                info@eshareh.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
