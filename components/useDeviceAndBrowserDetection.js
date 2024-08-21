import { useEffect, useState } from "react";

const useDeviceAndBrowserDetection = () => {
  const [isDesktopSafari, setIsDesktopSafari] = useState(false);
  const [isIphone, setIsIphone] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;

    const iphone = /iPhone/.test(userAgent);
    const desktopSafari =
      /^((?!chrome|android).)*safari/i.test(userAgent) &&
      !/Mobile/.test(userAgent);

    setIsIphone(iphone);
    setIsDesktopSafari(desktopSafari);
  }, []);

  return { isDesktopSafari, isIphone };
};

export default useDeviceAndBrowserDetection;
