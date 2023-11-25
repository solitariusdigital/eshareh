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

export default function Menu() {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { menuMobile, setMenuMobile } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { menuColor, setMenuColor } = useContext(StateContext);
  const [desktop, setDesktop] = useState(false);
  const [colorPicker, setColorPicker] = useState(false);

  useEffect(() => {
    const checkDeviceType = () => {
      if (
        !window.matchMedia("(display-mode: standalone)").matches &&
        navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)/i)
      ) {
        setDesktop(true);
      }
    };
    checkDeviceType();
  }, [setDesktop]);

  const activateNav = (link, index) => {
    setMenuMobile(false);
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

  const handleChangeComplete = (color, event) => {
    setMenuColor({
      text: "#1b1b1b",
      background: color.hex,
    });
  };

  const toggleLanguage = () => {
    setLanguage(!language);
    setLanguageType(!language ? "fa" : "en");
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
                priority
              />
            </div>
            <div>
              <ColorLensIcon
                className="icon"
                onClick={() => setColorPicker(!colorPicker)}
                sx={{ color: "#fdb714" }}
              />
              {colorPicker && (
                <div className={classes.colorPicker}>
                  <CompactPicker onChangeComplete={handleChangeComplete} />
                </div>
              )}
            </div>
          </div>
          <div className={classes.largeNavigation}>
            {language
              ? navigationTopBar
                  .map((nav, index) => (
                    <Fragment key={index}>
                      {index === navigationTopBar.length - 1 && (
                        <div
                          className={classes.languageControl}
                          onClick={() => toggleLanguage()}
                          style={{
                            fontFamily: language ? "English" : "English",
                          }}
                        >
                          <p>{language ? "En" : "Fa"}</p>
                        </div>
                      )}
                      <a
                        style={{
                          fontFamily: language
                            ? "FarsiMedium"
                            : "EnglishMedium",
                        }}
                        className={
                          !nav.active ? classes.nav : classes.navActive
                        }
                        onClick={() => activateNav(nav.link, index)}
                      >
                        {nav.title[languageType]}
                        {nav.title[languageType] === "" && (
                          <SearchIcon sx={{ fontSize: 24 }} />
                        )}
                      </a>
                    </Fragment>
                  ))
                  .reverse()
              : navigationTopBar.map((nav, index) => (
                  <Fragment key={index}>
                    <a
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
                    {index === navigationTopBar.length - 1 && (
                      <div
                        className={classes.languageControl}
                        onClick={() => toggleLanguage()}
                        style={{
                          fontFamily: language ? "English" : "English",
                        }}
                      >
                        <p>{language ? "En" : "Fa"}</p>
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
              {menuMobile ? (
                <CloseIcon
                  className="icon"
                  onClick={() => setMenuMobile(!menuMobile)}
                  sx={{ fontSize: 30 }}
                />
              ) : (
                <MenuIcon
                  className="icon"
                  onClick={() => setMenuMobile(!menuMobile)}
                  sx={{ fontSize: 30 }}
                />
              )}
              <div
                className={classes.languageControl}
                onClick={() => toggleLanguage()}
                style={{
                  fontFamily: language ? "English" : "English",
                }}
              >
                <p>{language ? "En" : "Fa"}</p>
              </div>
            </div>
          </div>
          {menuMobile && (
            <Fragment>
              <div
                className={`${classes.menuMobile} animate__animated animate__slideInDown`}
              >
                <div className={classes.menuItems}>
                  {language
                    ? navigationTopBar
                        .map((nav, index) => (
                          <a
                            key={index}
                            style={{
                              fontFamily: language
                                ? "FarsiMedium"
                                : "EnglishMedium",
                            }}
                            className={
                              !nav.active ? classes.nav : classes.navActive
                            }
                            onClick={() => activateNav(nav.link, index)}
                          >
                            {nav.title[languageType]}
                            {nav.title[languageType] === "" && (
                              <SearchIcon sx={{ fontSize: 24 }} />
                            )}
                          </a>
                        ))
                        .reverse()
                    : navigationTopBar.map((nav, index) => (
                        <a
                          key={index}
                          style={{
                            fontFamily: language
                              ? "FarsiMedium"
                              : "EnglishMedium",
                          }}
                          className={
                            !nav.active ? classes.nav : classes.navActive
                          }
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
