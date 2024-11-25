import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./jobs.module.scss";
import Image from "next/legacy/image";
import portal from "@/assets/portal.png";
import next from "@/assets/next.svg";
import nextYellow from "@/assets/nextYellow.svg";
import { enToFaDigits } from "@/services/utility";

export default function Jobs() {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);

  const jobTypes = [
    {
      type: language ? "همه" : "All",
      active: true,
    },
    {
      type: language ? "امور مالی" : "Finance",
      active: false,
    },
    {
      type: language ? "حساب داری" : "Account",
      active: false,
    },
    {
      type: language ? "خلاقیت" : "Creative",
      active: false,
    },
    {
      type: language ? "استودیو" : "Studio",
      active: false,
    },
    {
      type: language ? "دیجیتال" : "Digital",
      active: false,
    },
    {
      type: language ? "رسانه" : "Media",
      active: false,
    },
    {
      type: language ? "تولید" : "Production",
      active: false,
    },
    {
      type: language ? "منابع انسانی" : "HR",
      active: false,
    },
  ];

  return (
    <>
      <div className={language ? classes.rowOne : classes.rowOneReverse}>
        <div className={classes.infoBox}>
          <h1>{language ? "مشاغل" : "Jobs"}</h1>
          <p>
            {language
              ? "در پورتال شغلی ما، می توانید تمام مشاغل و مشاغل فعلی را پیدا کنید ارائه می دهد. ما مشتاقانه منتظر دریافت درخواست آنلاین شما هستیم."
              : "In our job portal, you can find all current vacancies and job offers. We are looking forward to receiving your online application."}
          </p>
        </div>
        <div className={classes.navBox}>
          <h3>
            {language ? "پیشنهادهای شغلی را پیدا کنید" : "Find job offers"}
          </h3>
          <div className={classes.navigation}>
            {jobTypes.map((nav, index) => (
              <p
                key={index}
                className={!nav.active ? classes.nav : classes.navActive}
              >
                {nav.type}
                {index !== jobTypes.length - 1 && (
                  <span
                    style={{
                      fontFamily: language ? "EnglishLight" : "EnglishLight",
                    }}
                  >
                    |
                  </span>
                )}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className={language ? classes.rowTwo : classes.rowTwoReverse}>
        <div
          className={language ? classes.containerRow : classes.containerReverse}
        >
          <div className={classes.jobBox}>
            <h3>
              {language
                ? `${enToFaDigits(6)} پیشنهاد شغلی موجود`
                : `${6} Avilable job offers`}
            </h3>
            <div className={classes.job}>
              <Image
                className={classes.jobIcon}
                src={screenSize === "mobile" ? nextYellow : next}
                blurDataURL={screenSize === "mobile" ? nextYellow : next}
                alt="image"
                width={10}
                priority
              />
              <p>Account Manager</p>
              <p>|</p>
              <p
                style={{
                  fontFamily: language ? "EnglishLight" : "EnglishLight",
                }}
              >
                Account
              </p>
            </div>
            <div className={classes.job}>
              <Image
                className={classes.jobIcon}
                src={screenSize === "mobile" ? nextYellow : next}
                blurDataURL={screenSize === "mobile" ? nextYellow : next}
                alt="image"
                width={10}
                priority
              />
              <p>Illustrator</p>
              <p>|</p>
              <p
                style={{
                  fontFamily: language ? "EnglishLight" : "EnglishLight",
                }}
              >
                Studio
              </p>
            </div>
            <div className={classes.job}>
              <Image
                className={classes.jobIcon}
                src={screenSize === "mobile" ? nextYellow : next}
                blurDataURL={screenSize === "mobile" ? nextYellow : next}
                alt="image"
                width={10}
                priority
              />
              <p>Senior CopyWriter</p>
              <p>|</p>
              <p
                style={{
                  fontFamily: language ? "EnglishLight" : "EnglishLight",
                }}
              >
                Creative
              </p>
            </div>
            <div className={classes.job}>
              <Image
                className={classes.jobIcon}
                src={screenSize === "mobile" ? nextYellow : next}
                blurDataURL={screenSize === "mobile" ? nextYellow : next}
                alt="image"
                width={10}
                priority
              />
              <p>Acountent</p>
              <p>|</p>
              <p
                style={{
                  fontFamily: language ? "EnglishLight" : "EnglishLight",
                }}
              >
                Finance
              </p>
            </div>
            <div className={classes.job}>
              <Image
                className={classes.jobIcon}
                src={screenSize === "mobile" ? nextYellow : next}
                blurDataURL={screenSize === "mobile" ? nextYellow : next}
                alt="image"
                width={10}
                priority
              />
              <p>Account Manager</p>
              <p>|</p>
              <p
                style={{
                  fontFamily: language ? "EnglishLight" : "EnglishLight",
                }}
              >
                Account
              </p>
            </div>
            <div className={classes.job}>
              <Image
                className={classes.jobIcon}
                src={screenSize === "mobile" ? nextYellow : next}
                blurDataURL={screenSize === "mobile" ? nextYellow : next}
                alt="image"
                width={10}
                priority
              />
              <p>Digital Marketing Specialist</p>
              <p>|</p>
              <p
                style={{
                  fontFamily: language ? "EnglishLight" : "EnglishLight",
                }}
              >
                Digital
              </p>
            </div>
          </div>
          <div className={classes.imageBox}>
            <Image
              className={classes.image}
              src={portal}
              blurDataURL={portal}
              placeholder="blur"
              alt="image"
              layout="responsive"
              objectFit="contain"
              as="image"
              priority
            />
          </div>
        </div>
      </div>
    </>
  );
}
