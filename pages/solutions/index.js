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
  const [category, setCategory] = useState("all");

  const router = useRouter();
  let pathname = router.pathname;
  let categoryType = router.query.category;

  useEffect(() => {
    if (permissionControl === "admin") {
      setSolutions(adminSolutions);
    } else {
      setSolutions(activeSolutions);
    }
  }, [activeSolutions, adminSolutions, permissionControl]);

  useEffect(() => {
    if (categoryType) {
      setCategory(categoryType);
    }
  }, [categoryType]);

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
      en: "It is a strategic unit in the field of marketing communication and like a creative agency that provides specialized services in the field of creativity. In this unit, according to the wishes and needs of customers, with special emphasis on the use of the latest available research, the formulated advertising strategy is the basis of creative work in order to achieve the best solution and ultimately the result for customers. The mission of the advertising solutions unit is to convey the brand message to the audience in a creative, knowledgeable and up-to-date way, respecting global standards.",
      fa: "واحد استراتژیکی در حوزه‌ی ارتباطات بازاریابی و همچون یک آژانس رسانه ای است که در حوزه‌ی رسانه خدمات تخصصی ارائه می‌دهد. در این واحد با توجه به خواسته‌ و نیاز مشتریان، با تاکید ویژه بر استفاده از آخرین تحقیقات در دسترس، استراتژی تبلیغاتی تدوین‌ شده پایه و اساس کار خلاقیت قرار می‌گیرد تا بهترین راه‌حل و در نهایت نتیجه برای مشتریان حاصل شود. رسالت واحد راه‌کارهای تبلیغاتی رساندن پيام برند به مخاطب با روشی خلاقانه، دانش‌مدار و منطبق برشیوه‌های روز با رعايت استانداردهای جهانی است. در واحد راه‌حل‌های تبلیغاتی اشاره طیف وسیعی از انواع کمپین‌های بزرگ و کوچک تبلیغاتی از کمپین 360 درجه گرفته تا کمپین‌های کوچک انجام می‌پذیرد. همچنین در این بخش خدماتی از جمله ایده‌پردازی و اجرای انواع کمپین‌های دیجیتال، خدمات چاپ، ساخت آگهی‌های تلویزیونی، طراحی گرافیک، متون خلاقانه، مشاوره، برنامه‌ریزی و تولید اقلام فروشگاهی نیز انجام می‌شود.",
    },
    media: {
      en: "It is a strategic unit in the field of marketing communications and like a media agency that provides specialized services in the field of media. In this unit, according to the demands and needs of customers, with special emphasis on the use of the latest available research and software capable of measuring and optimizing the use of advertising budgets, efforts are made to use advertising budgets as effectively as possible. The services offered in this unit are: media strategy tailored to the audience and campaign goals, media planning using specialized software and optimal media buying, all of which are planned in line with the most accurate implementation of each campaign.",
      fa: "واحد استراتژیکی در حوزه‌ی ارتباطات بازاریابی و همچون یک آژانس رسانه ای است که در حوزه‌ی رسانه خدمات تخصصی ارائه می‌دهد. در این واحد با توجه به خواسته‌ و نیاز مشتریان، با تاکید ویژه براستفاده از آخرین تحقیقات دردسترس و نرم‌افزارهایی که قابلیت اندازه‌گیری و بهینه‌سازی استفاده از بودجه‌های تبلیغاتی را دارند، تلاش می‌شود تا حد امکان از بودجه‌های تبلیغاتی به شکلی موثرتر استفاده شود. خدماتی که در این واحد ارائه می‌گردد عبارت است از: استراتژی رسانه‌ای متناسب با مخاطب و اهداف کمپین، برنامه‌ریزی رسانه‌ای با استفاده از نرم‌افزارهای تخصصی و خرید بهینه‌ی رسانه که همگی در راستای اجرای هرچه دقیق‌تر هر کمپین برنامه‌ریزی می‌شوند.",
    },
    digital: {
      en: "It is a strategic unit in the field of marketing communications and like a media agency that provides specialized services in the field of media. In this unit, according to the demands and needs of customers, with special emphasis on the use of the latest available research and software capable of measuring and optimizing the use of advertising budgets, efforts are made to use advertising budgets as effectively as possible.",
      fa: "واحد استراتژیکی در حوزه‌ی ارتباطات بازاریابی و همچون یک آژانس رسانه ای است که در حوزه‌ی رسانه خدمات تخصصی ارائه می‌دهد. در این واحد با توجه به خواسته‌ و نیاز مشتریان، با تاکید ویژه بر استفاده از آخرین تحقیقات دردسترس و نرم‌افزارهایی که قابلیت اندازه‌گیری و بهینه‌سازی استفاده از بودجه‌های تبلیغاتی را دارند، تلاش می‌شود تا حد امکان از بودجه‌های تبلیغاتی به شکلی موثرتر استفاده شود.",
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
                category === item.type ? classes.navActive : classes.nav
              }
              onClick={() => {
                {
                  setCategory(item.type);
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
