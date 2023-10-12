import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./work.module.scss";
import Image from "next/legacy/image";
import one from "@/assets/one.jpg";
import two from "@/assets/two.jpg";
import three from "@/assets/three.jpg";

export default function Work() {
  const { screenSize, setScreenSize } = useContext(StateContext);

  const [category, setCategory] = useState(
    "advertising" || "digital" || "media" || "all"
  );
  const [type, setType] = useState("client" || "work" || "all");

  const works = [
    {
      image: one,
      title: "صنعت خشکبار و حبوبات کوروش",
      project: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
      category: "advertising",
    },
    {
      image: two,
      title: "شرکت آریان کیمیا تک",
      project: "کمپین لانچ و معرفی کرم آبرسان گیاهی شون",
      category: "digital",
    },
    {
      image: three,
      title: "نستله ایران",
      project: "طراحی بسته‌بندی نوروز",
      category: "advertising",
    },
    {
      image: one,
      title: "صنعت خشکبار و حبوبات کوروش",
      project: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
      category: "media",
    },
    {
      image: two,
      title: "شرکت آریان کیمیا تک",
      project: "کمپین لانچ و معرفی کرم آبرسان گیاهی شون",
      category: "media",
    },
  ];

  return (
    <div className={classes.container}>
      <div className={classes.categoryContainer}>
        <div className={classes.category}>
          <p
            className={
              category === "advertising" ? classes.navActive : classes.nav
            }
            onClick={() => {
              setCategory("advertising");
            }}
          >
            تبلیغات
          </p>
          <p
            className={category === "digital" ? classes.navActive : classes.nav}
            onClick={() => {
              setCategory("digital");
            }}
          >
            دیجیتال
          </p>
          <p
            className={category === "media" ? classes.navActive : classes.nav}
            onClick={() => {
              setCategory("media");
            }}
          >
            رسانه
          </p>
          <p
            className={category === "all" ? classes.navActive : classes.nav}
            onClick={() => {
              setCategory("all");
            }}
          >
            همه
          </p>
        </div>
      </div>
      <section
        key={category}
        className={`${classes.list} ${
          screenSize === "desktop"
            ? "animate__animated animate__slideInRight"
            : "animate__animated animate__fadeIn"
        }`}
      >
        {works
          .filter((item) => item.category === category || category === "all")
          .map((item, index) => (
            <Fragment key={index}>
              {item.image && (
                <div className={classes.item}>
                  <h2>{item.title}</h2>
                  <div className={classes.box}>
                    <Image
                      className={classes.image}
                      src={item.image}
                      placeholder="blur"
                      blurDataURL={item.image}
                      alt="image"
                      layout="fill"
                      objectFit="cover"
                      priority
                    />
                  </div>
                </div>
              )}
            </Fragment>
          ))}
      </section>
    </div>
  );
}
