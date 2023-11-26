import { useState, createContext } from "react";
export const StateContext = createContext();

export const StateProvider = (props) => {
  const [language, setLanguage] = useState(true);
  const [languageType, setLanguageType] = useState("fa");
  const [currentUser, setCurrentUser] = useState(null);
  const [menuMobile, setMenuMobile] = useState(false);
  const [menuColor, setMenuColor] = useState({
    text: "#1b1b1b",
    background: "#ffffff",
  });
  const [displayMenu, setDisplayMenu] = useState(true);
  const [displayFooter, setFooter] = useState(true);
  const [screenSize, setScreenSize] = useState(
    "desktop" || "tablet" || "mobile"
  );
  const [navigationTopBar, setNavigationTopBar] = useState([
    {
      title: {
        fa: "راه حل‌ها",
        en: "SOLUTIONS",
      },
      link: "/solutions",
      active: false,
    },
    {
      title: {
        fa: "درباره",
        en: "ABOUT",
      },
      link: "/about",
      active: false,
    },
    {
      title: {
        fa: "حرفه ما",
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
        fa: "تماس",
        en: "CONTACT",
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
  };
  return (
    <StateContext.Provider value={stateContext}>
      {props.children}
    </StateContext.Provider>
  );
};
