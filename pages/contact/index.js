import { useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./contact.module.scss";
import Image from "next/legacy/image";
import contact from "@/assets/contact.jpg";
import { NextSeo } from "next-seo";
import logoEnglish from "@/assets/logoEnglish.svg";
import logoFarsi from "@/assets/logoFarsi.svg";

export default function Contact() {
  const { language, setLanguage } = useContext(StateContext);

  const locationLink =
    "https://www.google.com/maps/place/Eshareh+Advertising+Agency/@35.7743132,51.3941519,17z/data=!4m6!3m5!1s0x3f8e0651f88334cf:0xbf2b6076f1e9fc52!8m2!3d35.7746884!4d51.3941131!16s%2Fg%2F1tg6j0hh?entry=ttu";

  const ghostBike =
    "https://eshareh.storage.iran.liara.space/motion/ghostBike.gif";

  return (
    <Fragment>
      <NextSeo
        title={language ? "تماس با ما" : "Contact Us"}
        description={
          language
            ? "اشاره یک استودیوی طراحی چند رشته ای و مستقل است"
            : "Eshareh is a multidisciplinary, independently owned design studio"
        }
        canonical="https://eshareh.com/contact"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://eshareh.com/contact",
          title: language ? "تماس با ما" : "Contact Us",
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
      <div className={classes.container}>
        <div className={classes.image}>
          <Image
            className={classes.image}
            src={contact}
            blurDataURL={contact}
            placeholder="blur"
            alt="eshareh"
            layout="fill"
            objectFit="cover"
            as="image"
            priority
          />
        </div>
        <div
          className={classes.information}
          style={{
            fontFamily: language ? "Farsi" : "English",
          }}
        >
          <div>
            <div
              className={language ? classes.row : classes.rowReverse}
              style={{
                color: `#fdb714`,
                fontFamily: language ? "FarsiBold" : "EnglishBold",
              }}
              onClick={() => window.open(locationLink)}
            >
              {language ? (
                <h3 className={classes.click}>دفتر مرکزی</h3>
              ) : (
                <h3 className={classes.click}>Head Office</h3>
              )}
            </div>
            <div
              className={classes.details}
              onClick={() => window.open(locationLink)}
            >
              <div className={language ? classes.row : classes.rowReverse}>
                {language ? (
                  <p className={classes.click}>
                    ،تهران، انتهای شیخ بهایی شمالی
                  </p>
                ) : (
                  <p className={classes.click}>No. 2, 21st Alley,</p>
                )}
              </div>
              <div className={language ? classes.row : classes.rowReverse}>
                {language ? (
                  <p className={classes.click}>
                    نبش بزرگراه نیایش کوچه ۲۱، پلاک ۲
                  </p>
                ) : (
                  <p className={classes.click}>North Sheikh Bahaei St.</p>
                )}
              </div>
              <div className={language ? classes.row : classes.rowReverse}>
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
                <p className={classes.click}>{language ? ":تلفن" : "Tel:"}</p>
                <p className={classes.clickTel}>
                  {language ? "۰۲۱ ۸۸۰ ۴۴ ۲۴۴" : "+98 (21) 880 44 244"}
                </p>
              </div>
              <div className={language ? classes.row : classes.rowReverse}>
                <p>{language ? ":فکس" : "Fax:"}</p>
                <p className={classes.clickFax}>
                  {language ? "۰۲۱ ۸۸۰ ۶۰ ۶۶۶" : "+98 (21) 880 60 666"}
                </p>
              </div>
              <div className={language ? classes.row : classes.rowReverse}>
                <p
                  className={classes.email}
                  style={{
                    fontFamily: language ? "English" : "English",
                    fontSize: language ? "0.85rem" : "1rem",
                  }}
                >
                  info@eshareh.com
                </p>
              </div>
            </div>
          </div>
          <div className={classes.animeContainer}>
            <Image
              src={ghostBike}
              blurDataURL={ghostBike}
              placeholder="blur"
              alt="image"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div>
            <div
              className={language ? classes.row : classes.rowReverse}
              style={{
                color: `#fdb714`,
                fontFamily: language ? "FarsiBold" : "EnglishBold",
              }}
              onClick={() => window.open(locationLink)}
            >
              {language ? (
                <h3 className={classes.click}>استودیو فیلم سازی</h3>
              ) : (
                <h3 className={classes.click}>Production House</h3>
              )}
            </div>
            <div
              className={classes.details}
              onClick={() => window.open(locationLink)}
            >
              <div className={language ? classes.row : classes.rowReverse}>
                {language ? (
                  <p className={classes.click}>
                    تهران، خیابان چراغی، بوستان ولایت
                  </p>
                ) : (
                  <p className={classes.click}>4th Industrial Shed,</p>
                )}
              </div>
              <div className={language ? classes.row : classes.rowReverse}>
                {language ? (
                  <p className={classes.click}>بوستان شهربانو، سوله چهارم</p>
                ) : (
                  <p className={classes.click}>
                    Shahrbanoo Park, Velayad Park,
                  </p>
                )}
              </div>
              <div className={language ? classes.row : classes.rowReverse}>
                {language ? (
                  <p className={classes.click}>سوله ارتباط تصویر اشاره</p>
                ) : (
                  <p className={classes.click}>Cheraghi St., Tehran - Iran</p>
                )}
              </div>
            </div>
            <div className={classes.details}>
              <div
                className={language ? classes.row : classes.rowReverse}
                onClick={() => window.open("tel:+989384997808", "_self")}
              >
                <p className={classes.click}>{language ? ":موبایل" : "Mob:"}</p>
                <p className={classes.clickTel}>
                  {language ? "۰۹۳۸ ۴۹۹۷۸۰۸" : "+98 (938) 499 78 08"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={classes.resume}
        style={{
          fontFamily: language ? "Farsi" : "English",
        }}
      >
        {language ? <p>ارسال رزومه</p> : <p>Send your resume</p>}
      </div>
    </Fragment>
  );
}
