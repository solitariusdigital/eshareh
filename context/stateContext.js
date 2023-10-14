import { useState, createContext } from "react";
export const StateContext = createContext();

export const StateProvider = (props) => {
  // application user context
  const [appUsers, setAppUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [menuMobile, setMenuMobile] = useState(false);
  const [screenSize, setScreenSize] = useState(
    "desktop" || "tablet" || "mobile"
  );
  const [navigationTopBar, setNavigationTopBar] = useState([
    {
      title: "",
      link: "/search",
      active: false,
    },
    {
      title: "پروژه",
      link: "/works",
      active: false,
    },
    {
      title: "درباره",
      link: "/about",
      active: false,
    },
    {
      title: "اخبار",
      link: "/news",
      active: false,
    },
    {
      title: "تماس",
      link: "/contact",
      active: false,
    },
  ]);

  const stateContext = {
    menuMobile,
    setMenuMobile,
    navigationTopBar,
    setNavigationTopBar,
    currentUser,
    setCurrentUser,
    appUsers,
    setAppUsers,
    screenSize,
    setScreenSize,
  };
  return (
    <StateContext.Provider value={stateContext}>
      {props.children}
    </StateContext.Provider>
  );
};
