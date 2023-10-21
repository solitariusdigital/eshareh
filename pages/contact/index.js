import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./contact.module.scss";

export default function Contact() {
  useEffect(() => {
    document.body.style.background = "#ffffff";
  }, []);

  return (
    <div className={classes.container}>
      <p>contact</p>
    </div>
  );
}
