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
      description:
        "کمپین تلویزیونی  تخمه های آفتاب گردان لانچ و معرفی کرم  تخمه های آفتاب گردان لانچ و معرفی کرم تخمه های ",
      type: "image",
    },
    {
      image: two,
      title: "شرکت آریان کیمیا",
      description: "کمپین لانچ و معرفی کرم آبرسان گیاهی شون",
      type: "video",
    },
    {
      image: three,
      title: "نستله ایران",
      description: "طراحی بسته‌بندی لانچ و معرفی کرم آبرسان گیاهی نوروز",
      type: "image",
    },
    {
      image: two,
      title: "صنعت خشکبار و حبوبات کوروش",
      description:
        "کمپین تلویزیونی تخمه های  لانچ و معرفی کرم آبرسان گیاهی آفتاب گردان نات",
      type: "video",
    },
    {
      image: three,
      title: "شرکت آریان کیمیا",
      description:
        "کمپین لانچ و معرفی کرم لانچ و معرفی کرم آبرسان گیاهی آبرسان گیاهی شون",
      type: "image",
    },
  ];

  return (
    <Fragment>
      <section>
        <ImageSlider sliderData={sliderData} />
      </section>
      <section className={classes.gridWorks}>
        <CardGrid projects={sliderData} direction={true} />
        <CardGrid projects={sliderData} direction={false} />
        <CardGrid projects={sliderData} direction={true} />
        <CardGrid projects={sliderData} direction={false} />
        <CardGrid projects={sliderData} direction={true} />
        <CardGrid projects={sliderData} direction={false} />
      </section>
      <div className={classes.message} onClick={() => Router.push("/works")}>
        <h3>مشاهده همه پروژه ها </h3>
      </div>
    </Fragment>
  );
}
