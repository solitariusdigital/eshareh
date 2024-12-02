import { useState, useContext, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./admin.module.scss";
import Solutions from "@/components/forms/Solutions";
import Cover from "@/components/forms/Cover";
import News from "@/components/forms/News";
import Pages from "@/components/Pages";
import Router from "next/router";
import dbConnect from "@/services/dbConnect";
import coverModel from "@/models/Cover";
import pageModel from "@/models/Page";
import mediaModel from "@/models/Media";
import JobsDynamic from "@/components/forms/JobsDynamic";

export default function Admin({ covers, pages, mediaData }) {
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { language, setLanguage } = useContext(StateContext);
  const { editNews, setEditNews } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const { editSolution, setEditSolution } = useContext(StateContext);
  const [formType, setFormType] = useState(
    "solutions" || "pages" || "news" || "covers" || "jobs"
  );
  const navigation = ["solutions", "covers", "news", "pages", "jobs"];

  useEffect(() => {
    if (permissionControl !== "admin") {
      Router.push("/portal");
    } else {
      if (editNews) {
        setFormType("news");
      } else {
        setFormType("solutions");
      }
    }
  }, [editNews, permissionControl, setFormType]);

  useEffect(() => {
    navigationTopBar.map((nav, i) => {
      nav.active = false;
    });
    setNavigationTopBar([...navigationTopBar]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.container}>
      <div
        className={classes.navigation}
        style={{
          fontFamily: language ? "English" : "English",
        }}
      >
        {navigation.map((nav, index) => (
          <p
            key={index}
            className={formType === nav ? classes.navActive : classes.nav}
            onClick={() => {
              setFormType(nav);
              setEditNews(null);
              setEditSolution(null);
            }}
          >
            {nav}
          </p>
        ))}
      </div>
      {formType === "solutions" && <Solutions />}
      {formType === "covers" && <Cover covers={covers} />}
      {formType === "news" && <News />}
      {formType === "pages" && <Pages pages={pages} mediaData={mediaData} />}
      {formType === "jobs" && <JobsDynamic />}
    </div>
  );
}

// initial connection to db
export async function getServerSideProps(context) {
  try {
    await dbConnect();
    const covers = await coverModel.find();
    const pages = await pageModel.find();
    const mediaData = await mediaModel.find();
    return {
      props: {
        covers: JSON.parse(JSON.stringify(covers)),
        pages: JSON.parse(JSON.stringify(pages)),
        mediaData: JSON.parse(JSON.stringify(mediaData)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
