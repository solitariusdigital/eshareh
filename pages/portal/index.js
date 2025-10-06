import { Fragment, useContext, useState, useEffect, useMemo } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./portal.module.scss";
import Image from "next/legacy/image";
import { NextSeo } from "next-seo";
import Router from "next/router";
import logoFarsi from "@/assets/logoFarsi.svg";
import logoutLight from "@/assets/logoutLight.svg";
import logoutDark from "@/assets/logoutDark.svg";
import logoutHover from "@/assets/logoutHover.svg";
import modeLight from "@/assets/modeLight.svg";
import modeDark from "@/assets/modeDark.svg";
import modeHover from "@/assets/modeHover.svg";
import prev from "@/assets/prev.svg";
import secureLocalStorage from "react-secure-storage";
import home from "@/assets/home.svg";
import tasks from "@/assets/tasks.svg";
import news from "@/assets/news.svg";
import chat from "@/assets/chat.svg";
import admin from "@/assets/admin.svg";
import setting from "@/assets/setting.svg";
import ChatBox from "@/components/ChatBox";
import Password from "@/components/forms/Password";
import Admin from "@/components/Admin";

export default function Portal() {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { displayMenu, setDisplayMenu } = useContext(StateContext);
  const { displayFooter, setDisplayFooter } = useContext(StateContext);
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const [themeMode, setThemeMode] = useState("light");
  const [boardType, setBoardType] = useState(
    "chat" || "tasks" || "news" || "home" || "setting" || "admin"
  );

  const backgroundColor = useMemo(() => {
    return {
      light: {
        background: "#ffffff",
        color: "#231F20",
      },
      dark: {
        background: "#231F20",
        color: "#ffffff",
      },
    };
  }, []);

  useEffect(() => {
    if (!currentUser) {
      Router.push("/");
    } else {
      setDisplayMenu(false);
      setDisplayFooter(false);
      setLanguageType("fa");
      setLanguage(true);
    }
  }, [
    currentUser,
    setDisplayMenu,
    setDisplayFooter,
    setLanguageType,
    setLanguage,
  ]);

  useEffect(() => {
    document.body.style.marginTop = "0px";
    let element = document.getElementById("portal");
    element.style.background = backgroundColor[themeMode].background;
    element.style.color = backgroundColor[themeMode].color;
  }, [backgroundColor, themeMode]);

  const menuItemsTopData = [
    {
      src: chat,
      alt: "چت",
      label: "چت",
      active: true,
      requiredPermission: "all",
      onClick: () => setBoardType("chat"),
    },
    // {
    //   src: home,
    //   alt: "خانه",
    //   label: "خانه",
    //   active: false,
    //   requiredPermission: "all",
    //   onClick: () => setBoardType("home"),
    // },
    {
      src: tasks,
      alt: "وظایف",
      label: "وظایف",
      active: false,
      requiredPermission: "all",
      onClick: () => setBoardType("tasks"),
    },
    {
      src: news,
      alt: "اخبار",
      label: "اخبار",
      active: false,
      requiredPermission: "all",
      onClick: () => setBoardType("news"),
    },
  ];
  const menuItemsBottomData = [
    {
      src: admin,
      alt: "admin",
      active: false,
      requiredPermission: "admin",
      onClick: () => setBoardType("admin"),
    },
    {
      src: setting,
      alt: "setting",
      active: false,
      requiredPermission: "all",
      onClick: () => setBoardType("setting"),
    },
    {
      src: prev,
      alt: "logo",
      active: false,
      requiredPermission: "all",
      onClick: () => window.location.assign("/"),
    },
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
      menuItemsTopData[index].onClick();
    } else if (menuType === "bottom") {
      let accessibleItems = menuItemsBottom.filter((item) => {
        const requiredPermission = item.requiredPermission || "all";
        if (requiredPermission === "all") {
          return true;
        }
        return permissionControl === requiredPermission;
      });
      const updatedItemsBottom = accessibleItems.map((item, idx) => ({
        ...item,
        active: idx === index,
      }));
      setMenuItemsBottom(updatedItemsBottom);
      setMenuItemsTop(menuItemsTop.map((item) => ({ ...item, active: false })));
      accessibleItems[index].onClick();
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
      src: () => (themeMode === "light" ? modeLight : modeDark),
      hoverSrc: () => modeHover,
      onClick: toggleMode,
    },
    {
      id: "logout",
      alt: "logout",
      hover: false,
      src: () => (themeMode === "light" ? logoutLight : logoutDark),
      hoverSrc: () => logoutHover,
      onClick: signOut,
    },
  ];

  const [hoverStates, setHoverStates] = useState({
    language: false,
    mode: false,
    logout: false,
  });

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
        description={"اشاره یک استودیوی طراحی چند رشته‌ای و مستقل است"}
        canonical="https://eshareh.com/portal"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://eshareh.com/portal",
          title: "پورتال",
          description: "اشاره یک استودیوی طراحی چند رشته‌ای و مستقل است",
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
        <div className={classes.container} id="portal">
          <div className={classes.portal}>
            <div className={classes.topBar}>
              <div className={classes.profile}>
                <div className={classes.image}>
                  <Image
                    className={classes.image}
                    src={currentUser.media}
                    blurDataURL={currentUser.media}
                    layout="fill"
                    objectFit="cover"
                    alt="image"
                    as="image"
                    priority
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
                          ? control.hoverSrc()
                          : control.src()
                      }
                      alt={control.alt}
                      as="image"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className={classes.panel}>
              <div className={classes.menu}>
                <div className={classes.box} style={{ marginTop: "24px" }}>
                  {menuItemsTop
                    .filter((item) => {
                      const requiredPermission =
                        item.requiredPermission || "all";
                      if (requiredPermission === "all") {
                        return true;
                      }
                      return permissionControl === requiredPermission;
                    })
                    .map((item, index) => (
                      <div
                        key={index}
                        className={
                          item.active ? classes.itemActive : classes.item
                        }
                        onClick={() => handleClickMenu(index, "top")}
                      >
                        <Image
                          width={24}
                          height={24}
                          src={item.src}
                          alt={item.alt}
                          as="image"
                        />
                        <p>{item.label}</p>
                      </div>
                    ))}
                </div>
                <div
                  className={classes.box}
                  style={{
                    marginBottom: "24px",
                  }}
                >
                  {menuItemsBottom
                    .filter((item) => {
                      const requiredPermission =
                        item.requiredPermission || "all";
                      if (requiredPermission === "all") {
                        return true;
                      }
                      return permissionControl === requiredPermission;
                    })
                    .map((item, index) => (
                      <div
                        key={index}
                        className={
                          item.active ? classes.itemActive : classes.item
                        }
                        onClick={() => handleClickMenu(index, "bottom")}
                      >
                        <Image
                          width={24}
                          height={24}
                          src={item.src}
                          alt={item.alt}
                          as="image"
                        />
                      </div>
                    ))}
                </div>
              </div>
              <div className={classes.board}>
                {boardType === "chat" && <ChatBox />}
                {boardType === "admin" && <Admin />}
                {boardType === "setting" && <Password />}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
