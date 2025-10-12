import { useContext, Fragment, useEffect, useState } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./nikibezabaneeshareh.module.scss";
import { NextSeo } from "next-seo";
import logoEnglish from "@/assets/logoEnglish.svg";
import logoFarsi from "@/assets/logoFarsi.svg";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { getCharityApi, updateCharityApi } from "@/services/api";

export default function Nikibezabaneeshareh() {
  const { language, setLanguage } = useContext(StateContext);
  const { displayFooter, setFooter } = useContext(StateContext);
  const { displayMenu, setDisplayMenu } = useContext(StateContext);

  useEffect(() => {
    setFooter(false);
    setDisplayMenu(false);
    document.body.style.marginTop = "0px";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <NextSeo
        title={language ? "نیکی به زبان اشاره" : "Niki be zabane Eshareh"}
        description={
          language
            ? "اشاره یک استودیوی طراحی چند رشته ای و مستقل است"
            : "Eshareh is a multidisciplinary, independently owned design studio"
        }
        canonical="https://eshareh.com/nikibezabaneeshareh"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://eshareh.com/nikibezabaneeshareh",
          title: language ? "نیکی به زبان اشاره" : "Niki be zabane Eshareh",
          description: language
            ? "اشاره یک استودیوی طراحی چند رشته ای و مستقل است"
            : "Eshareh is a multidisciplinary, independently owned design studio",
          siteName: language
            ? "آژانس تبلیغاتی اشاره"
            : "Eshareh Advertising Agency",
          images: {
            url: language ? logoFarsi : logoEnglish,
            width: 1200,
            height: 630,
            alt: language ? "اشاره" : "Eshareh",
          },
        }}
        robots="index, follow"
      />
      <div className={classes.container}>
        <div className={classes.information}>
          <h1
            style={{
              fontFamily: language ? "FarsiFat" : "FarsiFat",
            }}
          >
            نیکی به زبان اشاره
          </h1>
          <p>
            امسال در كمپين مسئوليت اجتماعى اشاره، نكَاه خود را به سوى كسانى
            دوخته ايم كه كمتر ديده مى شوند؛ عزيزانى از جامعه دكَرتوان، به ويژه
            ناشنوايان و كم شنوايانى كه در برابر ابتدايى ترين نيازهاى روزمره با
            چالش هاى حياتى روبه رو هستند. ما در اشاره بر اين باوريم كه كَام هاى
            کوچک، مى توانند راه را برای تغييرهاى بزرگ هموار كنند. از همين رو،
            كمپين امسال در سه مسير حركت خواهد كرد:
          </p>
          <div className={classes.row}>
            <FiberManualRecordIcon sx={{ fontSize: "0.6vw" }} />
            <p>تهيه و اهداى تعدادى دستكَاه سمعک براى افراد كم شنوا</p>
          </div>
          <div className={classes.row}>
            <FiberManualRecordIcon sx={{ fontSize: "0.6vw" }} />

            <p>
              طراحى و ارائه دفترچه فيزيكى ويژه ناشنوايان و كم شنوايان براى آسان
              تر شدن ارتباط با آن ها
            </p>
          </div>
          <div className={classes.row}>
            <FiberManualRecordIcon sx={{ fontSize: "0.6vw" }} />

            <p>
              انتشار دفترچه آنلاين راهنماى برخورد با كم شنوايان / ناشنوايان براى
              ارتقاى سطح آكَاهى عمومى و رسميت بخشيدن به زبان اشاره به عنوان پلی
              براى برقرارى ارتباط مؤثر
            </p>
          </div>
          <p>
            با دانلود و مطالعه دفترچه آنلاين، نه تنها سهمى در كَسترش اين آگاهى
            خواهيد داشت، بلكه به ازاى هر دانلود، مبلغى نيز براى تهيه سمعک به كم
            شنوايان اختصاص خواهد يافت.
          </p>
          <h2>بياييد در نيكى به زبان اشاره همراه شويم.</h2>
          <div className={classes.button}>
            <h2
              style={{
                fontFamily: language ? "FarsiBold" : "FarsiBold",
              }}
            >
              به نیکی اشاره کنید
            </h2>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
