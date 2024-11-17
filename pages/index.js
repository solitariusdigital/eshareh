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
import { NextSeo } from "next-seo";
import dbConnect from "@/services/dbConnect";
import solutionModel from "@/models/Solution";
import coverModel from "@/models/Cover";
import pageModel from "@/models/Page";
import mediaModel from "@/models/Media";
import logoEnglish from "@/assets/logoEnglish.svg";
import logoFarsi from "@/assets/logoFarsi.svg";
import { applyFontToEnglishWords } from "@/services/utility";

export default function Home({
  solutions,
  covers,
  pageData,
  solutionsData,
  mediaData,
}) {
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
  const [solutionsContent, setSolutionsContent] = useState(
    solutionsData.content
  );
  const [titleOneSetting, setTitleOneSetting] = useState(
    pageData.content[0].setting
  );
  const [paragraphOneSetting, setParagraphOneSetting] = useState(
    pageData.content[1].setting
  );
  const [titleTwoSetting, setTitleTwoSetting] = useState(
    pageData.content[2].setting
  );
  const [titleThreeSetting, setTitleThreeSetting] = useState(
    pageData.content[3].setting
  );
  const [paragraphTwoSetting, setParagraphTwoSetting] = useState(
    pageData.content[4].setting
  );

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
              color: `#${titleOneSetting.split(" ")[0]}`,
              fontSize: `${titleOneSetting.split(" ")[1]}px`,
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
                color: `#${paragraphOneSetting.split(" ")[0]}`,
                fontSize: `${paragraphOneSetting.split(" ")[1]}px`,
              }}
            >
              {para}
            </h2>
          ))}
          <h1
            style={{
              fontFamily: language ? "FarsiMedium" : "EnglishMedium",
              color: titleTwoSetting
                ? `#${titleTwoSetting.split(" ")[0]}`
                : "#fdb714",
              fontSize: `${titleTwoSetting.split(" ")[1]}px`,
            }}
          >
            {titleTwo[languageType]}
          </h1>
        </div>
      </section>
      <div className={classes.videoContainer}>
        <video
          className={classes.video}
          src={"https://eshareh.storage.iran.liara.space/page/home/eshareh.mp4"}
          poster="https://eshareh.storage.iran.liara.space/page/home/cover.jpg"
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
              color: `#${titleThreeSetting.split(" ")[0]}`,
              fontSize: `${titleThreeSetting.split(" ")[1]}px`,
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
                color: `#${paragraphTwoSetting.split(" ")[0]}`,
                fontSize: `${paragraphTwoSetting.split(" ")[1]}px`,
              }}
              dangerouslySetInnerHTML={{
                __html: applyFontToEnglishWords(
                  para,
                  "English",
                  paragraphTwoSetting
                    ? `${paragraphTwoSetting.split(" ")[1]}px`
                    : "22px",
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
            src={mediaData.content[0].link}
            blurDataURL={mediaData.content[0].link}
            placeholder="blur"
            alt={mediaData.content[0].type}
            as={mediaData.content[0].type}
            layout="fill"
            objectFit="contain"
            unoptimized={mediaData.content[0].type === "gif"}
            priority
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
            <div className={classes.methods}>
              <h1
                style={{
                  fontFamily: language ? "FarsiBold" : "English",
                  color: `#${solutionsContent[0].setting.split(" ")[0]}`,
                  fontSize: `${solutionsContent[0].setting.split(" ")[1]}px`,
                }}
              >
                {solutionsContent[0].data[languageType]}
              </h1>
              <h3
                style={{
                  color: `#${solutionsContent[1].setting.split(" ")[0]}`,
                  fontSize: `${solutionsContent[1].setting.split(" ")[1]}px`,
                }}
              >
                {solutionsContent[1].data[languageType].split("\n\n")[0]}
              </h3>
            </div>
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
                  priority
                />
              </div>
            </div>
          </div>
          <div className={classes.box}>
            <div className={classes.methods}>
              <h1
                style={{
                  fontFamily: language ? "FarsiBold" : "English",
                  color: `#${solutionsContent[2].setting.split(" ")[0]}`,
                  fontSize: `${solutionsContent[2].setting.split(" ")[1]}px`,
                }}
              >
                {solutionsContent[2].data[languageType]}
              </h1>
              <h3
                style={{
                  color: `#${solutionsContent[3].setting.split(" ")[0]}`,
                  fontSize: `${solutionsContent[3].setting.split(" ")[1]}px`,
                }}
              >
                {solutionsContent[3].data[languageType].split("\n\n")[0]}
              </h3>
            </div>
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
                  priority
                />
              </div>
            </div>
          </div>
          <div className={classes.box}>
            <div className={classes.methods}>
              <h1
                style={{
                  fontFamily: language ? "FarsiBold" : "English",
                  color: `#${solutionsContent[4].setting.split(" ")[0]}`,
                  fontSize: `${solutionsContent[4].setting.split(" ")[1]}px`,
                }}
              >
                {solutionsContent[4].data[languageType]}
              </h1>
              <h3
                style={{
                  color: `#${solutionsContent[5].setting.split(" ")[0]}`,
                  fontSize: `${solutionsContent[5].setting.split(" ")[1]}px`,
                }}
              >
                {solutionsContent[5].data[languageType].split("\n\n")[0]}
              </h3>
            </div>
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
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={classes.imageContainer}>
        <Image
          src={mediaData.content[1].link}
          blurDataURL={mediaData.content[1].link}
          placeholder="blur"
          alt={mediaData.content[1].type}
          as={mediaData.content[1].type}
          layout="fill"
          objectFit="contain"
          unoptimized={mediaData.content[1].type === "gif"}
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
    const [pageData, solutionsData] = await Promise.all([
      pageModel.findOne({ slug: "home" }),
      pageModel.findOne({ slug: "solutions" }),
    ]);
    const mediaData = await mediaModel.findOne({ slug: "home" });

    let activeSolutions = solutions
      .filter((project) => project.active)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    let activeCovers = covers.filter((project) => project.active);

    return {
      props: {
        solutions: JSON.parse(JSON.stringify(activeSolutions)),
        covers: JSON.parse(JSON.stringify(activeCovers)),
        pageData: JSON.parse(JSON.stringify(pageData)),
        solutionsData: JSON.parse(JSON.stringify(solutionsData)),
        mediaData: JSON.parse(JSON.stringify(mediaData)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
