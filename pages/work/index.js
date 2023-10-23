import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import classes from "./work.module.scss";
import Image from "next/legacy/image";
import one from "@/assets/one.jpg";
import two from "@/assets/two.jpg";
import three from "@/assets/three.jpg";
import Router from "next/router";
import { replaceSpacesAndHyphens } from "@/services/utility";

export default function Work() {
  const { language, setLanguage } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const [category, setCategory] = useState(
    "advertising" || "digital" || "media"
  );
  const [type, setType] = useState("customer" || "sector" || "all");

  const router = useRouter();
  let pathname = router.pathname;

  const works = [
    {
      image: one,
      title: "صنعت خشکبار و حبوبات کوروش",
      description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
      category: "advertising",
      sector: "Brand",
      customerType: "Art",
    },

    {
      image: two,
      title: "شرکت آریان کیمیا تک",
      description: "کمپین لانچ و معرفی کرم آبرسان گیاهی شون",
      category: "advertising",
      sector: "Sign",
      customerType: "Banking",
    },
    {
      image: one,
      title: "صنعت خشکبار و حبوبات کوروش",
      description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
      category: "digital",
      sector: "Sign",
      customerType: "Art",
    },
    {
      image: two,
      title: "شرکت آریان کیمیا تک",
      description: "کمپین لانچ و معرفی کرم آبرسان گیاهی شون",
      category: "advertising",
      sector: "Sign",
      customerType: "Banking",
    },
    {
      image: two,
      title: "شرکت آریان کیمیا تک",
      description: "کمپین لانچ و معرفی کرم آبرسان گیاهی شون",
      category: "media",
      sector: "Sign",
      customerType: "Design",
    },
    {
      image: three,
      title: "نستله ایران",
      description: "طراحی بسته‌بندی نوروز",
      category: "advertising",
      sector: "Digital",
      customerType: "Design",
    },
    {
      image: one,
      title: "صنعت خشکبار و حبوبات کوروش",
      description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
      category: "digital",
      sector: "Industrial",
      customerType: "Education",
    },
    {
      image: one,
      title: "صنعت خشکبار و حبوبات کوروش",
      description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
      category: "advertising",
      sector: "Architecture",
      customerType: "Education",
    },
    {
      image: three,
      title: "شرکت آریان کیمیا تک",
      description: "کمپین لانچ و معرفی کرم آبرسان گیاهی شون",
      category: "advertising",
      sector: "Architecture",
      customerType: "Food",
    },
    {
      image: one,
      title: "صنعت خشکبار و حبوبات کوروش",
      description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
      category: "advertising",
      sector: "Industrial",
      customerType: "Food",
    },
  ];

  const categories = [
    { name: "advertising", labelFa: "تبلیغات", labelEn: "Advertisement" },
    { name: "digital", labelFa: "دیجیتال", labelEn: "Digital" },
    { name: "media", labelFa: "رسانه", labelEn: "Media" },
  ];
  const types = [
    { name: "customer", labelFa: "نوع مشتری", labelEn: "Client type" },
    { name: "sector", labelFa: "نوع کار", labelEn: "Work type" },
    { name: "all", labelFa: "همه", labelEn: "All works" },
  ];

  useEffect(() => {
    document.body.style.background = "#ffffff";
  }, []);

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

  const filterUniqueWorks = () => {
    const uniqueWorks = [];
    works.forEach((work) => {
      switch (type) {
        case "all":
          uniqueWorks.push(work);
          break;
        case "customer":
          if (
            !uniqueWorks.some(
              (uniqueWork) =>
                uniqueWork.customerType === work.customerType &&
                uniqueWork.category === work.category
            )
          ) {
            uniqueWorks.push(work);
          }
          break;
        case "sector":
          if (
            !uniqueWorks.some(
              (uniqueWork) =>
                uniqueWork.sector === work.sector &&
                uniqueWork.category === work.category
            )
          ) {
            uniqueWorks.push(work);
          }
          break;
      }
    });
    return uniqueWorks;
  };

  const directCategory = (item) => {
    const { title, customerType, sector } = item;
    switch (type) {
      case "all":
        Router.push(`/work/${replaceSpacesAndHyphens(title)}`);
        break;
      case "customer":
        Router.push(`/work/customer/${replaceSpacesAndHyphens(customerType)}`);
        break;
      case "sector":
        Router.push(`/work/sector/${replaceSpacesAndHyphens(sector)}`);
        break;
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.categoryContainer}>
        <h1>{language ? "پروژه‌ها" : "Work"}</h1>
        <div className={classes.category}>
          {categories.map((item) => (
            <p
              key={item.name}
              className={
                category === item.name ? classes.navActive : classes.nav
              }
              onClick={() => {
                setCategory(item.name);
              }}
            >
              {language ? item.labelFa : item.labelEn}
            </p>
          ))}
        </div>
      </div>
      <div className={classes.typeContainer}>
        <div className={classes.type}>
          {types.map((item) => (
            <p
              key={item.name}
              className={type === item.name ? classes.navActive : classes.nav}
              onClick={() => {
                setType(item.name);
              }}
            >
              {language ? item.labelFa : item.labelEn}
            </p>
          ))}
        </div>
      </div>
      <section
        key={category}
        className={`${classes.gridList} ${
          screenSize === "desktop"
            ? "animate__animated animate__slideInRight"
            : "animate__animated animate__fadeIn"
        }`}
      >
        {filterUniqueWorks()
          .filter((item) => item.category === category || category === "all")
          .map((item, index) => {
            const { customerType, sector, image, title } = item;
            return (
              <Fragment key={index}>
                {image && (
                  <div
                    className={classes.item}
                    onClick={() => directCategory(item)}
                  >
                    {type === "customer" && (
                      <div className={classes.title}>
                        <h2>{customerType}</h2>
                        <p>
                          {
                            works.filter(
                              (work) =>
                                customerType === work.customerType &&
                                item.category === work.category
                            ).length
                          }
                        </p>
                      </div>
                    )}
                    {type === "sector" && (
                      <div className={classes.title}>
                        <h2>{sector}</h2>
                        <p>
                          {
                            works.filter(
                              (work) =>
                                sector === work.sector &&
                                item.category === work.category
                            ).length
                          }
                        </p>
                      </div>
                    )}
                    <div className={classes.box}>
                      <Image
                        className={classes.image}
                        src={image}
                        placeholder="blur"
                        blurDataURL={image}
                        alt={title}
                        layout="fill"
                        objectFit="cover"
                        priority
                      />
                    </div>
                    {type === "all" && <h3>{title}</h3>}
                  </div>
                )}
              </Fragment>
            );
          })}
      </section>
    </div>
  );
}
