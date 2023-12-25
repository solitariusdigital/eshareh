import { useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./Footer.module.scss";
import Image from "next/legacy/image";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import MuseTechLab from "@/assets/MuseTechLab.svg";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import logo from "@/assets/logo.png";
import Router from "next/router";

export default function Footer() {
  const { language, setLanguage } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);

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
          className={classes.social}
          onClick={() =>
            window.open(
              "https://www.linkedin.com/company/esharehmarcom/",
              "_ self"
            )
          }
        />
        <InstagramIcon
          className={classes.social}
          onClick={() =>
            window.open(
              "https://www.linkedin.com/company/esharehmarcom/",
              "_ self"
            )
          }
        />
        <YouTubeIcon
          className={classes.social}
          onClick={() =>
            window.open(
              "https://www.linkedin.com/company/esharehmarcom/",
              "_ self"
            )
          }
        />
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
            fontFamily: language ? "FarsiBold" : "EnglishMedium",
          }}
          className={classes.button}
          onClick={() => Router.push("/portal")}
        >
          {language ? "پرتال" : "Portal"}
        </button>
        <div>
          <Image
            width={150}
            height={86.27}
            src={logo}
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
