import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./news.module.scss";

export default function News() {
  useEffect(() => {
    document.body.style.background = "#ffffff";
  }, []);

  return (
    <div className={classes.container}>
      <p>news</p>
    </div>
  );
}
