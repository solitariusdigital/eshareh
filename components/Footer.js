import { useContext, Fragment, useState } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./Footer.module.scss";
import Image from "next/legacy/image";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import logofooter from "@/assets/logofooter.png";
import aparat from "@/assets/aparat.svg";
import aparatHover from "@/assets/aparatHover.svg";
import Router from "next/router";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import MuseTechLab from "@/assets/MuseTechLab.svg";

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
        fontFamily: language ? "English" : "English",
      }}
    >
      <div>
        <LinkedInIcon
          className={classes.icon}
          onClick={() =>
            window.open(
              "https://www.linkedin.com/company/esharehmarcom/",
              "_ self"
            )
          }
        />
        <InstagramIcon
          className={classes.icon}
          onClick={() =>
            window.open(
              "https://www.linkedin.com/company/esharehmarcom/",
              "_ self"
            )
          }
        />
        <YouTubeIcon
          sx={{ fontSize: 30 }}
          className={classes.youtube}
          onClick={() =>
            window.open(
              "https://www.linkedin.com/company/esharehmarcom/",
              "_ self"
            )
          }
        />
        {!hover ? (
          <Image
            className={classes.icon}
            onClick={() =>
              window.open(
                "https://www.linkedin.com/company/esharehmarcom/",
                "_ self"
              )
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
              window.open(
                "https://www.linkedin.com/company/esharehmarcom/",
                "_ self"
              )
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
        <p className={classes.copyright}>© eshareh 2023 all rights reserved</p>
      </div>
      <div className={classes.container}>
        <div
          className={language ? classes.navigation : classes.navigationReverse}
        >
          {navigationTopBar.map((nav, index) => (
            <Fragment key={index}>
              <a
                style={{
                  fontFamily: language ? "FarsiBold" : "EnglishBold",
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
            fontFamily: language ? "FarsiBold" : "EnglishBold",
          }}
          className={classes.button}
          onClick={() => Router.push("/portal")}
        >
          {language ? "پرتال" : "Portal"}
        </button>
        <div
          className={classes.logo}
          onClick={() => window.location.assign("/")}
        >
          <Image
            width={100}
            height={43.22}
            src={logofooter}
            alt="logo"
            as="image"
            priority
          />
        </div>
      </div>
      {/* <div
        className={classes.musetech}
        onClick={() => window.open("https://musetechlab.com/")}
      >
        <Image
          className={classes.image}
          src={MuseTechLab}
          alt="MuseTechLab"
          width={120}
          height={30}
          loading="eager"
          as="image"
        />
        <p className={classes.text}>{language ? "توسعه" : "Development"}</p>
        <PrecisionManufacturingIcon sx={{ fontSize: 18 }} />
      </div> */}
    </div>
  );
}
