import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import ImageSlider from "@/components/ImageSlider";
import CardGrid from "@/components/CardGrid";
import classes from "./home.module.scss";
import Router from "next/router";
import one from "@/assets/one.jpg";
import two from "@/assets/two.jpg";
import three from "@/assets/three.jpg";

export default function Home() {
  const { screenSize, setScreenSize } = useContext(StateContext);

  const sliderData = [
    {
      image: one,
      title: "yoyo1 خشکبار و حبوبات کوروش",
      description:
        "کمپین تلویزیونی  تخمه های آفتاب گردان لانچ و معرفی کرم  تخمه های آفتاب گردان لانچ و معرفی کرم تخمه های ",
      type: "image",
    },
    {
      image: two,
      title: "yoyo2 آریان کیمیا",
      description: "کمپین لانچ و معرفی کرم آبرسان گیاهی شون",
      type: "video",
    },
    {
      image: three,
      title: "yoyo3 ایران",
      description: "طراحی بسته‌بندی لانچ و معرفی کرم آبرسان گیاهی نوروز",
      type: "image",
    },
    {
      image: two,
      title: "yoyo4 خشکبار و حبوبات کوروش",
      description:
        "کمپین تلویزیونی تخمه های  لانچ و معرفی کرم آبرسان گیاهی آفتاب گردان نات",
      type: "video",
    },
    {
      image: three,
      title: "yoyo5 آریان کیمیا",
      description:
        "کمپین لانچ و معرفی کرم لانچ و معرفی کرم آبرسان گیاهی آبرسان گیاهی شون",
      type: "image",
    },
    {
      image: three,
      title: "yoyo6 ایران",
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

  const divideArray = (array) => {
    const dividedArrays = [];
    let chunkLength = screenSize === "desktop" ? 5 : 4;
    let index = 0;
    while (index < array.length) {
      dividedArrays.push(array.slice(index, index + chunkLength));
      index += chunkLength;
    }
    return dividedArrays;
  };

  return (
    <Fragment>
      <section>
        <ImageSlider sliderData={sliderData} />
      </section>
      <section className={classes.gridWorks}>
        <CardGrid projects={divideArray(sliderData)[0]} direction={true} />
        <CardGrid projects={divideArray(sliderData)[1]} direction={false} />
        <CardGrid projects={divideArray(sliderData)[2]} direction={true} />
        <CardGrid projects={divideArray(sliderData)[3]} direction={false} />
        <CardGrid projects={divideArray(sliderData)[4]} direction={true} />
        <CardGrid projects={divideArray(sliderData)[5]} direction={false} />
        <CardGrid projects={divideArray(sliderData)[6]} direction={true} />
        <CardGrid projects={divideArray(sliderData)[7]} direction={false} />
      </section>
      <div className={classes.message} onClick={() => Router.push("/works")}>
        <h3>مشاهده همه پروژه‌ها</h3>
      </div>
    </Fragment>
  );
}
