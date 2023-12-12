import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./search.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { NextSeo } from "next-seo";
import Image from "next/legacy/image";
import dbConnect from "@/services/dbConnect";
import solutionModel from "@/models/Solution";
import { replaceSpacesAndHyphens } from "@/services/utility";
import Router from "next/router";

export default function Search({ activeSolutions }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const [search, setSearch] = useState("");
  const [solutions, setSolutions] = useState([]);
  const [searchEmpty, setSearchEmpty] = useState(false);

  const searchSolutions = (event) => {
    setSearch(event);
    setSearchEmpty(false);
    let searchSolutions = [];
    if (search) {
      searchSolutions = activeSolutions.filter((item) => {
        let matches = [];
        matches.push(
          Object.values(item[languageType]).some((val) =>
            String(val).includes(search.trim().slice(0, 20))
          )
        );
        return matches.every((match) => match);
      });
      setSolutions(searchSolutions);
    }
    if (searchSolutions.length === 0) {
      setSearchEmpty(true);
    }
  };

  const directSolution = (project) => {
    let link = `/solutions/${replaceSpacesAndHyphens(
      project[languageType].title
    )}`;
    Router.push(link);
  };

  return (
    <Fragment>
      <NextSeo
        title={language ? "جستجو" : "Search"}
        description={
          language
            ? "جستجو ... پروژه، نوع کار، سال"
            : "Search ... project, work type, year"
        }
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://eshareh.com/search",
          siteName: "Eshareh Advertising Agency",
        }}
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
        <div className={classes.gridList}>
          {solutions.map((project, index) => {
            const { title } = project[languageType];
            const { media } = project;
            return (
              <Fragment key={index}>
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
                        playsinline
                      />
                    )}
                  </div>
                  <div
                    className={language ? classes.title : classes.titleReverse}
                  >
                    <h3>{title}</h3>
                  </div>
                </div>
              </Fragment>
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
