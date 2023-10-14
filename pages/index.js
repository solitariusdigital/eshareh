import { useState, useContext, Fragment, useEffect } from "react";
import ImageSlider from "@/components/ImageSlider";
import CardGrid from "@/components/CardGrid";
import classes from "./home.module.scss";
import Router from "next/router";
import one from "@/assets/one.jpg";
import two from "@/assets/two.jpg";
import three from "@/assets/three.jpg";

export default function Home() {
  const sliderData = [
    {
      image: one,
      title: "صنعت خشکبار و حبوبات کوروش",
      project: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
      type: "image",
    },
    {
      image: two,
      title: "شرکت آریان کیمیا تک",
      project: "کمپین لانچ و معرفی کرم آبرسان گیاهی شون",
      type: "video",
    },
    {
      image: three,
      title: "نستله ایران",
      project: "طراحی بسته‌بندی نوروز",
      type: "image",
    },
    {
      image: one,
      title: "صنعت خشکبار و حبوبات کوروش",
      project: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
      type: "video",
    },
    {
      image: two,
      title: "شرکت آریان کیمیا تک",
      project: "کمپین لانچ و معرفی کرم آبرسان گیاهی شون",
      type: "image",
    },
    {
      image: three,
      title: "نستله ایران",
      project: "طراحی بسته‌بندی نوروز",
      type: "image",
    },
  ];

  return (
    <Fragment>
      <section>
        <ImageSlider sliderData={sliderData} />
      </section>
      <section className={classes.gridWorks}>
        <CardGrid direction={true} />
        <CardGrid direction={false} />
        <CardGrid direction={true} />
        <CardGrid direction={false} />
        <CardGrid direction={true} />
        <CardGrid direction={false} />
      </section>
      <div className={classes.message} onClick={() => Router.push("/works")}>
        <h3>مشاهده همه پروژه ها </h3>
      </div>
    </Fragment>
  );
}
