/* eslint-disable react/no-unescaped-entities */
import { useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./profession.module.scss";
import { NextSeo } from "next-seo";
import Image from "next/legacy/image";
import profession from "@/assets/profession.svg";

export default function Profession() {
  const { language, setLanguage } = useContext(StateContext);

  return (
    <Fragment>
      <NextSeo
        title={language ? "چه می‌کنیم" : "What we do"}
        description={
          language
            ? "اشاره یک استودیوی طراحی چند رشته ای و مستقل است"
            : "Eshareh is a multidisciplinary, independently owned design studio"
        }
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://eshareh.com/profession",
          siteName: "Eshareh Advertising Agency",
        }}
      />
      <div
        className={classes.container}
        style={{
          fontFamily: language ? "English" : "English",
        }}
      >
        <div
          className={
            language ? classes.information : classes.informationReverse
          }
        >
          {language ? (
            <h1
              style={{
                fontFamily: "FarsiBold",
              }}
            >
              همچنان که گفته شد ما در اشاره شرکتی تمام خدمت هستیم. اما در ارائه
              این خدمات آنچه اشاره را متمایز و متفاوت میکند و خدمت رسانی ما را
              موثرتر و کارآمدتر میکند مبتنی بر چند اصل است؛
            </h1>
          ) : (
            <h1
              style={{
                fontFamily: "EnglishMedium",
              }}
            >
              As mentioned, we are a full-service company. But in the provision
              of these services, what differentiates the reference and makes our
              service more effective and efficient is based on several
              principles;
            </h1>
          )}
        </div>
        <div
          className={
            language ? classes.information : classes.informationReverse
          }
        >
          {language ? (
            <h2
              style={{
                fontFamily: "Farsi",
              }}
            >
              ما باورمند به نوعی از رابطه با مشــتریانمان هســتیم که شراکتی
              راهبردی مبتنی بر رابطه‌ی برد، برد، بلندمدت و وفادارانه است.
            </h2>
          ) : (
            <h2
              style={{
                fontFamily: "English",
              }}
            >
              We believe in a type of relationship with our customers that is a
              strategic partnership based on a win-win, long-term and loyal
              relationship.
            </h2>
          )}
        </div>
        <div
          className={
            language ? classes.information : classes.informationReverse
          }
        >
          {language ? (
            <h2
              style={{
                fontFamily: "Farsi",
              }}
            >
              ‎در تدوین و مدیریت کمپین‌هــای تبلیغاتــی، خلاقیــت محــور اصلــی
              تمــام زیر و بــم کار مــا و راهکارهایی است که به شرکایمان ارائه
              می‌دهیم. این خلاقیت را اما همیشه به روز نگه داشته و همپا با
              استانداردهای جهانی و متصل به تجربه و شناخت استراتژیکمان از بازار
              کسب و کار ایران ‎تعریف کرده‌ایم.
            </h2>
          ) : (
            <h2
              style={{
                fontFamily: "English",
              }}
            >
              In designing and managing advertising campaigns, creativity is the
              main focus of all our work and the solutions we provide to our
              partners. This creativity has always been kept up-to-date and in
              line with global standards and connected to our experience and
              strategic understanding of the Iranian business market. We have
              defined.
            </h2>
          )}
        </div>
        <div
          className={
            language ? classes.information : classes.informationReverse
          }
        >
          {language ? (
            <h2
              style={{
                fontFamily: "Farsi",
              }}
            >
              ‎آموزش را یکی از ارکان هویتی سازمانمان می‌دانیم. در این مسیر برای
              همکاران و شرکای تجاری‌مان به طور مســتمر دوره‌های آموزشــی و
              ورکشــاپ‌های تخصصی برگزار می‌کنیم. در این مسیـر متکــی بــه دانــش
              روز جهانــی صنعــت تبلیغات و بازاریابی هســتیم و اســاتید ممتاز
              این حوزه‌ها ‎همراهی‌مان می‌کنند.
            </h2>
          ) : (
            <h2
              style={{
                fontFamily: "English",
              }}
            >
              We consider training as one of the pillars of our organization's
              identity. In this way, we continuously organize training courses
              and specialized workshops for our colleagues and business
              partners. In this way, we rely on the world-class knowledge of the
              advertising and marketing industry and distinguished professors in
              these fields. They accompany us.
            </h2>
          )}
        </div>
        <div
          className={
            language ? classes.information : classes.informationReverse
          }
        >
          {language ? (
            <h2
              style={{
                fontFamily: "Farsi",
              }}
            >
              ‎ما آژانســی تمام خدمت هســتیم که به بســیاری از نیازهای
              مشــتریانمان در ارتباط با فعالیتهای بازاریابــی پاســخ داده و بــه
              آنان خدمت ارائه می‌دهیم. ســرویس‌های ما شــامل ارائه‌ی اســتراتژی
              ارتباطــی، تدوین کمپین‌هــای گســترده تبلیغاتــی خــلاق- تیزر
              تبلیغاتــی، تیزر تلویزیونی، تیزر رادیویی، تبلیغات محیطــی و ...- ،
              ارائه‌ی راه‌کارهای ارتباطی دیجیتــال و تدوین کمپین‌های این حــوزه-
              تبلیغــات آنلاین، تبلیغات شــبکه‌های اجتماعی، بازاریابی محتوا و
              شــبکه هــای اجتماعی، تبلیغات بنری و ...- ، ارائه راهکارهای رسانه
              و خرید رسانه تبلیغاتی و محیطی و همینطور طراحی و تولید راه‌کارهایی
              در زمینه تبلیغات{" "}
              <span
                style={{
                  fontFamily: "English",
                }}
              >
                BTL
              </span>{" "}
              - محل فروش، سمپلینگ، کمپین‌های نمایشگاهی، غرفه سازی، برگزاری
              رویداد و …- است.
            </h2>
          ) : (
            <h2
              style={{
                fontFamily: "English",
              }}
            >
              We are a full-service agency that responds to many of our clients'
              needs related to marketing activities and provides services to
              them. Our services include providing a communication strategy,
              developing extensive creative advertising campaigns - advertising
              teasers, television teasers, radio teasers, environmental
              advertisements, etc. Social networks, banner ads, etc., providing
              media solutions and purchasing advertising and environmental
              media, as well as designing and producing solutions in the field
              of BTL advertising - point of sale, sampling, exhibition
              campaigns, booth construction, event holding, etc.
            </h2>
          )}
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
            objectFit="cover"
            as="image"
            priority
          />
        </div>
      </div>
    </Fragment>
  );
}
