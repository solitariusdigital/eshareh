import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "../works.module.scss";
import { replaceSpacesAndHyphens } from "@/services/utility";

export default function Sector({ name }) {
  useEffect(() => {
    document.body.style.background = "#ffffff";
  }, []);

  return <div className={classes.container}>{name}</div>;
}

// initial connection to db
export async function getServerSideProps(context) {
  try {
    let name = replaceSpacesAndHyphens(context.params.sector);
    return {
      props: {
        name: JSON.parse(JSON.stringify(name)),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
