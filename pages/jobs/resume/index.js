import { useState, useContext, Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import { StateContext } from "@/context/stateContext";
import classes from "../jobs.module.scss";
import Router from "next/router";
import dbConnect from "@/services/dbConnect";
import resumeModel from "@/models/Resume";
import { NextSeo } from "next-seo";
import logoEnglish from "@/assets/logoEnglish.svg";
import logoFarsi from "@/assets/logoFarsi.svg";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import {
  getSingleResumeApi,
  updateResumeApi,
  deleteResumeApi,
} from "@/services/api";

export default function Resume({ resumeData }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const [displayTable, setDisplayTable] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (permissionControl === "admin") {
      setDisplayTable(true);
    } else {
      Router.push("/");
    }
  }, [permissionControl]);

  const handleStatus = async (id, action) => {
    let confirmationMessage =
      action === "accept" ? "قبول مطمئنی؟" : "رد مطمئنی؟";
    let confirm = window.confirm(confirmationMessage);
    if (confirm) {
      let data = await getSingleResumeApi(id);
      switch (action) {
        case "accept":
          data.status = "قبول شد";
          break;
        case "reject":
          data.status = "رد شد";
          break;
      }
      await updateResumeApi(data);
      router.replace(router.asPath);
    }
  };

  const deleteResume = async (resume) => {
    let confirmationMessage = "حذف مطمئنی؟";
    let confirm = window.confirm(confirmationMessage);
    if (confirm) {
      await deleteResumeApi(resume["_id"]);
      Router.push("/jobs/resume");
    }
  };

  return (
    <Fragment>
      <NextSeo
        title={language ? "رزومه" : "Resume"}
        description={
          language
            ? "اشاره یک استودیوی طراحی چند رشته ای و مستقل است"
            : "Eshareh is a multidisciplinary, independently owned design studio"
        }
        canonical="https://eshareh.com/jobs/resume"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://eshareh.com/jobs/resume",
          title: language ? "رزومه" : "Resume",
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
      {displayTable && (
        <div className={classes.resumeContainer}>
          {resumeData.map((item, index) => {
            const {
              name,
              birth,
              phone,
              email,
              description,
              media,
              jobsId,
              status,
            } = item;
            return (
              <div key={index} className={classes.resume}>
                <h2
                  style={{
                    fontFamily: "FarsiBold",
                  }}
                >
                  {name}
                </h2>
                <Link
                  href={media}
                  target="_blank"
                  rel="noopener noreferrer"
                  passHref
                >
                  <h3
                    style={{
                      fontFamily: "Farsi",
                    }}
                  >
                    دانلود رزومه
                  </h3>
                </Link>
                <p
                  style={{
                    fontFamily: "English",
                  }}
                >
                  {jobsId}
                </p>
                <p
                  style={{
                    fontFamily: "English",
                  }}
                >
                  {birth}
                </p>
                <p
                  style={{
                    fontFamily: "English",
                  }}
                >
                  0{phone}
                </p>
                <p
                  style={{
                    fontFamily: "English",
                  }}
                >
                  {email}
                </p>
                <p
                  style={{
                    fontFamily: "Farsi",
                  }}
                >
                  {description}
                </p>
                <div
                  className={classes.action}
                  style={{
                    fontFamily: "FarsiBold",
                  }}
                >
                  <Tooltip title="Delete">
                    <DeleteOutlineIcon
                      className="icon"
                      onClick={() => deleteResume(item)}
                    />
                  </Tooltip>
                  {!status ? (
                    <div className={classes.row}>
                      <h3
                        style={{ color: "#6b8745" }}
                        onClick={() => handleStatus(item["_id"], "accept")}
                      >
                        قبول کردن
                      </h3>
                      <h3
                        style={{ color: "#a70237" }}
                        onClick={() => handleStatus(item["_id"], "reject")}
                      >
                        رد کردن
                      </h3>
                    </div>
                  ) : (
                    <h3
                      style={{
                        color: status === "رد شد" ? "#a70237" : "#6b8745",
                      }}
                    >
                      {status}
                    </h3>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Fragment>
  );
}

// initial connection to db
export async function getServerSideProps(context) {
  try {
    await dbConnect();
    const resumeData = await resumeModel.find();
    resumeData.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    return {
      props: {
        resumeData: JSON.parse(JSON.stringify(resumeData)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
