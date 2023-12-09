import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./admin.module.scss";
import SolutionsForm from "@/components/SolutionsForm";
import Router from "next/router";

export default function Admin() {
  const [displaySolutionsForm, setDisplaySolutionsForm] = useState(false);
  const { permissionControl, setPermissionControl } = useContext(StateContext);

  useEffect(() => {
    if (permissionControl !== "admin") {
      Router.push("/portal");
    } else {
      setDisplaySolutionsForm(true);
    }
  }, [permissionControl]);

  return (
    <div className={classes.container}>
      {displaySolutionsForm && <SolutionsForm />}
    </div>
  );
}
