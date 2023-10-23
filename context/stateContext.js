import { useState, createContext } from "react";
export const StateContext = createContext();

export const StateProvider = (props) => {
  const [language, setLanguage] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [menuMobile, setMenuMobile] = useState(false);
  const [menuColor, setMenuColor] = useState({
    text: "#1b1b1b",
    background: "#ffffff",
  });
  const [displayMenu, setDisplayMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(
    "desktop" || "tablet" || "mobile"
  );
  const [navigationTopBar, setNavigationTopBar] = useState([
    {
      titleFa: "",
      titleEn: "",
      link: "/search",
      active: false,
    },
    {
      titleFa: "پروژه‌ها",
      titleEn: "Work",
      link: "/work",
      active: false,
    },
    // {
    //   titleFa: "اخبار",
    //   titleEn: "News",
    //   link: "/news",
    //   active: false,
    // },
    {
      titleFa: "درباره",
      titleEn: "About",
      link: "/about",
      active: false,
    },
    {
      titleFa: "تماس",
      titleEn: "Contact",
      link: "/contact",
      active: false,
    },
  ]);

  const stateContext = {
    language,
    setLanguage,
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
  };
  return (
    <StateContext.Provider value={stateContext}>
      {props.children}
    </StateContext.Provider>
  );
};
