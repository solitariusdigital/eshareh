/* eslint-disable react/no-unescaped-entities */
import { useContext, Fragment, useState } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./profession.module.scss";
import { NextSeo } from "next-seo";
import Image from "next/legacy/image";
import CircleIcon from "@mui/icons-material/Circle";
import logoEnglish from "@/assets/logoEnglish.svg";
import logoFarsi from "@/assets/logoFarsi.svg";
import dbConnect from "@/services/dbConnect";
import pageModel from "@/models/Page";
import mediaModel from "@/models/Media";
import { applyFontToEnglishWords } from "@/services/utility";

export default function Profession({ pageData, mediaData }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const [paragraph, setParagraph] = useState({
    en: [pageData.content[1].data.en.split("\n\n")][0],
    fa: [pageData.content[1].data.fa.split("\n\n")][0],
  });

  return (
    <Fragment>
      <NextSeo
        title={language ? "چه می‌کنیم" : "What We Do"}
        description={
          language
            ? "اشاره یک استودیوی طراحی چند رشته‌ای و مستقل است"
            : "Eshareh is a multidisciplinary, independently owned design studio"
        }
        canonical="https://eshareh.com/profession"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://eshareh.com/profession",
          title: language ? "چه می‌کنیم" : "What We Do",
          description: language
            ? "اشاره یک استودیوی طراحی چند رشته‌ای و مستقل است"
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
      <div
        className={classes.container}
        style={{
          fontFamily: language ? "English" : "English",
        }}
      >
        <div
          className={
            language ? classes.information : classes.informationReverse
          }
        >
          <h3
            style={{
              fontFamily: language ? "FarsiBold" : "EnglishMedium",
              color: `#${pageData.content[0].setting.split(" ")[0]}`,
              fontSize: `${pageData.content[0].setting.split(" ")[1]}px`,
            }}
          >
            {pageData.content[0].data[languageType]}
          </h3>
        </div>
        {paragraph[languageType].map((para, index) => (
          <div
            key={index}
            className={
              language ? classes.information : classes.informationReverse
            }
          >
            <div
              className={language ? classes.row : classes.rowReverse}
              style={{
                fontFamily: language ? "Farsi" : "English",
              }}
            >
              <CircleIcon
                className={classes.icon}
                sx={{ fontSize: 8, color: "#fdb714" }}
              />
              <h3
                style={{
                  color: `#${pageData.content[1].setting.split(" ")[0]}`,
                  fontSize: `${pageData.content[1].setting.split(" ")[1]}px`,
                }}
                dangerouslySetInnerHTML={{
                  __html: applyFontToEnglishWords(
                    para,
                    "English",
                    `${pageData.content[1].setting.split(" ")[1]}px`,
                    language
                  ),
                }}
              ></h3>
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
      </div>
    </Fragment>
  );
}

// initial connection to db
export async function getServerSideProps(context) {
  try {
    await dbConnect();
    const pageData = await pageModel.findOne({ slug: "profession" });
    const mediaData = await mediaModel.findOne({ slug: "profession" });

    return {
      props: {
        pageData: JSON.parse(JSON.stringify(pageData)),
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
