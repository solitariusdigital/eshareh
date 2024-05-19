/* eslint-disable react/no-unescaped-entities */
import { useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./profession.module.scss";
import { NextSeo } from "next-seo";
import Image from "next/legacy/image";
import profession from "@/assets/profession.png";

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
            <h3
              style={{
                fontFamily: "FarsiBold",
              }}
            >
              همچنان که گفته شد ما در اشاره شرکتی تمام خدمت هستیم. اما در ارائه
              این خدمات آنچه اشاره را متمایز و متفاوت می‌کند و خدمت رسانی ما را
              موثرتر و کارآمدتر می‌کند مبتنی بر چند اصل است؛
            </h3>
          ) : (
            <h3
              style={{
                fontFamily: "EnglishMedium",
              }}
            >
              As mentioned, we are a full-service company. But in the provision
              of these services, what differentiates the reference and makes our
              service more effective and efficient is based on several
              principles;
            </h3>
          )}
        </div>
        <div
          className={
            language ? classes.information : classes.informationReverse
          }
        >
          {language ? (
            <h3
              style={{
                fontFamily: "FarsiLight",
              }}
            >
              ما باورمند به نوعی از رابطه با مشتریانمان هستیم که شراکتی راهبردی
              مبتنی بر رابطه‌ی برد، برد، بلندمدت و وفادارانه است.
            </h3>
          ) : (
            <h3
              style={{
                fontFamily: "English",
              }}
            >
              We believe in a type of relationship with our customers that is a
              strategic partnership based on a win-win, long-term and loyal
              relationship.
            </h3>
          )}
        </div>
        <div
          className={
            language ? classes.information : classes.informationReverse
          }
        >
          {language ? (
            <h3
              style={{
                fontFamily: "FarsiLight",
              }}
            >
              در تدوین و مدیریت کمپین‌های تبلیغاتی، خلاقیت محور اصلی تمام زیر و
              بم کار ما و راهکارهایی است که به شرکایمان ارائه می‌دهیم. این
              خلافیت را اما همیشه به روز نگه داشته و همپا با استانداردهای جهانی
              و متصل به تجربه و شناخت استراتژیکمان از بازار کسب و کار ایران
              تعریف کرده‌ایم.
            </h3>
          ) : (
            <h3
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
            </h3>
          )}
        </div>
        <div
          className={
            language ? classes.information : classes.informationReverse
          }
        >
          {language ? (
            <h3
              style={{
                fontFamily: "FarsiLight",
              }}
            >
              آموزش را یکی از ارکان هویتی سازمانمان می‌دانیم. در این مسیر برای
              همکاران و شرکای تجاری‌مان به طور مستمر دوره‌های آموزشی و
              ورکشاپ‌های تخصصی برگزار می‌کنیم. در این مسیر متکی به دانش روز
              جهانی صنعت تبلیغات و بازاریابی هستیم و اساتید ممتاز این حوزه‌ها
              همراهی‌مان می‌کنند.
            </h3>
          ) : (
            <h3
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
            </h3>
          )}
        </div>
        <div
          className={
            language ? classes.information : classes.informationReverse
          }
        >
          {language ? (
            <h3
              style={{
                fontFamily: "FarsiLight",
              }}
            >
              ما آژانسی تمام خدمت هستیم که به بسیاری از نیازهای مشتریانمان در
              ارتباط با فعالیت‌های بازاریابی پاسخ داده و به آنان خدمت ارائه
              می‌دهیم. سرویس‌های ما شامل ارائه‌ی استراتژی ارتباطی، تدوین
              کمپین‌های گسترده تبلیغاتی خلاق- تیزر تبلیغاتی، تیزر تلویزیونی،
              تیزر رادیویی، تبلیغات محیطی و ...-، ارائه‌ی راه‌کارهای ارتباطی
              دیجیتال و تدوین کمپین‌های این حوزه- تبلیغات آنلاین، تبلیغات
              شبکه‎‌های اجتماعی، بازاریابی محتوا و شبکه های اجتماعی، تبلیغات
              بنری و ...- ، ارائه ‌راه‌کارهای رسانه و خرید رسانه تبلیغاتی و
              محیطی و همینطور طراحی و تولید راه‌کارهایی در زمینه تبلیغات{" "}
              <span
                style={{
                  fontFamily: "English",
                }}
              >
                BTL
              </span>{" "}
              - محل فروش، سمپلینگ، کمپین‌های نمایشگاهی، غرفه سازی، برگزاری
              رویداد و ...- است.
            </h3>
          ) : (
            <h3
              style={{
                fontFamily: "English",
              }}
            >
              We are a full-service agency that responds to many of our client's
              needs related to marketing activities and provides services to
              them. Our services include providing a communication strategy,
              developing extensive creative advertising campaigns - advertising
              teasers, television teasers, radio teasers, environmental
              advertisements, etc. Social networks, banner ads, etc., providing
              media solutions and purchasing advertising and environmental
              media, as well as designing and producing solutions in the field
              of BTL advertising - point of sale, sampling, exhibition
              campaigns, booth construction, event holding, etc.
            </h3>
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
