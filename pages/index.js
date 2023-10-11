import { useState, useContext, Fragment, useEffect } from "react";
import ImageSlider from "@/components/ImageSlider";
import one from "@/assets/one.jpg";
import two from "@/assets/two.jpg";
import three from "@/assets/three.jpg";

export default function Home() {
  const sliderData = [
    {
      image: one,
    },
    {
      image: two,
    },
    {
      image: three,
    },
    {
      image: one,
    },
    {
      image: two,
    },
    {
      image: three,
    },
  ];

  return (
    <Fragment>
      <ImageSlider sliderData={sliderData} />
    </Fragment>
  );
}
