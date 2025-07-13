import { Fragment, useContext, useState, useEffect, useMemo } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./portal.module.scss";
import Image from "next/legacy/image";
import { NextSeo } from "next-seo";
import Router from "next/router";
import logoFarsi from "@/assets/logoFarsi.svg";
import logout from "@/assets/logout.svg";
import logoutHover from "@/assets/logoutHover.svg";
import mode from "@/assets/mode.svg";
import modeHover from "@/assets/modeHover.svg";
import secureLocalStorage from "react-secure-storage";
import home from "@/assets/home.svg";
import tasks from "@/assets/tasks.svg";
import news from "@/assets/news.svg";
import inbox from "@/assets/inbox.svg";
import profile from "@/assets/profile.svg";
import setting from "@/assets/setting.svg";

export default function Portal() {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { displayMenu, setDisplayMenu } = useContext(StateContext);
  const { displayFooter, setFooter } = useContext(StateContext);
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [themeMode, setThemeMode] = useState("light");

  const backgroundColor = useMemo(() => {
    return {
      light: {
        background: "#f6f6f6",
        color: "#1b1b1bff",
      },
      dark: {
        background: "#1b1b1bff",
        color: "#f6f6f6",
      },
    };
  }, []);

  const menuItemsTopData = [
    {
      src: home,
      alt: "home",
      label: "خانه",
      active: false,
    },
    {
      src: tasks,
      alt: "tasks",
      label: "وظایف",
      active: false,
    },
    {
      src: news,
      alt: "news",
      label: "اخبار",
      active: false,
    },
    {
      src: inbox,
      alt: "inbox",
      label: "ورودی",
      active: false,
    },
  ];
  const menuItemsBottomData = [
    { src: profile, alt: "profile", active: false },
    { src: setting, alt: "setting", active: false },
  ];
  const [menuItemsTop, setMenuItemsTop] = useState(menuItemsTopData);
  const [menuItemsBottom, setMenuItemsBottom] = useState(menuItemsBottomData);

  const handleClickMenu = (index, menuType) => {
    if (menuType === "top") {
      const updatedItemsTop = menuItemsTop.map((item, idx) => ({
        ...item,
        active: idx === index,
      }));
      setMenuItemsTop(updatedItemsTop);
      setMenuItemsBottom(
        menuItemsBottom.map((item) => ({ ...item, active: false }))
      );
    } else if (menuType === "bottom") {
      const updatedItemsBottom = menuItemsBottom.map((item, idx) => ({
        ...item,
        active: idx === index,
      }));
      setMenuItemsBottom(updatedItemsBottom);
      setMenuItemsTop(menuItemsTop.map((item) => ({ ...item, active: false })));
    }
  };

  const signOut = () => {
    window.location.assign("/");
    secureLocalStorage.removeItem("currentUser");
    setCurrentUser(null);
  };
  const toggleMode = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };
  const controlsData = [
    {
      id: "mode",
      alt: "mode",
      hover: false,
      src: () => mode,
      hoverSrc: () => modeHover,
      onClick: toggleMode, // Assuming you have a function for toggling mode
    },
    {
      id: "logout",
      alt: "logout",
      hover: false,
      src: () => logout,
      hoverSrc: () => logoutHover,
      onClick: signOut,
    },
  ];

  const [hoverStates, setHoverStates] = useState({
    language: false,
    mode: false,
    logout: false,
  });

  useEffect(() => {
    if (!currentUser) {
      Router.push("/");
    } else {
      document.body.style.marginTop = "0px";
      document.body.style.background = backgroundColor.light;
      setDisplayMenu(false);
      setFooter(false);
      setLanguageType("fa");
      setLanguage(true);
    }
  }, [
    backgroundColor,
    currentUser,
    setDisplayMenu,
    setFooter,
    setLanguage,
    setLanguageType,
  ]);

  useEffect(() => {
    document.body.style.background = backgroundColor[themeMode].background;
    document.body.style.color = backgroundColor[themeMode].color;
  }, [backgroundColor, themeMode]);

  const handleMouseEnter = (controlId) => {
    setHoverStates((prev) => ({ ...prev, [controlId]: true }));
  };
  const handleMouseLeave = (controlId) => {
    setHoverStates((prev) => ({ ...prev, [controlId]: false }));
  };

  return (
    <Fragment>
      <NextSeo
        title={"پورتال"}
        description={"اشاره یک استودیوی طراحی چند رشته ای و مستقل است"}
        canonical="https://eshareh.com/portal"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://eshareh.com/portal",
          title: "پورتال",
          description: "اشاره یک استودیوی طراحی چند رشته ای و مستقل است",
          siteName: "آژانس تبلیغاتی اشاره",
          images: {
            url: logoFarsi,
            width: 1200,
            height: 630,
            alt: "اشاره",
          },
        }}
        robots="index, follow"
      />
      {currentUser && (
        <div className={classes.container}>
          <div className={classes.menu}>
            <div className={classes.profile}>
              <div className={classes.image}>
                <Image
                  className={classes.image}
                  src={currentUser.media}
                  blurDataURL={currentUser.media}
                  layout="fill"
                  objectFit="cover"
                  alt="profile"
                  as="image"
                />
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "FarsiBold",
                  }}
                >
                  {currentUser.name.fa}
                </h3>
                <p>{currentUser.title.fa}</p>
              </div>
            </div>
            <div className={classes.control}>
              {controlsData.map((control) => (
                <div
                  key={control.id}
                  onClick={control.onClick}
                  onMouseEnter={() => handleMouseEnter(control.id)}
                  onMouseLeave={() => handleMouseLeave(control.id)}
                >
                  <Image
                    width={20}
                    height={20}
                    src={
                      hoverStates[control.id]
                        ? control.hoverSrc(language)
                        : control.src(language)
                    }
                    alt={control.alt}
                    priority
                    as="image"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={classes.portal}>
            <div className={classes.vertical}>
              <div style={{ marginTop: "24px" }}>
                {menuItemsTop.map((item, index) => (
                  <div
                    key={index}
                    className={item.active ? classes.itemActive : classes.item}
                    onClick={() => handleClickMenu(index, "top")}
                  >
                    <Image
                      width={24}
                      height={24}
                      src={item.src}
                      alt={item.alt}
                      priority
                      as="image"
                    />
                    <p>{item.label}</p>
                  </div>
                ))}
              </div>
              <div
                style={{
                  marginBottom: "24px",
                }}
              >
                {menuItemsBottom.map((item, index) => (
                  <div
                    key={index}
                    className={item.active ? classes.itemActive : classes.item}
                    onClick={() => handleClickMenu(index, "bottom")}
                  >
                    <Image
                      width={24}
                      height={24}
                      src={item.src}
                      alt={item.alt}
                      priority
                      as="image"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className={classes.panel}></div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
