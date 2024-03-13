import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import classes from "./solutions.module.scss";
import Image from "next/legacy/image";
import Router from "next/router";
import { replaceSpacesAndHyphens } from "@/services/utility";
import { NextSeo } from "next-seo";
import dbConnect from "@/services/dbConnect";
import solutionModel from "@/models/Solution";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Tooltip from "@mui/material/Tooltip";

export default function Solutions({ activeSolutions, adminSolutions }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const [solutions, setSolutions] = useState([]);
  const [category, setCategory] = useState(
    "all" || "advertising" || "media" || "digital"
  );

  useEffect(() => {
    if (permissionControl === "admin") {
      setSolutions(adminSolutions);
    } else {
      setSolutions(activeSolutions);
    }
  }, [activeSolutions, adminSolutions, permissionControl]);

  const router = useRouter();
  let pathname = router.pathname;

  const categories = [
    {
      name: { en: "advertising", fa: "تبلیغات" },
      labelFa: "تبلیغات",
      labelEn: "Advertising",
    },
    {
      name: { en: "media", fa: "رسانه" },
      labelFa: "رسانه",
      labelEn: "Media",
    },
    {
      name: { en: "digital", fa: "دیجیتال" },
      labelFa: "دیجیتال",
      labelEn: "Digital",
    },
  ];

  const information = {
    advertising: {
      fa: "تلویزیونی تخمه های آفتاب گردان کمپین های آفتاب گردان کمپین  تلویزیونی  تخمه های های آفتاب گردان کمپین  تلویزیونی  تخمه های های آفتاب گردان کمپین  تلویزیونی  تخمه های تلویزیونی تخمه های آفتاب گردان تلویزیونی تخمه های آفتاب گردان وی نات",
      en: "Advertising Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
    },
    تبلیغات: {
      fa: "تلویزیونی تخمه های آفتاب گردان کمپین های آفتاب گردان کمپین  تلویزیونی  تخمه های های آفتاب گردان کمپین  تلویزیونی  تخمه های های آفتاب گردان کمپین  تلویزیونی  تخمه های تلویزیونی تخمه های آفتاب گردان تلویزیونی تخمه های آفتاب گردان وی نات",
      en: "Advertising Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
    },
    media: {
      fa: "تلویزیونی تخمه های آفتاب گردان کمپین های آفتاب گردان کمپین  تلویزیونی  تخمه های های آفتاب گردان کمپین  تلویزیونی  تخمه های های آفتاب گردان کمپین  تلویزیونی  تخمه های تلویزیونی تخمه های آفتاب گردان تلویزیونی تخمه های آفتاب گردان وی نات",
      en: "Media Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
    },
    رسانه: {
      fa: "تلویزیونی تخمه های آفتاب گردان کمپین های آفتاب گردان کمپین  تلویزیونی  تخمه های های آفتاب گردان کمپین  تلویزیونی  تخمه های های آفتاب گردان کمپین  تلویزیونی  تخمه های تلویزیونی تخمه های آفتاب گردان تلویزیونی تخمه های آفتاب گردان وی نات",
      en: "Media Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
    },
    digital: {
      fa: "تلویزیونی تخمه های آفتاب گردان کمپین های آفتاب گردان کمپین  تلویزیونی  تخمه های های آفتاب گردان کمپین  تلویزیونی  تخمه های های آفتاب گردان کمپین  تلویزیونی  تخمه های تلویزیونی تخمه های آفتاب گردان تلویزیونی تخمه های آفتاب گردان وی نات",
      en: "Digital Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
    },
    دیجیتال: {
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
        title={language ? "راه‌کارها" : "Solutions"}
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
        <div
          className={language ? classes.category : classes.categoryReverse}
          style={{
            fontFamily: language ? "FarsiLight" : "EnglishLight",
          }}
        >
          {categories.map((item, index) => (
            <p
              key={index}
              className={
                category === item.name[languageType]
                  ? classes.navActive
                  : classes.nav
              }
              onClick={() => {
                setCategory(item.name[languageType]);
              }}
            >
              {language ? item.labelFa : item.labelEn}
              {index !== 2 && !language && (
                <span
                  style={{
                    fontFamily: language ? "EnglishLight" : "EnglishLight",
                  }}
                >
                  /
                </span>
              )}
              {index !== 0 && language && (
                <span
                  style={{
                    fontFamily: language ? "EnglishLight" : "EnglishLight",
                  }}
                >
                  /
                </span>
              )}
            </p>
          ))}
        </div>
        {category !== "all" && (
          <h3
            style={{
              fontFamily: language ? "FarsiLight" : "EnglishLight",
            }}
            className={
              language
                ? classes.categoryDescription
                : classes.categoryDescriptionReverse
            }
          >
            {information[category][languageType]}
          </h3>
        )}
        <section key={category} className={classes.gridList}>
          {solutions
            .filter(
              (project) =>
                project[languageType].category === category ||
                category === "all"
            )
            .map((project, index) => {
              const { title } = project[languageType];
              const { coverMedia } = project;
              return (
                <Fragment key={index}>
                  <div
                    className={classes.project}
                    onClick={() => directSolution(project)}
                  >
                    {permissionControl === "admin" && (
                      <div className={classes.visibility}>
                        {project.active ? (
                          <Tooltip title="Visible">
                            <VerifiedUserIcon sx={{ color: "#57a361" }} />
                          </Tooltip>
                        ) : (
                          <Tooltip title="Hidden">
                            <VisibilityOffIcon sx={{ color: "#d40d12" }} />
                          </Tooltip>
                        )}
                      </div>
                    )}
                    <div className={classes.box}>
                      {coverMedia.type === "image" ? (
                        <Image
                          className={classes.image}
                          src={coverMedia.link}
                          placeholder="blur"
                          blurDataURL={coverMedia.link}
                          alt={title}
                          layout="fill"
                          objectFit="cover"
                          as="image"
                          priority
                        />
                      ) : (
                        <video
                          className={classes.video}
                          id={project["_id"]}
                          src={coverMedia.link + "#t=0.1"}
                          muted
                          playsInline
                          preload="metadata"
                        />
                      )}
                    </div>
                    <div
                      className={
                        language ? classes.title : classes.titleReverse
                      }
                      style={{
                        fontFamily: language ? "FarsiLight" : "EnglishLight",
                      }}
                    >
                      <h3>{title}</h3>
                    </div>
                  </div>
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
    let adminSolutions = solutions.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    let activeSolutions = solutions
      .filter((project) => project.active)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return {
      props: {
        activeSolutions: JSON.parse(JSON.stringify(activeSolutions)),
        adminSolutions: JSON.parse(JSON.stringify(adminSolutions)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
