import { Fragment, useContext, useState, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import classes from "./Form.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import loaderImage from "@/assets/loader.png";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import AES from "crypto-js/aes";
import Image from "next/legacy/image";
import {
  createUserApi,
  updatePageApi,
  getUsersApi,
  updateUserApi,
  deleteUserApi,
} from "@/services/api";
import {
  fourGenerator,
  sixGenerator,
  uploadMedia,
  areAllStatesValid,
  validateEmail,
} from "@/services/utility";

export default function Team({ pages, mediaData }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const [name, setName] = useState({ en: "", fa: "" });
  const [title, setTitle] = useState({ en: "", fa: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [media, setMedia] = useState("");
  const [aboutContent, setAboutContent] = useState({});
  const [alert, setAlert] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [loader, setLoader] = useState(false);
  const [main, setMain] = useState({ en: "", fa: "" });
  const [paragraph, setParagraph] = useState({ en: "", fa: "" });
  const [description, setDescription] = useState({ en: "", fa: "" });
  const [mainSetting, setMainSetting] = useState("");
  const [paragraphSetting, setParagraphSetting] = useState("");
  const [descriptionSetting, setDescriptionSetting] = useState("");
  const [users, setUsers] = useState([]);
  const [userActivation, setUserActivation] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserIndex, setSelectedUserIndex] = useState("default");
  const sourceLink = "https://eshareh.storage.iran.liara.space";
  const router = useRouter();

  useEffect(() => {
    let aboutContent = pages.find((page) => page.slug === "about");
    const { content } = aboutContent;
    setAboutContent(aboutContent);
    setDescription({
      en: content[0].data.en,
      fa: content[0].data.fa,
    });
    setMain({
      en: content[1].data.en,
      fa: content[1].data.fa,
    });
    setParagraph({
      en: content[2].data.en,
      fa: content[2].data.fa,
    });
    setDescriptionSetting(content[0].setting);
    setMainSetting(content[1].setting);
    setParagraphSetting(content[2].setting);
  }, [mediaData, pages]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getUsersApi();
        setUsers(users);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };

  const createUser = async () => {
    const isValid = areAllStatesValid([name, title]);
    if (!isValid || !email || !password || !media) {
      showAlert("موارد ستاره‌دار الزامیست");
      return;
    }
    if (!validateEmail(email)) {
      showAlert(language ? "ایمیل نامعتبر" : "Invalid email");
      return;
    }
    if (password.length < 8) {
      showAlert(
        language
          ? "پسورد باید حداقل 8 کاراکتر باشد"
          : "Password must be minimum 8 characters"
      );
      return;
    }

    setLoader(true);
    setDisableButton(true);

    let mediaLink = "";
    let mediaFormat = ".jpg";
    let mediaFolder = "team";
    const subFolder = `usr${sixGenerator()}`;
    let mediaId = `img${fourGenerator()}`;
    mediaLink = `${sourceLink}/${mediaFolder}/${subFolder}/${mediaId}${mediaFormat}`;
    await uploadMedia(media, mediaId, mediaFolder, subFolder, mediaFormat);

    const user = {
      name: {
        fa: name.fa,
        en: name.en,
      },
      title: {
        fa: title.fa,
        en: title.en,
      },
      email: email,
      password: cryptPassword(),
      media: mediaLink,
      permission: "user",
      display: userActivation,
      lastSeen: new Date(),
      notifications: false,
      status: "offline",
    };
    await createUserApi(user);
    router.reload(router.asPath);
  };

  // encrypt password
  const cryptPassword = () => {
    return AES.encrypt(
      password.trim(),
      process.env.NEXT_PUBLIC_CRYPTO_SECRETKEY
    ).toString();
  };

  const updateAboutContent = async () => {
    const isValid = areAllStatesValid([description, main, paragraph]);
    if (!isValid) {
      showAlert("موارد ستاره‌دار الزامیست");
      return;
    }

    setLoader(true);
    setDisableButton(true);

    const contentObject = {
      _id: aboutContent._id,
      slug: "about",
      title: "About Us",
      content: [
        {
          type: "text",
          setting: descriptionSetting,
          data: {
            fa: description.fa,
            en: description.en,
          },
        },
        {
          type: "text",
          setting: mainSetting,
          data: {
            fa: main.fa,
            en: main.en,
          },
        },
        {
          type: "text",
          setting: paragraphSetting,
          data: {
            fa: paragraph.fa,
            en: paragraph.en,
          },
        },
      ],
    };
    await updatePageApi(contentObject);
    showAlert("ذخیره شد");
    router.reload(router.asPath);
  };

  const updateUser = async () => {
    const isValid = areAllStatesValid([name, title]);
    if (!isValid) {
      showAlert("موارد ستاره‌دار الزامیست");
      return;
    }

    setLoader(true);
    setDisableButton(true);

    const userObject = {
      ...selectedUser,
      name: {
        fa: name.fa,
        en: name.en,
      },
      title: {
        fa: title.fa,
        en: title.en,
      },
      display: userActivation,
    };
    await updateUserApi(userObject);
    showAlert("ویرایش شد");
    router.reload(router.asPath);
  };

  const deleteUser = async (index) => {
    let confirmationMessage = "حذف مطمئنی؟";
    let confirm = window.confirm(confirmationMessage);
    if (confirm) {
      await deleteUserApi(users[index]._id);
      router.reload(router.asPath);
    }
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
          <div className={classes.inputTextArea}>
            <div className={classes.bar}>
              <p className={classes.label}>
                Description
                <span>*</span>
              </p>
              <CloseIcon
                className="icon"
                onClick={() =>
                  setDescription((prevData) => ({
                    ...prevData,
                    en: "",
                  }))
                }
                sx={{ fontSize: 16 }}
              />
            </div>
            <textarea
              style={{
                fontFamily: "English",
              }}
              placeholder="..."
              type="text"
              id="descriptionEn"
              name="description"
              onChange={(e) =>
                setDescription((prevData) => ({
                  ...prevData,
                  en: e.target.value,
                }))
              }
              value={description.en}
              autoComplete="off"
            ></textarea>
          </div>
          <div className={classes.input}>
            <div className={classes.bar}>
              <p className={classes.label}>
                Title
                <span>*</span>
              </p>
              <CloseIcon
                className="icon"
                onClick={() =>
                  setMain((prevData) => ({
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
              id="mainEn"
              name="main"
              onChange={(e) =>
                setMain((prevData) => ({
                  ...prevData,
                  en: e.target.value,
                }))
              }
              value={main.en}
              autoComplete="off"
            ></input>
          </div>
          <div className={classes.inputTextArea}>
            <div className={classes.bar}>
              <p className={classes.label}>
                Paragraph
                <span>*</span>
              </p>
              <CloseIcon
                className="icon"
                onClick={() =>
                  setParagraph((prevData) => ({
                    ...prevData,
                    en: "",
                  }))
                }
                sx={{ fontSize: 16 }}
              />
            </div>
            <textarea
              style={{
                fontFamily: "English",
              }}
              placeholder="..."
              type="text"
              id="paragraphEn"
              name="paragraph"
              onChange={(e) =>
                setParagraph((prevData) => ({
                  ...prevData,
                  en: e.target.value,
                }))
              }
              value={paragraph.en}
              autoComplete="off"
            ></textarea>
          </div>
        </div>
        <div
          className={classes.form}
          style={{
            fontFamily: "Farsi",
          }}
        >
          <div className={classes.inputTextArea}>
            <div className={classes.barReverse}>
              <p className={classes.label}>
                <span>*</span>
                توضیحات
              </p>
              <CloseIcon
                className="icon"
                onClick={() =>
                  setDescription((prevData) => ({
                    ...prevData,
                    fa: "",
                  }))
                }
                sx={{ fontSize: 16 }}
              />
            </div>
            <textarea
              style={{
                fontFamily: "Farsi",
              }}
              placeholder="..."
              type="text"
              id="descriptionFa"
              name="description"
              onChange={(e) =>
                setDescription((prevData) => ({
                  ...prevData,
                  fa: e.target.value,
                }))
              }
              value={description.fa}
              autoComplete="off"
              dir="rtl"
            ></textarea>
          </div>
          <div className={classes.input}>
            <div className={classes.barReverse}>
              <p className={classes.label}>
                <span>*</span>
                عنوان
              </p>
              <CloseIcon
                className="icon"
                onClick={() =>
                  setMain((prevData) => ({
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
              id="mainFa"
              name="main"
              onChange={(e) =>
                setMain((prevData) => ({
                  ...prevData,
                  fa: e.target.value,
                }))
              }
              value={main.fa}
              autoComplete="off"
              dir="rtl"
            ></input>
          </div>
          <div className={classes.inputTextArea}>
            <div className={classes.barReverse}>
              <p className={classes.label}>
                <span>*</span>
                پاراگراف
              </p>
              <CloseIcon
                className="icon"
                onClick={() =>
                  setParagraph((prevData) => ({
                    ...prevData,
                    fa: "",
                  }))
                }
                sx={{ fontSize: 16 }}
              />
            </div>
            <textarea
              style={{
                fontFamily: "Farsi",
              }}
              placeholder="..."
              type="text"
              id="paragraphFa"
              name="paragraph"
              onChange={(e) =>
                setParagraph((prevData) => ({
                  ...prevData,
                  fa: e.target.value,
                }))
              }
              value={paragraph.fa}
              autoComplete="off"
              dir="rtl"
            ></textarea>
          </div>
        </div>
        <div
          className={classes.form}
          style={{
            fontFamily: "Farsi",
          }}
        >
          <p className={classes.message}>
            در صورت خالی بودن رنگ و سایز، پیش فرض سیستم اعمال میشود
          </p>
          <div className={classes.input}>
            <div className={classes.barReverse}>
              <p className={classes.label}>رنگ و سایز توضیحات</p>
              <CloseIcon
                className="icon"
                onClick={() => setDescriptionSetting("")}
                sx={{ fontSize: 16 }}
              />
            </div>
            <input
              style={{
                fontFamily: "English",
              }}
              placeholder="000000 16"
              type="text"
              id="descriptionSetting"
              name="descriptionSetting"
              onChange={(e) => setDescriptionSetting(e.target.value)}
              value={descriptionSetting}
              autoComplete="off"
            ></input>
          </div>
          <div className={classes.input}>
            <div className={classes.barReverse}>
              <p className={classes.label}>رنگ و سایز عنوان</p>
              <CloseIcon
                className="icon"
                onClick={() => setMainSetting("")}
                sx={{ fontSize: 16 }}
              />
            </div>
            <input
              style={{
                fontFamily: "English",
              }}
              placeholder="000000 16"
              type="text"
              id="mainSetting"
              name="mainSetting"
              onChange={(e) => setMainSetting(e.target.value)}
              value={mainSetting}
              autoComplete="off"
            ></input>
          </div>
          <div className={classes.input}>
            <div className={classes.barReverse}>
              <p className={classes.label}>رنگ و سایز پاراگراف</p>
              <CloseIcon
                className="icon"
                onClick={() => setParagraphSetting("")}
                sx={{ fontSize: 16 }}
              />
            </div>
            <input
              style={{
                fontFamily: "English",
              }}
              placeholder="000000 16"
              type="text"
              id="paragraphSetting"
              name="paragraphSetting"
              onChange={(e) => setParagraphSetting(e.target.value)}
              value={paragraphSetting}
              autoComplete="off"
            ></input>
          </div>
          <div
            className={classes.formAction}
            style={{
              fontFamily: "English",
            }}
          >
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
              onClick={() => updateAboutContent()}
            >
              ذخیره داده
            </button>
          </div>
        </div>
      </div>
      <div
        className={classes.container}
        style={{
          borderTop: "1px solid #d6d6d6",
          paddingTop: "50px",
        }}
      >
        <div className={classes.form}>
          <div className={classes.input}>
            <div className={classes.bar}>
              <p
                className={classes.label}
                style={{
                  fontFamily: "English",
                }}
              >
                Team
              </p>
              <CloseIcon
                className="icon"
                onClick={() => {
                  setSelectedUser(null);
                  setName({
                    fa: "",
                    en: "",
                  });
                  setTitle({
                    fa: "",
                    en: "",
                  });
                  setSelectedUserIndex("default");
                }}
                sx={{ fontSize: 16 }}
              />
            </div>
            <select
              style={{
                fontFamily: language ? "Farsi" : "English",
              }}
              value={selectedUserIndex}
              onChange={(e) => {
                setSelectedUser(users[e.target.value]);
                setSelectedUserIndex(e.target.value);
                setName({
                  fa: users[e.target.value].name.fa,
                  en: users[e.target.value].name.en,
                });
                setTitle({
                  fa: users[e.target.value].title.fa,
                  en: users[e.target.value].title.en,
                });
                setUserActivation(users[e.target.value].display);
              }}
            >
              <option value="default" disabled>
                {language ? "انتخاب برای ویرایش" : "Select to update"}
              </option>
              {users?.map((user, index) => {
                return (
                  <option key={index} value={index}>
                    {user.name[languageType]}
                  </option>
                );
              })}
            </select>
          </div>
          {selectedUser && (
            <div className={classes.deleteUser}>
              <button
                style={{
                  fontFamily: "FarsiMedium",
                }}
                onClick={() => deleteUser(selectedUserIndex)}
              >
                حذف
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={classes.container}>
        <div className={classes.form}>
          <div
            style={{
              fontFamily: "English",
            }}
          >
            <div className={classes.input}>
              <div className={classes.bar}>
                <p className={classes.label}>
                  Name
                  <span>*</span>
                </p>
                <CloseIcon
                  className="icon"
                  onClick={() =>
                    setName((prevData) => ({
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
                type="text"
                id="nameEn"
                name="name"
                onChange={(e) =>
                  setName((prevData) => ({
                    ...prevData,
                    en: e.target.value,
                  }))
                }
                value={name.en}
                autoComplete="off"
              />
            </div>
            <div className={classes.input}>
              <div className={classes.bar}>
                <p className={classes.label}>
                  Title
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
              />
            </div>
          </div>
        </div>
        <div className={classes.form}>
          <div
            style={{
              fontFamily: "Farsi",
            }}
          >
            <div className={classes.input}>
              <div className={classes.barReverse}>
                <p className={classes.label}>
                  <span>*</span>
                  نام
                </p>
                <CloseIcon
                  className="icon"
                  onClick={() =>
                    setName((prevData) => ({
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
                type="text"
                id="nameFa"
                name="name"
                onChange={(e) =>
                  setName((prevData) => ({
                    ...prevData,
                    fa: e.target.value,
                  }))
                }
                value={name.fa}
                autoComplete="off"
                dir="rtl"
              />
            </div>
            <div className={classes.input}>
              <div className={classes.barReverse}>
                <p className={classes.label}>
                  <span>*</span>
                  عنوان
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
              />
            </div>
            <div className={classes.input}>
              <div className={classes.barReverse}>
                <p className={classes.label}>
                  کاربر در اسلایدشو نمایش داده شود؟
                </p>
                {userActivation ? (
                  <Tooltip title="Hide">
                    <RadioButtonCheckedIcon
                      className="icon"
                      onClick={() => setUserActivation(false)}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Show">
                    <RadioButtonUncheckedIcon
                      className="icon"
                      onClick={() => setUserActivation(true)}
                    />
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
        </div>
        {!selectedUser && (
          <Fragment>
            <div className={classes.form}>
              <div
                className={classes.input}
                style={{
                  fontFamily: "English",
                }}
              >
                <div className={classes.bar}>
                  <p className={classes.label}>
                    Email
                    <span>*</span>
                  </p>
                  <CloseIcon
                    className="icon"
                    onClick={() => setEmail("")}
                    sx={{ fontSize: 16 }}
                  />
                </div>
                <input
                  style={{
                    fontFamily: "English",
                  }}
                  type="email"
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  autoComplete="off"
                />
              </div>
            </div>
            <div className={classes.form}>
              <div
                className={classes.input}
                style={{
                  fontFamily: "English",
                }}
              >
                <div className={classes.bar}>
                  <p className={classes.label}>
                    Password
                    <span>*</span>
                  </p>
                  <CloseIcon
                    className="icon"
                    onClick={() => setPassword("")}
                    sx={{ fontSize: 16 }}
                  />
                </div>
                <input
                  style={{
                    fontFamily: "English",
                  }}
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  autoComplete="off"
                />
              </div>
            </div>
          </Fragment>
        )}
        <div className={classes.formAction}>
          {!selectedUser && (
            <div
              className={classes.input}
              style={{
                fontFamily: "Farsi",
              }}
            >
              <label className="file">
                <input
                  onChange={(e) => {
                    setMedia(e.target.files[0]);
                  }}
                  type="file"
                  accept="image/*"
                />
                <p>عکس الزامی</p>
              </label>
              {media !== "" && (
                <div className={classes.preview}>
                  <CloseIcon
                    className="icon"
                    onClick={() => setMedia("")}
                    sx={{ fontSize: 16 }}
                  />
                  <Image
                    className={classes.image}
                    width={170}
                    height={200}
                    objectFit="contain"
                    src={URL.createObjectURL(media)}
                    alt="image"
                    priority
                  />
                </div>
              )}
            </div>
          )}
          <p
            className={classes.alert}
            style={{
              fontFamily: "Farsi",
            }}
          >
            {alert}
          </p>
          {loader && (
            <div>
              <Image width={50} height={50} src={loaderImage} alt="isLoading" />
            </div>
          )}
          <button
            disabled={disableButton}
            style={{
              fontFamily: "FarsiMedium",
            }}
            onClick={() => (selectedUser ? updateUser() : createUser())}
          >
            {selectedUser ? "ویرایش داده" : "ذخیره داده"}
          </button>
        </div>
      </div>
    </Fragment>
  );
}
