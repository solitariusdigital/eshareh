import { useState, useContext, Fragment, useEffect } from "react";
import classes from "./works.module.scss";
import { replaceSpacesAndHyphens } from "@/services/utility";

export default function Work({ name }) {
  return <div className={classes.container}>{name}</div>;
}

// initial connection to db
export async function getServerSideProps(context) {
  try {
    let name = replaceSpacesAndHyphens(context.params.work);

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
