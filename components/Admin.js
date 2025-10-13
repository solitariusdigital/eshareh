import { useState, useContext, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./Admin.module.scss";
import Solutions from "@/components/forms/Solutions";
import Cover from "@/components/forms/Cover";
import News from "@/components/forms/News";
import Pages from "@/components/Pages";
import Router from "next/router";
import JobsDynamic from "@/components/forms/JobsDynamic";
import { getCoversApi, getPagesApi, getMediaApi } from "@/services/api";

export default function Admin() {
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { language, setLanguage } = useContext(StateContext);
  const { editSolution, setEditSolution } = useContext(StateContext);
  const { editNews, setEditNews } = useContext(StateContext);
  const { editJobs, setEditJobs } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const [formType, setFormType] = useState(
    "solutions" || "news" || "pages" || "covers" || "jobs"
  );
  const navigation = ["solutions", "covers", "pages", "news", "jobs"];

  const [covers, setCovers] = useState([]);
  const [pages, setPages] = useState([]);
  const [mediaData, setMediaData] = useState([]);

  useEffect(() => {
    if (permissionControl !== "admin") {
      Router.push("/login");
    } else {
      if (editNews) {
        setFormType("news");
      } else if (editJobs) {
        setFormType("jobs");
      } else {
        setFormType("solutions");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCovers(await getCoversApi());
        setPages(await getPagesApi());
        setMediaData(await getMediaApi());
      } catch (error) {
        console.error(error);
      }
    };
    if (permissionControl === "admin") {
      fetchData();
    }
  }, [permissionControl]);

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
              setEditSolution(null);
              setEditNews(null);
              setEditJobs(null);
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
