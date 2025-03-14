import { useState, useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./search.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { NextSeo } from "next-seo";
import Image from "next/legacy/image";
import dbConnect from "@/services/dbConnect";
import solutionModel from "@/models/Solution";
import { replaceSpacesAndHyphens } from "@/services/utility";
import logoEnglish from "@/assets/logoEnglish.svg";
import logoFarsi from "@/assets/logoFarsi.svg";
import Link from "next/link";

export default function Search({ activeSolutions }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const [search, setSearch] = useState("");
  const [solutions, setSolutions] = useState([]);
  const [searchEmpty, setSearchEmpty] = useState(false);

  const searchSolutions = (event) => {
    setSearch(event);
    setSearchEmpty(false);
    if (!event) {
      setSolutions([]);
      return;
    }
    const trimmedSearch = event.trim().slice(0, 20).toLowerCase();
    const searchSolutions = activeSolutions.filter((item) =>
      Object.values(item[languageType]).some((val) =>
        String(val).toLowerCase().includes(trimmedSearch)
      )
    );
    setSolutions(searchSolutions);
    setSearchEmpty(searchSolutions.length === 0);
  };

  return (
    <Fragment>
      <NextSeo
        title={language ? "جستجو" : "Search"}
        description={
          language
            ? "جستجو پروژه، نوع کار، سال"
            : "Search project, work type, year"
        }
        canonical="https://eshareh.com/search"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://eshareh.com/search",
          title: language ? "جستجو" : "Search",
          description: language
            ? "جستجو پروژه، نوع کار، سال"
            : "Search project, work type, year",
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
        className={`${classes.container} animate__animated animate__slideInDown`}
      >
        <div
          className={
            language ? classes.inputSearch : classes.inputSearchReverse
          }
        >
          <div className={classes.action} onClick={() => searchSolutions()}>
            {language ? "جستجو" : "Search"}
          </div>
          <input
            style={{
              fontFamily: language ? "Farsi" : "English",
            }}
            placeholder={
              language
                ? "جستجو ... پروژه، نوع کار، سال"
                : "Search ... project, work type, year"
            }
            type="text"
            id="search"
            name="search"
            onChange={(e) => searchSolutions(e.target.value)}
            maxLength={30}
            value={search}
            autoComplete="off"
            dir={language ? "rtl" : "ltr"}
          />
          <CloseIcon
            className="icon"
            onClick={() => {
              setSolutions([]);
              setSearch("");
              setSearchEmpty(false);
            }}
            sx={{ color: "#d6d6d6" }}
          />
        </div>
        {searchEmpty && (
          <p className="message">
            {language
              ? "مطلبی برای نمایش نیست، دوباره جستجو کن"
              : "There is no content to display, search again"}
          </p>
        )}
        <div className={language ? classes.gridList : classes.gridListReverse}>
          {search &&
            solutions.map((project, index) => {
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
                  <div className={classes.box}>
                    {coverMedia.type === "image" ? (
                      <Image
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
                        src={`${coverMedia.link}#t=0.1`}
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
        </div>
      </div>
    </Fragment>
  );
}

// initial connection to db
export async function getServerSideProps(context) {
  try {
    await dbConnect();
    const solutions = await solutionModel.find();
    let activeSolutions = solutions
      .filter((project) => project.active)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return {
      props: {
        activeSolutions: JSON.parse(JSON.stringify(activeSolutions)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
