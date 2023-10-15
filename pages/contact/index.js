import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./contact.module.scss";

export default function Contact() {
  const { menuColor, setMenuColor } = useContext(StateContext);

  useEffect(() => {
    document.body.style.background = "#ffffff";
    setMenuColor("#1b1b1b");
  }, [setMenuColor]);

  return (
    <div className={classes.container}>
      <p>contact</p>
    </div>
  );
}
