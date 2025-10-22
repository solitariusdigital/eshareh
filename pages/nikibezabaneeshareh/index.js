import { useContext, Fragment, useEffect, useState } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./nikibezabaneeshareh.module.scss";
import Image from "next/legacy/image";
import { NextSeo } from "next-seo";
import logoFarsi from "@/assets/logoFarsi.svg";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import esharehWhite from "@/assets/esharehWhite.svg";
import { getCharityApi, updateCharityApi } from "@/services/api";

export default function Nikibezabaneeshareh() {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { displayFooter, setDisplayFooter } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [displayInfo, setDisplayInfo] = useState(false);

  const fullSizeChatBox =
    screenSize === "desktop" || screenSize === "tablet-landscape";

  useEffect(() => {
    setDisplayFooter(false);
    setLanguageType("fa");
    setLanguage(true);
    document.body.style.marginTop = "0px";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDisplayInfo(false);
    const timeoutId = setTimeout(
      () => {
        setDisplayInfo(true);
      },
      fullSizeChatBox ? 8500 : 7000
    );
    return () => clearTimeout(timeoutId);
  }, [screenSize, fullSizeChatBox]);

  const updateCharityCount = async () => {
    const dataCharity = await getCharityApi();
    let count = dataCharity[0].nikibezabaneeshareh;
    count += 1;
    let dataObject = {
      ...dataCharity[0],
      nikibezabaneeshareh: count,
    };
    await updateCharityApi(dataObject);
  };

  return (
    <Fragment>
      <NextSeo
        title="نیکی به زبان اشاره"
        description="اشاره یک استودیوی طراحی چند رشته ای و مستقل است"
        canonical="https://eshareh.com/nikibezabaneeshareh"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://eshareh.com/nikibezabaneeshareh",
          title: "نیکی به زبان اشاره",
          description: "اشاره یک استودیوی طراحی چند رشته ای و مستقل است",
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
        {fullSizeChatBox && (
          <div className={classes.videoContainer}>
            <video
              className={classes.video}
              src={
                "https://eshareh.storage.iran.liara.space/nikibezabaneeshareh/motion-desktop.mp4"
              }
              autoPlay
              playsInline
              preload="metadata"
              muted="true"
            />
          </div>
        )}
        {!fullSizeChatBox && (
          <div className={classes.videoContainer}>
            {displayInfo && (
              <h1
                className={`${classes.title} animate__animated animate__slideInDown`}
                style={{
                  fontFamily: "FarsiFat",
                }}
              >
                نیکی به زبان اشاره
              </h1>
            )}
            <video
              className={classes.video}
              src={
                "https://eshareh.storage.iran.liara.space/nikibezabaneeshareh/motion-mobile.mp4"
              }
              autoPlay
              playsInline
              preload="metadata"
              muted="true"
            />
          </div>
        )}
        {displayInfo && (
          <div
            className={`${classes.information} animate__animated ${
              fullSizeChatBox ? "animate__slideInRight" : "animate__slideInUp"
            }`}
          >
            {fullSizeChatBox && (
              <h1
                style={{
                  fontFamily: "FarsiFat",
                }}
              >
                نیکی به زبان اشاره
              </h1>
            )}
            <p>
              امسال در کمپین مسئولیت اجتماعی اشاره، به سراغ عزیزان ناشنوا و
              کم‌شنوا رفته‌ایم تا از دریچه‌ای تازه به زندگی روزمره و چالش‌هایی
              که با آن مواجه‌اند، بپردازیم؛ چرا که ما در اشاره باور داریم هر گام
              کوچکی می‌تواند راه را برای تغییری بزرگ هموار کند. در این راستا
              کمپینی طراحی شد با شعار «نیکی به زبان اشاره»
            </p>
            {screenSize !== "mobile" && <p>کمپینی که شامل سه بخش زیر است:</p>}
            <div className={classes.row}>
              <FiberManualRecordIcon sx={{ fontSize: "0.6vw" }} />
              <p>تهیه و اهدای تعدادی دستگاه سمعک برای افرادکم‌شنوا</p>
            </div>
            <div className={classes.row}>
              <FiberManualRecordIcon sx={{ fontSize: "0.6vw" }} />
              <p>
                طراحی و ارائه دفترچه فیزیکی ویژه ناشنوایان و کم‌شنوایان برای
                آسان‌تر شدن ارتباط با آن‌ها
              </p>
            </div>
            <div className={classes.row}>
              <FiberManualRecordIcon sx={{ fontSize: "0.6vw" }} />
              <p>
                انتشار دفترچه آنلاین راهنمای برخورد با کم‌شنوایان/ناشنوایان برای
                ارتقای سطح آگاهی عمومی و رسمیت‌بخشیدن به زبان اشاره به ‌عنوان
                پلی برای برقراری ارتباط مؤثر
              </p>
            </div>
            <p
              style={{
                marginTop: "1vh",
              }}
            >
              با دانلود و مطالعه دفترچه آنلاین، نه‌ تنها سهمی در گسترش این آگاهی
              خواهید داشت، بلکه به ازای هر دانلود، مبلغی نیز برای تهیه سمعک‌ به
              کم‌شنوایان اختصاص خواهد یافت.
            </p>
            <h2>در نیکــــی به زبان اشـــــاره هـــمراه ﺷــــﻮﯾﺪ.</h2>
            <a
              className={classes.button}
              onClick={async () => {
                updateCharityCount();
                const fileUrl =
                  "https://eshareh.storage.iran.liara.space/nikibezabaneeshareh/دفترچه_ارتباط_با_ناشنوایان_و_کم_شنوایان.pdf";
                const fileName = "دفترچه_ارتباط_با_ناشنوایان_و_کم_شنوایان.pdf";
                window.open(fileUrl, "_blank", "noopener,noreferrer");
                try {
                  const response = await fetch(fileUrl);
                  const blob = await response.blob();
                  const blobUrl = window.URL.createObjectURL(blob);
                  const link = document.createElement("a");
                  link.href = blobUrl;
                  link.download = fileName;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  window.URL.revokeObjectURL(blobUrl);
                } catch (err) {
                  console.error("File download failed:", err);
                }
              }}
            >
              <h2 style={{ fontFamily: "FarsiBold" }}>به نیکی اشاره کنید</h2>
            </a>
          </div>
        )}
        <div className={classes.logo}>
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
