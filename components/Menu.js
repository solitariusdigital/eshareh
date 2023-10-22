import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./Menu.module.scss";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Router from "next/router";
import Image from "next/legacy/image";
import logo from "@/assets/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import { CompactPicker } from "react-color";
import ColorLensIcon from "@mui/icons-material/ColorLens";

export default function Menu() {
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
          <Image
            className={classes.logo}
            width={120}
            height={50}
            src={logo}
            alt="logo"
            onClick={() => window.location.assign("/")}
            priority
          />
          <div className={classes.largeNavigation}>
            {navigationTopBar
              .map((nav, index) => (
                <a
                  key={index}
                  className={!nav.active ? classes.nav : classes.navActive}
                  onClick={() => activateNav(nav.link, index)}
                >
                  {nav.title}
                  {nav.title === "" && <SearchIcon sx={{ fontSize: 30 }} />}
                </a>
              ))
              .reverse()}
          </div>

          <div className={classes.colorPickerContainer}>
            <ColorLensIcon
              className="icon"
              onClick={() => setColorPicker(!colorPicker)}
              sx={{ color: "#ffcb08" }}
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
            <Image
              className={classes.logo}
              width={120}
              height={50}
              src={logo}
              alt="logo"
              onClick={() => window.location.assign("/")}
              priority
            />
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
                      className={!nav.active ? classes.nav : classes.navActive}
                      onClick={() => activateNav(nav.link, index)}
                    >
                      {nav.title}
                      {nav.title === "" && <SearchIcon sx={{ fontSize: 30 }} />}
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
