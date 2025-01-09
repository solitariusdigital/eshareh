import { Fragment, useContext, useState, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import classes from "./Form.module.scss";
import {
  sixGenerator,
  extractParagraphs,
  areAllStatesValid,
} from "@/services/utility";
import { createJobsApi, updateJobsApi } from "@/services/api";

export default function JobsDynamic() {
  const { editJobs, setEditJobs } = useContext(StateContext);
  const [fields, setFields] = useState(
    editJobs
      ? editJobs.fields
      : [
          {
            en: { title: "", description: "" },
            fa: { title: "", description: "" },
          },
        ]
  );
  const [title, setTitle] = useState(
    editJobs
      ? { en: editJobs.en.title, fa: editJobs.fa.title }
      : { en: "", fa: "" }
  );
  const [department, setDepartment] = useState(
    editJobs
      ? { en: editJobs.en.department, fa: editJobs.fa.department }
      : { en: "", fa: "" }
  );
  const [location, setLocation] = useState(
    editJobs
      ? { en: editJobs.en.location, fa: editJobs.fa.location }
      : { en: "", fa: "" }
  );
  const [type, setType] = useState(
    editJobs
      ? { en: editJobs.en.workType, fa: editJobs.fa.workType }
      : { en: "", fa: "" }
  );

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
    newFields[index].en.description = extractParagraphs(newValue).join("\n\n");
    setFields(newFields);
  };
  const handleFarsiLabelChange = (index, newLabel) => {
    const newFields = [...fields];
    newFields[index].fa.title = newLabel;
    setFields(newFields);
  };
  const handleFarsiValueChange = (index, newValue) => {
    const newFields = [...fields];
    newFields[index].fa.description = extractParagraphs(newValue).join("\n\n");
    setFields(newFields);
  };
  const handleRemoveField = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  const createJob = async () => {
    const isValid = areAllStatesValid([title, department, location, type]);
    const isValidFields = fields.every(
      (field) => areAllStatesValid([field.en]) && areAllStatesValid([field.fa])
    );
    if (fields.length === 0) {
      showAlert("فیلد ورودی الزامیست");
      return;
    }
    if (!isValid || !isValidFields) {
      showAlert("موارد ستاره‌دار الزامیست");
      return;
    }

    setDisableButton(true);

    const jobsObject = {
      fa: {
        title: title.fa.trim(),
        department: department.fa.trim(),
        location: location.fa.trim(),
        workType: type.fa.trim(),
      },
      en: {
        title: title.en.trim(),
        department: department.en.trim(),
        location: location.en.trim(),
        workType: type.en.trim(),
      },
      fields: fields,
      active: false,
      jobsId: `jobs${sixGenerator()}`,
    };
    if (editJobs) {
      jobsObject.id = editJobs["_id"];
      await updateJobsApi(jobsObject);
    } else {
      await createJobsApi(jobsObject);
    }
    router.reload(router.asPath);
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
                Work Title
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
          <div className={classes.input}>
            <div className={classes.bar}>
              <p className={classes.label}>
                Work Type
                <span>*</span>
              </p>
              <CloseIcon
                className="icon"
                onClick={() =>
                  setType((prevData) => ({
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
              id="typeEn"
              name="type"
              onChange={(e) =>
                setType((prevData) => ({
                  ...prevData,
                  en: e.target.value,
                }))
              }
              value={type.en}
              autoComplete="off"
            ></input>
          </div>
          <div className={classes.input}>
            <div className={classes.bar}>
              <p className={classes.label}>
                Work Location
                <span>*</span>
              </p>
              <CloseIcon
                className="icon"
                onClick={() =>
                  setLocation((prevData) => ({
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
              id="locationEn"
              name="location"
              onChange={(e) =>
                setLocation((prevData) => ({
                  ...prevData,
                  en: e.target.value,
                }))
              }
              value={location.en}
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
                عنوان کار
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
          <div className={classes.input}>
            <div className={classes.barReverse}>
              <p className={classes.label}>
                <span>*</span>
                نوع کار
              </p>
              <CloseIcon
                className="icon"
                onClick={() =>
                  setType((prevData) => ({
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
              id="typeFa"
              name="type"
              onChange={(e) =>
                setType((prevData) => ({
                  ...prevData,
                  fa: e.target.value,
                }))
              }
              value={type.fa}
              autoComplete="off"
              dir="rtl"
            ></input>
          </div>
          <div className={classes.input}>
            <div className={classes.barReverse}>
              <p className={classes.label}>
                <span>*</span>
                محل کار
              </p>
              <CloseIcon
                className="icon"
                onClick={() =>
                  setLocation((prevData) => ({
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
              id="locationFa"
              name="location"
              onChange={(e) =>
                setLocation((prevData) => ({
                  ...prevData,
                  fa: e.target.value,
                }))
              }
              value={location.fa}
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
          فیلد جدید
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
                  عنوان مورد
                </p>
              </div>
              <input
                style={{
                  fontFamily: "Farsi",
                  marginBottom: "12px",
                }}
                id={index}
                placeholder="..."
                type="text"
                value={field.fa.title}
                dir="rtl"
                onChange={(e) => handleFarsiLabelChange(index, e.target.value)}
              />
              <div className={classes.barReverse}>
                <p className={classes.label}>
                  <span>*</span>
                  توضیحات مورد
                </p>
              </div>
              <textarea
                style={{
                  fontFamily: "Farsi",
                }}
                id={index}
                placeholder="..."
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
                  Item Title
                  <span>*</span>
                </p>
              </div>
              <input
                style={{
                  fontFamily: "English",
                  marginBottom: "12px",
                }}
                id={index}
                placeholder="..."
                type="text"
                value={field.en.title}
                onChange={(e) =>
                  handleEnglishLabelChange(index, e.target.value)
                }
              />
              <div className={classes.bar}>
                <p className={classes.label}>
                  Item Description
                  <span>*</span>
                </p>
              </div>
              <textarea
                style={{
                  fontFamily: "English",
                }}
                id={index}
                placeholder="..."
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
          onClick={() => createJob()}
        >
          ذخیره داده
        </button>
      </div>
    </Fragment>
  );
}
