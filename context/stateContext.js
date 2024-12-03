import { useState, createContext } from "react";
export const StateContext = createContext();

export const StateProvider = (props) => {
  const [language, setLanguage] = useState(null);
  const [languageType, setLanguageType] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [editSolution, setEditSolution] = useState(null);
  const [editNews, setEditNews] = useState(null);
  const [editJobs, setEditJobs] = useState(null);
  const [menuMobile, setMenuMobile] = useState(false);
  const [menuColor, setMenuColor] = useState({});
  const [displayMenu, setDisplayMenu] = useState(true);
  const [displayFooter, setFooter] = useState(true);
  const [screenSize, setScreenSize] = useState(
    "desktop" || "tablet-landscape" || "tablet-portrait" || "mobile"
  );
  const [solutionsCategory, setSolutionsCategory] = useState("all");
  const [heroHeight, setHeroHeight] = useState(null);
  const [permissionControl, setPermissionControl] = useState("user" || "admin");
  const [navigationTopBar, setNavigationTopBar] = useState([
    {
      title: {
        fa: "راه‌کارها",
        en: "SOLUTIONS",
      },
      link: "/solutions",
      active: false,
    },
    {
      title: {
        fa: "درباره ما",
        en: "ABOUT US",
      },
      link: "/about",
      active: false,
    },
    {
      title: {
        fa: "چه می‌کنیم",
        en: "WHAT WE DO",
      },
      link: "/profession",
      active: false,
    },
    {
      title: {
        fa: "اخبار",
        en: "NEWS",
      },
      link: "/news",
      active: false,
    },
    {
      title: {
        fa: "تماس با ما",
        en: "CONTACT US",
      },
      link: "/contact",
      active: false,
    },
    {
      title: {
        fa: "",
        en: "",
      },
      link: "/search",
      active: false,
    },
  ]);

  const stateContext = {
    language,
    setLanguage,
    languageType,
    setLanguageType,
    menuMobile,
    setMenuMobile,
    navigationTopBar,
    setNavigationTopBar,
    currentUser,
    setCurrentUser,
    screenSize,
    setScreenSize,
    menuColor,
    setMenuColor,
    displayMenu,
    setDisplayMenu,
    displayFooter,
    setFooter,
    permissionControl,
    setPermissionControl,
    editSolution,
    setEditSolution,
    editNews,
    setEditNews,
    editJobs,
    setEditJobs,
    heroHeight,
    setHeroHeight,
    solutionsCategory,
    setSolutionsCategory,
  };
  return (
    <StateContext.Provider value={stateContext}>
      {props.children}
    </StateContext.Provider>
  );
};
