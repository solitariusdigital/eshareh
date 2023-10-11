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
      title: "بل کلاس",
      link: "/",
      active: false,
    },
    {
      title: "پرتال",
      link: "/portal",
      active: false,
    },
    {
      title: "پزشکان",
      link: "/doctors",
      active: false,
    },
    {
      title: "خدمات کلینیک",
      link: "/expertises",
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
