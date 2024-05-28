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
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

export default function Solutions({ activeSolutions, adminSolutions }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
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
      en: "It is a marketing communication strategic unit, functioning as a creative agency that offers specialized creative services. In this unit, with respect to our clients’ needs and by leveraging the latest research available we develop advertising strategies that form the basis for our creative work which ensures we deliver optimal solutions and outstanding results to our clients. The mission of the Advertising Solutions Unit is to convey the brand message to the target audience in a creative, knowledge-oriented, and up-to-date manner, respecting global standards. Within Eshareh’s Advertising Solutions Unit, we execute a diverse array of advertising campaigns, ranging from large-scale, 360 campaigns to ad hoc and small ones. Additionally, this department offers a comprehensive suite of services, including ideation and execution of diverse digital campaigns, printing services, TV ad production, graphic design, creative copywriting, consultation, planning, and POSM production.",
      fa: "واحد استراتژیکی در حوزه‌ی ارتباطات بازاریابی و همچون یک آژانس رسانه ای است که در حوزه‌ی رسانه خدمات تخصصی ارائه می‌دهد. در این واحد با توجه به خواسته‌ و نیاز مشتریان، با تاکید ویژه بر استفاده از آخرین تحقیقات در دسترس، استراتژی تبلیغاتی تدوین‌ شده پایه و اساس کار خلاقیت قرار می‌گیرد تا بهترین راه‌حل و در نهایت نتیجه برای مشتریان حاصل شود. رسالت واحد راه‌کارهای تبلیغاتی رساندن پيام برند به مخاطب با روشی خلاقانه، دانش‌مدار و منطبق برشیوه‌های روز با رعايت استانداردهای جهانی است. در واحد راه‌حل‌های تبلیغاتی اشاره طیف وسیعی از انواع کمپین‌های بزرگ و کوچک تبلیغاتی از کمپین 360 درجه گرفته تا کمپین‌های کوچک انجام می‌پذیرد. همچنین در این بخش خدماتی از جمله ایده‌پردازی و اجرای انواع کمپین‌های دیجیتال، خدمات چاپ، ساخت آگهی‌های تلویزیونی، طراحی گرافیک، متون خلاقانه، مشاوره، برنامه‌ریزی و تولید اقلام فروشگاهی نیز انجام می‌شود.",
    },
    media: {
      en: "It is a marketing communication strategic unit, functioning as a media agency that offers specialized media services. In this unit, we focus on meeting clients’ needs and requests by utilizing the latest research available and advanced software to measure and optimize advertising budgets, ensuring the most effective use of media expenditures. The services offered in this unit include developing media strategy tailored to the target audience and campaign objectives, media planning using specialized software, and optimal media buying to ensure the precise execution of each campaign.",
      fa: "واحد استراتژیکی در حوزه‌ی ارتباطات بازاریابی و همچون یک آژانس رسانه ای است که در حوزه‌ی رسانه خدمات تخصصی ارائه می‌دهد. در این واحد با توجه به خواسته‌ و نیاز مشتریان، با تاکید ویژه بر استفاده از آخرین تحقیقات دردسترس و نرم‌افزارهایی که قابلیت اندازه‌گیری و بهینه‌سازی استفاده از بودجه‌های تبلیغاتی را دارند، تلاش می‌شود تا حد امکان از بودجه‌های تبلیغاتی به شکلی موثرتر استفاده شود. خدماتی که در این واحد ارائه می‌گردد عبارت است از: استراتژی رسانه‌ای متناسب با مخاطب و اهداف کمپین، برنامه‌ریزی رسانه‌ای با استفاده از نرم‌افزارهای تخصصی و خرید بهینه‌ی رسانه که همگی در راستای اجرای هرچه دقیق‌تر هر کمپین برنامه‌ریزی می‌شوند.",
    },
    digital: {
      en: "Our Digital Solutions unit is a strategic powerhouse in the field of digital marketing, delivering innovative online advertising strategies designed to attract a larger audience at lower costs which enables us to enhance the quality and presence of brands among their target markets, ensuring effective and enduring impact. The goal of a digital marketing strategy is to leverage various digital tactics and channels to execute advertising campaigns that propel brands toward greater achievements.",
      fa: "واحدی استراتژیک در زمینه بازاریابی دیجیتال که با راهکارهای خلاق در تبلیغات آنلاین به دلیل جذب مخاطب بیشتر با هزینه‌های کمتر، می‌تواند این زمینه را فراهم کند تا کیفیت و حضور برند در بازار هدف پر رنگ و پایدار باشد. هدف نهایی استراتژی بازاریابی دیجیتال، ارایه‌ی کمپین‌های  تبلیغاتی با استفاده از تاکتیک‌ها و کانال‌های دیجیتالی متعدد است و همین امر می‌تواند نام تجاری شما  را به سمت اهداف بزرگ‌تر هدایت کند.",
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
                    به عنوان مثال یک استراتژی دیجیتال مارکتینگ به شما امکان
                    می‌دهد از کانال‌های دیجیتالی مختلف مانند:
                  </h3>
                ) : (
                  <h3>
                    As an instance, a digital marketing strategy enables you to
                    use various digital channels, such as:
                  </h3>
                )}

                <div className={classes.row}>
                  <RadioButtonUncheckedIcon sx={{ fontSize: 10 }} />
                  {language ? (
                    <h3>رسانه‌های اجتماعی</h3>
                  ) : (
                    <h3>Social Media</h3>
                  )}
                </div>
                <div className={classes.row}>
                  <RadioButtonUncheckedIcon sx={{ fontSize: 10 }} />
                  {language ? (
                    <h3>پرداخت به ازای کلیک</h3>
                  ) : (
                    <h3>Pay-per-Click (PPC)</h3>
                  )}
                </div>
                <div className={classes.row}>
                  <RadioButtonUncheckedIcon sx={{ fontSize: 10 }} />
                  {language ? (
                    <h3>بهینه‌سازی موتور جستجو</h3>
                  ) : (
                    <h3>Search Engine Optimization (SEO)</h3>
                  )}
                </div>
                <div className={classes.row}>
                  <RadioButtonUncheckedIcon sx={{ fontSize: 10 }} />
                  {language ? (
                    <h3>بازاریابی ایمیلی و ...</h3>
                  ) : (
                    <h3>Email Marketing and …</h3>
                  )}
                </div>
                {language ? (
                  <h3>
                    استفاده کنید تا با مشتریان فعلی و افراد علاقه‌مند به محصولات
                    یا خدمات‌تان در ارتباط باشید.
                  </h3>
                ) : (
                  <h3>
                    These channels help you connect with current customers and
                    engage with potential customers interested in your products
                    or services.
                  </h3>
                )}
                {language ? (
                  <h3>
                    ما در مجموعه‌ی تبلیغاتی اشاره با همراهی یک تیم جوان و پویا،
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
