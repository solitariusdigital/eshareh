import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import Image from "next/legacy/image";
import appLoadOne from "@/assets/appLoadOne.png";
import appLoadTwo from "@/assets/appLoadTwo.png";
import appLoadThree from "@/assets/appLoadThree.png";
import secureLocalStorage from "react-secure-storage";

export default function RootLayout({ children }) {
  const { language, setLanguage } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { displayMenu, setDisplayMenu } = useContext(StateContext);
  const [appLoader, setAppLoader] = useState(false);
  const [randomImage, setRandomImage] = useState(null);

  const router = useRouter();
  let pathname = router.pathname;

  useEffect(() => {
    const appLoadImages = [appLoadOne, appLoadTwo, appLoadThree];
    setRandomImage(
      appLoadImages[Math.floor(Math.random() * appLoadImages.length)]
    );
  }, []);

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
    setTimeout(() => {
      setAppLoader(true);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      {appLoader ? (
        <div
          style={{
            fontFamily: language ? "Farsi" : "English",
          }}
        >
          {displayMenu && (
            <section className="menu animate__animated animate__slideInDown">
              <Menu />
            </section>
          )}
          <section className="main">
            <main>{children}</main>
          </section>
          <section>
            <Footer />
          </section>
        </div>
      ) : (
        <div className="appload">
          {randomImage && (
            <Image
              width={300}
              height={366.67}
              src={randomImage}
              alt="logo"
              priority
            />
          )}
        </div>
      )}
    </Fragment>
  );
}
