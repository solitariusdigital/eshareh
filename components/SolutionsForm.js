import { Fragment, useContext, useState } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./SolutionsForm.module.scss";
import Image from "next/legacy/image";
import CloseIcon from "@mui/icons-material/Close";

export default function SolutionsForm() {
  const { language, setLanguage } = useContext(StateContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [media, setMedia] = useState("");
  const [alert, setAlert] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [loader, setLoader] = useState(false);

  return (
    <Fragment>
      <div className={classes.container}>
        <div
          className={classes.form}
          style={{
            fontFamily: language ? "English" : "English",
          }}
        >
          <p className={classes.title}>English</p>
          <div className={classes.input}>
            <div className={classes.bar}>
              <p className={classes.label}>
                Title
                <span>*</span>
              </p>
              <CloseIcon
                className="icon"
                onClick={() => setTitle("")}
                sx={{ fontSize: 16 }}
              />
            </div>
            <input
              type="text"
              id="title"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              autoComplete="off"
            />
          </div>
          <div className={classes.input}>
            <div className={classes.bar}>
              <p className={classes.label}>
                Description
                <span>*</span>
              </p>
              <CloseIcon
                className="icon"
                onClick={() => setDescription("")}
                sx={{ fontSize: 16 }}
              />
            </div>
            <textarea
              placeholder="..."
              type="text"
              id="description"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              autoComplete="off"
            ></textarea>
          </div>
          <div className={classes.input}>
            <div className={classes.bar}>
              <p className={classes.label}>
                Description
                <span>*</span>
              </p>
              <CloseIcon
                className="icon"
                onClick={() => setDescription("")}
                sx={{ fontSize: 16 }}
              />
            </div>
            <textarea
              placeholder="..."
              type="text"
              id="description"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              autoComplete="off"
            ></textarea>
          </div>
          <div className={classes.input}>
            <div className={classes.bar}>
              <p className={classes.label}>
                Year
                <span>*</span>
              </p>
              <CloseIcon
                className="icon"
                onClick={() => setYear("")}
                sx={{ fontSize: 16 }}
              />
            </div>
            <input
              type="tel"
              id="year"
              name="year"
              onChange={(e) => setYear(e.target.value)}
              value={year}
              autoComplete="off"
            />
          </div>
        </div>
        <div
          className={classes.form}
          style={{
            fontFamily: language ? "Farsi" : "Farsi",
          }}
        >
          <p className={classes.title}>فارسی</p>
          <div className={classes.input}>
            <div className={classes.barReverse}>
              <p className={classes.label}>
                <span>*</span>
                عنوان
              </p>
              <CloseIcon
                className="icon"
                onClick={() => setTitle("")}
                sx={{ fontSize: 16 }}
              />
            </div>
            <input
              type="text"
              id="title"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              autoComplete="off"
              dir="rtl"
            />
          </div>
          <div className={classes.input}>
            <div className={classes.barReverse}>
              <p className={classes.label}>
                <span>*</span>
                خلاصه
              </p>
              <CloseIcon
                className="icon"
                onClick={() => setDescription("")}
                sx={{ fontSize: 16 }}
              />
            </div>
            <textarea
              placeholder="..."
              type="text"
              id="description"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              autoComplete="off"
              dir="rtl"
            ></textarea>
          </div>
          <div className={classes.input}>
            <div className={classes.barReverse}>
              <p className={classes.label}>
                <span>*</span>
                خلاصه
              </p>
              <CloseIcon
                className="icon"
                onClick={() => setDescription("")}
                sx={{ fontSize: 16 }}
              />
            </div>
            <textarea
              placeholder="..."
              type="text"
              id="description"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              autoComplete="off"
              dir="rtl"
            ></textarea>
          </div>
          <div className={classes.input}>
            <div className={classes.barReverse}>
              <p className={classes.label}>
                <span>*</span>
                سال
              </p>
              <CloseIcon
                className="icon"
                onClick={() => setYear("")}
                sx={{ fontSize: 16 }}
              />
            </div>
            <input
              type="tel"
              id="year"
              name="year"
              onChange={(e) => setYear(e.target.value)}
              value={year}
              autoComplete="off"
              dir="rtl"
            />
          </div>
        </div>
      </div>
      <div
        className={classes.formAction}
        style={{
          fontFamily: language ? "FarsiMedium" : "FarsiMedium",
        }}
      >
        <div className={classes.input}>
          <label className="file">
            <input
              onChange={(e) => {
                setMedia(e.target.files[0]);
              }}
              id="inputFile"
              type="file"
              accept="image/*"
            />
            <p>عکس</p>
          </label>
          {media && (
            <div className={classes.mediaPreview}>
              <CloseIcon
                className="icon"
                onClick={() => setMedia("")}
                sx={{ fontSize: 16 }}
              />
              <Image
                className={classes.image}
                width={300}
                height={200}
                objectFit="contain"
                src={URL.createObjectURL(media)}
                alt="image"
                priority
              />
            </div>
          )}
        </div>
        <p className="alert">{alert}</p>
        {loader && (
          <div>
            <Image width={50} height={50} src={loaderImage} alt="isLoading" />
          </div>
        )}
        <button
          disabled={disableButton}
          onClick={() => handleSubmit()}
          style={{
            fontFamily: language ? "FarsiMedium" : "FarsiMedium",
          }}
        >
          ذخیره
        </button>
      </div>
    </Fragment>
  );
}
