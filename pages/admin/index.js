import { useState } from "react";
import classes from "./admin.module.scss";
import SolutionsForm from "@/components/SolutionsForm";

export default function Admin() {
  return (
    <div className={classes.container}>
      <SolutionsForm />
    </div>
  );
}
