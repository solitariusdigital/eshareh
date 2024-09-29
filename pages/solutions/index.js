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
import pageModel from "@/models/Page";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Tooltip from "@mui/material/Tooltip";
import logoEnglish from "@/assets/logoEnglish.svg";
import logoFarsi from "@/assets/logoFarsi.svg";

export default function Solutions({
  activeSolutions,
  adminSolutions,
  pageData,
}) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const { solutionsCategory, setSolutionsCategory } = useContext(StateContext);
  const [solutions, setSolutions] = useState([]);

  const router = useRouter();
  let pathname = router.pathname;

  useEffect(() => {
    if (permissionControl === "admin") {
      setSolutions(adminSolutions);
    } else {
      setSolutions(activeSolutions);
    }
  }, [activeSolutions, adminSolutions, permissionControl]);

  const categories = [
    {
      type: "advertising",
      labelFa: "تبلیغات",
      labelEn: "Advertising",
    },
    {
      type: "media",
      labelFa: "رسانه",
      labelEn: "Media",
    },
    {
      type: "digital",
      labelFa: "دیجیتال",
      labelEn: "Digital",
    },
  ];

  const information = {
    advertising: pageData.content[1].data[languageType].split("\n\n"),
    media: pageData.content[3].data[languageType].split("\n\n"),
    digital: pageData.content[5].data[languageType].split("\n\n"),
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
        canonical="https://eshareh.com/solutions"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://eshareh.com/solutions",
          title: language ? "راه‌کارها" : "Solutions",
          description: language
            ? "اشاره یک استودیوی طراحی چند رشته ای و مستقل است"
            : "Eshareh is a multidisciplinary, independently owned design studio",
          siteName: language
            ? "آژانس تبلیغاتی اشاره"
            : "Eshareh Advertising Agency",
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
                solutionsCategory === item.type
                  ? classes.navActive
                  : classes.nav
              }
              onClick={() => {
                {
                  setSolutionsCategory(item.type);
                }
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
        {solutionsCategory !== "all" && (
          <div
            className={
              language
                ? classes.categoryDescription
                : classes.categoryDescriptionReverse
            }
          >
            <h3
              style={{
                fontFamily: language ? "FarsiLight" : "EnglishLight",
              }}
            >
              {information[solutionsCategory]}
            </h3>
          </div>
        )}
        <section key={solutionsCategory} className={classes.gridList}>
          {solutions
            .filter(
              (project) =>
                project[languageType].category === solutionsCategory ||
                solutionsCategory === "all"
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

    const pageData = await pageModel.findOne({ slug: "solutions" });

    return {
      props: {
        activeSolutions: JSON.parse(JSON.stringify(activeSolutions)),
        adminSolutions: JSON.parse(JSON.stringify(adminSolutions)),
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
