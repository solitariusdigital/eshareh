import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import secureLocalStorage from "react-secure-storage";
import Image from "next/legacy/image";
import logoEnglish from "@/assets/logoEnglish.png";

export default function RootLayout({ children }) {
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { displayMenu, setDisplayMenu } = useContext(StateContext);
  const [appLoader, setAppLoader] = useState(true);

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

  return (
    <Fragment>
      {appLoader ? (
        <Fragment>
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
        </Fragment>
      ) : (
        <div className="appload">
          <Image
            className="animate__animated animate__heartBeat"
            width={150}
            height={150}
            src={logoEnglish}
            alt="logo"
            priority
          />
        </div>
      )}
    </Fragment>
  );
}
