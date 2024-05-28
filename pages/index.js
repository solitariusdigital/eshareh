/* eslint-disable react/no-unescaped-entities */
import { useContext, Fragment, useState } from "react";
import { StateContext } from "@/context/stateContext";
import CoverSlider from "@/components/CoverSlider";
import CardGrid from "@/components/CardGrid";
import classes from "./home.module.scss";
import Router from "next/router";
import Image from "next/legacy/image";
import arrow from "@/assets/arrow.svg";
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
        style={{ backgroundColor: "black", color: "white", paddingTop: "70px" }}
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
              A New Window to the World of Creativity
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
              Creativity stands as the essential key to unlocking solutions in
              the realm of business and yet, the missing link in our homeland.
              However, for advertising agencies, creativity isn't just a
              solution; it's the very essence of their existence.
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
              At Eshareh, as an advertising agency, we have established a set of
              core values, we rigorously uphold to drive us towards creative
              solutions. Teamwork, proactivity, and fostering long-lasting
              relationships with both our clients and colleagues are our most
              significant values. Additionally, we believe that relying on
              experience is essential to completing the puzzle of creativity.
              All that said, shapes our essence at "Eshareh", aimed at offering
              a novel outlook on the business landscape through the unique lens
              of creativity.
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
            <div className={classes.title}>
              <h1
                style={{
                  fontFamily: "FarsiBold",
                }}
              >
                ما که هستیم
              </h1>
            </div>
          ) : (
            <div className={classes.title}>
              <h1
                style={{
                  fontFamily: "EnglishMedium",
                }}
              >
                Who We Are
              </h1>
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
              Ertebat Tasvir Eshareh Agency began its journey as an advertising
              agency in{" "}
              <span
                style={{
                  fontFamily: "EnglishMedium",
                }}
              >
                1997
              </span>
              . Through organic evolution over the years, it has transformed
              into a full-service marketing communications agency with a
              creative and solution-oriented approach.
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
              Presently, as a member of the{" "}
              <span
                style={{
                  fontFamily: "EnglishMedium",
                }}
              >
                dnaunion
              </span>{" "}
              family, Eshareh delivers quality services to a wide range of local
              and international clients. All these services, rooted in
              creativity, as the essence of our work, are formed through a solid
              understanding of the leading-edge, research-oriented and localized
              marketing strategies. That’s why we believe we can open new
              horizons for our clients in effective and innovative marketing
              communications. Furthermore, as our growth is intricately bound to
              the growth of our clients' brands, we embrace a collaborative
              approach that transcends mere service provision, fostering
              long-term strategic partnerships.
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
                <h1>Advertising Solutions</h1>
                <h3>
                  It is a marketing communication strategic unit, functioning as
                  a creative agency that offers specialized creative services.
                  In this unit, with respect to our clients’ needs and by
                  leveraging the latest research available we develop
                  advertising strategies that form the basis for our creative
                  work which ensures we deliver optimal solutions and
                  outstanding results to our clients.
                </h3>
              </div>
            )}
            <div
              className={language ? classes.more : classes.moreReverse}
              onMouseEnter={() =>
                screenSize !== "mobile" ? setHoverOne(true) : null
              }
              onMouseLeave={() =>
                screenSize !== "mobile" ? setHoverOne(false) : null
              }
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
                <h1>Media Solutions</h1>
                <h3>
                  It is a marketing communication strategic unit, functioning as
                  a media agency that offers specialized media services. In this
                  unit, we focus on meeting clients’ needs and requests by
                  utilizing the latest research available and advanced software
                  to measure and optimize advertising budgets, ensuring the most
                  effective use of media expenditures.
                </h3>
              </div>
            )}
            <div
              className={language ? classes.more : classes.moreReverse}
              onMouseEnter={() =>
                screenSize !== "mobile" ? setHoverTwo(true) : null
              }
              onMouseLeave={() =>
                screenSize !== "mobile" ? setHoverTwo(false) : null
              }
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
                    واحدی استراتژیک در زمینه بازاریابی دیجیتال که با راهکارهای
                    خلاق در تبلیغات آنلاین به دلیل جذب مخاطب بیشتر با هزینه‌های
                    کمتر، می‌تواند این زمینه را فراهم کند تا کیفیت و حضور برند
                    در بازار هدف پر رنگ و پایدار باشد.
                  </h3>
                </div>
              </div>
            ) : (
              <div className={classes.methods}>
                <h1>Digital Solutions</h1>
                <h3>
                  Our Digital Solutions unit is a strategic powerhouse in the
                  field of digital marketing, delivering innovative online
                  advertising strategies designed to attract a larger audience
                  at lower costs which enables us to enhance the quality and
                  presence of brands among their target markets, ensuring
                  effective and enduring impact.
                </h3>
              </div>
            )}
            <div
              className={language ? classes.more : classes.moreReverse}
              onMouseEnter={() =>
                screenSize !== "mobile" ? setHoverThree(true) : null
              }
              onMouseLeave={() =>
                screenSize !== "mobile" ? setHoverThree(false) : null
              }
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
          src={arrow}
          blurDataURL={arrow}
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
