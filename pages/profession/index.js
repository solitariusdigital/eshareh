/* eslint-disable react/no-unescaped-entities */
import { useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./profession.module.scss";
import { NextSeo } from "next-seo";
import Image from "next/legacy/image";
import profession from "@/assets/profession.png";
import CircleIcon from "@mui/icons-material/Circle";
import logoEnglish from "@/assets/logoEnglish.svg";
import logoFarsi from "@/assets/logoFarsi.svg";

export default function Profession() {
  const { language, setLanguage } = useContext(StateContext);

  const position = {
    position: "relative",
    top: language ? "13px" : "18px",
    left: language ? "10px" : "-10px",
  };

  return (
    <Fragment>
      <NextSeo
        title={language ? "چه می‌کنیم" : "What We Do"}
        description={
          language
            ? "اشاره یک استودیوی طراحی چند رشته ای و مستقل است"
            : "Eshareh is a multidisciplinary, independently owned design studio"
        }
        canonical="https://eshareh.com/profession"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://eshareh.com/profession",
          title: language ? "چه می‌کنیم" : "What We Do",
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
          fontFamily: language ? "EnglishLight" : "EnglishLight",
        }}
      >
        <div
          className={
            language ? classes.information : classes.informationReverse
          }
        >
          {language ? (
            <h2
              style={{
                fontFamily: "FarsiBold",
              }}
            >
              آژانس تبلیغاتی اشاره، آژانسی است که خدمات متنوع و گسترده‌ای را
              ارائه می‌دهد و به معنای واقعی کلمه، آژانسی تمام‌خدمت است.
              خدمت‌رسانی ما در اشاره هم متمایز است و هم کارآمد، چون کار ما مبتنی
              بر اصول زیر است:
            </h2>
          ) : (
            <h2
              style={{
                fontFamily: "EnglishMedium",
              }}
            >
              Eshareh Advertising Agency is an agency which offers a whole array
              of services and in the true sense of the word is a "full-service"
              agency. Our service provision at Eshareh is both unique and
              effective since it is grounded in couple of core principles:
            </h2>
          )}
        </div>
        <div
          className={
            language ? classes.information : classes.informationReverse
          }
        >
          <div className={classes.row}>
            <CircleIcon
              style={position}
              sx={{ fontSize: 10, color: "#fdb714" }}
            />
            {language ? (
              <h2
                style={{
                  fontFamily: "FarsiLight",
                }}
              >
                تلاش و باور ما این است که رابطه ما با مشتریانمان، رابطه‌ای
                بلندمدت، برد-برد و وفادارانه باشد.
              </h2>
            ) : (
              <h2
                style={{
                  fontFamily: "EnglishLight",
                }}
              >
                We believe in and strive for a long-lasting, win-win
                relationship with our clients.
              </h2>
            )}
          </div>
        </div>
        <div
          className={
            language ? classes.information : classes.informationReverse
          }
        >
          <div className={classes.row}>
            <CircleIcon
              style={position}
              sx={{ fontSize: 10, color: "#fdb714" }}
            />
            {language ? (
              <h2
                style={{
                  fontFamily: "FarsiLight",
                }}
              >
                در تدوین و مدیریت کمپین‌های تبلیغاتی، خلاقیت محور اصلی
                راه‌کارهایی است که به شرکایمان ارائه می‌دهیم. برای ما خلاقیت هیچ
                موقع کهنه نمی‌شود و آن را با استانداردهای جهانی، تجربه خود و
                شناخت استراتژیکی که از بازار کسب و کار ایران داریم، همراه
                می‌کنیم.
              </h2>
            ) : (
              <h2
                style={{
                  fontFamily: "EnglishLight",
                }}
              >
                When designing and managing advertising campaigns, creativity is
                at the heart of the solutions we deliver to our partners. For
                us, creativity never loses novelty as we continuously align it
                with global standards, our expertise and our strategic insights
                into the Iranian business market.
              </h2>
            )}
          </div>
        </div>
        <div
          className={
            language ? classes.information : classes.informationReverse
          }
        >
          <div className={classes.row}>
            <CircleIcon
              style={position}
              sx={{ fontSize: 10, color: "#fdb714" }}
            />
            {language ? (
              <h2
                style={{
                  fontFamily: "FarsiLight",
                }}
              >
                آموزش را یکی از ارکان هویتی سازمانی‌مان می‌دانیم و در این مسیر
                برای همکاران و شرکای تجاری‌مان به طور مستمر دوره‌های آموزشی و
                ورکشاپ‌های تخصصی برگزار می‌کنیم. ما متکی به دانش روز صنعت
                بازاریابی و تبلیغات هستیم و  اساتید ممتاز این حوزه‌ها همراهی‌مان
                می‌کنند.
              </h2>
            ) : (
              <h2
                style={{
                  fontFamily: "EnglishLight",
                }}
              >
                Education is a cornerstone of our organization's spirit, which
                is why we consistently organize training courses and specialized
                workshops for our colleagues and business partners and for this,
                we highly rely on up-to-date global advertising and marketing
                knowledge and we are accompanied by best-in-class tutors and
                mentors in these fields.
              </h2>
            )}
          </div>
        </div>
        <div
          className={
            language ? classes.information : classes.informationReverse
          }
        >
          <div className={classes.row}>
            <CircleIcon
              style={position}
              sx={{ fontSize: 10, color: "#fdb714" }}
            />
            {language ? (
              <h2
                style={{
                  fontFamily: "FarsiLight",
                }}
              >
                ما آژانسی تمام‌خدمت هستیم که به بسیاری از نیازهای مشتریانمان در
                ارتباط با فعالیت‌های بازاریابی پاسخ داده و به آنان خدمت ارائه
                می‌دهیم. سرویس‌های ما شامل ارائه استراتژی ارتباطی، تدوین
                کمپین‌های گسترده تبلیغاتی خلاق (تیزر تبلیغاتی، تیزر تلویزیونی،
                تیزر رادیویی، تبلیغات محیطی و …)، ارائه راهکارهای ارتباطی
                دیجیتال و تدوین کمپین‌های این حوزه (تبلیغات آنلاین، تبلیغات
                شبکه‎‌های اجتماعی، بازاریابی محتوا و شبکه های اجتماعی، تبلیغات
                بنری و …)، ارائه ‌راهکارهای رسانه و خرید رسانه تبلیغاتی و محیطی
                و همین‌طور طراحی و تولید راه‌کارهایی در زمینه تبلیغات{" "}
                <span
                  style={{
                    fontFamily: "English",
                  }}
                >
                  BTL
                </span>{" "}
                (محل فروش، سمپلینگ، کمپین‌های نمایشگاهی، غرفه‌سازی، برگزاری
                رویداد و …) است.
              </h2>
            ) : (
              <h2
                style={{
                  fontFamily: "EnglishLight",
                }}
              >
                We are a full-service agency dedicated to addressing the diverse
                marketing needs of our clients with comprehensive and responsive
                solutions. Our services include communication strategy
                development, developing extensive creative advertising
                campaigns(television and radio commercials, and out-of-home
                advertising, …), offering digital communication solutions and
                developing digital campaigns(online advertising, social media
                advertising, content and social media marketing, banner ads, …),
                offering media solutions, advertising and outdoor media buying,
                designing and executing Below the Line (BTL) campaigns including
                but not limited to Point of Sale, sampling, holding exhibitions,
                booth construction, and event organization.
              </h2>
            )}
          </div>
        </div>
        <div
          className={classes.image}
          onClick={() =>
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            })
          }
        >
          <Image
            src={profession}
            blurDataURL={profession}
            placeholder="blur"
            alt="image"
            layout="fill"
            objectFit="contain"
            as="image"
            priority
          />
        </div>
      </div>
    </Fragment>
  );
}
