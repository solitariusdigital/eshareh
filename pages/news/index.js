import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./news.module.scss";

export default function News() {
  const { menuColor, setMenuColor } = useContext(StateContext);

  useEffect(() => {
    document.body.style.background = "#ffffff";
    setMenuColor("#1b1b1b");
  }, [setMenuColor]);

  return (
    <div className={classes.container}>
      <p>news</p>
    </div>
  );
}
