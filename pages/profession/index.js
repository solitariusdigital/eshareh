/* eslint-disable react/no-unescaped-entities */
import { useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./profession.module.scss";
import { NextSeo } from "next-seo";
import Image from "next/legacy/image";
import profession from "@/assets/profession.png";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

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
          fontFamily: language ? "EnglishLight" : "EnglishLight",
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
              As a full-service company, what differentiates and sets us apart
              and enhances the effectiveness of our services is grounded in
              couple of core principles:
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
                fontFamily: "EnglishLight",
              }}
            >
              We cultivate strategic partnerships with our clients, founded on a
              win-win, long-term and loyal relationship.
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
                fontFamily: "EnglishLight",
              }}
            >
              When designing and managing advertising campaigns, creativity is
              at the heart of everything we do, driving the innovative solutions
              we deliver to our partners. However, we continuously refine our
              distinct creative approach to align with global standards, drawing
              on our extensive experience and strategic insights into the
              Iranian business market.
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
                fontFamily: "EnglishLight",
              }}
            >
              Education is a cornerstone of our organisation's spirit, which is
              why we consistently organise training courses and specialised
              workshops for our colleagues and business partners and for this,
              we highly rely on up-to-date global advertising and marketing
              knowledge and we are accompanied by best-in-class tutors and
              mentors in these fields.
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
              می‌دهیم.
            </h3>
          ) : (
            <h3
              style={{
                fontFamily: "EnglishLight",
              }}
            >
              We are a full-service agency dedicated to addressing the diverse
              marketing needs of our clients with comprehensive and responsive
              solutions.
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
              سرویس‌های ما شامل:
            </h3>
          ) : (
            <h3
              style={{
                fontFamily: "EnglishLight",
              }}
            >
              Our services include:
            </h3>
          )}
        </div>
        <div
          className={
            language ? classes.information : classes.informationReverse
          }
        >
          <div className={classes.row}>
            <RadioButtonUncheckedIcon sx={{ fontSize: 10 }} />
            {language ? (
              <h3
                style={{
                  fontFamily: "FarsiLight",
                }}
              >
                <span
                  style={{
                    fontFamily: "FarsiMedium",
                  }}
                >
                  ارائه‌ی استراتژی ارتباطی،
                </span>{" "}
                تدوین کمپین‌های گسترده تبلیغاتی خلاق- تیزر تبلیغاتی، تیزر
                تلویزیونی، تیزر رادیویی و تبلیغات محیطی.
              </h3>
            ) : (
              <h3
                style={{
                  fontFamily: "EnglishLight",
                }}
              >
                <span
                  style={{
                    fontFamily: "EnglishMedium",
                  }}
                >
                  Communication strategy development,
                </span>{" "}
                crafting extensive creative advertising campaigns, television
                and radio commercials, and out-of-home advertising.
              </h3>
            )}
          </div>
        </div>
        <div
          className={
            language ? classes.information : classes.informationReverse
          }
        >
          <div className={classes.row}>
            <RadioButtonUncheckedIcon sx={{ fontSize: 10 }} />
            {language ? (
              <h3
                style={{
                  fontFamily: "FarsiLight",
                }}
              >
                <span
                  style={{
                    fontFamily: "FarsiMedium",
                  }}
                >
                  ارائه‌ی راه‌کارهای ارتباطی دیجیتال
                </span>{" "}
                و تدوین کمپین‌های این حوزه- تبلیغات آنلاین، تبلیغات شبکه‎‌های
                اجتماعی، بازاریابی محتوا و شبکه های اجتماعی و تبلیغات بنری.
              </h3>
            ) : (
              <h3
                style={{
                  fontFamily: "EnglishLight",
                }}
              >
                <span
                  style={{
                    fontFamily: "EnglishMedium",
                  }}
                >
                  Digital communication solutions,
                </span>{" "}
                crafting campaigns including online advertising, social media
                advertising, content and social media marketing, and banner ads.
              </h3>
            )}
          </div>
        </div>
        <div
          className={
            language ? classes.information : classes.informationReverse
          }
        >
          <div className={classes.row}>
            <RadioButtonUncheckedIcon sx={{ fontSize: 10 }} />
            {language ? (
              <h3
                style={{
                  fontFamily: "FarsiLight",
                }}
              >
                <span
                  style={{
                    fontFamily: "FarsiMedium",
                  }}
                >
                  ارائه ‌راه‌کارهای رسانه
                </span>{" "}
                و خرید رسانه تبلیغاتی و محیطی و همینطور طراحی و تولید
                راه‌کارهایی در زمینه تبلیغات{" "}
                <span
                  style={{
                    fontFamily: "EnglishLight",
                  }}
                >
                  BTL
                </span>{" "}
                - محل فروش، سمپلینگ، کمپین‌های نمایشگاهی، غرفه سازی و برگزاری
                رویداد است.
              </h3>
            ) : (
              <h3
                style={{
                  fontFamily: "EnglishLight",
                }}
              >
                <span
                  style={{
                    fontFamily: "EnglishMedium",
                  }}
                >
                  Media solutions,
                </span>{" "}
                advertising and outdoor media buying, designing and executing
                Below the Line (BTL) campaigns including but not limited to
                Point of Sale, sampling, holding exhibitions, booth
                construction, and event organisation.
              </h3>
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
