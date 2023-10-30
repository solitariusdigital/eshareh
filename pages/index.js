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
  const { language, setLanguage } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);

  const sliderData = [
    {
      fa: {
        image: two,
        title: "صنعت خشکبار و حبوبات کوروش",
        description:
          "تلویزیونی تخمه های آفتاب گردان کمپین  تلویزیونی تخمه های آفتاب گردان تلویزیونی تخمه های آفتاب گردان وی نات",
        type: "image",
      },
      en: {
        image: two,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
    },
    {
      fa: {
        image: one,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "طراحی بسته‌بندی لانچ و معرفی کرم آبرسان گیاهی نوروز",
        type: "video",
      },
      en: {
        image: one,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "video",
      },
    },
    {
      fa: {
        image: three,
        title: "شرکت آریان کیمیا",
        description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
        type: "image",
      },
      en: {
        image: three,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
    },
    {
      fa: {
        image: two,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
        type: "image",
      },
      en: {
        image: two,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
    },
    {
      fa: {
        image: one,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "طراحی بسته‌بندی لانچ و معرفی کرم آبرسان گیاهی نوروز",
        type: "video",
      },
      en: {
        image: one,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "video",
      },
    },
    {
      fa: {
        image: two,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
        type: "image",
      },
      en: {
        image: two,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
    },
    {
      fa: {
        image: one,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "طراحی بسته‌بندی لانچ و معرفی کرم آبرسان گیاهی نوروز",
        type: "image",
      },
      en: {
        image: one,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
    },
    {
      fa: {
        image: three,
        title: "شرکت آریان کیمیا",
        description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
        type: "image",
      },
      en: {
        image: three,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
    },
    {
      fa: {
        image: two,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
        type: "image",
      },
      en: {
        image: two,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
    },
    {
      fa: {
        image: one,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "طراحی بسته‌بندی لانچ و معرفی کرم آبرسان گیاهی نوروز",
        type: "image",
      },
      en: {
        image: one,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
    },
    {
      fa: {
        image: two,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
        type: "image",
      },
      en: {
        image: two,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
    },
    {
      fa: {
        image: one,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "طراحی بسته‌بندی لانچ و معرفی کرم آبرسان گیاهی نوروز",
        type: "image",
      },
      en: {
        image: one,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
    },
    {
      fa: {
        image: three,
        title: "شرکت آریان کیمیا",
        description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
        type: "image",
      },
      en: {
        image: three,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
    },
    {
      fa: {
        image: two,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
        type: "image",
      },
      en: {
        image: two,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
    },
    {
      fa: {
        image: one,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "طراحی بسته‌بندی لانچ و معرفی کرم آبرسان گیاهی نوروز",
        type: "image",
      },
      en: {
        image: one,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
    },
    {
      fa: {
        image: two,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
        type: "image",
      },
      en: {
        image: two,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
    },
    {
      fa: {
        image: one,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "طراحی بسته‌بندی لانچ و معرفی کرم آبرسان گیاهی نوروز",
        type: "image",
      },
      en: {
        image: one,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
    },
    {
      fa: {
        image: three,
        title: "شرکت آریان کیمیا",
        description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
        type: "image",
      },
      en: {
        image: three,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
    },
    {
      fa: {
        image: two,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
        type: "image",
      },
      en: {
        image: two,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
    },
    {
      fa: {
        image: one,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "طراحی بسته‌بندی لانچ و معرفی کرم آبرسان گیاهی نوروز",
        type: "image",
      },
      en: {
        image: one,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
    },
    {
      fa: {
        image: two,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
        type: "image",
      },
      en: {
        image: two,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
    },
    {
      fa: {
        image: one,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "طراحی بسته‌بندی لانچ و معرفی کرم آبرسان گیاهی نوروز",
        type: "image",
      },
      en: {
        image: one,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
    },
    {
      fa: {
        image: three,
        title: "شرکت آریان کیمیا",
        description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
        type: "image",
      },
      en: {
        image: three,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
    },
    {
      fa: {
        image: two,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
        type: "image",
      },
      en: {
        image: two,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
    },
    {
      fa: {
        image: one,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "طراحی بسته‌بندی لانچ و معرفی کرم آبرسان گیاهی نوروز",
        type: "image",
      },
      en: {
        image: one,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
    },
    {
      fa: {
        image: two,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
        type: "image",
      },
      en: {
        image: two,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
    },
    {
      fa: {
        image: one,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "طراحی بسته‌بندی لانچ و معرفی کرم آبرسان گیاهی نوروز",
        type: "image",
      },
      en: {
        image: one,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
    },
    {
      fa: {
        image: three,
        title: "شرکت آریان کیمیا",
        description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
        type: "image",
      },
      en: {
        image: three,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
    },
    {
      fa: {
        image: two,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
        type: "image",
      },
      en: {
        image: two,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
    },
    {
      fa: {
        image: one,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "طراحی بسته‌بندی لانچ و معرفی کرم آبرسان گیاهی نوروز",
        type: "image",
      },
      en: {
        image: one,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
    },
    {
      fa: {
        image: two,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
        type: "image",
      },
      en: {
        image: two,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
    },
    {
      fa: {
        image: one,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "طراحی بسته‌بندی لانچ و معرفی کرم آبرسان گیاهی نوروز",
        type: "image",
      },
      en: {
        image: one,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
    },
    {
      fa: {
        image: three,
        title: "شرکت آریان کیمیا",
        description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
        type: "image",
      },
      en: {
        image: three,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
    },
    {
      fa: {
        image: two,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
        type: "image",
      },
      en: {
        image: two,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
    },
    {
      fa: {
        image: one,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "طراحی بسته‌بندی لانچ و معرفی کرم آبرسان گیاهی نوروز",
        type: "image",
      },
      en: {
        image: one,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
    },
    {
      fa: {
        image: two,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
        type: "image",
      },
      en: {
        image: two,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
    },
    {
      fa: {
        image: one,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "طراحی بسته‌بندی لانچ و معرفی کرم آبرسان گیاهی نوروز",
        type: "image",
      },
      en: {
        image: one,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
    },
    {
      fa: {
        image: three,
        title: "شرکت آریان کیمیا",
        description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
        type: "image",
      },
      en: {
        image: three,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
    },
    {
      fa: {
        image: two,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
        type: "image",
      },
      en: {
        image: two,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
    },
    {
      fa: {
        image: one,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "طراحی بسته‌بندی لانچ و معرفی کرم آبرسان گیاهی نوروز",
        type: "image",
      },
      en: {
        image: one,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        type: "image",
      },
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
        <ImageSlider sliderData={sliderData.slice(0, 8)} />
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
      <div className={classes.message} onClick={() => Router.push("/work")}>
        {language ? <h3>مشاهده همه پروژه‌ها</h3> : <h3>View all works</h3>}
      </div>
    </Fragment>
  );
}
