import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import classes from "./solutions.module.scss";
import Image from "next/legacy/image";
import one from "@/assets/one.jpg";
import two from "@/assets/two.jpg";
import three from "@/assets/three.jpg";
import Router from "next/router";
import { replaceSpacesAndHyphens, enToFaDigits } from "@/services/utility";

export default function Solutions() {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const [category, setCategory] = useState(
    "advertising" || "media" || "digital"
  );
  const [type, setType] = useState("customer" || "sector" || "all");

  const router = useRouter();
  let pathname = router.pathname;

  const works = [
    {
      fa: {
        image: one,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "کمپین  تلویزیونی تخمه های آفتاب گردان وی نات",
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
        description: "کمپین  تلویزیونی تخمه های آفتاب گردان وی نات",
        category: "consulting",
        sector: "برند",
        customerType: "بانکداری",
      },
      en: {
        image: one,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        category: "consulting",
        sector: "Brand",
        customerType: "Banking",
      },
    },
    {
      fa: {
        image: one,
        title: "صنعت خشکبار و حبوبات کوروش",
        description: "کمپین  تلویزیونی تخمه های آفتاب گردان وی نات",
        category: "health",
        sector: "برند",
        customerType: "هنر",
      },
      en: {
        image: one,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        category: "health",
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
        category: "advertising",
        sector: "نشانه",
        customerType: "بانکداری",
      },
      en: {
        image: three,
        title: "Lorem ipsum is placeholder ",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts",
        category: "advertising",
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
    { name: "advertising", labelFa: "تبلیغات", labelEn: "Advertising" },
    { name: "media", labelFa: "رسانه", labelEn: "Media" },
    { name: "digital", labelFa: "دیجیتال", labelEn: "Digital" },
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
    const { title } = item;
    Router.push(`/solutions/${replaceSpacesAndHyphens(title)}`);
  };

  return (
    <div className={classes.container}>
      <div className={classes.category}>
        {categories.map((item, index) => (
          <p
            key={item.name}
            className={category === item.name ? classes.navActive : classes.nav}
            onClick={() => {
              setCategory(item.name);
            }}
          >
            {language ? item.labelFa : item.labelEn}
            {index !== 2 && <span>/</span>}
          </p>
        ))}
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
            const { image, title } = item;
            return (
              <Fragment key={index}>
                {image && (
                  <div
                    className={classes.item}
                    onClick={() => directCategory(item)}
                  >
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
                    <div
                      className={
                        language
                          ? classes.information
                          : classes.informationReverse
                      }
                    >
                      <h3>{title}</h3>
                    </div>
                  </div>
                )}
              </Fragment>
            );
          })}
      </section>
    </div>
  );
}
