import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./contact.module.scss";
import Image from "next/legacy/image";
import shahyad from "@/assets/shahyad.png";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import EmailIcon from "@mui/icons-material/Email";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function Contact() {
  const { language, setLanguage } = useContext(StateContext);

  useEffect(() => {
    document.body.style.background = "#ffffff";
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.cover}>
        <Image
          src={shahyad}
          blurDataURL={shahyad}
          placeholder="blur"
          alt="cover"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      <div className={classes.informationContainer}>
        <div
          className={
            language ? classes.information : classes.informationReverse
          }
        >
          <h1>{language ? "اشاره" : "eshareh"}</h1>
          <div
            className={language ? classes.row : classes.rowReverse}
            onClick={() =>
              window.open(
                "https://www.google.com/maps/place/Eshareh+Advertising+Agency/@35.7747019,51.3940432,18.89z/data=!4m6!3m5!1s0x3f8e0651f88334cf:0xbf2b6076f1e9fc52!8m2!3d35.7746884!4d51.3941131!16s%2Fg%2F1tg6j0hh?entry=ttu"
              )
            }
          >
            <LocationOnIcon />
            {language ? (
              <p>
                تهران، انتهای شیخ بهایی شمالی، نبش بزرگراه نیایش، کوچه ۲۱، پلاک
                ۲، ۱۹۹۵۷۷۵۳۵۳
              </p>
            ) : (
              <p>
                No. 2, 21st Alley, North Sheikh Bahaei St. Tehran, 1995775353,
                Iran
              </p>
            )}
          </div>
          <div
            className={language ? classes.row : classes.rowReverse}
            onClick={() => window.open("tel:+982188044244", "_self")}
          >
            <PhoneEnabledIcon />
            <p>{language ? "+۹۸ ۲۱ ۸۸۰ ۴۴ ۲۴" : "+98 21 880 44 24"}</p>
          </div>
          <div className={language ? classes.row : classes.rowReverse}>
            <ReceiptLongIcon />
            <p>{language ? "+۹۸ ۲۱ ۸۸۰ ۶۰ ۶۶۶" : "+98 21 880 60 666"}</p>
          </div>
          <div className={language ? classes.row : classes.rowReverse}>
            <EmailIcon />
            <p
              style={{
                fontFamily: language ? "English" : "English",
              }}
            >
              info@eshareh.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
