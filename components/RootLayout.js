import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import Image from "next/legacy/image";
import logo from "@/assets/logo.png";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import secureLocalStorage from "react-secure-storage";
import { getUserApi, getControlsApi } from "@/services/api";

export default function RootLayout({ children }) {
  const { language, setLanguage } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { displayMenu, setDisplayMenu } = useContext(StateContext);
  const { displayFooter, setFooter } = useContext(StateContext);
  const { menuColor, setMenuColor } = useContext(StateContext);
  const [appLoader, setAppLoader] = useState(false);
  const [scrollArrow, setScrollArrow] = useState(false);

  const router = useRouter();
  let pathname = router.pathname;

  const handleResize = () => {
    if (window.innerWidth < 700) {
      setScreenSize("mobile");
    } else if (window.innerWidth > 700 && window.innerWidth < 1400) {
      setScreenSize("tablet");
    } else {
      setScreenSize("desktop");
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // checks user login and set user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = JSON.parse(
          secureLocalStorage.getItem("currentUser")
        );
        if (currentUser) {
          const userData = await getUserApi(currentUser["_id"]);
          setCurrentUser(userData);
          secureLocalStorage.setItem("currentUser", JSON.stringify(userData));
        }
        const colorObject = await getControlsApi();
        setMenuColor(colorObject[0].menu);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    setTimeout(() => {
      setAppLoader(true);
    }, 1000);
  }, [setCurrentUser, setMenuColor]);

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
      } else if (currentScrollY > prevScrollY) {
        setScrollArrow(true);
      }
      prevScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollArrow]);

  return (
    <Fragment>
      {appLoader ? (
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
              <KeyboardArrowUpIcon sx={{ fontSize: 35 }} />
            </div>
          )}
        </div>
      ) : (
        <div className="appload">
          <Image
            width={250}
            height={143.79}
            src={logo}
            alt="logo"
            as="image"
            priority
          />
        </div>
      )}
    </Fragment>
  );
}
