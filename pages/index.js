import { useState, useContext, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./home.module.scss";
import Image from "next/legacy/image";
import Typewriter from "@/components/Typewriter";
import { toEnglishNumber, isEnglishNumber } from "@/services/utility";

export default function Henkel() {
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [alert, setAlert] = useState("");
  const [code, setCode] = useState("");
  const [activeArea, setActiveArea] = useState(null);
  const [userData, setUserData] = useState(null);
  const [landingLoad, setLandingLoad] = useState(false);
  const [selectOptions, setSelectOptions] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setLandingLoad(true);
    }, 2500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const peopleInfo = {
    5001033: {
      cover: ["اردبیل", "گیلان", "لرستان"],
      name: "رضا راک",
    },
    5001051: {
      cover: ["خوزستان"],
      name: "احمدرضا صالحي پور باورصاد",
    },
    5001068: {
      cover: ["خراسان رضوی"],
      name: "احسان عطار",
    },
    5001077: {
      cover: ["البرز"],
      name: "بابک برهمند",
    },
    5001202: {
      cover: ["گیلان"],
      name: "محمد عباسي",
    },
    5001222: {
      cover: ["فارس"],
      name: "مهدي ثابت",
    },
    5001234: {
      cover: ["اصفهان"],
      name: "سيد مسيح موسوي زاده",
    },
    5001256: {
      cover: ["بوشهر"],
      name: "ابراهيم فيروز اردكاني",
    },
    5001350: {
      cover: ["فارس"],
      name: "علي پور كاظمي",
    },
    5001351: {
      cover: ["گلستان"],
      name: "سيدرضا بني فاطمي",
    },
    5001366: {
      cover: ["البرز"],
      name: "شهروز حاجي",
    },
    5001367: {
      cover: ["تهران"],
      name: "مهرداد نوري",
    },
    5001372: {
      cover: ["تهران"],
      name: "شمس الدين زارع",
    },
    5001373: {
      cover: ["آذربایجان شرقی"],
      name: "يونس اصغرزاده فيضي",
    },
    5001383: {
      cover: ["مازندران"],
      name: "برديا طالعي",
    },
    5001425: {
      cover: ["البرز"],
      name: "حميد فتحي",
    },
    5001430: {
      cover: ["گیلان"],
      name: "سجاد حقيقي",
    },
    5001434: {
      cover: ["زنجان"],
      name: "رحيم احمدي",
    },
    5001435: {
      cover: ["اردبیل"],
      name: "سجاد قاسمزاده",
    },
    5001437: {
      cover: ["البرز"],
      name: "مهدي انصاري",
    },
    5001438: {
      cover: ["فارس"],
      name: "مصطفي صفاري",
    },
    5001441: {
      cover: ["سیستان و بلوچستان"],
      name: "سحاب سلطاني",
    },
    5001442: {
      cover: ["کرمان"],
      name: "عليرضا نقي زاده سيمکي",
    },
    5001460: {
      cover: ["هرمزگان", "کرمان"],
      name: "پويا مهرجو",
    },
    5001465: {
      cover: ["تهران"],
      name: "مرتضي كريمي",
    },
    5001466: {
      cover: ["تهران"],
      name: "امير ربيعي",
    },
    5001483: {
      cover: ["بوشهر"],
      name: "علي فريدوني",
    },
    5001485: {
      cover: ["خراسان رضوی"],
      name: "امير اسمعيل زاده طرقدري",
    },
    5001489: {
      cover: ["اصفهان"],
      name: "رضا بندرعباسي",
    },
    5001493: {
      cover: ["گیلان"],
      name: "معيار استوار",
    },
    5001537: {
      cover: ["البرز"],
      name: "حجت رستم پور ثمرين",
    },
    5001538: {
      cover: ["البرز"],
      name: "قادر غفوريان صباغ عيدگاهي",
    },
    5001544: {
      cover: ["تهران"],
      name: "آلن اميريان",
    },
    5001545: {
      cover: ["فارس"],
      name: "محمد طمراس نيا",
    },
    5001546: {
      cover: ["اصفهان"],
      name: "صادق اريايي",
    },
    5001552: {
      cover: ["ایلام"],
      name: "فرشاد بهمني",
    },
    5001560: {
      cover: ["کردستان"],
      name: "عبدالله احمدي",
    },
    5001601: {
      cover: ["البرز"],
      name: "چيا دانايي کويک",
    },
    5001603: {
      cover: ["تهران"],
      name: "محبوبه باوند پور",
    },
    5001606: {
      cover: ["فارس"],
      name: "محمدعلي جالبوتي",
    },
    1001011: {
      cover: "all",
      name: "جعفر هزاری ",
    },
    1001022: {
      cover: "all",
      name: " علی اسلامیان",
    },
  };

  const areaMap = {
    "آذربایجان غربی": "azarbayejangharbi",
    "آذربایجان شرقی": "azarbayejansharghi",
    اردبیل: "ardabil",
    اصفهان: "isfahan",
    البرز: "alborz",
    ایلام: "ilam",
    بوشهر: "boshehar",
    تهران: "tehran",
    "خراسان جنوبی": "khorasanjonobi",
    "خراسان رضوی": "khorasanrazavi",
    "خراسان شمالی": "khorasanshomali",
    خوزستان: "khozestan",
    زنجان: "zanjan",
    سمنان: "semnan",
    "سیستان و بلوچستان": "sistanbalochestan",
    فارس: "fars",
    قزوین: "ghazvin",
    قم: "qom",
    کردستان: "kordestan",
    کرمان: "kerman",
    کرمانشاه: "kermanshah",
    گلستان: "golestan",
    گیلان: "gilan",
    لرستان: "lorestan",
    مازندران: "mazanderan",
    مرکزی: "markazi",
    هرمزگان: "hormozgan",
    همدان: "hamedan",
    یزد: "yazd",
  };

  const areaData = {
    alborz: {
      main: "276K",
      rt: "188K",
      ws: "88K",
    },
    ardabil: {
      main: "65K",
      rt: "59K",
      ws: "6K",
    },
    azarbayejangharbi: {
      main: "157K",
      rt: "95K",
      ws: "62K",
    },
    azarbayejansharghi: {
      main: "241K",
      rt: "156K",
      ws: "85K",
    },
    boshehar: {
      main: "75K",
      rt: "50K",
      ws: "25K",
    },
    fars: {
      main: "325K",
      rt: "185K",
      ws: "140K",
    },
    ghazvin: {
      main: "55K",
      rt: "42K",
      ws: "13K",
    },
    gilan: {
      main: "125K",
      rt: "-",
      ws: "-",
    },
    golestan: {
      main: "110K",
      rt: "85K",
      ws: "25K",
    },
    hamedan: {
      main: "85K",
      rt: "52K",
      ws: "33K",
    },
    hormozgan: {
      main: "145K",
      rt: "120K",
      ws: "25K",
    },
    ilam: {
      main: "25K",
      rt: "-",
      ws: "-",
    },
    isfahan: {
      main: "310K",
      rt: "245K",
      ws: "65K",
    },
    kerman: {
      main: "132K",
      rt: "95K",
      ws: "37K",
    },
    kermanshah: {
      main: "65K",
      rt: "45K",
      ws: "20K",
    },
    khorasanjonobi: {
      main: "30K",
      rt: "-",
      ws: "-",
    },
    khorasanrazavi: {
      main: "350K",
      rt: "220K",
      ws: "130K",
    },
    khorasanshomali: {
      main: "27K",
      rt: "-",
      ws: "-",
    },
    khozestan: {
      main: "275K",
      rt: "170K",
      ws: "105K",
    },
    kordestan: {
      main: "99K",
      rt: "55K",
      ws: "44K",
    },
    lorestan: {
      main: "38K",
      rt: "28K",
      ws: "10K",
    },
    markazi: {
      main: "92K",
      rt: "78K",
      ws: "14K",
    },
    mazanderan: {
      main: "242K",
      rt: "177K",
      ws: "65K",
    },
    qom: {
      main: "88K",
      rt: "66K",
      ws: "22K",
    },
    semnan: {
      main: "32K",
      rt: "-",
      ws: "-",
    },
    sistanbalochestan: {
      main: "77K",
      rt: "40K",
      ws: "37K",
    },
    tehran: {
      main: "540K",
      rt: "440K",
      ws: "100K",
    },
    yazd: {
      main: "79K",
      rt: "75K",
      ws: "4K",
    },
    zanjan: {
      main: "71K",
      rt: "58K",
      ws: "13K",
    },
  };

  const assignData = (value) => {
    let englishValue = isEnglishNumber(value) ? value : toEnglishNumber(value);
    setCode(englishValue);
    if (englishValue.length !== 7) return;
    if (peopleInfo[englishValue]) {
      setUserData(peopleInfo[englishValue]);
      if (peopleInfo[englishValue].cover === "all") {
        setSelectOptions(Object.keys(areaMap));
        setActiveArea(Object.keys(areaMap)[0]);
      } else {
        setSelectOptions(peopleInfo[englishValue].cover);
        setActiveArea(peopleInfo[englishValue].cover[0]);
      }
    } else {
      showAlert("کد پرسنلی وجود ندارد");
      setCode("");
      setUserData(null);
    }
  };

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };

  const activeMap = areaMap[activeArea] || userData?.cover[0];

  return (
    <>
      {!landingLoad && screenSize === "mobile" && (
        <div className={classes.background}></div>
      )}
      {landingLoad && (
        <>
          {!userData ? (
            <div className={classes.landing}>
              <div
                className={`${classes.logo} animate__animated animate__pulse`}
              >
                <Image
                  src={
                    "https://eshareh.storage.iran.liara.space/henkel/logo.gif"
                  }
                  blurDataURL={
                    "https://eshareh.storage.iran.liara.space/henkel/logo.gif"
                  }
                  placeholder="blur"
                  layout="fill"
                  objectFit="contain"
                  alt="map"
                  as="image"
                  unoptimized
                />
              </div>
              <div className={classes.text}>
                <Image
                  src={
                    "https://eshareh.storage.iran.liara.space/henkel/immortal.png"
                  }
                  blurDataURL={
                    "https://eshareh.storage.iran.liara.space/henkel/immortal.png"
                  }
                  placeholder="blur"
                  layout="fill"
                  objectFit="contain"
                  alt="map"
                  as="image"
                />
              </div>
              <div className={classes.input}>
                <h3 className={classes.label}>کد پرسنلی وارد کنید</h3>
                <input
                  type="tel"
                  id="code"
                  name="code"
                  onChange={(e) => assignData(e.target.value)}
                  value={code}
                  autoComplete="off"
                  dir="ltr"
                  maxLength={7}
                />
                <p className={classes.alert}>{alert}</p>
              </div>
            </div>
          ) : (
            <div className={classes.mapBox}>
              <div className={classes.input} style={{ margin: "auto" }}>
                <select
                  style={{ fontFamily: "Farsi" }}
                  value={activeArea}
                  onChange={(e) => setActiveArea(e.target.value)}
                >
                  <option value="default" disabled>
                    تغییر استان
                  </option>
                  {selectOptions.map((area, index) => (
                    <option key={index} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>
              <div className={classes.name}>
                <h2
                  style={{
                    fontFamily: "FarsiBold",
                  }}
                >
                  {userData.name}{" "}
                  <span
                    style={{
                      fontFamily: "Farsi",
                      fontSize: "large",
                    }}
                  >
                    خوش آمدید
                  </span>
                </h2>
              </div>
              <div key={activeMap} className={classes.map}>
                <Image
                  src={`https://eshareh.storage.iran.liara.space/henkel/maps/${activeMap}.svg`}
                  blurDataURL={`https://eshareh.storage.iran.liara.space/henkel/maps/${activeMap}.svg`}
                  placeholder="blur"
                  layout="fill"
                  objectFit="contain"
                  alt="map"
                  as="image"
                />
              </div>
              <div className={classes.info}>
                <h2
                  style={{
                    fontFamily: "FarsiBold",
                  }}
                >
                  استان {activeArea}
                </h2>
                <Typewriter text={`${areaData[activeMap]?.main}`} />
                <Typewriter text={`RT: ${areaData[activeMap]?.rt}`} />
                <Typewriter text={`WS: ${areaData[activeMap]?.ws}`} />
              </div>
              <div className={classes.button}>
                <button
                  style={{
                    fontFamily: "FarsiBold",
                  }}
                  onClick={() =>
                    window.open("/statement", "_blank", "noopener,noreferrer")
                  }
                >
                  بیانیه ارتش جاویدان
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
