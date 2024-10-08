import { useState, useContext } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "@/components/forms/Form.module.scss";
import Profession from "./forms/Profession";
import Home from "./forms/Home";
import About from "./forms/About";
import Contact from "./forms/Contact";
import SolutionsContent from "./forms/SolutionsContent";

export default function Pages({ pages, mediaData }) {
  const { language, setLanguage } = useContext(StateContext);
  const [pageType, setPageType] = useState(
    "home" || "about us" || "what we do" || "contact us" || "solutions"
  );

  const pagesName = [
    "home",
    "about us",
    "what we do",
    "contact us",
    "solutions",
  ];

  return (
    <>
      <div
        className={classes.pageNavigation}
        style={{
          fontFamily: language ? "English" : "English",
        }}
      >
        {pagesName.map((page, index) => (
          <p
            key={index}
            className={pageType === page ? classes.navActive : classes.nav}
            onClick={() => setPageType(page)}
          >
            {page}
          </p>
        ))}
      </div>
      {pageType === "home" && <Home pages={pages} mediaData={mediaData} />}
      {pageType === "about us" && <About pages={pages} mediaData={mediaData} />}
      {pageType === "what we do" && (
        <Profession pages={pages} mediaData={mediaData} />
      )}
      {pageType === "contact us" && (
        <Contact pages={pages} mediaData={mediaData} />
      )}
      {pageType === "solutions" && (
        <SolutionsContent pages={pages} mediaData={mediaData} />
      )}
    </>
  );
}
