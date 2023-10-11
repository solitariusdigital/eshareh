import { useState, useContext, Fragment, useEffect } from "react";
import ImageSlider from "@/components/ImageSlider";
import one from "@/assets/one.jpg";
import two from "@/assets/two.jpg";
import three from "@/assets/three.jpg";

export default function Home() {
  const sliderData = [
    {
      image: one,
      title: "صنعت خشکبار و حبوبات کوروش",
      project: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
    },
    {
      image: two,
      title: "شرکت آریان کیمیا تک",
      project: "کمپین لانچ و معرفی کرم آبرسان گیاهی شون",
    },
    {
      image: three,
      title: "نستله ایران",
      project: "طراحی بسته‌بندی نوروز",
    },
  ];

  return (
    <Fragment>
      <ImageSlider sliderData={sliderData} />
    </Fragment>
  );
}
