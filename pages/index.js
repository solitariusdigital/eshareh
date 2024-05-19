/* eslint-disable react/no-unescaped-entities */
import { useContext, Fragment, useState } from "react";
import { StateContext } from "@/context/stateContext";
import CoverSlider from "@/components/CoverSlider";
import CardGrid from "@/components/CardGrid";
import classes from "./home.module.scss";
import Router from "next/router";
import Image from "next/legacy/image";
import arrowone from "@/assets/arrowone.svg";
import arrowtwo from "@/assets/arrowtwo.svg";
import moreArrow from "@/assets/moreArrow.svg";
import moreArrowHover from "@/assets/moreArrowHover.svg";
import homeone from "@/assets/homeone.png";
import hometwo from "@/assets/hometwo.png";
import { enToFaDigits } from "@/services/utility";
import { NextSeo } from "next-seo";
import dbConnect from "@/services/dbConnect";
import solutionModel from "@/models/Solution";
import coverModel from "@/models/Cover";

export default function Home({ solutions, covers }) {
  const { language, setLanguage } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { solutionsCategory, setSolutionsCategory } = useContext(StateContext);

  const [hoverOne, setHoverOne] = useState(false);
  const [hoverTwo, setHoverTwo] = useState(false);
  const [hoverThree, setHoverThree] = useState(false);

  const divideArray = (solutions) => {
    const dividedArrays = [];
    let chunkLength = screenSize === "desktop" ? 5 : 10;
    let index = 0;
    while (index < solutions.length) {
      dividedArrays.push(solutions.slice(index, index + chunkLength));
      index += chunkLength;
    }
    return dividedArrays;
  };

  return (
    <Fragment>
      <NextSeo
        title={language ? "آژانس تبلیغاتی اشاره" : "Eshareh Advertising Agency"}
        description={
          language
            ? "آژانس تبلیغاتی اشاره - خدمات تبلیغات، برند، رسانه و ارتباطات بازاریابی فول سرویس"
            : "Eshareh Advertising Agency - Advertising, Branding, Media & Full Service Marketing Communication in Iran"
        }
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://eshareh.com",
          siteName: "Eshareh Advertising Agency",
        }}
      />
      <section>
        <CoverSlider covers={covers} />
      </section>
      <section
        className={classes.container}
        style={{ backgroundColor: "black", color: "white", paddingTop: "80px" }}
      >
        <div
          className={
            language ? classes.information : classes.informationReverse
          }
        >
          {language ? (
            <h1
              style={{
                fontFamily: "FarsiMedium",
                marginBottom: "20px",
              }}
            >
              دریچه‌ای نو به دنیایی از خلاقـیت
            </h1>
          ) : (
            <h1
              style={{
                fontFamily: "EnglishMedium",
                marginBottom: "20px",
              }}
            >
              A new door to a world of creativity
            </h1>
          )}
          {language ? (
            <h2
              style={{
                fontFamily: "FarsiLight",
              }}
            >
              برای حل هر مساله‌ای در زمینه کسب و کار، خلاقیت کلیدواژه اصلی و
              کماکان حلقه‌ی مفقوده این حوزه در سرزمین ماست.
            </h2>
          ) : (
            <h2
              style={{
                fontFamily: "EnglishLight",
              }}
            >
              To solve any problem in the field of business, creativity is the
              main keyword It is still the missing link in this field in our
              land.
            </h2>
          )}
          {language ? (
            <h2
              style={{
                fontFamily: "FarsiLight",
              }}
            >
              مساله خلاقیت اما در آژانس‌های تبلیغاتی نه فقط راه حل که جوهره
              وجودی آن‌هاست. ما در اشاره در جایگاه یک آژانس تبلیغاتی برای رسیدن
              به راهکار خلاق، ارزش‌های را بنا کردیم که باورمند و پایبند به آن‌ها
              هستیم. کار تیمی، پیشرو بودن و رابطه‌ی دیرپا با مشتریانمان از یک سو
              و با همکارانمان از سوی دیگر مهم‌ترین ارزش‌های ما هستند. در کنار آن
              اتکا به تجربه را کامل کننده پازل راهکار خلاق می‌دانیم. تمامی آنچه
              گفته شد ماهیت ما را در "اشاره" شکل می‌دهد. ماهیتی که هدف آن نگاهی
              نو به دنیای کسب و کار است از دریچه‌ای متفاوت به دنیای خلاقیت.
            </h2>
          ) : (
            <h2
              style={{
                fontFamily: "EnglishLight",
              }}
            >
              The problem of creativity in advertising agencies is not only a
              solution but the essence of their existence. We have established
              the values ​​that we believe in and stick to in order to reach a
              creative solution in the position of an advertising agency.
              Teamwork, leadership and long-term relationship with our customers
              on the one hand and with our colleagues on the other hand are our
              most important values. Besides that, we consider relying on
              experience to complete the puzzle of creative solutions. All of
              what has been said shapes our nature in "pointing". The nature
              that aims to look at the business world from a different
              perspective to the world of creativity.
            </h2>
          )}
          <div
            style={{
              marginTop: "20px",
              color: "#fdb714",
            }}
          >
            {language ? (
              <h1
                style={{
                  fontFamily: "FarsiMedium",
                }}
              >
                "اشــــــــاره" دریچه‌ای نو می‌گشاید به دنیایی از خلاقیت.
              </h1>
            ) : (
              <h1
                style={{
                  fontFamily: "EnglishMedium",
                }}
              >
                "Eshareh" opens a new window to the world of creativity.
              </h1>
            )}
          </div>
        </div>
      </section>
      <div className={classes.videoContainer}>
        <video
          className={classes.video}
          src={"https://eshareh.storage.iran.liara.space/eshareh.mp4"}
          poster="https://eshareh.storage.iran.liara.space/cover.jpg"
          controls
          playsInline
          preload="metadata"
        />
      </div>
      <section className={classes.container}>
        <div
          className={
            language ? classes.information : classes.informationReverse
          }
        >
          {language ? (
            <div className={classes.arrowContainer}>
              <Image
                src={arrowtwo}
                blurDataURL={arrowtwo}
                placeholder="blur"
                alt="image"
                width={40}
                as="image"
                priority
              />
              <h1
                style={{
                  fontFamily: "FarsiBold",
                }}
              >
                ما که هستیم؟
              </h1>
              <Image
                src={arrowone}
                blurDataURL={arrowone}
                placeholder="blur"
                alt="image"
                width={400}
                as="image"
                priority
              />
            </div>
          ) : (
            <div className={classes.arrowContainer}>
              <Image
                src={arrowtwo}
                blurDataURL={arrowtwo}
                placeholder="blur"
                alt="image"
                width={40}
                as="image"
                priority
              />
              <h1
                style={{
                  fontFamily: "EnglishMedium",
                }}
              >
                Who are we?
              </h1>
              <Image
                src={arrowone}
                blurDataURL={arrowone}
                placeholder="blur"
                alt="image"
                width={400}
                as="image"
                priority
              />
            </div>
          )}
          {language ? (
            <h2
              style={{
                fontFamily: "FarsiLight",
              }}
            >
              آژانس ارتباط تصویر اشاره، به عنوان یک آژانس تبلیغاتی از سال{" "}
              <span
                style={{
                  fontFamily: "FarsiBold",
                }}
              >
                {enToFaDigits(1376)}
              </span>{" "}
              فعالیت خود را آغاز کرده است. در طی این سال‌ها در نتیجه‌ی فرآیندی
              ارگانیک، به یک آژانس ارتباطات بازاریابی تمام خدمت با رویکردی خلاق
              و راه‌حل‌ محور تبدیل شده است.
            </h2>
          ) : (
            <h2
              style={{
                fontFamily: "EnglishLight",
              }}
            >
              Eshareh image communication agency has started its activity as an
              advertising agency since 1996. Over the years, as a result of an
              organic process, it has evolved into a full-service marketing
              communications agency with a creative and solution-oriented
              approach.
            </h2>
          )}
          {language ? (
            <h2
              style={{
                fontFamily: "FarsiLight",
              }}
            >
              در حال حاضر آژانس ارتباط تصویر اشاره به عنوان عضوی از خانواده{" "}
              <span
                style={{
                  fontFamily: "English",
                }}
              >
                dnaunion
              </span>{" "}
              به طیف گسترده‌ای از مشتریان بومی و بین المللی خدمات کیفی ارائه
              می‌کند. این خدمات با تکیه بر خلاقیت به عنوان جوهره اصلی کار ما،
              فهم درست از استراتژی‌های بازاریابی، مبتنی بردانش روز، پژوهش‌مدار و
              بومی شده‌ شکل گرفته است. به همین سبب بر این باوریم که می‌توانیم
              چشم‌انداز گسترده‌ای در زمینه‌ی ارتباطات بازاریابی موثر و نوین برای
              مشتریانمان تعریف کنیم. همچنین از آنجا که رشد ما، بطور مستقیم به
              رشد برندهای مشتریان ما بستگی دارد، ما به نوعی از همکاری اعتقاد
              داریم که گونه‌ای شراکت راهبردی بلند مدت است و نه صرفاً ارائه
              خدمات.
            </h2>
          ) : (
            <h2
              style={{
                fontFamily: "EnglishLight",
              }}
            >
              As a member of the dnaunion family, Eshareh image communication
              agency provides quality services to a wide range of domestic and
              international clients. These services are based on creativity as
              the main essence of our work, a proper understanding of marketing
              strategies, based on current concepts, research-oriented and
              localized. For this reason, we believe that we can define a wide
              perspective in the field of effective and innovative marketing
              communications for our customers. Also, since our growth directly
              depends on the growth of our customers' brands, we believe in a
              kind of cooperation that is a kind of long-term strategic
              partnership and not just providing services.
            </h2>
          )}
        </div>
      </section>
      <section className={classes.imageContainerOne}>
        <Image
          src={homeone}
          blurDataURL={homeone}
          placeholder="blur"
          alt="image"
          layout="fill"
          objectFit="contain"
          as="image"
          priority
        />
      </section>
      <section
        className={classes.container}
        style={{
          backgroundColor: "black",
          color: "white",
          paddingTop: "80px",
        }}
      >
        <div
          className={
            language ? classes.information : classes.informationReverse
          }
        >
          <div className={classes.box}>
            {language ? (
              <div>
                <div className={classes.methods}>
                  <h1
                    style={{
                      fontFamily: "FarsiBold",
                    }}
                  >
                    راه کارهای تبلیـغات
                  </h1>
                  <h3>
                    واحد استراتژیکی در حوزه‌ی ارتباطات بازاریابی و همچون یک
                    آژانس خلاقیت است که در حوزه‌ی خلاقیت خدمات تخصصی ارائه
                    می‌دهد. در این واحد با توجه به خواسته‌ و نیاز مشتریان، با
                    تاکید ویژه بر استفاده از آخرین تحقیقات در دسترس، استراتژی
                    تبلیغاتی تدوین‌شده پایه و اساس کار خلاقیت قرار می‌گیرد تا
                    بهترین راه‌حل و در نهایت نتیجه برای مشتریان حاصل شود.
                  </h3>
                </div>
              </div>
            ) : (
              <div className={classes.methods}>
                <h1>Advertising methods</h1>
                <h3>
                  It is a strategic unit in the field of marketing communication
                  and like a creative agency that provides specialized services
                  in the field of creativity. In this unit, according to the
                  wishes and needs of customers, with special emphasis on the
                  use of the latest available research, the formulated
                  advertising strategy is the basis of creative work in order to
                  achieve the best solution and ultimately the result for
                  customers.
                </h3>
              </div>
            )}
            <div
              className={language ? classes.more : classes.moreReverse}
              onMouseEnter={() => setHoverOne(true)}
              onMouseLeave={() => setHoverOne(false)}
              onClick={() => {
                Router.push("/solutions");
                setSolutionsCategory("advertising");
              }}
            >
              <h3>{language ? "بیشتر بخوانید" : "Read more"}</h3>
              <div className={classes.icon}>
                <Image
                  src={!hoverOne ? moreArrow : moreArrowHover}
                  blurDataURL={!hoverOne ? moreArrow : moreArrowHover}
                  placeholder="blur"
                  alt="image"
                  width={20}
                  as="image"
                  priority
                />
              </div>
            </div>
          </div>
          <div className={classes.box}>
            {language ? (
              <div>
                <div className={classes.methods}>
                  <h1
                    style={{
                      fontFamily: "FarsiBold",
                    }}
                  >
                    راه کارهای رســـــــانه
                  </h1>
                  <h3>
                    واحد استراتژیکی در حوزه‌ی ارتباطات بازاریابی و همچون یک
                    آژانس رسانه ای است که در حوزه‌ی رسانه خدمات تخصصی ارائه
                    می‌دهد. در این واحد با توجه به خواسته‌ و نیاز مشتریان، با
                    تاکید ویژه بر استفاده از آخرین تحقیقات دردسترس و
                    نرم‌افزارهایی که قابلیت اندازه‌گیری و بهینه‌سازی استفاده از
                    بودجه‌های تبلیغاتی را دارند، تلاش می‌شود تا حد امکان از
                    بودجه‌های تبلیغاتی به شکلی موثرتر استفاده شود.
                  </h3>
                </div>
              </div>
            ) : (
              <div className={classes.methods}>
                <h1>Media methods</h1>
                <h3>
                  It is a strategic unit in the field of marketing
                  communications and like a media agency that provides
                  specialized services in the field of media. In this unit,
                  according to the demands and needs of customers, with special
                  emphasis on the use of the latest available research and
                  software capable of measuring and optimizing the use of
                  advertising budgets, efforts are made to use advertising
                  budgets as effectively as possible.
                </h3>
              </div>
            )}
            <div
              className={language ? classes.more : classes.moreReverse}
              onMouseEnter={() => setHoverTwo(true)}
              onMouseLeave={() => setHoverTwo(false)}
              onClick={() => {
                Router.push("/solutions");
                setSolutionsCategory("media");
              }}
            >
              <h3>{language ? "بیشتر بخوانید" : "Read more"}</h3>
              <div className={classes.icon}>
                <Image
                  src={!hoverTwo ? moreArrow : moreArrowHover}
                  blurDataURL={!hoverTwo ? moreArrow : moreArrowHover}
                  placeholder="blur"
                  alt="image"
                  width={20}
                  as="image"
                  priority
                />
              </div>
            </div>
          </div>
          <div className={classes.box}>
            {language ? (
              <div>
                <div className={classes.methods}>
                  <h1
                    style={{
                      fontFamily: "FarsiBold",
                    }}
                  >
                    راه کارهای دیجیتال
                  </h1>
                  <h3>
                    واحد استراتژیکی در حوزه‌ی ارتباطات بازاریابی و همچون یک
                    آژانس رسانه ای است که در حوزه‌ی رسانه خدمات تخصصی ارائه
                    می‌دهد. در این واحد با توجه به خواسته‌ و نیاز مشتریان، با
                    تاکید ویژه بر استفاده از آخرین تحقیقات دردسترس و
                    نرم‌افزارهایی که قابلیت اندازه‌گیری و بهینه‌سازی استفاده از
                    بودجه‌های تبلیغاتی را دارند، تلاش می‌شود تا حد امکان از
                    بودجه‌های تبلیغاتی به شکلی موثرتر استفاده شود.
                  </h3>
                </div>
              </div>
            ) : (
              <div className={classes.methods}>
                <h1>Digital methods</h1>
                <h3>
                  It is a strategic unit in the field of marketing
                  communications and like a media agency that provides
                  specialized services in the field of media. In this unit,
                  according to the demands and needs of customers, with special
                  emphasis on the use of the latest available research and
                  software capable of measuring and optimizing the use of
                  advertising budgets, efforts are made to use advertising
                  budgets as effectively as possible.
                </h3>
              </div>
            )}
            <div
              className={language ? classes.more : classes.moreReverse}
              onMouseEnter={() => setHoverThree(true)}
              onMouseLeave={() => setHoverThree(false)}
              onClick={() => {
                Router.push("/solutions");
                setSolutionsCategory("digital");
              }}
            >
              <h3>{language ? "بیشتر بخوانید" : "Read more"}</h3>
              <div className={classes.icon}>
                <Image
                  src={!hoverThree ? moreArrow : moreArrowHover}
                  blurDataURL={!hoverThree ? moreArrow : moreArrowHover}
                  placeholder="blur"
                  alt="image"
                  width={20}
                  as="image"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={classes.imageContainerTwo}>
        <Image
          src={hometwo}
          blurDataURL={hometwo}
          placeholder="blur"
          alt="image"
          layout="fill"
          objectFit="contain"
          as="image"
          priority
        />
      </section>
      <div className={classes.arrowDown}>
        <Image
          src={arrowtwo}
          blurDataURL={arrowtwo}
          placeholder="blur"
          alt="image"
          width={40}
          as="image"
          priority
        />
      </div>
      {solutions.length >= 10 && (
        <section className={classes.gridWorks}>
          <CardGrid solutions={divideArray(solutions)[0]} direction={true} />
          {screenSize === "desktop" && (
            <CardGrid solutions={divideArray(solutions)[1]} direction={false} />
          )}
        </section>
      )}
    </Fragment>
  );
}

// initial connection to db
export async function getServerSideProps(context) {
  try {
    await dbConnect();
    const solutions = await solutionModel.find();
    const covers = await coverModel.find();

    let activeSolutions = solutions
      .filter((project) => project.active)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    let activeCovers = covers.filter((project) => project.active);

    return {
      props: {
        solutions: JSON.parse(JSON.stringify(activeSolutions)),
        covers: JSON.parse(JSON.stringify(activeCovers)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
