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
              دریچه‌ای نو به دنیایی از خلاقیت
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
              برای حل هر مساله‌ای در زمینه کسب و کار، خلاقیت کلیدواژه اصلی است و
              در آژانس‌های تبلیغاتی، خلاقیت نه تنها راه‌حل بلکه جوهره وجودی
              آن‌هاست.
            </h2>
          ) : (
            <h2
              style={{
                fontFamily: "EnglishLight",
              }}
            >
              Creativity stands as the essential key to unlocking solutions in
              the realm of business, however, for advertising agencies,
              creativity isn't just a solution; it's the very essence of their
              existence.
            </h2>
          )}
          {language ? (
            <h2
              style={{
                fontFamily: "FarsiLight",
              }}
            >
              ما در اشاره در جایگاه یک آژانس تبلیغاتی برای رسیدن به راه‌کارهایی
              خلاق، ارزش‌هایی را بنا کردیم که باورمند و پایبند به آن‌ها هستیم.
              ارزش‌هایی که ما به آن معتقدیم شامل کار تیمی، پیشرو بودن و ساختن
              رابطه‌ای بلندمدت و وفادارانه هم با مشتریانمان و هم با همکارانمان
              می‌شود و در کنار آن، متکی به تجربه‌مان هستیم تا مسیر رسیدن به
              خلاقیت را برای خود هموار کنیم. تمامی آنچه گفته شد ماهیت ما را در
              "اشاره" شکل می‌دهد. ماهیتی که هدف آن نگاهی متفاوت به دنیای کسب و
              کار است همراه با گشایش دریچه‌ای نو به دنیای خلاقیت. 
            </h2>
          ) : (
            <h2
              style={{
                fontFamily: "EnglishLight",
              }}
            >
              At Eshareh, as an advertising agency, we have established a set of
              core values which we rigorously uphold to drive us towards
              creative solutions. The values we highly believe in include
              teamwork, proactivity, and fostering loyal, long-lasting
              relationships with both our clients and colleagues and besides, we
              rely on our experience to pave the way to creativity. All that
              said, shapes our essence at "Eshareh", the essence that aims at
              providing a novel outlook on the business landscape coupled with a
              new window to the world of creativity.
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
                ما که هستیم؟
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
              آژانس اشاره، به عنوان یک آژانس تبلیغاتی از سال{" "}
              <span
                style={{
                  fontFamily: "FarsiBold",
                }}
              >
                {enToFaDigits(1376)}
              </span>{" "}
              فعالیت خود را آغاز کرده است. در طی این سال‌ها در نتیجه فرآیندی
              ارگانیک، به یک آژانس ارتباطات بازاریابی تمام‌خدمت با رویکردی خلاق
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
              در حال حاضر این آژانس، به عنوان عضوی از خانواده{" "}
              <span
                style={{
                  fontFamily: "English",
                }}
              >
                dnaunion
              </span>{" "}
              به طیف گسترده‌ای از مشتریان بومی و بین‌المللی خدمات کیفی ارائه
              می‌کند. این خدمات با تکیه بر خلاقیت به عنوان جوهره اصلی کار ما و
              با فهم درستی از استراتژی‌های بازاریابی مبتنی بر دانش روز،
              پژوهش‌مدار و بومی‌شده‌ شکل گرفته است. به همین سبب بر این باوریم که
              می‌توانیم چشم‌انداز گسترده‌ای در زمینه ارتباطات بازاریابی موثر
              برای مشتریانمان تعریف کنیم. همچنین از آنجا که رشد ما به رشد
              مشتریان ما بستگی دارد، ما به نوعی از همکاری اعتقاد داریم که
              گونه‌ای از شراکت راهبردی بلندمدت است و نه صرفاً ارائه خدمات.
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
              the growth of our clients, we firmly believe in a collaborative
              approach rather than mere service provision.
            </h2>
          )}
        </div>
      </section>
      <section className={classes.animeContainer}>
        <video
          className={classes.anime}
          src={"https://eshareh.storage.iran.liara.space/anime_home.mp4#t=0.1"}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
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
                    واحد راه‌کارهای تبلیغات
                  </h1>
                  <h3>
                    ما با توجه به خواسته‌ و نیاز مشتریان، آخرین تحقیقات در دسترس
                    و استراتژی تبلیغاتی تدوین‌شده را پایه و اساس کار خلاقیت قرار
                    می‌دهیم تا بهترین راه‌حل و نتیجه برای مشتریان حاصل شود.
                    رسالت راهکارهای تبلیغاتی، رساندن پيام برند به مخاطب با روشی
                    خلاقانه است.
                  </h3>
                </div>
              </div>
            ) : (
              <div className={classes.methods}>
                <h1>Advertising Solutions</h1>
                <h3>
                  Based on our client’s needs, the most up-to-date research
                  available and the developed communication strategy forms the
                  basis for our creative work to ensure the best solution and
                  result for the clients are obtained.
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
                    واحد راه‌کارهای رســـــــانه
                  </h1>
                  <h3>
                    ما در آژانس اشاره از آخرین تحقیقات در دسترس و نرم‌افزارهایی
                    که قابلیت اندازه‌گیری و بهینه‌سازی دارند، استفاده می‌کنیم تا
                    در حد امکان به شکلی موثرتر از بودجه‌های تبلیغاتی استفاده
                    شود.
                  </h3>
                </div>
              </div>
            ) : (
              <div className={classes.methods}>
                <h1>Media Solutions</h1>
                <h3>
                  We at Eshareh, benefit from the latest research available as
                  well as measurement and optimization softwares to ensure
                  effective allocation of advertising budgets.
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
                    واحد راه‌کارهای دیجیتال
                  </h1>
                  <h3>
                    هدف نهایی استراتژی بازاریابی دیجیتال، تهیه و تنظیم
                    کمپین‌های  تبلیغاتی با استفاده از تاکتیک‌ها و کانال‌های
                    دیجیتالی متعدد است و همین امر می‌تواند نام تجاری شما را به
                    سمت اهداف بزرگ‌تر هدایت کند.
                  </h3>
                </div>
              </div>
            ) : (
              <div className={classes.methods}>
                <h1>Digital Solutions</h1>
                <h3>
                  The ultimate goal of Digital Solutions Unit is to design and
                  develop advertising campaigns that leverage various digital
                  tactics and channels leading your brand towards much greater
                  achievements.
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
      <section className={classes.imageContainer}>
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
