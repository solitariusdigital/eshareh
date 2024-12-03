import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import classes from "./jobs.module.scss";
import { replaceSpacesAndHyphens } from "@/services/utility";
import JobSend from "@/components/forms/JobSend";
import dbConnect from "@/services/dbConnect";
import jobsModel from "@/models/Jobs";
import Router from "next/router";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import { getSingleJobsApi, updateJobsApi } from "@/services/api";

export default function Job({ jobs, jobTitle }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [displayJob, setDisplayJob] = useState(null);
  const [dropDown, setDropDpwn] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    let displayJob = null;
    if (permissionControl === "admin") {
      displayJob = jobs.find(
        (p) => p.en.title === jobTitle || p.fa.title === jobTitle
      );
    } else {
      let activeNews = jobs.filter((job) => job.active);
      displayJob = activeNews.find(
        (p) => p.en.title === jobTitle || p.fa.title === jobTitle
      );
    }
    if (!displayJob) {
      Router.push("/404");
      return;
    }
    setDisplayJob(displayJob);
  }, [permissionControl, displayJob, jobs, jobTitle]);

  const manageJob = (type) => {
    setDropDpwn(!dropDown);
    setConfirmMessage(type === "show" ? "Publish" : "Hide");
  };

  const updateJob = async (id) => {
    let data = await getSingleJobsApi(id);
    switch (confirmMessage) {
      case "Publish":
        data.active = true;
        break;
      case "Hide":
        data.active = false;
        break;
    }
    await updateJobsApi(data);
    setDropDpwn(false);
    router.replace(router.asPath);
  };

  return (
    <Fragment>
      {displayJob && (
        <Fragment>
          {permissionControl === "admin" && (
            <Fragment>
              <div className="controlPanel">
                {displayJob.active ? (
                  <Tooltip title="Hide">
                    <VerifiedUserIcon
                      className="icon"
                      sx={{ color: "#57a361" }}
                      onClick={() => manageJob("hide")}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Publish">
                    <VisibilityOffIcon
                      className="icon"
                      sx={{ color: "#d40d12" }}
                      onClick={() => manageJob("show")}
                    />
                  </Tooltip>
                )}
                <Tooltip title="Edit">
                  <EditIcon
                    className="icon"
                    onClick={() => {
                      Router.push("/admin");
                      setEditNews(displayJob);
                    }}
                  />
                </Tooltip>
              </div>
              {dropDown && (
                <div
                  className="dropDown"
                  style={{
                    fontFamily: language ? "English" : "English",
                  }}
                >
                  <h3>{confirmMessage}</h3>
                  <div className="action">
                    <p className="cancel" onClick={() => setDropDpwn(false)}>
                      Cancel
                    </p>
                    <p
                      className="confirm"
                      onClick={() => updateJob(displayJob["_id"])}
                    >
                      Confirm
                    </p>
                  </div>
                </div>
              )}
            </Fragment>
          )}
          <div
            className={
              language ? classes.jobContainer : classes.jobContainerReverse
            }
          >
            <h1 onClick={() => Router.push("/jobs")}>
              {language ? "مشاغل" : "Jobs"}
            </h1>
            <h2>{displayJob[languageType].title}</h2>
            {permissionControl === "admin" && (
              <p
                style={{
                  fontFamily: language ? "English" : "English",
                }}
              >
                {displayJob.jobsId}
              </p>
            )}
            <div className={classes.banner}>
              <div className={language ? classes.row : classes.rowReverse}>
                <p
                  style={{
                    fontFamily: language ? "FarsiMedium" : "EnglishMedium",
                  }}
                >
                  {language ? "نوع کار:" : " Work type:"}
                </p>
                <p
                  style={{
                    fontFamily: language ? "Farsi" : "English",
                  }}
                >
                  {language ? "تمام وقت" : "Full Time"}
                </p>
              </div>
              <div className={language ? classes.row : classes.rowReverse}>
                <p
                  style={{
                    fontFamily: language ? "FarsiMedium" : "EnglishMedium",
                  }}
                >
                  {language ? "بخش:" : "Department:"}
                </p>
                <p
                  style={{
                    fontFamily: language ? "Farsi" : "English",
                  }}
                >
                  {displayJob[languageType].department}
                </p>
              </div>
              <div className={language ? classes.row : classes.rowReverse}>
                <p
                  style={{
                    fontFamily: language ? "FarsiMedium" : "EnglishMedium",
                  }}
                >
                  {language ? "مکان:" : "Location:"}
                </p>
                <p
                  style={{
                    fontFamily: language ? "Farsi" : "English",
                  }}
                >
                  {language ? "تهران" : "Tehran"}
                </p>
              </div>
            </div>
            <div className={classes.jobBox}>
              <div className={classes.information}>
                {displayJob.fields.map((field, index) => {
                  const { title, description } = field[languageType];
                  return (
                    <div key={index}>
                      <h3
                        style={{
                          fontFamily: language
                            ? "FarsiMedium"
                            : "EnglishMedium",
                        }}
                      >
                        {title}
                      </h3>
                      {description.split("\n\n").map((desc, index) => (
                        <p
                          key={index}
                          style={{
                            fontFamily: language
                              ? "FarsiLight"
                              : "EnglishLight",
                          }}
                        >
                          {desc}
                        </p>
                      ))}
                    </div>
                  );
                })}
              </div>
              <div
                className={
                  language ? classes.senJobForm : classes.senJobFormReverse
                }
              >
                <JobSend jobsId={displayJob.jobsId} />
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
        jobTitle: JSON.parse(
          JSON.stringify(replaceSpacesAndHyphens(context.query.job))
        ),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
