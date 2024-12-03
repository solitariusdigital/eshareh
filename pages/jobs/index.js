import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./jobs.module.scss";
import Image from "next/legacy/image";
import portal from "@/assets/portal.png";
import next from "@/assets/next.svg";
import nextYellow from "@/assets/nextYellow.svg";
import Router from "next/router";
import dbConnect from "@/services/dbConnect";
import jobsModel from "@/models/Jobs";
import { toFarsiNumber, replaceSpacesAndHyphens } from "@/services/utility";

export default function Jobs({ jobs }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [displayJobs, setDisplayJobs] = useState([]);

  useEffect(() => {
    navigationTopBar.map((nav, i) => {
      nav.active = false;
    });
    setNavigationTopBar([...navigationTopBar]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (permissionControl === "admin") {
      setDisplayJobs(jobs);
    } else {
      setDisplayJobs(jobs.filter((job) => job.active));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <Fragment>
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
                ? `${toFarsiNumber(displayJobs.length)} پیشنهاد شغلی موجود`
                : `${displayJobs.length} Avilable job offers`}
            </h3>
            {displayJobs.map((job, index) => {
              const { title, department } = job[languageType];
              const projectLink = `/jobs/${replaceSpacesAndHyphens(title)}`;
              return (
                <div
                  key={index}
                  className={classes.job}
                  onClick={() => Router.push(projectLink)}
                >
                  <Image
                    className={classes.jobIcon}
                    src={screenSize === "mobile" ? nextYellow : next}
                    blurDataURL={screenSize === "mobile" ? nextYellow : next}
                    alt="image"
                    width={10}
                    priority
                  />
                  <p
                    style={{
                      fontFamily: language ? "FarsiMedium" : "EnglishMedium",
                    }}
                  >
                    {title}
                  </p>
                  <span
                    style={{
                      fontFamily: "English",
                    }}
                  >
                    |
                  </span>
                  <p
                    style={{
                      fontFamily: language ? "Farsi" : "English",
                    }}
                  >
                    {department}
                  </p>
                </div>
              );
            })}
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
    </Fragment>
  );
}

// initial connection to db
export async function getServerSideProps(context) {
  await dbConnect();
  const jobs = await jobsModel.find();
  try {
    return {
      props: {
        jobs: JSON.parse(JSON.stringify(jobs)),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
