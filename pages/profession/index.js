/* eslint-disable react/no-unescaped-entities */
import { useContext, Fragment, useState } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./profession.module.scss";
import { NextSeo } from "next-seo";
import Image from "next/legacy/image";
import CircleIcon from "@mui/icons-material/Circle";
import logoEnglish from "@/assets/logoEnglish.svg";
import logoFarsi from "@/assets/logoFarsi.svg";
import profession from "@/assets/profession.png";

export default function Profession({ pageData }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const [paragraph, setParagraphs] = useState({
    en: [pageData.content[1].data.en.split("\n\n")][0],
    fa: [pageData.content[1].data.fa.split("\n\n")][0],
  });

  const flyingFish =
    "https://eshareh.storage.iran.liara.space/motion/flyingFish.gif";

  const position = {
    position: "relative",
    top: language ? "13px" : "18px",
    left: language ? "10px" : "-10px",
  };

  return (
    <Fragment>
      <NextSeo
        title={language ? "چه می‌کنیم" : "What We Do"}
        description={
          language
            ? "اشاره یک استودیوی طراحی چند رشته ای و مستقل است"
            : "Eshareh is a multidisciplinary, independently owned design studio"
        }
        canonical="https://eshareh.com/profession"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://eshareh.com/profession",
          title: language ? "چه می‌کنیم" : "What We Do",
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
      <div
        className={classes.container}
        style={{
          fontFamily: language ? "EnglishLight" : "EnglishLight",
        }}
      >
        <div
          className={
            language ? classes.information : classes.informationReverse
          }
        >
          {language ? (
            <h2
              style={{
                fontFamily: "FarsiBold",
              }}
            >
              {pageData.content[0].data.fa}
            </h2>
          ) : (
            <h2
              style={{
                fontFamily: "EnglishMedium",
              }}
            >
              {pageData.content[0].data.en}
            </h2>
          )}
        </div>
        {paragraph[languageType].map((para, index) => (
          <div
            key={index}
            className={
              language ? classes.information : classes.informationReverse
            }
          >
            <div
              className={classes.row}
              style={{
                fontFamily: language ? "FarsiLight" : "EnglishLight",
              }}
            >
              <CircleIcon
                style={position}
                sx={{ fontSize: 10, color: "#fdb714" }}
              />
              <h2
                dangerouslySetInnerHTML={{
                  __html: applyFontToEnglishWords(
                    para,
                    "EnglishLight",
                    "24px",
                    language
                  ),
                }}
              ></h2>
            </div>
          </div>
        ))}
        <div
          className={classes.image}
          onClick={() =>
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            })
          }
        >
          <Image
            src={profession}
            blurDataURL={profession}
            placeholder="blur"
            alt="image"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </Fragment>
  );
}

// initial connection to db
export async function getServerSideProps(context) {
  try {
    await dbConnect();
    const pageData = await pageModel.findOne({ slug: "profession" });

    return {
      props: {
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
