import { useContext, Fragment, useEffect, useState, useRef } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./nikibezabaneeshareh.module.scss";
import Image from "next/legacy/image";
import { NextSeo } from "next-seo";
import logoFarsi from "@/assets/logoFarsi.svg";
import esharehWhite from "@/assets/esharehWhite.svg";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";

export default function Nikibezabaneeshareh() {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { displayFooter, setDisplayFooter } = useContext(StateContext);
  const { displayMenu, setDisplayMenu } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [displayInfo, setDisplayInfo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [displayMute, setDisplayMute] = useState(false);

  const fullSizeScreen =
    screenSize === "desktop" || screenSize === "tablet-landscape";

  const videoRef = useRef(null);
  const videoRefMain = useRef(null);

  useEffect(() => {
    setDisplayFooter(false);
    setDisplayMenu(false);
    setLanguageType("fa");
    setLanguage(true);
    document.body.style.marginTop = "0px";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;

    const handleCanPlay = () => {
      video.play().catch((err) => console.warn("Autoplay blocked:", err));
    };

    video.addEventListener("canplay", handleCanPlay);
    video.load();

    return () => video.removeEventListener("canplay", handleCanPlay);
  }, [fullSizeScreen]);

  useEffect(() => {
    const video = videoRefMain.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;

    const handleCanPlay = () => {
      video.play().catch((err) => console.warn("Autoplay blocked:", err));
    };

    video.addEventListener("canplay", handleCanPlay);
    video.load();

    return () => video.removeEventListener("canplay", handleCanPlay);
  }, [fullSizeScreen]);

  const handleVideoClick = () => {
    if (videoRefMain.current) {
      const newMuted = !videoRefMain.current.muted;
      videoRefMain.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  useEffect(() => {
    setDisplayInfo(false);
    const timeoutId = setTimeout(
      () => {
        setDisplayInfo(true);
      },
      fullSizeScreen ? 9000 : 7000,
    );
    return () => clearTimeout(timeoutId);
  }, [fullSizeScreen]);

  useEffect(() => {
    setDisplayMute(false);
    const timeoutId = setTimeout(
      () => {
        setDisplayMute(true);
      },
      fullSizeScreen ? 11000 : 9000,
    );
    return () => clearTimeout(timeoutId);
  }, [fullSizeScreen]);

  return (
    <Fragment>
      <NextSeo
        title="نیکی به زبان اشاره"
        description="اشاره یک استودیوی طراحی چند رشته‌ای و مستقل است"
        canonical="https://eshareh.com/nikibezabaneeshareh"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://eshareh.com/nikibezabaneeshareh",
          title: "نیکی به زبان اشاره",
          description: "اشاره یک استودیوی طراحی چند رشته‌ای و مستقل است",
          siteName: "آژانس تبلیغاتی اشاره",
          images: {
            url: logoFarsi,
            width: 1200,
            height: 630,
            alt: "اشاره",
          },
        }}
        robots="index, follow"
      />
      <div className={classes.container}>
        <video
          className={classes.backgroundVideo}
          src={
            fullSizeScreen
              ? "https://bucket.eshareh.com/nikibezabaneeshareh/motion-desktop.mp4"
              : "https://bucket.eshareh.com/nikibezabaneeshareh/motion-mobile.mp4"
          }
          ref={videoRef}
          preload="auto"
          autoPlay
          playsInline
          muted
        />
        {displayInfo && (
          <div
            className={`${classes.information} animate__animated animate__slideInDown`}
          >
            <h1
              style={{
                fontFamily: "FarsiFat",
              }}
            >
              نیکی به زبان اشاره
            </h1>
            <h3>
              با همراهی و به نمایندگی از همه شما، صدای زندگی را به گوش تعدادی از
              کم‌شنواهای بی‌بضاعت سراسر ایران رساندیم؛ اما پشت این اتفاق، قصه‌ای
              است از ایده‌ها، آدم‌ها و لحظه‌هایی که ما را در ساختن این نیکی یاری
              کردند. با تماشای ویدیوی زیر، قصه این نیکی را از زبان اشاره بشنوید.
            </h3>
          </div>
        )}
        {displayInfo && (
          <div
            className={`${classes.videoWrapper} animate__animated animate__slideInUp`}
          >
            <div className={classes.control} onClick={handleVideoClick}>
              {displayMute && (
                <>
                  {isMuted ? (
                    <MusicOffIcon
                      className="icon"
                      sx={{ fontSize: 24, color: "#fdb714" }}
                    />
                  ) : (
                    <AudiotrackIcon
                      className="icon"
                      sx={{ fontSize: 24, color: "#fdb714" }}
                    />
                  )}
                </>
              )}
            </div>
            <video
              className={classes.video}
              src="https://bucket.eshareh.com/nikibezabaneeshareh/The-Making-of-Kindness-Campaign.mp4"
              playsInline
              preload="auto"
              loop
              autoPlay
              ref={videoRefMain}
              muted={isMuted}
              // controls
            />
          </div>
        )}
        <div
          className={classes.logo}
          onClick={() => window.location.assign("/")}
        >
          <Image
            src={esharehWhite}
            layout="fill"
            objectFit="contain"
            alt="logo"
            as="image"
          />
        </div>
      </div>
    </Fragment>
  );
}
