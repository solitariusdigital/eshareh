import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./jobs.module.scss";
import Image from "next/legacy/image";
import jobsImage from "@/assets/jobsImage.png";
import { NextSeo } from "next-seo";
import logoEnglish from "@/assets/logoEnglish.svg";
import logoFarsi from "@/assets/logoFarsi.svg";
import next from "@/assets/next.svg";
import dot from "@/assets/dot.png";
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
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [displayJobs, setDisplayJobs] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [development, setDevelopment] = useState(true);

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
      setDevelopment(false);
    } else {
      setDisplayJobs(jobs.filter((job) => job.active));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let jobTypes = jobs.map((job) => {
      return {
        type: job["fa"].department,
        active: false,
      };
    });
    const allType = { type: language ? "همه" : "همه", active: true };
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterDisplayJobs = (type) => {
    const isAll = type === "همه" || type === "همه";
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
        setDisplayJobs(jobs.filter((job) => job["fa"].department === type));
      } else {
        setDisplayJobs(
          jobs.filter((job) => job["fa"].department === type && job.active)
        );
      }
      jobTypes.forEach((t) => {
        t.active = t.type === type;
      });
    }
  };

  return (
    <Fragment>
      <NextSeo
        title={language ? "فرصت‌های شغلی" : "Jobs"}
        description={
          language
            ? "اشاره یک استودیوی طراحی چند رشته ای و مستقل است"
            : "Eshareh is a multidisciplinary, independently owned design studio"
        }
        canonical="https://eshareh.com/jobs"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://eshareh.com/jobs",
          title: language ? "فرصت‌های شغلی" : "Jobs",
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
      {development && (
        <div className={classes.development}>
          <Image width={50} height={50} src={dot} alt="isLoading" />
          <p>{language ? "به زودی" : "Coming soon"}</p>
        </div>
      )}
      {!development && (
        <Fragment>
          <div
            className={classes.rowOne}
            style={{
              fontFamily: language ? "Farsi" : "Farsi",
            }}
          >
            <div className={classes.infoBox}>
              <h1>فرصت‌های شغلی</h1>
              <p>
                در پورتال شغلی ما می‌توانید تمام فرصت‌های شغلی و آگهی‌های
                استخدام فعلی را مشاهده کنید. مشتاقانه منتظر دریافت درخواست
                آنلاین شما هستیم.
              </p>
            </div>
            <div className={classes.navBox}>
              {permissionControl === "admin" && (
                <button
                  style={{
                    fontFamily: language ? "Farsi" : "Farsi",
                  }}
                  onClick={() => Router.push("/jobs/resume")}
                >
                  لیست رزومه‌ها
                </button>
              )}
              <h3
                style={{
                  fontFamily: language ? "FarsiBold" : "FarsiBold",
                }}
              >
                جستجو در فرصت‌های شغلی
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
                        fontFamily: language ? "FarsiLight" : "FarsiLight",
                      }}
                    >
                      |
                    </span>
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div
            className={classes.rowTwo}
            style={{
              fontFamily: language ? "Farsi" : "Farsi",
            }}
          >
            <div className={classes.containerRow}>
              <div className={classes.jobBox}>
                <h3>
                  {`${toFarsiNumber(displayJobs.length)} فرصت‌ شغلی موجود`}
                </h3>
                {displayJobs.map((job, index) => {
                  const { title, department } = job["fa"];
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
                        blurDataURL={
                          screenSize === "mobile" ? nextYellow : next
                        }
                        alt="image"
                        width={10}
                        priority
                      />
                      <p
                        style={{
                          fontFamily: language ? "FarsiMedium" : "FarsiMedium",
                        }}
                      >
                        {title}
                      </p>
                      <span
                        style={{
                          fontFamily: "Farsi",
                        }}
                      >
                        |
                      </span>
                      <p
                        style={{
                          fontFamily: language ? "Farsi" : "Farsi",
                        }}
                      >
                        {department}
                      </p>
                      {permissionControl === "admin" && (
                        <Fragment>
                          {job.active ? (
                            <Tooltip title="Visible">
                              <VerifiedUserIcon
                                sx={{ color: "#6b8745", fontSize: 18 }}
                              />
                            </Tooltip>
                          ) : (
                            <Tooltip title="Hidden">
                              <VisibilityOffIcon
                                sx={{ color: "#a70237", fontSize: 18 }}
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
                  src={jobsImage}
                  blurDataURL={jobsImage}
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
      )}
    </Fragment>
  );
}

// initial connection to db
export async function getServerSideProps(context) {
  try {
    await dbConnect();
    const jobs = await jobsModel.find();
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
