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
import logoEnglish from "@/assets/logoEnglish.svg";
import logoFarsi from "@/assets/logoFarsi.svg";

export default function Solutions({ activeSolutions, adminSolutions }) {
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
    advertising: {
      en: "Based on our client’s needs, the most up-to-date research available and the developed communication strategy forms the basis for our creative work to ensure the best solution and result for the clients are obtained. The mission of the Advertising Solutions Unit is to convey the brand message to the target audience in a creative way. Within Eshareh, we execute a diverse array of advertising campaigns, ranging from large-scale, 360 campaigns to ad hoc and small ones. Additionally, this department offers a comprehensive suite of services, including ideation and execution of all kinds of digital campaigns, printing services, TV ad production, graphic design, creative copywriting, consultation, planning, and POSM production.",
      fa: "ما با توجه به خواسته‌ و نیاز مشتریان، آخرین تحقیقات در دسترس و استراتژی تبلیغاتی تدوین‌شده را پایه و اساس کار خلاقیت قرار می‌دهیم تا بهترین راه‌حل و نتیجه برای مشتریان حاصل شود. رسالت راهکارهای تبلیغاتی، رساندن پيام برند به مخاطب با روشی خلاقانه است. در آژانس اشاره طیف وسیعی از انواع کمپین‌های بزرگ و کوچک تبلیغاتی مثل کمپین ۳۶۰ درجه انجام می‌پذیرد. همچنین در این بخش خدماتی از جمله ایده‌پردازی و اجرای انواع کمپین‌های دیجیتال، خدمات چاپ، ساخت آگهی‌های تلویزیونی، طراحی گرافیک، متون خلاقانه، مشاوره، برنامه‌ریزی و تولید اقلام فروشگاهی نیز انجام می‌شود.",
    },
    media: {
      en: "We at Eshareh, benefit from the latest research available as well as measurement and optimization softwares to ensure effective allocation of advertising budgets. The services offered in this unit include developing media strategy tailored to the target audience and campaign objectives, media planning using specialized software, and optimal media buying, leading to the precise execution of each campaign.",
      fa: "ما در آژانس اشاره از آخرین تحقیقات در دسترس و نرم‌افزارهایی که قابلیت اندازه‌گیری و بهینه‌سازی دارند، استفاده می‌کنیم تا در حد امکان به شکلی موثرتر از بودجه‌های تبلیغاتی استفاده شود. خدماتی که در این بخش ارائه می‌گردد عبارت است از: استراتژی رسانه‌ای متناسب با مخاطب و اهداف کمپین، برنامه‌ریزی رسانه‌ای با استفاده از نرم‌افزارهای تخصصی و خرید بهینه رسانه که همگی در راستای اجرای هرچه دقیق‌تر هر کمپین برنامه‌ریزی می‌شوند.",
    },
    digital: {
      en: "The ultimate goal of Digital Solutions Unit is to design and develop advertising campaigns that leverage various digital tactics and channels leading your brand towards much greater achievements. As an instance, a digital marketing strategy enables you to use various digital channels such as social media, Pay-per-Click(PPC, Search Engine Optimization (SEO), Email Marketing ,… to connect with current customers and engage with potential customers interested in your products or services.",
      fa: "هدف نهایی استراتژی بازاریابی دیجیتال،  تهیه و تنظیم کمپین‌های  تبلیغاتی با استفاده از تاکتیک‌ها و کانال‌های دیجیتالی متعدد است و همین امر می‌تواند نام تجاری شما را به سمت اهداف بزرگ‌تر هدایت کند. به عنوان مثال، یک استراتژی دیجیتال مارکتینگ به شما امکان می‌دهد از کانال‌های دیجیتالی مختلف مانند رسانه‌های اجتماعی، پرداخت به ازای کلیک، بهینه‌سازی موتور جستجو، بازاریابی ایمیلی و … استفاده کنید تا با مشتریان فعلی و افراد علاقه‌مند به محصولات یا خدمات‌تان در ارتباط باشید.",
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
          images: [
            {
              url: language ? logoFarsi : logoEnglish,
              width: 1200,
              height: 630,
              alt: language
                ? "آژانس تبلیغاتی اشاره"
                : "Eshareh Advertising Agency",
            },
          ],
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
              {information[solutionsCategory][languageType]}
            </h3>
            {solutionsCategory === "digital" && (
              <div
                style={{
                  fontFamily: language ? "FarsiLight" : "EnglishLight",
                }}
                className={classes.extraDetails}
              >
                {language ? (
                  <h3>
                    ما در مجموعه تبلیغاتی اشاره با همراهی یک تیم جوان و پویا،
                    منتظرتان هستیم تا ارتباطی درست با شما و مخاطبین‌تان برقرار
                    کنیم.
                  </h3>
                ) : (
                  <h3>
                    At Eshareh, our young, dynamic, and experienced team is
                    eager to establish a strong connection between you and your
                    audience.
                  </h3>
                )}
              </div>
            )}
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
