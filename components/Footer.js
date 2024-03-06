import { useContext, Fragment, useState } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./Footer.module.scss";
import Image from "next/legacy/image";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import logoLoadEnglish from "@/assets/logoLoadEnglish.svg";
import logoLoadFarsi from "@/assets/logoLoadFarsi.svg";
import aparat from "@/assets/aparat.svg";
import aparatHover from "@/assets/aparatHover.svg";
import Router from "next/router";

export default function Footer() {
  const { language, setLanguage } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);

  const [hover, setHover] = useState(false);

  const activateNav = (link, index) => {
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

  return (
    <div
      className={classes.footer}
      style={{
        fontFamily: language ? "EnglishLight" : "EnglishLight",
      }}
    >
      <div>
        <LinkedInIcon
          className={classes.icon}
          onClick={() =>
            window.open(
              "https://www.linkedin.com/company/esharehmarcom",
              "_ self"
            )
          }
        />
        <InstagramIcon
          className={classes.icon}
          onClick={() =>
            window.open("https://www.instagram.com/esharehmarcom/", "_ self")
          }
        />
        <YouTubeIcon
          sx={{ fontSize: 30 }}
          className={classes.youtube}
          onClick={() =>
            window.open(
              "https://www.youtube.com/channel/UCO5L7FnGyEvme6Ckr9kBaOw",
              "_ self"
            )
          }
        />
        {!hover ? (
          <Image
            className={classes.icon}
            onClick={() =>
              window.open("https://www.aparat.com/esharehmarcom", "_ self")
            }
            onMouseEnter={() => setHover(true)}
            width={25}
            height={25}
            src={aparat}
            alt="aparat"
            as="image"
            priority
          />
        ) : (
          <Image
            className={classes.icon}
            onClick={() =>
              window.open("https://www.aparat.com/esharehmarcom", "_ self")
            }
            onMouseLeave={() => setHover(false)}
            width={25}
            height={25}
            src={aparatHover}
            alt="aparat"
            as="image"
            priority
          />
        )}
        <p className={classes.copyright}>© eshareh 2024 all rights reserved</p>
      </div>
      <div className={classes.container}>
        <div
          className={language ? classes.navigation : classes.navigationReverse}
        >
          {navigationTopBar.map((nav, index) => (
            <Fragment key={index}>
              <a
                style={{
                  fontFamily: language ? "FarsiMedium" : "EnglishBold",
                  fontSize: language ? "1.1rem" : "",
                }}
                className={!nav.active ? classes.nav : classes.navActive}
                onClick={() => activateNav(nav.link, index)}
              >
                {nav.title[languageType]}
              </a>
            </Fragment>
          ))}
        </div>
        <button
          style={{
            fontFamily: language ? "FarsiMedium" : "EnglishBold",
          }}
          className={classes.button}
          onClick={() => Router.push("/portal")}
        >
          {language ? "پورتال" : "Portal"}
        </button>
        <div
          className={classes.logo}
          onClick={() => window.location.assign("/")}
        >
          <Image
            width={150}
            height={82.5}
            src={language ? logoLoadFarsi : logoLoadEnglish}
            alt="logo"
            as="image"
            priority
          />
        </div>
      </div>
    </div>
  );
}
