import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import classes from "./works.module.scss";
import Image from "next/legacy/image";
import one from "@/assets/one.jpg";
import two from "@/assets/two.jpg";
import three from "@/assets/three.jpg";

export default function Works() {
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);

  const [category, setCategory] = useState(
    "advertising" || "digital" || "media" || "all"
  );
  const [type, setType] = useState("client" || "work" || "project");

  const router = useRouter();
  let pathname = router.pathname;

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

  useEffect(() => {
    navigationTopBar.map((nav) => {
      if (pathname.includes(nav.link)) {
        nav.active = true;
      } else {
        nav.active = false;
      }
    });
    setNavigationTopBar([...navigationTopBar]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.categoryContainer}>
        <h1>پروژه</h1>
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
      <div className={classes.typeContainer}>
        <div className={classes.type}>
          <p
            className={type === "client" ? classes.navActive : classes.nav}
            onClick={() => {
              setType("client");
            }}
          >
            نوع کارفرما
          </p>
          <p
            className={type === "work" ? classes.navActive : classes.nav}
            onClick={() => {
              setType("work");
            }}
          >
            نوع کار
          </p>
          <p
            className={type === "project" ? classes.navActive : classes.nav}
            onClick={() => {
              setType("project");
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
