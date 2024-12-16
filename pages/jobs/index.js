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
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Tooltip from "@mui/material/Tooltip";
import { toFarsiNumber, replaceSpacesAndHyphens } from "@/services/utility";

export default function Jobs({ jobs }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [displayJobs, setDisplayJobs] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);

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

  useEffect(() => {
    let jobTypes = jobs.map((job) => {
      return {
        type: job[languageType].department,
        active: false,
      };
    });
    const allType = { type: language ? "همه" : "All", active: true };
    // Use a Set to track unique types
    const uniqueTypes = new Set();
    // Add the "All" type if it's not already present
    if (!uniqueTypes.has(allType.type)) {
      jobTypes.unshift(allType);
      uniqueTypes.add(allType.type);
    }
    // Filter out duplicates based on the 'type'
    jobTypes = jobTypes.filter(
      (jobType, index, self) =>
        index === self.findIndex((t) => t.type === jobType.type)
    );
    // Assign the unique jobTypes to setJobTypes
    setJobTypes(jobTypes);
  }, [jobs, language, languageType]);

  const filterDisplayJobs = (type) => {
    const isAll = type === "All" || type === "همه";
    if (isAll) {
      if (permissionControl === "admin") {
        setDisplayJobs(jobs);
      } else {
        setDisplayJobs(jobs.filter((job) => job.active));
      }
      jobTypes.forEach((t, index) => {
        t.active = index === 0;
      });
    } else {
      if (permissionControl === "admin") {
        setDisplayJobs(
          jobs.filter((job) => job[languageType].department === type)
        );
      } else {
        setDisplayJobs(
          jobs.filter(
            (job) => job[languageType].department === type && job.active
          )
        );
      }
      jobTypes.forEach((t) => {
        t.active = t.type === type;
      });
    }
  };

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
                onClick={() => filterDisplayJobs(nav.type)}
              >
                {nav.type}
                <span
                  style={{
                    fontFamily: language ? "EnglishLight" : "EnglishLight",
                  }}
                >
                  |
                </span>
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
                  {permissionControl === "admin" && (
                    <Fragment>
                      {job.active ? (
                        <Tooltip title="Visible">
                          <VerifiedUserIcon
                            sx={{ color: "#57a361", fontSize: 18 }}
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip title="Hidden">
                          <VisibilityOffIcon
                            sx={{ color: "#d40d12", fontSize: 18 }}
                          />
                        </Tooltip>
                      )}
                    </Fragment>
                  )}
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
    console.error(error);
    return {
      notFound: true,
    };
  }
}
