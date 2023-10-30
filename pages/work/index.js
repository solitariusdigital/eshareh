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
  const { languageType, setLanguageType } = useContext(StateContext);
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
      fa: {
        image: one,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
        category: "advertising",
        sector: "برند",
        customerType: "هنر",
      },
      en: {
        image: one,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        category: "advertising",
        sector: "Brand",
        customerType: "Art",
      },
    },
    {
      fa: {
        image: one,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
        category: "advertising",
        sector: "برند",
        customerType: "هنر",
      },
      en: {
        image: one,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        category: "advertising",
        sector: "Brand",
        customerType: "Art",
      },
    },
    {
      fa: {
        image: two,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
        category: "media",
        sector: "نشانه",
        customerType: "بانکداری",
      },
      en: {
        image: two,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        category: "media",
        sector: "Sign",
        customerType: "Banking",
      },
    },
    {
      fa: {
        image: three,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
        category: "media",
        sector: "نشانه",
        customerType: "هنر",
      },
      en: {
        image: three,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        category: "media",
        sector: "Sign",
        customerType: "Art",
      },
    },
    {
      fa: {
        image: one,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
        category: "media",
        sector: "نشانه",
        customerType: "بانکداری",
      },
      en: {
        image: one,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        category: "media",
        sector: "Sign",
        customerType: "Banking",
      },
    },
    {
      fa: {
        image: one,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
        category: "media",
        sector: "نشانه",
        customerType: "هنر",
      },
      en: {
        image: one,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        category: "media",
        sector: "Sign",
        customerType: "Art",
      },
    },
    {
      fa: {
        image: two,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
        category: "advertising",
        sector: "نشانه",
        customerType: "طرح",
      },
      en: {
        image: two,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        category: "advertising",
        sector: "Sign",
        customerType: "Design",
      },
    },
    {
      fa: {
        image: three,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
        category: "digital",
        sector: "دیجیتال",
        customerType: "طرح",
      },
      en: {
        image: three,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        category: "digital",
        sector: "Digital",
        customerType: "Design",
      },
    },
    {
      fa: {
        image: one,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
        category: "media",
        sector: "صنعتی",
        customerType: "تحصیلات",
      },
      en: {
        image: one,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        category: "media",
        sector: "Industrial",
        customerType: "Education",
      },
    },
    {
      fa: {
        image: two,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "کمپین تلویزیونی تخمه های آفتاب گردان وی نات",
        category: "digital",
        sector: "معماری",
        customerType: "غذا",
      },
      en: {
        image: two,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        category: "digital",
        sector: "Architecture",
        customerType: "Food",
      },
    },
  ];

  const categories = [
    { name: "advertising", labelFa: "تبلیغات", labelEn: "Advertisement" },
    { name: "digital", labelFa: "دیجیتال", labelEn: "Digital" },
    { name: "media", labelFa: "رسانه", labelEn: "Media" },
  ];
  const types = [
    { name: "customer", labelFa: "نوع مشتری", labelEn: "Client Type" },
    { name: "sector", labelFa: "نوع کار", labelEn: "Work Type" },
    { name: "all", labelFa: "همه", labelEn: "All Work" },
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
      const { customerType, sector } = work[languageType];
      let isUnique = true;
      switch (type) {
        case "all":
          isUnique = !uniqueWorks.some(
            (uniqueWork) =>
              uniqueWork.customerType === customerType &&
              uniqueWork.sector === sector &&
              uniqueWork.category === category
          );
          break;
        case "customer":
          isUnique = !uniqueWorks.some(
            (uniqueWork) =>
              uniqueWork.customerType === customerType &&
              uniqueWork.category === category
          );
          break;
        case "sector":
          isUnique = !uniqueWorks.some(
            (uniqueWork) =>
              uniqueWork.sector === sector && uniqueWork.category === category
          );
          break;
      }
      if (isUnique) {
        uniqueWorks.push(work[languageType]);
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
        <h1 className={language ? classes.title : classes.titleReverse}>
          {language ? "پروژه‌ها" : "Work"}
        </h1>
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
                      <div
                        className={
                          language
                            ? classes.information
                            : classes.informationReverse
                        }
                      >
                        <h2>{customerType}</h2>
                        <p>
                          {
                            works.filter(
                              (work) =>
                                customerType ===
                                  work[languageType].customerType &&
                                item.category === work[languageType].category
                            ).length
                          }
                        </p>
                      </div>
                    )}
                    {type === "sector" && (
                      <div
                        className={
                          language
                            ? classes.information
                            : classes.informationReverse
                        }
                      >
                        <h2>{sector}</h2>
                        <p>
                          {
                            works.filter(
                              (work) =>
                                sector === work[languageType].sector &&
                                item.category === work[languageType].category
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
