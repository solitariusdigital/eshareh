import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import CoverSlider from "@/components/CoverSlider";
import CardGrid from "@/components/CardGrid";
import classes from "./home.module.scss";
import Router from "next/router";
import Image from "next/legacy/image";
import profession from "@/assets/profession.png";
import { enToFaDigits } from "@/services/utility";
import { NextSeo } from "next-seo";
import dbConnect from "@/services/dbConnect";
import solutionModel from "@/models/Solution";
import coverModel from "@/models/Cover";

export default function Home({ solutions, covers }) {
  const { language, setLanguage } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);

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
        className={language ? classes.information : classes.informationReverse}
      >
        <h1
          style={{
            fontFamily: language ? "FarsiBold" : "EnglishBold",
          }}
        >
          {language ? "حرفه ما" : "What We Do"}
        </h1>
        <div className={classes.gridLayout}>
          {language ? (
            <h2>
              اشاره در سال {enToFaDigits(1376)} به عنوان یک آژانس تبلیغاتی آغاز
              به کار کرد. در نتیجه‌ی فرآیندی اُرگانیک، به یک آژانس ارتباطات
              بازاریابی فول سرویس با رویکردی راه‌حل‌گرا تبدیل شد
            </h2>
          ) : (
            <h2>
              Eshareh, was established in 1996 as an advertising agency. Through
              an organic growth the agency has transformed into a full-service
              marketing communications agency with a solution based approach
            </h2>
          )}
          <div className={classes.image}>
            <Image
              src={profession}
              blurDataURL={profession}
              placeholder="blur"
              alt="image"
              layout="responsive"
              objectFit="contain"
              as="image"
              priority
            />
          </div>
        </div>
      </section>
      {solutions.length >= 10 && (
        <section className={classes.gridWorks}>
          <CardGrid solutions={divideArray(solutions)[0]} direction={true} />
          {screenSize === "desktop" && (
            <CardGrid solutions={divideArray(solutions)[1]} direction={false} />
          )}
        </section>
      )}
      <div
        className={classes.message}
        onClick={() => Router.push("/solutions")}
      >
        {language ? <h3>مشاهده راه حل‌ها</h3> : <h3>View solutions</h3>}
      </div>
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
