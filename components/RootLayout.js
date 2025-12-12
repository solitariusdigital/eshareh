import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import Image from "next/legacy/image";

export default function RootLayout({ children }) {
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { heroHeight, setHeroHeight } = useContext(StateContext);
  const [appLoader, setAppLoader] = useState(false);

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

  // check app live
  useEffect(() => {
    setTimeout(() => {
      setAppLoader(true);
    }, 1000);
  }, []);

  return (
    <Fragment>
      {appLoader ? (
        <div
          style={{
            fontFamily: "Farsi",
          }}
        >
          <section className="main">
            <main>{children}</main>
          </section>
        </div>
      ) : (
        <div className="appload">
          <Image
            src={"https://eshareh.storage.iran.liara.space/henkel/logo.gif"}
            layout="fill"
            objectFit="contain"
            alt="logo"
            as="image"
            priority
            unoptimized
          />
        </div>
      )}
    </Fragment>
  );
}
