import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import classes from "./solutions.module.scss";
import Image from "next/legacy/image";
import Router from "next/router";
import { replaceSpacesAndHyphens, enToFaDigits } from "@/services/utility";
import { NextSeo } from "next-seo";
import dbConnect from "@/services/dbConnect";
import solutionModel from "@/models/Solution";

export default function Solutions({ solutions }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const [category, setCategory] = useState(
    "all" || "advertising" || "media" || "digital"
  );

  const router = useRouter();
  let pathname = router.pathname;

  const categories = [
    {
      name: "advertising",
      labelFa: "تبلیغات",
      labelEn: "Advertising",
    },
    {
      name: "media",
      labelFa: "رسانه",
      labelEn: "Media",
    },
    {
      name: "digital",
      labelFa: "دیجیتال",
      labelEn: "Digital",
    },
  ];

  const information = {
    advertising: {
      fa: "تلویزیونی تخمه های آفتاب گردان کمپین های آفتاب گردان کمپین  تلویزیونی  تخمه های های آفتاب گردان کمپین  تلویزیونی  تخمه های های آفتاب گردان کمپین  تلویزیونی  تخمه های تلویزیونی تخمه های آفتاب گردان تلویزیونی تخمه های آفتاب گردان وی نات",
      en: "Advertising Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
    },
    media: {
      fa: "تلویزیونی تخمه های آفتاب گردان کمپین های آفتاب گردان کمپین  تلویزیونی  تخمه های های آفتاب گردان کمپین  تلویزیونی  تخمه های های آفتاب گردان کمپین  تلویزیونی  تخمه های تلویزیونی تخمه های آفتاب گردان تلویزیونی تخمه های آفتاب گردان وی نات",
      en: "Media Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
    },
    digital: {
      fa: "تلویزیونی تخمه های آفتاب گردان کمپین های آفتاب گردان کمپین  تلویزیونی  تخمه های های آفتاب گردان کمپین  تلویزیونی  تخمه های های آفتاب گردان کمپین  تلویزیونی  تخمه های تلویزیونی تخمه های آفتاب گردان تلویزیونی تخمه های آفتاب گردان وی نات",
      en: "Digital Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
    },
  };

  useEffect(() => {
    navigationTopBar.map((nav) => {
      if (pathname.includes(nav.link)) {
        nav.active = true;
      } else {
        nav.active = false;
      }
    });
    setNavigationTopBar([...navigationTopBar]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const directSolution = (project) => {
    let link = `/solutions/${replaceSpacesAndHyphens(
      project[languageType].title
    )}`;
    Router.push(link);
  };

  return (
    <Fragment>
      <NextSeo
        title={language ? "راه حل‌ها" : "Solutions"}
        description={
          language
            ? "اشاره یک استودیوی طراحی چند رشته ای و مستقل است"
            : "Eshareh is a multidisciplinary, independently owned design studio"
        }
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://eshareh.com/solutions",
          siteName: "Eshareh Advertising Agency",
        }}
      />
      <div className={classes.container}>
        <div className={classes.category}>
          {categories.map((item, index) => (
            <p
              key={item.name}
              className={
                category === item.name ? classes.navActive : classes.nav
              }
              onClick={() => {
                setCategory(item.name);
              }}
            >
              {language ? item.labelFa : item.labelEn}
              {index !== 2 && <span>/</span>}
            </p>
          ))}
        </div>
        {category !== "all" && (
          <div className={"animate__animated animate__zoomIn"}>
            <p
              className={
                language
                  ? classes.categoryDescription
                  : classes.categoryDescriptionReverse
              }
            >
              {information[category][languageType]}
            </p>
          </div>
        )}
        <section
          key={category}
          className={`${classes.gridList} ${
            screenSize === "desktop"
              ? "animate__animated animate__slideInRight"
              : "animate__animated animate__fadeIn"
          }`}
        >
          {solutions
            .filter(
              (project) =>
                project[languageType].category === category ||
                category === "all"
            )
            .map((project, index) => {
              const { title } = project[languageType];
              const { media } = project;
              return (
                <Fragment key={index}>
                  {project.active && (
                    <div
                      className={classes.project}
                      onClick={() => directSolution(project)}
                    >
                      <div className={classes.box}>
                        {media[0].type === "image" ? (
                          <Image
                            className={classes.image}
                            src={media[0].link}
                            placeholder="blur"
                            blurDataURL={media[0].link}
                            alt={title}
                            layout="fill"
                            objectFit="cover"
                            as="image"
                            priority
                          />
                        ) : (
                          <video
                            className={classes.video}
                            src={media[0].link}
                            preload="metadata"
                          />
                        )}
                      </div>
                      <div
                        className={
                          language ? classes.title : classes.titleReverse
                        }
                      >
                        <h3>{title}</h3>
                      </div>
                    </div>
                  )}
                </Fragment>
              );
            })}
        </section>
      </div>
    </Fragment>
  );
}

// initial connection to db
export async function getServerSideProps(context) {
  try {
    await dbConnect();
    const solutions = await solutionModel.find();
    solutions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return {
      props: {
        solutions: JSON.parse(JSON.stringify(solutions)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
