import { Fragment, useState } from "react";
import classes from "./Form.module.scss";

export default function Jobs() {
  const [fields, setFields] = useState([
    { english: { label: "", value: "" }, farsi: { label: "", value: "" } },
  ]);

  const handleAddField = () => {
    setFields([
      ...fields,
      { english: { label: "", value: "" }, farsi: { label: "", value: "" } },
    ]);
  };

  const handleEnglishLabelChange = (index, newLabel) => {
    const newFields = [...fields];
    newFields[index].english.label = newLabel;
    setFields(newFields);
  };

  const handleEnglishValueChange = (index, newValue) => {
    const newFields = [...fields];
    newFields[index].english.value = newValue;
    setFields(newFields);
  };

  const handleFarsiLabelChange = (index, newLabel) => {
    const newFields = [...fields];
    newFields[index].farsi.label = newLabel;
    setFields(newFields);
  };

  const handleFarsiValueChange = (index, newValue) => {
    const newFields = [...fields];
    newFields[index].farsi.value = newValue;
    setFields(newFields);
  };

  const handleRemoveField = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
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
                  برچسب فارسی
                  <span>*</span>
                </p>
              </div>
              <input
                type="text"
                value={field.farsi.label}
                dir="rtl"
                onChange={(e) => handleFarsiLabelChange(index, e.target.value)}
              />
              <div className={classes.barReverse}>
                <p className={classes.label}>
                  مقدار فارسی
                  <span>*</span>
                </p>
              </div>
              <input
                type="text"
                value={field.farsi.value}
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
                type="text"
                value={field.english.label}
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
              <input
                type="text"
                value={field.english.value}
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
    </Fragment>
  );
}
