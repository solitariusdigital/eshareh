import { useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./nikibezabaneeshareh.module.scss";
import Image from "next/legacy/image";
import { NextSeo } from "next-seo";
import logoFarsi from "@/assets/logoFarsi.svg";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import prev from "@/assets/prev.svg";
import { getCharityApi, updateCharityApi } from "@/services/api";

export default function Nikibezabaneeshareh() {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { displayFooter, setFooter } = useContext(StateContext);
  const { displayMenu, setDisplayMenu } = useContext(StateContext);

  useEffect(() => {
    setFooter(false);
    setDisplayMenu(false);
    setLanguageType("fa");
    setLanguage(true);
    document.body.style.marginTop = "0px";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <div className={classes.information}>
          <h1
            style={{
              fontFamily: "FarsiFat",
            }}
          >
            نیکی به زبان اشاره
          </h1>
          <p>
            امسال در کمپین مسئولیت اجتماعی اشاره، به سراغ عزیزان ناشنوا و
            کم‌شنوا رفته‌ایم تا از دریچه‌ای تازه به زندگی روزمره و چالش‌هایی که
            با آن مواجه‌اند، بپردازیم؛ چرا که ما در اشاره باور داریم هر گام
            کوچکی می‌تواند راه را برای تغییری بزرگ هموار کند. در این راستا
            کمپینی طراحی شد با شعار «نیکی به زبان اشاره»
          </p>
          <p>کمپینی که شامل سه بخش زیر است:</p>
          <div className={classes.row}>
            <FiberManualRecordIcon sx={{ fontSize: "0.6vw" }} />
            <p>تهیه و اهدای تعدادی دستگاه سمعک برای افراد کم‌شنوا</p>
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
              ارتقای سطح آگاهی عمومی و رسمیت‌بخشیدن به زبان اشاره به ‌عنوان پلی
              برای برقراری ارتباط مؤثر
            </p>
          </div>
          <p>
            با دانلود و مطالعه دفترچه آنلاین، نه‌ تنها سهمی در گسترش این آگاهی
            خواهید داشت، بلکه به ازای هر دانلود، مبلغی نیز برای تهیه سمعک‌ به
            کم‌شنوایان اختصاص خواهد یافت.
          </p>
          <h2>در نیکــــی به زبان اشـــــاره هـــمراه ﺷــــﻮﯾﺪ.</h2>
          <div className={classes.button} onClick={() => updateCharityCount()}>
            <h2
              style={{
                fontFamily: "FarsiBold",
              }}
            >
              به نیکی اشاره کنید
            </h2>
          </div>
        </div>
        <div className={classes.logo}>
          <Image
            src={prev}
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
