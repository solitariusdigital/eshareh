import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./admin.module.scss";
import Solutions from "@/components/forms/Solutions";
import Team from "@/components/forms/Team";
import Cover from "@/components/forms/Cover";
import Pages from "@/components/Pages";
import Router from "next/router";
import dbConnect from "@/services/dbConnect";
import coverModel from "@/models/Cover";
import pageModel from "@/models/Page";
import Image from "next/legacy/image";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { updateCoverApi } from "@/services/api";

export default function Admin({ covers, pages }) {
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { language, setLanguage } = useContext(StateContext);
  const [coversGrid, setCoversGrid] = useState(covers);
  const [text, setText] = useState(false);

  const [formType, setFormType] = useState(
    "Pages" || "solutions" || "team" || "cover"
  );
  const navigation = ["pages", "solutions", "team", "cover"];

  useEffect(() => {
    if (permissionControl !== "admin") {
      Router.push("/portal");
    } else {
      setFormType("pages");
    }
  }, [permissionControl, setFormType]);

  const manageCover = async (type, index) => {
    const cover = {
      ...coversGrid[index],
      color: coversGrid[index].color,
      active: type === "show" ? true : false,
      text: text,
    };
    await updateCoverApi(cover);
    window.location.assign("/admin");
  };

  const handleColorChange = (value, id) => {
    const newCovers = [...coversGrid];
    const coverIndex = newCovers.findIndex((object) => object["_id"] === id);
    newCovers[coverIndex].color = value;
    setCoversGrid(newCovers);
    setText(true);
  };

  const handleText = (value, id) => {
    const newCovers = [...coversGrid];
    const coverIndex = newCovers.findIndex((object) => object["_id"] === id);
    newCovers[coverIndex].text = value;
    setCoversGrid(newCovers);
    setText(value);
  };

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
      {formType === "team" && <Team />}
      {formType === "cover" && <Cover />}
      {formType === "pages" && <Pages pages={pages} />}
      {formType === "cover" && (
        <div className={classes.preview}>
          {coversGrid.map((cover, index) => (
            <div key={index} className={classes.mediaContainer}>
              <Fragment>
                <h3
                  onClick={() => Router.push(cover.link)}
                  style={{
                    fontFamily: language ? "Farsi" : "English",
                  }}
                  className={classes.title}
                >
                  {cover.title[languageType]}
                </h3>
                <div className={classes.action}>
                  <div>
                    {cover.active ? (
                      <Tooltip title="Visible">
                        <VerifiedUserIcon sx={{ color: "#57a361" }} />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Hidden">
                        <VisibilityOffIcon sx={{ color: "#d40d12" }} />
                      </Tooltip>
                    )}
                  </div>
                  <div className={classes.input}>
                    <input
                      style={{
                        fontFamily: "English",
                      }}
                      type="text"
                      id="color"
                      name="color"
                      onChange={(e) =>
                        handleColorChange(e.target.value, cover["_id"])
                      }
                      value={cover.color}
                      autoComplete="off"
                      maxLength={6}
                    />
                    {cover.text ? (
                      <Tooltip title="Hide">
                        <RadioButtonCheckedIcon
                          className="icon"
                          onClick={() => handleText(false, cover["_id"])}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Show">
                        <RadioButtonUncheckedIcon
                          className="icon"
                          onClick={() => handleText(true, cover["_id"])}
                        />
                      </Tooltip>
                    )}
                  </div>
                  <div>
                    <Tooltip title="Hide">
                      <CloseIcon
                        className="icon"
                        onClick={() => manageCover("hide", index)}
                      />
                    </Tooltip>

                    <Tooltip title="Show">
                      <TaskAltIcon
                        className="icon"
                        onClick={() => manageCover("show", index)}
                      />
                    </Tooltip>
                  </div>
                </div>
                {cover.coverMedia.type === "image" ? (
                  <Image
                    src={cover.coverMedia.link}
                    blurDataURL={cover.coverMedia.link}
                    placeholder="blur"
                    alt={cover.title[languageType]}
                    layout="fill"
                    objectFit="cover"
                    as="image"
                    priority
                  />
                ) : (
                  <video
                    className={classes.media}
                    src={cover.coverMedia.link + "#t=0.1"}
                    controls
                    playsInline
                    preload="metadata"
                  />
                )}
              </Fragment>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// initial connection to db
export async function getServerSideProps(context) {
  try {
    await dbConnect();
    const covers = await coverModel.find();
    const pages = await pageModel.find();

    return {
      props: {
        covers: JSON.parse(JSON.stringify(covers)),
        pages: JSON.parse(JSON.stringify(pages)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
