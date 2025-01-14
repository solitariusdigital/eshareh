import { useState, useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./Menu.module.scss";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Router from "next/router";
import Link from "next/link";
import Image from "next/legacy/image";
import logoEnglish from "@/assets/logoEnglish.svg";
import logoFarsi from "@/assets/logoFarsi.svg";
import { CompactPicker } from "react-color";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import AutoFixNormalIcon from "@mui/icons-material/AutoFixNormal";
import { getControlsApi, updateControlApi } from "@/services/api";
import Tooltip from "@mui/material/Tooltip";
import secureLocalStorage from "react-secure-storage";
import search from "@/assets/search.svg";
import searchHover from "@/assets/searchHover.svg";
import english from "@/assets/english.svg";
import englishHover from "@/assets/englishHover.svg";
import farsi from "@/assets/farsi.svg";
import farsiHover from "@/assets/farsiHover.svg";

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
  const [hover, setHover] = useState(false);
  const [hoverLanguage, setHoverLanguage] = useState(false);

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
    setHoverLanguage(false);
    setLanguage(!language);
    setLanguageType(!language ? "fa" : "en");
    secureLocalStorage.setItem("languageBrowser", language);
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
          {currentUser && (
            <div
              className={classes.profile}
              onClick={() => setDropDpwn(!dropDown)}
            >
              <Image
                src={currentUser.media}
                blurDataURL={currentUser.media}
                layout="fill"
                objectFit="cover"
                alt="image"
                as="image"
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
              {permissionControl === "admin" && (
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
            <div
              className={classes.logo}
              onClick={() => window.location.assign("/")}
            >
              <Link href="/" passHref>
                <Image
                  className={classes.image}
                  layout="fill"
                  objectFit="cover"
                  src={language ? logoFarsi : logoEnglish}
                  alt="logo"
                  as="image"
                />
              </Link>
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
          <nav className={classes.largeNavigation}>
            {language
              ? navigationTopBar
                  .map((nav, index) => (
                    <Fragment key={index}>
                      {index === navigationTopBar.length - 1 && (
                        <div className={classes.menuWrapper}>
                          <div
                            className={classes.languageControl}
                            onClick={() => toggleLanguage()}
                          >
                            {!hoverLanguage ? (
                              <Image
                                width={20}
                                height={20}
                                src={english}
                                alt="logo"
                                onMouseEnter={() => setHoverLanguage(true)}
                                priority
                                as="image"
                              />
                            ) : (
                              <Image
                                width={20}
                                height={20}
                                src={englishHover}
                                alt="logo"
                                onMouseLeave={() => setHoverLanguage(false)}
                                priority
                                as="image"
                              />
                            )}
                          </div>
                          <Link
                            style={{
                              fontFamily: language
                                ? "FarsiBold"
                                : "EnglishBold",
                              fontSize: language ? "1.2rem" : "",
                            }}
                            className={
                              !nav.active ? classes.nav : classes.navActive
                            }
                            onClick={() => activateNav(nav.link, index)}
                            href={nav.link}
                            passHref
                          >
                            {nav.title[languageType] === "" && (
                              <Fragment>
                                {!hover ? (
                                  <Image
                                    width={20}
                                    height={20}
                                    src={search}
                                    alt="logo"
                                    onMouseEnter={() => setHover(true)}
                                    priority
                                    as="image"
                                  />
                                ) : (
                                  <Image
                                    width={20}
                                    height={20}
                                    src={searchHover}
                                    alt="logo"
                                    onMouseLeave={() => setHover(false)}
                                    priority
                                    as="image"
                                  />
                                )}
                              </Fragment>
                            )}
                          </Link>
                        </div>
                      )}
                      <Link
                        style={{
                          fontFamily: language ? "FarsiBold" : "EnglishBold",
                          fontSize: language ? "1.2rem" : "",
                        }}
                        className={
                          !nav.active ? classes.nav : classes.navActive
                        }
                        onClick={() => activateNav(nav.link, index)}
                        href={nav.link}
                        passHref
                      >
                        {nav.title[languageType]}
                      </Link>
                    </Fragment>
                  ))
                  .reverse()
              : navigationTopBar.map((nav, index) => (
                  <Fragment key={index}>
                    <Link
                      style={{
                        fontFamily: language ? "FarsiBold" : "EnglishBold",
                        fontSize: language ? "1.2rem" : "",
                      }}
                      className={!nav.active ? classes.nav : classes.navActive}
                      onClick={() => activateNav(nav.link, index)}
                      href={nav.link}
                      passHref
                    >
                      {nav.title[languageType]}
                    </Link>
                    {index === navigationTopBar.length - 1 && (
                      <nav className={classes.menuWrapperReverse}>
                        <div
                          className={classes.languageControl}
                          onClick={() => toggleLanguage()}
                        >
                          {!hoverLanguage ? (
                            <Image
                              width={20}
                              height={20}
                              src={farsi}
                              alt="logo"
                              onMouseEnter={() => setHoverLanguage(true)}
                              priority
                              as="image"
                            />
                          ) : (
                            <Image
                              width={20}
                              height={20}
                              src={farsiHover}
                              alt="logo"
                              onMouseLeave={() => setHoverLanguage(false)}
                              priority
                              as="image"
                            />
                          )}
                        </div>
                        <Link
                          style={{
                            fontFamily: language ? "FarsiBold" : "EnglishBold",
                            fontSize: language ? "1.2rem" : "",
                          }}
                          className={
                            !nav.active ? classes.nav : classes.navActive
                          }
                          onClick={() => activateNav(nav.link, index)}
                          href={nav.link}
                          passHref
                        >
                          {nav.title[languageType] === "" && (
                            <Fragment>
                              {!hover ? (
                                <Image
                                  width={20}
                                  height={20}
                                  src={search}
                                  alt="logo"
                                  onMouseEnter={() => setHover(true)}
                                  priority
                                  as="image"
                                />
                              ) : (
                                <Image
                                  width={20}
                                  height={20}
                                  src={searchHover}
                                  alt="logo"
                                  onMouseLeave={() => setHover(false)}
                                  priority
                                  as="image"
                                />
                              )}
                            </Fragment>
                          )}
                        </Link>
                      </nav>
                    )}
                  </Fragment>
                ))}
          </nav>
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
              <div
                className={classes.logo}
                onClick={() => window.location.assign("/")}
              >
                <Link href="/" passHref>
                  <Image
                    className={classes.image}
                    layout="fill"
                    objectFit="cover"
                    src={!language ? logoEnglish : logoFarsi}
                    alt="logo"
                    as="image"
                  />
                </Link>
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
              >
                {!hoverLanguage ? (
                  <Image
                    width={20}
                    height={20}
                    src={language ? english : farsi}
                    alt="logo"
                    onMouseEnter={() => setHoverLanguage(true)}
                    priority
                    as="image"
                  />
                ) : (
                  <Image
                    width={20}
                    height={20}
                    src={language ? englishHover : farsiHover}
                    alt="logo"
                    onMouseLeave={() => setHoverLanguage(false)}
                    priority
                    as="image"
                  />
                )}
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
            <div
              className={`${classes.menuMobile} animate__animated animate__slideInDown`}
            >
              <nav
                className={
                  language ? classes.menuItems : classes.menuItemsReverse
                }
              >
                {navigationTopBar.map((nav, index) => (
                  <a
                    key={index}
                    style={{
                      fontFamily: language ? "FarsiBold" : "EnglishMedium",
                      fontSize: language ? "1.2rem" : "",
                    }}
                    className={!nav.active ? classes.nav : classes.navActive}
                    onClick={() => activateNav(nav.link, index)}
                  >
                    {nav.title[languageType]}
                    {nav.title[languageType] === "" && (
                      <Image width={20} height={20} src={search} alt="logo" />
                    )}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
