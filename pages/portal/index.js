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
import lightMode from "@/assets/lightMode.svg";
import darkMode from "@/assets/darkMode.svg";
import lightModeHover from "@/assets/lightModeHover.svg";
import darkModeHover from "@/assets/darkModeHover.svg";
import esharehWhite from "@/assets/esharehWhite.svg";
import esharehBlack from "@/assets/esharehBlack.svg";
import secureLocalStorage from "react-secure-storage";
import tasksActive from "@/assets/tasksActive.svg";
import tasks from "@/assets/tasks.svg";
import newsActive from "@/assets/newsActive.svg";
import news from "@/assets/news.svg";
import chatActive from "@/assets/chatActive.svg";
import chat from "@/assets/chat.svg";
import adminActive from "@/assets/adminActive.svg";
import admin from "@/assets/admin.svg";
import settingActive from "@/assets/settingActive.svg";
import setting from "@/assets/setting.svg";
import ChatBox from "@/components/ChatBox";
import TaskBox from "@/components/TaskBox";
import Setting from "@/components/Setting";
import Admin from "@/components/Admin";
import News from "@/components/News";
import { getNews } from "@/services/getNews";

export default function Portal({ adminNews, activeNews }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { displayMenu, setDisplayMenu } = useContext(StateContext);
  const { displayFooter, setDisplayFooter } = useContext(StateContext);
  const { displayFloatChat, setDisplayFloatChat } = useContext(StateContext);
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { editNews, setEditNews } = useContext(StateContext);
  const { editJobs, setEditJobs } = useContext(StateContext);
  const { editSolution, setEditSolution } = useContext(StateContext);

  const [themeMode, setThemeMode] = useState("light");
  const [boardType, setBoardType] = useState(
    "chat" || "tasks" || "news" || "setting" || "admin"
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
      setDisplayFloatChat(false);
      setLanguageType("fa");
      setLanguage(true);
    }
  }, [
    currentUser,
    setDisplayMenu,
    setDisplayFooter,
    setLanguageType,
    setLanguage,
    setDisplayFloatChat,
  ]);

  useEffect(() => {
    if (editNews || editJobs || editSolution) {
      setBoardType("admin");
    }
  }, [editNews, editJobs, editSolution]);

  useEffect(() => {
    if (currentUser) {
      document.body.style.marginTop = "0px";
      let element = document.getElementById("portal");
      element.style.background = backgroundColor[themeMode].background;
      element.style.color = backgroundColor[themeMode].color;
    }
  }, [backgroundColor, currentUser, themeMode]);

  const menuItemsTopData = [
    {
      src: () => (boardType === "chat" ? chat : chatActive),
      hoverSrc: () => (boardType === "chat" ? chatActive : chat),
      alt: "chat",
      requiredPermission: "all",
      onClick: () => setBoardType("chat"),
    },
    {
      src: () => (boardType === "tasks" ? tasksActive : tasks),
      hoverSrc: () => (boardType === "tasks" ? tasks : tasksActive),
      alt: "tasks",
      requiredPermission: "all",
      onClick: () => setBoardType("tasks"),
    },
    {
      src: () => (boardType === "news" ? newsActive : news),
      hoverSrc: () => (boardType === "news" ? news : newsActive),
      alt: "news",
      requiredPermission: "all",
      onClick: () => setBoardType("news"),
    },
  ];

  const menuItemsBottomData = [
    {
      src: () => (boardType === "admin" ? adminActive : admin),
      hoverSrc: () => (boardType === "admin" ? admin : adminActive),
      alt: "admin",
      requiredPermission: "admin",
      onClick: () => setBoardType("admin"),
    },
    {
      src: () => (boardType === "setting" ? settingActive : setting),
      hoverSrc: () => (boardType === "setting" ? setting : settingActive),
      alt: "setting",
      requiredPermission: "all",
      onClick: () => setBoardType("setting"),
    },
    {
      src: () => (boardType === "logo" ? esharehWhite : esharehBlack),
      hoverSrc: () => (boardType === "logo" ? esharehBlack : esharehWhite),
      alt: "logo",
      requiredPermission: "all",
      onClick: () => window.location.assign("/"),
    },
  ];

  const [menuItemsTop, setMenuItemsTop] = useState(menuItemsTopData);
  const [menuItemsBottom, setMenuItemsBottom] = useState(menuItemsBottomData);

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredSection, setHoveredSection] = useState(null);

  const handleClickMenu = (index, menuType) => {
    if (menuType === "top") {
      setMenuItemsTop((prev) =>
        prev.map((item, idx) => ({ ...item, active: idx === index }))
      );
      setMenuItemsBottom((prev) =>
        prev.map((item) => ({ ...item, active: false }))
      );
      menuItemsTop[index].onClick();
    } else if (menuType === "bottom") {
      const accessibleItems = menuItemsBottom.filter((item) => {
        const requiredPermission = item.requiredPermission || "all";
        return (
          requiredPermission === "all" ||
          permissionControl === requiredPermission
        );
      });

      setMenuItemsBottom((prev) =>
        accessibleItems.map((item, idx) => ({ ...item, active: idx === index }))
      );
      setMenuItemsTop((prev) =>
        prev.map((item) => ({ ...item, active: false }))
      );
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
      src: () => (themeMode === "dark" ? lightMode : darkMode),
      hoverSrc: () => (themeMode === "dark" ? lightModeHover : darkModeHover),
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
                      return (
                        requiredPermission === "all" ||
                        permissionControl === requiredPermission
                      );
                    })
                    .map((item, index) => {
                      const isHovered =
                        hoveredIndex === index && hoveredSection === "top";
                      const isActive = boardType === item.alt;
                      return (
                        <div
                          key={index}
                          className={
                            isActive ? classes.itemActive : classes.item
                          }
                          onClick={() => handleClickMenu(index, "top")}
                          onMouseEnter={() => {
                            setHoveredIndex(index);
                            setHoveredSection("top");
                          }}
                          onMouseLeave={() => {
                            setHoveredIndex(null);
                            setHoveredSection(null);
                          }}
                        >
                          <Image
                            width={24}
                            height={24}
                            src={
                              isHovered
                                ? item.hoverSrc()
                                : item.active || boardType === item.alt
                                ? item.hoverSrc()
                                : item.src()
                            }
                            alt={item.alt}
                          />
                        </div>
                      );
                    })}
                </div>
                <div className={classes.box} style={{ marginBottom: "24px" }}>
                  {menuItemsBottom
                    .filter((item) => {
                      const requiredPermission =
                        item.requiredPermission || "all";
                      return (
                        requiredPermission === "all" ||
                        permissionControl === requiredPermission
                      );
                    })
                    .map((item, index) => {
                      const isHovered =
                        hoveredIndex === index && hoveredSection === "bottom";
                      const isActive = boardType === item.alt;
                      return (
                        <div
                          key={index}
                          className={
                            isActive ? classes.itemActive : classes.item
                          }
                          onClick={() => handleClickMenu(index, "bottom")}
                          onMouseEnter={() => {
                            setHoveredIndex(index);
                            setHoveredSection("bottom");
                          }}
                          onMouseLeave={() => {
                            setHoveredIndex(null);
                            setHoveredSection(null);
                          }}
                        >
                          <Image
                            width={24}
                            height={24}
                            src={
                              isHovered
                                ? item.hoverSrc()
                                : item.active || boardType === item.alt
                                ? item.hoverSrc()
                                : item.src()
                            }
                            alt={item.alt}
                          />
                          <p>{item.label}</p>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className={classes.board}>
                {boardType === "chat" && <ChatBox floatChat={false} />}
                {/* {boardType === "tasks" && <TaskBox />} */}
                {boardType === "news" && (
                  <News
                    adminNews={adminNews}
                    activeNews={activeNews}
                    portal={true}
                  />
                )}
                {boardType === "admin" && <Admin />}
                {boardType === "setting" && <Setting />}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  try {
    const { news, activeNews } = await getNews(context);
    return { props: { adminNews: news, activeNews } };
  } catch (e) {
    return { notFound: true };
  }
}
