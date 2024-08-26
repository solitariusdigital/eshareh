import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./Pages.module.scss";
import Profession from "./forms/Profession";
import Home from "./forms/Home";
import About from "./forms/About";
import News from "./forms/News";
import Contact from "./forms/Contact";

export default function Pages() {
  const { languageType, setLanguageType } = useContext(StateContext);
  const { language, setLanguage } = useContext(StateContext);
  const [pageType, setPageType] = useState(
    "home" || "about us" || "what we do" || "news" || "contact us"
  );

  const pages = ["home", "about us", "what we do", "news", "contact us"];

  return (
    <div className={classes.container}>
      <div
        className={classes.navigation}
        style={{
          fontFamily: language ? "English" : "English",
        }}
      >
        {pages.map((page, index) => (
          <p
            key={index}
            className={pageType === page ? classes.navActive : classes.nav}
            onClick={() => setPageType(page)}
          >
            {page}
          </p>
        ))}
      </div>
      {pageType === "home" && <Home />}
      {pageType === "about us" && <About />}
      {pageType === "what we do" && <Profession />}
      {pageType === "news" && <News />}
      {pageType === "contact us" && <Contact />}
    </div>
  );
}
