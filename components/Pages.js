import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./Pages.module.scss";
import ProfessionForm from "./ProfessionForm";

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
      {pageType === "what we do" && <ProfessionForm />}
    </div>
  );
}
