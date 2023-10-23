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

  return (
    <div
      className={classes.container}
      style={{ background: menuColor.background, color: menuColor.text }}
    >
      {screenSize !== "mobile" && (
        <div className={classes.largeMenu}>
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
          <div className={classes.largeNavigation}>
            {navigationTopBar
              .map((nav, index) => (
                <a
                  key={index}
                  style={{
                    fontFamily: language ? "FarsiMedium" : "EnglishMedium",
                  }}
                  className={!nav.active ? classes.nav : classes.navActive}
                  onClick={() => activateNav(nav.link, index)}
                >
                  {language ? nav.titleFa : nav.titleEn}
                  {nav.titleFa === "" && <SearchIcon sx={{ fontSize: 30 }} />}
                </a>
              ))
              .reverse()}
          </div>

          <div
            className={classes.languageControl}
            onClick={() => setLanguage(!language)}
            style={{
              fontFamily: language ? "English" : "Farsi",
            }}
          >
            <p>{language ? "English" : "فارسی"}</p>
          </div>

          <div className={classes.colorPickerContainer}>
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
      )}

      {screenSize === "mobile" && (
        <div className={classes.smallMenu}>
          <div className={classes.topBar}>
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
            <div
              className={classes.languageControl}
              onClick={() => setLanguage(!language)}
              style={{
                fontFamily: language ? "English" : "Farsi",
              }}
            >
              <p>{language ? "English" : "فارسی"}</p>
            </div>
            {menuMobile ? (
              <CloseIcon
                className={classes.menuIcon}
                onClick={() => setMenuMobile(!menuMobile)}
                sx={{ fontSize: 30 }}
              />
            ) : (
              <MenuIcon
                className={classes.menuIcon}
                onClick={() => setMenuMobile(!menuMobile)}
                sx={{ fontSize: 30 }}
              />
            )}
          </div>
          {menuMobile && (
            <Fragment>
              <div
                className={`${classes.menuMobile} animate__animated animate__slideInDown`}
              >
                <div>
                  {navigationTopBar.map((nav, index) => (
                    <a
                      key={index}
                      style={{
                        fontFamily: language ? "FarsiMedium" : "EnglishMedium",
                      }}
                      className={!nav.active ? classes.nav : classes.navActive}
                      onClick={() => activateNav(nav.link, index)}
                    >
                      {language ? nav.titleFa : nav.titleEn}
                      {nav.titleFa === "" && (
                        <SearchIcon sx={{ fontSize: 30 }} />
                      )}
                    </a>
                  ))}
                  {desktop && (
                    <div className={classes.nav}>
                      <p
                        onClick={() => {
                          Router.push("/download");
                          setMenuMobile(false);
                        }}
                      >
                        راهنمای نصب
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Fragment>
          )}
        </div>
      )}
    </div>
  );
}
