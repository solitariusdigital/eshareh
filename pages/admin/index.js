import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./admin.module.scss";
import SolutionsForm from "@/components/SolutionsForm";
import Router from "next/router";
import secureLocalStorage from "react-secure-storage";

export default function Admin() {
  const [displayPage, setDisplayPage] = useState(false);

  useEffect(() => {
    if (
      !JSON.parse(secureLocalStorage.getItem("currentUser")) ||
      JSON.parse(secureLocalStorage.getItem("currentUser"))["permission"] !==
        "admin"
    ) {
      Router.push("/");
    } else {
      setDisplayPage(true);
    }
  }, []);

  return (
    <div className={classes.container}>{displayPage && <SolutionsForm />}</div>
  );
}
