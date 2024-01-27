import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./admin.module.scss";
import SolutionsForm from "@/components/SolutionsForm";
import TeamForm from "@/components/TeamForm";
import CoverForm from "@/components/CoverForm";
import Router from "next/router";

export default function Admin() {
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { language, setLanguage } = useContext(StateContext);
  const [formType, setFormType] = useState("solutions" || "team") || "cover";
  const types = ["solutions", "team", "cover"];

  useEffect(() => {
    if (permissionControl !== "admin") {
      Router.push("/portal");
    } else {
      setFormType("solutions");
    }
  }, [permissionControl, setFormType]);

  return (
    <div className={classes.container}>
      <div
        className={classes.types}
        style={{
          fontFamily: language ? "English" : "English",
        }}
      >
        {types.map((type, index) => (
          <p
            key={index}
            className={formType === type ? classes.navActive : classes.nav}
            onClick={() => setFormType(type)}
          >
            {type}
          </p>
        ))}
      </div>
      {formType === "solutions" && <SolutionsForm />}
      {formType === "team" && <TeamForm />}
      {formType === "cover" && <CoverForm />}
    </div>
  );
}
