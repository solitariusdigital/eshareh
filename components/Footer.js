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
import Link from "next/link";

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
    <footer
      className={classes.footer}
      style={{
        fontFamily: language ? "EnglishLight" : "EnglishLight",
      }}
    >
      <div>
        <Link href="https://www.linkedin.com/company/esharehmarcom" passHref>
          <LinkedInIcon
            className={classes.icon}
            onClick={() =>
              window.open(
                "https://www.linkedin.com/company/esharehmarcom",
                "_ self"
              )
            }
          />
        </Link>
        <Link href="https://www.instagram.com/esharehmarcom" passHref>
          <InstagramIcon
            className={classes.icon}
            onClick={() =>
              window.open("https://www.instagram.com/esharehmarcom", "_ self")
            }
          />
        </Link>
        <Link
          href="https://www.youtube.com/channel/UCO5L7FnGyEvme6Ckr9kBaOw"
          passHref
        >
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
        </Link>
        {!hover ? (
          <Link href="https://www.aparat.com/esharehmarcom" passHref>
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
              priority
            />
          </Link>
        ) : (
          <Link href="https://www.aparat.com/esharehmarcom" passHref>
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
              priority
            />
          </Link>
        )}
        <p className={classes.copyright}>© eshareh 2024 all rights reserved</p>
      </div>
      <div className={classes.container}>
        <nav
          className={language ? classes.navigation : classes.navigationReverse}
        >
          {navigationTopBar.map((nav, index) => (
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
            </Fragment>
          ))}
        </nav>
        <button
          style={{
            fontFamily: language ? "FarsiBold" : "EnglishBold",
            fontSize: language ? "1.2rem" : "",
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
          <Link href="/" passHref>
            <Image
              width={150}
              height={82.5}
              src={language ? logoLoadFarsi : logoLoadEnglish}
              alt="logo"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
