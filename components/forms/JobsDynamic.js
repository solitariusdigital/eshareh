import { Fragment, useContext, useState, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import classes from "./Form.module.scss";
import {
  fourGenerator,
  sixGenerator,
  uploadMedia,
  replaceSpacesAndHyphens,
  areAllStatesValid,
} from "@/services/utility";
import { createJobsApi } from "@/services/api";

export default function JobsDynamic() {
  const { language, setLanguage } = useContext(StateContext);

  const [fields, setFields] = useState([
    { en: { title: "", description: "" }, fa: { title: "", description: "" } },
  ]);
  const [title, setTitle] = useState({ en: "", fa: "" });
  const [department, setDepartment] = useState({ en: "", fa: "" });
  const [disableButton, setDisableButton] = useState(false);
  const [alert, setAlert] = useState("");

  const router = useRouter();

  const handleAddField = () => {
    setFields([
      ...fields,
      {
        en: { title: "", description: "" },
        fa: { title: "", description: "" },
      },
    ]);
  };
  const handleEnglishLabelChange = (index, newLabel) => {
    const newFields = [...fields];
    newFields[index].en.title = newLabel;
    setFields(newFields);
  };
  const handleEnglishValueChange = (index, newValue) => {
    const newFields = [...fields];
    newFields[index].en.description = newValue;
    setFields(newFields);
  };
  const handleFarsiLabelChange = (index, newLabel) => {
    const newFields = [...fields];
    newFields[index].fa.title = newLabel;
    setFields(newFields);
  };
  const handleFarsiValueChange = (index, newValue) => {
    const newFields = [...fields];
    newFields[index].fa.description = newValue;
    setFields(newFields);
  };
  const handleRemoveField = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  const createForm = async () => {
    const isValid = areAllStatesValid([title, department]);
    const isValidFields = fields.every(
      (field) => areAllStatesValid([field.en]) && areAllStatesValid([field.fa])
    );

    if (!isValid || !isValidFields) {
      showAlert("همه موارد الزامیست");
      return;
    }

    setDisableButton(true);

    const jobsObject = {
      fa: {
        title: title.fa,
        department: department.fa,
      },
      en: {
        title: title.en,
        department: department.en,
      },
      fields: fields,
      active: true,
      jobsId: `jobs${sixGenerator()}`,
    };

    await createJobsApi(jobsObject);
    router.replace(router.asPath);
    setDisableButton(false);
    setFields([
      {
        en: { title: "", description: "" },
        fa: { title: "", description: "" },
      },
    ]);
  };

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };

  return (
    <Fragment>
      <div className={classes.container}>
        <div
          className={classes.form}
          style={{
            fontFamily: "English",
          }}
        >
          <div className={classes.input}>
            <div className={classes.bar}>
              <p className={classes.label}>
                Job Title
                <span>*</span>
              </p>
              <CloseIcon
                className="icon"
                onClick={() =>
                  setTitle((prevData) => ({
                    ...prevData,
                    en: "",
                  }))
                }
                sx={{ fontSize: 16 }}
              />
            </div>
            <input
              style={{
                fontFamily: "English",
              }}
              placeholder="..."
              type="text"
              id="titleEn"
              name="title"
              onChange={(e) =>
                setTitle((prevData) => ({
                  ...prevData,
                  en: e.target.value,
                }))
              }
              value={title.en}
              autoComplete="off"
            ></input>
          </div>
          <div className={classes.input}>
            <div className={classes.bar}>
              <p className={classes.label}>
                Department
                <span>*</span>
              </p>
              <CloseIcon
                className="icon"
                onClick={() =>
                  setDepartment((prevData) => ({
                    ...prevData,
                    en: "",
                  }))
                }
                sx={{ fontSize: 16 }}
              />
            </div>
            <input
              style={{
                fontFamily: "English",
              }}
              placeholder="..."
              type="text"
              id="departmentEn"
              name="department"
              onChange={(e) =>
                setDepartment((prevData) => ({
                  ...prevData,
                  en: e.target.value,
                }))
              }
              value={department.en}
              autoComplete="off"
            ></input>
          </div>
        </div>
        <div
          className={classes.form}
          style={{
            fontFamily: "Farsi",
          }}
        >
          <div className={classes.input}>
            <div className={classes.barReverse}>
              <p className={classes.label}>
                <span>*</span>
                عنوان شغل
              </p>
              <CloseIcon
                className="icon"
                onClick={() =>
                  setTitle((prevData) => ({
                    ...prevData,
                    fa: "",
                  }))
                }
                sx={{ fontSize: 16 }}
              />
            </div>
            <input
              style={{
                fontFamily: "Farsi",
              }}
              placeholder="..."
              type="text"
              id="titleFa"
              name="title"
              onChange={(e) =>
                setTitle((prevData) => ({
                  ...prevData,
                  fa: e.target.value,
                }))
              }
              value={title.fa}
              autoComplete="off"
              dir="rtl"
            ></input>
          </div>
          <div className={classes.input}>
            <div className={classes.barReverse}>
              <p className={classes.label}>
                <span>*</span>
                دپارتمان
              </p>
              <CloseIcon
                className="icon"
                onClick={() =>
                  setDepartment((prevData) => ({
                    ...prevData,
                    fa: "",
                  }))
                }
                sx={{ fontSize: 16 }}
              />
            </div>
            <input
              style={{
                fontFamily: "Farsi",
              }}
              placeholder="..."
              type="text"
              id="departmentFa"
              name="department"
              onChange={(e) =>
                setDepartment((prevData) => ({
                  ...prevData,
                  fa: e.target.value,
                }))
              }
              value={department.fa}
              autoComplete="off"
              dir="rtl"
            ></input>
          </div>
        </div>
      </div>
      <div className={classes.form}>
        <button
          style={{
            fontFamily: "Farsi",
          }}
          className={classes.addField}
          onClick={handleAddField}
        >
          فیلد ورودی
        </button>
      </div>
      <div className={classes.container}>
        {fields.map((field, index) => (
          <div key={index} className={classes.form}>
            <div
              className={classes.input}
              style={{
                fontFamily: "Farsi",
              }}
            >
              <div className={classes.barReverse}>
                <p className={classes.label}>
                  <span>*</span>
                  عنوان
                </p>
              </div>
              <input
                style={{
                  fontFamily: "Farsi",
                  marginBottom: "12px",
                }}
                type="text"
                value={field.fa.title}
                dir="rtl"
                onChange={(e) => handleFarsiLabelChange(index, e.target.value)}
              />
              <div className={classes.barReverse}>
                <p className={classes.label}>
                  <span>*</span>
                  توضیحات
                </p>
              </div>
              <textarea
                style={{
                  fontFamily: "Farsi",
                }}
                type="text"
                value={field.fa.description}
                dir="rtl"
                onChange={(e) => handleFarsiValueChange(index, e.target.value)}
              />
            </div>
            <div
              className={classes.input}
              style={{
                fontFamily: "English",
              }}
            >
              <div className={classes.bar}>
                <p className={classes.label}>
                  Title
                  <span>*</span>
                </p>
              </div>
              <input
                style={{
                  fontFamily: "English",
                  marginBottom: "12px",
                }}
                type="text"
                value={field.en.title}
                onChange={(e) =>
                  handleEnglishLabelChange(index, e.target.value)
                }
              />
              <div className={classes.bar}>
                <p className={classes.label}>
                  Description
                  <span>*</span>
                </p>
              </div>
              <textarea
                style={{
                  fontFamily: "English",
                }}
                type="text"
                value={field.en.description}
                onChange={(e) =>
                  handleEnglishValueChange(index, e.target.value)
                }
              />
              <button
                className={classes.removeField}
                style={{
                  fontFamily: "Farsi",
                }}
                onClick={() => handleRemoveField(index)}
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className={classes.formAction}>
        <p
          className={classes.alert}
          style={{
            fontFamily: "Farsi",
          }}
        >
          {alert}
        </p>
        <button
          disabled={disableButton}
          style={{
            fontFamily: "FarsiMedium",
          }}
          onClick={() => createForm()}
        >
          ذخیره داده
        </button>
      </div>
    </Fragment>
  );
}
