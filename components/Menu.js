import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./Menu.module.scss";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Router from "next/router";
import Image from "next/legacy/image";
import logoEnglish from "@/assets/logoEnglish.png";
import logoFarsi from "@/assets/logoFarsi.png";
import SearchIcon from "@mui/icons-material/Search";
import { CompactPicker } from "react-color";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import AutoFixNormalIcon from "@mui/icons-material/AutoFixNormal";
import { getControlsApi, updateControlApi } from "@/services/api";
import Tooltip from "@mui/material/Tooltip";
import secureLocalStorage from "react-secure-storage";
import balloon from "@/assets/balloon.png";

export default function Menu() {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { menuMobile, setMenuMobile } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { displayFooter, setFooter } = useContext(StateContext);
  const { menuColor, setMenuColor } = useContext(StateContext);
  const [colorPicker, setColorPicker] = useState(false);
  const [textPicker, setTextPicker] = useState(false);
  const [dropDown, setDropDpwn] = useState(false);

  const activateNav = (link, index) => {
    setMenuMobile(false);
    setFooter(true);
    navigationTopBar.map((nav, i) => {
      if (i === index) {
        Router.push(link);
        nav.active = true;
      } else {
        nav.active = false;
      }
    });
    setNavigationTopBar([...navigationTopBar]);
  };

  const handleChangeColor = async (color, event) => {
    setMenuColor((prevData) => ({
      ...prevData,
      background: color.hex,
    }));
    let data = {
      menu: {
        ...menuColor,
        background: color.hex,
      },
    };
    saveColorObject(data);
  };
  const handleChangeText = async (color, event) => {
    setMenuColor((prevData) => ({
      ...prevData,
      text: color.hex,
    }));
    let data = {
      menu: {
        ...menuColor,
        text: color.hex,
      },
    };
    saveColorObject(data);
  };
  const saveColorObject = async (data) => {
    let colorObject = await getControlsApi();
    data.id = colorObject[0]["_id"];
    await updateControlApi(data);
  };

  const toggleLanguage = () => {
    setLanguage(!language);
    setLanguageType(!language ? "fa" : "en");
  };

  const signOut = () => {
    window.location.assign("/");
    secureLocalStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  return (
    <div
      className={classes.container}
      style={{ background: menuColor.background, color: menuColor.text }}
    >
      {screenSize === "desktop" && (
        <div
          className={language ? classes.largeMenuReverse : classes.largeMenu}
        >
          {currentUser && screenSize === "desktop" && (
            <div
              className={classes.profile}
              onClick={() => setDropDpwn(!dropDown)}
            >
              <Image
                src={currentUser.media ? currentUser.media : balloon}
                blurDataURL={currentUser.media ? currentUser.media : balloon}
                layout="fill"
                objectFit="cover"
                alt="image"
                as="image"
                priority
              />
            </div>
          )}
          {dropDown && currentUser && screenSize === "desktop" && (
            <div
              className={`${classes.dropDown}  animate__animated animate__zoomIn`}
              style={{
                fontFamily: language ? "English" : "English",
              }}
            >
              {currentUser.permission === "admin" && (
                <p onClick={() => Router.push("/admin")}>Admin</p>
              )}
              <p onClick={() => Router.push("/password")}>Password</p>
              <p onClick={() => signOut()}>Sign out</p>
            </div>
          )}
          <div
            className={
              language ? classes.logoContainer : classes.logoContainerReverse
            }
          >
            <div className={classes.logo}>
              <Image
                className={classes.image}
                layout="fill"
                objectFit="cover"
                src={language ? logoFarsi : logoEnglish}
                alt="logo"
                onClick={() => window.location.assign("/")}
                as="image"
                priority
              />
            </div>
            {permissionControl === "admin" && (
              <div>
                <Tooltip title="Background">
                  <ColorLensIcon
                    className="icon"
                    onClick={() => {
                      setColorPicker(!colorPicker);
                      setTextPicker(false);
                    }}
                    sx={{ color: colorPicker ? "#fdb714" : "#1b1b1b" }}
                  />
                </Tooltip>
                <Tooltip title="Text">
                  <AutoFixNormalIcon
                    className="icon"
                    onClick={() => {
                      setTextPicker(!textPicker);
                      setColorPicker(false);
                    }}
                    sx={{ color: textPicker ? "#fdb714" : "#1b1b1b" }}
                  />
                </Tooltip>

                {colorPicker && (
                  <div className={classes.colorPicker}>
                    <CompactPicker onChangeComplete={handleChangeColor} />
                  </div>
                )}
                {textPicker && (
                  <div className={classes.textPicker}>
                    <CompactPicker onChangeComplete={handleChangeText} />
                  </div>
                )}
              </div>
            )}
          </div>
          <div className={classes.largeNavigation}>
            {language
              ? navigationTopBar
                  .map((nav, index) => (
                    <Fragment key={index}>
                      {index === navigationTopBar.length - 1 && (
                        <div className={classes.menuWrapper}>
                          <div
                            className={classes.languageControl}
                            onClick={() => toggleLanguage()}
                            style={{
                              fontFamily: language ? "English" : "English",
                            }}
                          >
                            <p>{language ? "En" : "Fa"}</p>
                          </div>
                          <a
                            style={{
                              fontFamily: language
                                ? "FarsiMedium"
                                : "EnglishBold",
                            }}
                            className={
                              !nav.active ? classes.nav : classes.navActive
                            }
                            onClick={() => activateNav(nav.link, index)}
                          >
                            {nav.title[languageType] === "" && (
                              <SearchIcon sx={{ fontSize: 24 }} />
                            )}
                          </a>
                        </div>
                      )}
                      <a
                        style={{
                          fontFamily: language ? "FarsiMedium" : "EnglishBold",
                        }}
                        className={
                          !nav.active ? classes.nav : classes.navActive
                        }
                        onClick={() => activateNav(nav.link, index)}
                      >
                        {nav.title[languageType]}
                      </a>
                    </Fragment>
                  ))
                  .reverse()
              : navigationTopBar.map((nav, index) => (
                  <Fragment key={index}>
                    <a
                      style={{
                        fontFamily: language ? "FarsiMedium" : "EnglishBold",
                      }}
                      className={!nav.active ? classes.nav : classes.navActive}
                      onClick={() => activateNav(nav.link, index)}
                    >
                      {nav.title[languageType]}
                    </a>
                    {index === navigationTopBar.length - 1 && (
                      <div className={classes.menuWrapperReverse}>
                        <div
                          className={classes.languageControl}
                          onClick={() => toggleLanguage()}
                          style={{
                            fontFamily: language ? "English" : "English",
                          }}
                        >
                          <p>{language ? "En" : "Fa"}</p>
                        </div>
                        <a
                          style={{
                            fontFamily: language
                              ? "FarsiMedium"
                              : "EnglishBold",
                          }}
                          className={
                            !nav.active ? classes.nav : classes.navActive
                          }
                          onClick={() => activateNav(nav.link, index)}
                        >
                          {nav.title[languageType] === "" && (
                            <SearchIcon sx={{ fontSize: 24 }} />
                          )}
                        </a>
                      </div>
                    )}
                  </Fragment>
                ))}
          </div>
        </div>
      )}
      {screenSize !== "desktop" && (
        <div className={classes.smallMenu}>
          <div className={language ? classes.topBar : classes.topBarReverse}>
            <div
              className={
                language ? classes.logoContainer : classes.logoContainerReverse
              }
            >
              <div className={classes.logo}>
                <Image
                  className={classes.image}
                  layout="fill"
                  objectFit="cover"
                  src={!language ? logoEnglish : logoFarsi}
                  alt="logo"
                  onClick={() => window.location.assign("/")}
                  priority
                />
              </div>
            </div>
            <div
              className={
                language ? classes.menuWrapper : classes.menuWrapperReverse
              }
            >
              <div
                className={classes.languageControl}
                onClick={() => toggleLanguage()}
                style={{
                  fontFamily: language ? "English" : "English",
                }}
              >
                <p>{language ? "En" : "Fa"}</p>
              </div>
              {menuMobile ? (
                <CloseIcon
                  className="icon"
                  onClick={() => setMenuMobile(!menuMobile)}
                  sx={{ fontSize: 30, color: "#000000" }}
                />
              ) : (
                <MenuIcon
                  className="icon"
                  onClick={() => setMenuMobile(!menuMobile)}
                  sx={{ fontSize: 30, color: "#000000" }}
                />
              )}
            </div>
          </div>
          {menuMobile && (
            <Fragment>
              <div
                className={`${classes.menuMobile} animate__animated animate__slideInDown`}
              >
                <div
                  className={
                    language ? classes.menuItems : classes.menuItemsReverse
                  }
                >
                  {navigationTopBar.map((nav, index) => (
                    <a
                      key={index}
                      style={{
                        fontFamily: language ? "FarsiMedium" : "EnglishMedium",
                      }}
                      className={!nav.active ? classes.nav : classes.navActive}
                      onClick={() => activateNav(nav.link, index)}
                    >
                      {nav.title[languageType]}
                      {nav.title[languageType] === "" && (
                        <SearchIcon sx={{ fontSize: 24 }} />
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </Fragment>
          )}
        </div>
      )}
    </div>
  );
}
