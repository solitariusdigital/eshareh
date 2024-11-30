import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./jobs.module.scss";
import { enToFaDigits, replaceSpacesAndHyphens } from "@/services/utility";
import SendJob from "@/components/forms/SendJob";

export default function Job({ jobTitle }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);

  return (
    <div
      className={language ? classes.jobContainer : classes.jobContainerReverse}
    >
      <h1>{language ? "مشاغل" : "Jobs"}</h1>
      <h2>{jobTitle}</h2>
      <div className={classes.jobBox}>
        <div>
          <div className={classes.banner}>
            <div className={language ? classes.row : classes.rowReverse}>
              <p
                style={{
                  fontFamily: language ? "FarsiMedium" : "EnglishMedium",
                }}
              >
                Work type:
              </p>
              <p
                style={{
                  fontFamily: language ? "FarsiLight" : "EnglishLight",
                }}
              >
                Full Time
              </p>
            </div>
            <div className={language ? classes.row : classes.rowReverse}>
              <p
                style={{
                  fontFamily: language ? "FarsiMedium" : "EnglishMedium",
                }}
              >
                Work type:
              </p>
              <p
                style={{
                  fontFamily: language ? "FarsiLight" : "EnglishLight",
                }}
              >
                Full Time
              </p>
            </div>
            <div className={language ? classes.row : classes.rowReverse}>
              <p
                style={{
                  fontFamily: language ? "FarsiMedium" : "EnglishMedium",
                }}
              >
                Work type:
              </p>
              <p
                style={{
                  fontFamily: language ? "FarsiLight" : "EnglishLight",
                }}
              >
                Full Time
              </p>
            </div>
          </div>
          <div className={classes.information}>
            <div className={language ? classes.row : classes.rowReverse}>
              <h3
                style={{
                  fontFamily: language ? "FarsiMedium" : "EnglishMedium",
                }}
              >
                Job Description
              </h3>
              <p
                style={{
                  fontFamily: language ? "FarsiLight" : "EnglishLight",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae
                congue mauris rhoncus aenean vel elit scelerisque. In egestas
                erat imperdiet sed euismod nisi porta lorem mollis. Morbi
                tristique senectus et netus.
              </p>
            </div>
            <div className={language ? classes.row : classes.rowReverse}>
              <h3
                style={{
                  fontFamily: language ? "FarsiMedium" : "EnglishMedium",
                }}
              >
                Responsibilities
              </h3>
              <p
                style={{
                  fontFamily: language ? "FarsiLight" : "EnglishLight",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae
                congue mauris rhoncus aenean vel elit scelerisque. In egestas
                erat imperdiet sed euismod nisi porta lorem mollis. Morbi
                tristique senectus et netus.
              </p>
            </div>
            <div className={language ? classes.row : classes.rowReverse}>
              <h3
                style={{
                  fontFamily: language ? "FarsiMedium" : "EnglishMedium",
                }}
              >
                Requirements
              </h3>
              <p
                style={{
                  fontFamily: language ? "FarsiLight" : "EnglishLight",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae
                congue mauris rhoncus aenean vel elit scelerisque. In egestas
                erat imperdiet sed euismod nisi porta lorem mollis. Morbi
                tristique senectus et netus.
              </p>
            </div>
          </div>
        </div>
        <div
          className={language ? classes.senJobForm : classes.senJobFormReverse}
        >
          <SendJob />
        </div>
      </div>
    </div>
  );
}

// initial connection to db
export async function getServerSideProps(context) {
  try {
    return {
      props: {
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
