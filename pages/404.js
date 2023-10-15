import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./home.module.scss";

export default function NotFoundPage() {
  const { menuColor, setMenuColor } = useContext(StateContext);

  useEffect(() => {
    document.body.style.background = "#ffffff";
    setMenuColor("#1b1b1b");
  }, [setMenuColor]);

  return (
    <div className={classes.notFound}>
      <h2>صفحه یافت نشد</h2>
      <p>صفحه مورد نظر وجود ندارد</p>
    </div>
  );
}
