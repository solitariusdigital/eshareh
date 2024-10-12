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

export default function Admin({ covers, pages, mediaData }) {
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { language, setLanguage } = useContext(StateContext);
  const [formType, setFormType] = useState(
    "solutions" || "pages" || "news" || "covers"
  );
  const navigation = ["solutions", "covers", "news", "pages"];

  useEffect(() => {
    if (permissionControl !== "admin") {
      Router.push("/portal");
    } else {
      setFormType("solutions");
    }
  }, [permissionControl, setFormType]);

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
            onClick={() => setFormType(nav)}
          >
            {nav}
          </p>
        ))}
      </div>
      {formType === "solutions" && <Solutions />}
      {formType === "covers" && <Cover covers={covers} />}
      {formType === "news" && <News />}
      {formType === "pages" && <Pages pages={pages} mediaData={mediaData} />}
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
