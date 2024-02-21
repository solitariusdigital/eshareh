import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./admin.module.scss";
import SolutionsForm from "@/components/SolutionsForm";
import TeamForm from "@/components/TeamForm";
import CoverForm from "@/components/CoverForm";
import Router from "next/router";
import dbConnect from "@/services/dbConnect";
import coverModel from "@/models/Cover";
import Image from "next/legacy/image";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { updateCoverApi } from "@/services/api";

export default function Admin({ covers }) {
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { language, setLanguage } = useContext(StateContext);
  const [coversGrid, setCoversGrid] = useState(covers);
  const [text, setText] = useState(false);

  const [formType, setFormType] = useState("solutions" || "team") || "cover";
  const types = ["solutions", "team", "cover"];

  useEffect(() => {
    if (permissionControl !== "admin") {
      Router.push("/portal");
    } else {
      setFormType("solutions");
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
        className={classes.types}
        style={{
          fontFamily: language ? "English" : "English",
        }}
      >
        {types.map((type, index) => (
          <p
            key={index}
            className={formType === type ? classes.navActive : classes.nav}
            onClick={() => setFormType(type)}
          >
            {type}
          </p>
        ))}
      </div>
      {formType === "solutions" && <SolutionsForm />}
      {formType === "team" && <TeamForm />}
      {formType === "cover" && <CoverForm />}

      {formType === "cover" && (
        <div className={classes.preview}>
          {coversGrid.map((project, index) => (
            <div key={index} className={classes.mediaContainer}>
              <Fragment>
                <h3
                  onClick={() => Router.push(project.link)}
                  style={{
                    fontFamily: language ? "Farsi" : "English",
                  }}
                  className={classes.title}
                >
                  {project.title[languageType]}
                </h3>
                <div className={classes.action}>
                  <div>
                    {project.active ? (
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
                        handleColorChange(e.target.value, project["_id"])
                      }
                      value={project.color}
                      autoComplete="off"
                      maxLength={6}
                    />
                    {project.text ? (
                      <Tooltip title="Hide">
                        <RadioButtonCheckedIcon
                          className="icon"
                          onClick={() => handleText(false, project["_id"])}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Show">
                        <RadioButtonUncheckedIcon
                          className="icon"
                          onClick={() => handleText(true, project["_id"])}
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
                {project.coverMedia.type === "image" ? (
                  <Image
                    src={project.coverMedia.link}
                    blurDataURL={project.coverMedia.link}
                    placeholder="blur"
                    alt={project.title[languageType]}
                    layout="fill"
                    objectFit="cover"
                    as="image"
                    priority
                  />
                ) : (
                  <video
                    className={classes.media}
                    src={project.coverMedia.link + "#t=0.1"}
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

    return {
      props: {
        covers: JSON.parse(JSON.stringify(covers)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
