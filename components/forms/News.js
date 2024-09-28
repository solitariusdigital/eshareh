import React from "react";
import classes from "./Form.module.scss";
import building from "@/assets/building.png";
import Image from "next/legacy/image";

export default function News() {
  return (
    <div className={classes.building}>
      <Image
        width={50}
        height={50}
        src={building}
        alt="building"
        as="image"
        unoptimized
      />
    </div>
  );
}
