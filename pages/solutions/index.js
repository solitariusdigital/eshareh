import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import classes from "./solutions.module.scss";
import Image from "next/legacy/image";
import { replaceSpacesAndHyphens, parsePersianDate } from "@/services/utility";
import { NextSeo } from "next-seo";
import dbConnect from "@/services/dbConnect";
import solutionModel from "@/models/Solution";
import pageModel from "@/models/Page";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Tooltip from "@mui/material/Tooltip";
import logoEnglish from "@/assets/logoEnglish.svg";
import logoFarsi from "@/assets/logoFarsi.svg";
import Link from "next/link";

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
      setSolutions(
        adminSolutions.sort(
          (a, b) =>
            parsePersianDate(b[languageType].year) -
            parsePersianDate(a[languageType].year)
        )
      );
    } else {
      setSolutions(
        activeSolutions.sort(
          (a, b) =>
            parsePersianDate(b[languageType].year) -
            parsePersianDate(a[languageType].year)
        )
      );
    }
  }, [activeSolutions, adminSolutions, languageType, permissionControl]);

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
    advertising: {
      content: pageData.content[1].data[languageType].split("\n\n"),
      color: `#${pageData.content[1].setting.split(" ")[0]}`,
      size: `${pageData.content[1].setting.split(" ")[1]}px`,
    },
    media: {
      content: pageData.content[3].data[languageType].split("\n\n"),
      color: `#${pageData.content[3].setting.split(" ")[0]}`,
      size: `${pageData.content[3].setting.split(" ")[1]}px`,
    },
    digital: {
      content: pageData.content[5].data[languageType].split("\n\n"),
      color: `#${pageData.content[5].setting.split(" ")[0]}`,
      size: `${pageData.content[5].setting.split(" ")[1]}px`,
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
            alt: language ? "اشاره" : "Eshareh",
          },
        }}
        robots="index, follow"
      />
      <div className={classes.container}>
        <div
          className={language ? classes.category : classes.categoryReverse}
          style={{
            fontFamily: language ? "FarsiLight" : "EnglishLight",
          }}
        >
          {categories.map((item, index) => (
            <h2
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
            </h2>
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
            <p
              style={{
                fontFamily: language ? "FarsiLight" : "EnglishLight",
                color: information[solutionsCategory].color,
                fontSize: information[solutionsCategory].size,
              }}
            >
              {information[solutionsCategory].content}
            </p>
          </div>
        )}
        <section
          key={solutionsCategory}
          className={language ? classes.gridList : classes.gridListReverse}
        >
          {solutions
            .filter(
              (project) =>
                project[languageType].category.includes(solutionsCategory) ||
                solutionsCategory === "all"
            )
            .map((project, index) => {
              const { title } = project[languageType];
              const projectLink = `/solutions/${replaceSpacesAndHyphens(
                project[languageType].title
              )}`;
              const { coverMedia } = project;
              return (
                <Link
                  key={index}
                  className={classes.project}
                  href={projectLink}
                  passHref
                >
                  {permissionControl === "admin" && (
                    <div className={classes.visibility}>
                      {project.active ? (
                        <Tooltip title="Visible">
                          <VerifiedUserIcon sx={{ color: "#6b8745" }} />
                        </Tooltip>
                      ) : (
                        <Tooltip title="Hidden">
                          <VisibilityOffIcon sx={{ color: "#a70237" }} />
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
                        src={`${coverMedia.link}#t=0.1`}
                        muted
                        playsInline
                        preload="metadata"
                      />
                    )}
                  </div>
                  <div
                    style={{
                      fontFamily: language ? "FarsiLight" : "EnglishLight",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: language ? "21px" : "",
                      }}
                    >
                      {title}
                    </h3>
                  </div>
                </Link>
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
    let activeSolutions = solutions.filter((project) => project.active);
    const pageData = await pageModel.findOne({ slug: "solutions" });

    return {
      props: {
        activeSolutions: JSON.parse(JSON.stringify(activeSolutions)),
        adminSolutions: JSON.parse(JSON.stringify(solutions)),
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
