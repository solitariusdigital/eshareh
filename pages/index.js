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
import pageModel from "@/models/Page";
import logoEnglish from "@/assets/logoEnglish.svg";
import logoFarsi from "@/assets/logoFarsi.svg";
import { applyFontToEnglishWords } from "@/services/utility";

export default function Home({ solutions, covers, pageData }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { solutionsCategory, setSolutionsCategory } = useContext(StateContext);
  const [titleOne, setTitleOne] = useState({
    en: pageData.content[0].data.en,
    fa: pageData.content[0].data.fa,
  });
  const [paragraphOne, setParagraphOne] = useState({
    en: [pageData.content[1].data.en.split("\n\n")][0],
    fa: [pageData.content[1].data.fa.split("\n\n")][0],
  });
  const [titleTwo, setTitleTwo] = useState({
    en: pageData.content[2].data.en,
    fa: pageData.content[2].data.fa,
  });
  const [titleThree, setTitleThree] = useState({
    en: pageData.content[3].data.en,
    fa: pageData.content[3].data.fa,
  });
  const [paragraphTwo, setParagraphTwo] = useState({
    en: [pageData.content[4].data.en.split("\n\n")][0],
    fa: [pageData.content[4].data.fa.split("\n\n")][0],
  });
  const [hoverOne, setHoverOne] = useState(false);
  const [hoverTwo, setHoverTwo] = useState(false);
  const [hoverThree, setHoverThree] = useState(false);

  const smokingFish =
    "https://eshareh.storage.iran.liara.space/motion/smokingFish.gif";

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
        canonical="https://eshareh.com"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://eshareh.com",
          title: language
            ? "آژانس تبلیغاتی اشاره"
            : "Eshareh Advertising Agency",
          description: language
            ? "آژانس تبلیغاتی اشاره - خدمات تبلیغات، برند، رسانه و ارتباطات بازاریابی فول سرویس"
            : "Eshareh Advertising Agency - Advertising, Branding, Media & Full Service Marketing Communication in Iran",
          siteName: "Eshareh Advertising Agency",
          images: {
            url: language ? logoFarsi : logoEnglish,
            width: 1200,
            height: 630,
            alt: language
              ? "آژانس تبلیغاتی اشاره"
              : "Eshareh Advertising Agency",
          },
        }}
        robotsProps={{
          maxSnippet: -1,
          maxImagePreview: "large",
          maxVideoPreview: -1,
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
          <h1
            style={{
              fontFamily: language ? "FarsiMedium" : "EnglishMedium",
              marginBottom: "12px",
            }}
          >
            {titleOne[languageType]}
          </h1>
          {paragraphOne[languageType].map((para, index) => (
            <h2
              key={index}
              style={{
                fontFamily: language ? "FarsiLight" : "EnglishLight",
                marginBottom: "12px",
              }}
            >
              {para}
            </h2>
          ))}
          <h1
            style={{
              fontFamily: language ? "FarsiMedium" : "EnglishMedium",
              color: "#fdb714",
            }}
          >
            {titleTwo[languageType]}
          </h1>
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
          <h1
            style={{
              fontFamily: language ? "FarsiMedium" : "EnglishMedium",
            }}
          >
            {titleThree[languageType]}
          </h1>
          {paragraphTwo[languageType].map((para, index) => (
            <h2
              key={index}
              style={{
                fontFamily: language ? "FarsiLight" : "EnglishLight",
                marginBottom: "12px",
              }}
              dangerouslySetInnerHTML={{
                __html: applyFontToEnglishWords(
                  para,
                  "English",
                  "24px",
                  language
                ),
              }}
            ></h2>
          ))}
        </div>
      </section>
      <section className={classes.animeContainer}>
        <div className={classes.anime}>
          <Image
            src={smokingFish}
            blurDataURL={smokingFish}
            placeholder="blur"
            alt="gif"
            layout="fill"
            objectFit="contain"
            as="image"
            unoptimized
          />
        </div>
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
                    راه‌کارهای تبلیغات
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
                  alt="image"
                  width={20}
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
                    راه‌کارهای رســـــــانه
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
                  alt="image"
                  width={20}
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
                    راه‌کارهای دیجیتال
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
                  alt="image"
                  width={20}
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
    const pageData = await pageModel.findOne({ slug: "home" });

    let activeSolutions = solutions
      .filter((project) => project.active)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    let activeCovers = covers.filter((project) => project.active);

    return {
      props: {
        solutions: JSON.parse(JSON.stringify(activeSolutions)),
        covers: JSON.parse(JSON.stringify(activeCovers)),
        pageData: JSON.parse(JSON.stringify(pageData)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
