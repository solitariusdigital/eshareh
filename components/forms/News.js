import React from "react";
import ConstructionIcon from "@mui/icons-material/Construction";
import classes from "./Form.module.scss";

export default function News() {
  return (
    <div className={classes.build}>
      <ConstructionIcon sx={{ fontSize: 50 }} />
    </div>
  );
}
