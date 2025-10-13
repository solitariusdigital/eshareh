import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import Image from "next/legacy/image";
import logoLoadEnglish from "@/assets/logoLoadEnglish.svg";
import logoLoadFarsi from "@/assets/logoLoadFarsi.svg";
import arrowUp from "@/assets/arrowUp.svg";
import secureLocalStorage from "react-secure-storage";
import {
  getSingleUserApi,
  getControlsApi,
  getNotificationApi,
  updateUserApi,
} from "@/services/api";

export default function RootLayout({ children }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { displayMenu, setDisplayMenu } = useContext(StateContext);
  const { displayFooter, setDisplayFooter } = useContext(StateContext);
  const { menuColor, setMenuColor } = useContext(StateContext);
  const { heroHeight, setHeroHeight } = useContext(StateContext);
  const [scrollArrow, setScrollArrow] = useState(false);
  const [loadImage, setLoadImage] = useState(null);
  const [appLoader, setAppLoader] = useState(false);
  const [appLive, setAppLive] = useState(false);

  const router = useRouter();
  let pathname = router.pathname;

  const handleResize = () => {
    let element = document.getElementById("detailsInformation");
    if (element) {
      let elemHeight = element.getBoundingClientRect().height;
      setHeroHeight(elemHeight);
    }
    const width = window.innerWidth;
    const height = window.innerHeight;

    let screenSize;
    if (width < 700) {
      screenSize = "mobile";
    } else if (width >= 700 && width < 1400) {
      screenSize = width > height ? "tablet-landscape" : "tablet-portrait";
    } else {
      screenSize = "desktop";
    }
    setScreenSize(screenSize);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (secureLocalStorage.getItem("languageBrowser")) {
      setLanguageType("en");
      setLanguage(false);
      setLoadImage(logoLoadEnglish);
    } else {
      setLanguageType("fa");
      setLanguage(true);
      setLoadImage(logoLoadFarsi);
    }
  }, [setLanguage, setLanguageType]);

  // check app live
  useEffect(() => {
    const handleControlApi = async () => {
      const data = await getControlsApi();
      setAppLive(data[0].live);
    };
    handleControlApi().catch(console.error);
    setTimeout(() => {
      setAppLoader(true);
    }, 1000);
  }, []);

  // checks user login and set user data
  useEffect(() => {
    const handleUserDataApi = async () => {
      try {
        const currentUser = JSON.parse(
          secureLocalStorage.getItem("currentUser")
        );
        if (currentUser) {
          const userData = await getSingleUserApi(currentUser._id);
          const notificationRecords = await getNotificationApi();
          const hasNotification = notificationRecords.some(
            (notification) => notification.userId === currentUser._id
          );
          const updateUserData = {
            ...userData,
            notifications: hasNotification,
          };
          await updateUserApi(updateUserData);
          setCurrentUser(updateUserData);
          setPermissionControl(updateUserData.permission);
          secureLocalStorage.setItem(
            "currentUser",
            JSON.stringify(updateUserData)
          );
        }
        const colorObject = await getControlsApi();
        setMenuColor(colorObject[0].menu);
      } catch (error) {
        console.error(error);
      }
    };
    handleUserDataApi();
    setTimeout(() => {
      setAppLoader(true);
    }, 1000);
  }, [setCurrentUser, setMenuColor, setPermissionControl]);

  useEffect(() => {
    navigationTopBar.map((nav) => {
      if (nav.link === "/") {
        navigationTopBar[0].active = true;
      } else if (pathname.includes(nav.link)) {
        navigationTopBar[0].active = false;
        nav.active = true;
      } else {
        nav.active = false;
      }
    });
    setNavigationTopBar([...navigationTopBar]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // detect scroll postion on app to toggle scroll arrow visibility
  useEffect(() => {
    let prevScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 0) {
        setScrollArrow(false);
      } else if (
        currentScrollY > prevScrollY &&
        !router.asPath.includes("portal")
      ) {
        setScrollArrow(true);
      }
      prevScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [router.asPath, scrollArrow]);

  return (
    <Fragment>
      {(currentUser && currentUser["permission"] === "admin") ||
      (appLoader && appLive) ? (
        <div
          style={{
            fontFamily: language ? "Farsi" : "English",
          }}
        >
          {displayMenu && (
            <section className="menu">
              <Menu />
            </section>
          )}
          <section className="main">
            <main>{children}</main>
          </section>
          {displayFooter && (
            <section>
              <Footer />
            </section>
          )}
          {scrollArrow && (
            <div
              className="scrollArrow"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                })
              }
            >
              <Image
                layout="fill"
                objectFit="cover"
                src={arrowUp}
                alt="logo"
                as="image"
                priority
              />
            </div>
          )}
        </div>
      ) : (
        <div className="appload">
          {loadImage && (
            <Image
              width={250}
              height={145.29}
              src={loadImage}
              alt="logo"
              as="image"
              priority
            />
          )}
        </div>
      )}
    </Fragment>
  );
}
