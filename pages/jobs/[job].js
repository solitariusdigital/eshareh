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
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { editJobs, setEditJobs } = useContext(StateContext);
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
                      setEditJobs(displayJob);
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
            className={classes.jobContainer}
            style={{
              fontFamily: language ? "Farsi" : "Farsi",
            }}
          >
            <h1 onClick={() => Router.push("/jobs")}>فرصت‌های شغلی</h1>
            <h2>{displayJob["fa"].title}</h2>
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
              <div className={classes.row}>
                <p
                  style={{
                    fontFamily: language ? "FarsiMedium" : "FarsiMedium",
                  }}
                >
                  دپارتمان:
                </p>
                <p>{displayJob["fa"].department}</p>
              </div>
              <div className={classes.row}>
                <p
                  style={{
                    fontFamily: language ? "FarsiMedium" : "FarsiMedium",
                  }}
                >
                  نوع همکاری:
                </p>
                <p>
                  {displayJob["fa"].workType ? displayJob["fa"].workType : "-"}
                </p>
              </div>
              <div className={classes.row}>
                <p
                  style={{
                    fontFamily: language ? "FarsiMedium" : "FarsiMedium",
                  }}
                >
                  مکان:
                </p>
                <p>
                  {displayJob["fa"].location ? displayJob["fa"].location : "-"}
                </p>
              </div>
            </div>
            <div className={classes.jobBox}>
              <div className={classes.information}>
                {displayJob.fields.map((field, index) => {
                  const { title, description } = field["fa"];
                  return (
                    <div key={index}>
                      <h3
                        style={{
                          fontFamily: language ? "FarsiMedium" : "FarsiMedium",
                        }}
                      >
                        {title}
                      </h3>
                      {description.split("\n\n").map((desc, index) => (
                        <p
                          key={index}
                          style={{
                            fontFamily: language ? "FarsiLight" : "FarsiLight",
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
