import { Fragment, useContext, useState, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
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
    { en: { label: "", value: "" }, fa: { label: "", value: "" } },
  ]);
  const [disableButton, setDisableButton] = useState(false);
  const [alert, setAlert] = useState("");

  const router = useRouter();

  const handleAddField = () => {
    setFields([
      ...fields,
      { en: { label: "", value: "" }, fa: { label: "", value: "" } },
    ]);
  };
  const handleEnglishLabelChange = (index, newLabel) => {
    const newFields = [...fields];
    newFields[index].en.label = newLabel;
    setFields(newFields);
  };
  const handleEnglishValueChange = (index, newValue) => {
    const newFields = [...fields];
    newFields[index].en.value = newValue;
    setFields(newFields);
  };
  const handleFarsiLabelChange = (index, newLabel) => {
    const newFields = [...fields];
    newFields[index].fa.label = newLabel;
    setFields(newFields);
  };
  const handleFarsiValueChange = (index, newValue) => {
    const newFields = [...fields];
    newFields[index].fa.value = newValue;
    setFields(newFields);
  };
  const handleRemoveField = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  const createForm = async () => {
    if (fields.length === 0) {
      return;
    }
    const isValid = fields.every(
      (field) => areAllStatesValid([field.en]) && areAllStatesValid([field.fa])
    );
    if (!isValid) {
      showAlert("تمام ورودی‌ها پر کنید");
      return;
    }

    setDisableButton(true);

    const jobsObject = {
      fields: fields,
      active: true,
      jobsId: `jobs${sixGenerator()}`,
    };

    await createJobsApi(jobsObject);
    router.replace(router.asPath);
    setDisableButton(false);
    setFields([{ en: { label: "", value: "" }, fa: { label: "", value: "" } }]);
  };

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };

  return (
    <Fragment>
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
                  برچسب فارسی
                </p>
              </div>
              <input
                style={{
                  fontFamily: "Farsi",
                  marginBottom: "12px",
                }}
                type="text"
                value={field.fa.label}
                dir="rtl"
                onChange={(e) => handleFarsiLabelChange(index, e.target.value)}
              />
              <div className={classes.barReverse}>
                <p className={classes.label}>
                  <span>*</span>
                  مقدار فارسی
                </p>
              </div>
              <textarea
                style={{
                  fontFamily: "Farsi",
                }}
                type="text"
                value={field.fa.value}
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
                  English Label
                  <span>*</span>
                </p>
              </div>
              <input
                style={{
                  fontFamily: "English",
                  marginBottom: "12px",
                }}
                type="text"
                value={field.en.label}
                onChange={(e) =>
                  handleEnglishLabelChange(index, e.target.value)
                }
              />
              <div className={classes.bar}>
                <p className={classes.label}>
                  English Value
                  <span>*</span>
                </p>
              </div>
              <textarea
                style={{
                  fontFamily: "English",
                }}
                type="text"
                value={field.en.value}
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
