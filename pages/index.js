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
    5001077: { cover: ["البرز"], name: "بابک برهمند" },
    5001202: { cover: ["گیلان"], name: "محمد عباسي" },
    5001222: { cover: ["فارس"], name: "مهدي ثابت" },
    5001234: {
      cover: ["اصفهان"],
      name: "سيد مسيح موسوي زاده",
    },
    5001256: {
      cover: ["بوشهر"],
      name: "ابراهيم فيروز اردكاني",
    },
    5001350: { cover: ["فارس"], name: "علي پور كاظمي" },
    5001351: { cover: ["گلستان"], name: "سيدرضا بني فاطمي" },
    5001366: { cover: ["البرز"], name: "شهروز حاجي" },
    5001367: { cover: ["تهران"], name: "مهرداد نوري" },
    5001372: { cover: ["تهران"], name: "شمس الدين زارع" },
    5001373: {
      cover: ["آذربایجان شرقی"],
      name: "يونس اصغرزاده فيضي",
    },
    5001383: { cover: ["مازندران"], name: "برديا طالعي" },
    5001425: { cover: ["البرز"], name: "حميد فتحي" },
    5001430: { cover: ["گیلان"], name: "سجاد حقيقي" },
    5001434: { cover: ["زنجان"], name: "رحيم احمدي" },
    5001435: { cover: ["اردبیل"], name: "سجاد قاسمزاده" },
    5001437: { cover: ["البرز"], name: "مهدي انصاري" },
    5001438: { cover: ["فارس"], name: "مصطفي صفاري" },
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
    5001465: { cover: ["تهران"], name: "مرتضي كريمي" },
    5001466: { cover: ["تهران"], name: "امير ربيعي" },
    5001483: { cover: ["بوشهر"], name: "علي فريدوني" },
    5001485: {
      cover: ["خراسان رضوی"],
      name: "امير اسمعيل زاده طرقدري",
    },
    5001489: { cover: ["اصفهان"], name: "رضا بندرعباسي" },
    5001493: { cover: ["گیلان"], name: "معيار استوار" },
    5001537: { cover: ["البرز"], name: "حجت رستم پور ثمرين" },
    5001538: {
      cover: ["البرز"],
      name: "قادر غفوريان صباغ عيدگاهي",
    },
    5001544: { cover: ["تهران"], name: "آلن اميريان" },
    5001545: { cover: ["فارس"], name: "محمد طمراس نيا" },
    5001546: { cover: ["اصفهان"], name: "صادق اريايي" },
    5001552: { cover: ["ایلام"], name: "فرشاد بهمني" },
    5001560: { cover: ["کردستان"], name: "عبدالله احمدي" },
    5001601: { cover: ["البرز"], name: "چيا دانايي کويک" },
    5001603: { cover: ["تهران"], name: "محبوبه باوند پور" },
    5001606: { cover: ["فارس"], name: "محمدعلي جالبوتي" },
    5006025: { cover: ["قزوین"], name: "فريبرز قشلاقي" },
    5006048: { cover: ["تهران"], name: "محسن قاسمي کندري" },
    5006050: { cover: ["تهران"], name: "سيد مهدي حجازي" },
    5006051: { cover: ["یزد"], name: "شهاب مزيدي" },
    5006094: { cover: ["اصفهان"], name: "حميدرضا جلالي" },
    5006097: { cover: ["اصفهان"], name: "محمد ابراهيمي راد" },
    5006099: { cover: ["خوزستان"], name: "ياسين مرادي" },
    5006104: { cover: ["تهران"], name: "سيامک موحدي" },
    5006108: {
      cover: ["آذربایجان شرقی"],
      name: "محمد عبدوي بافتاني",
    },
    5006109: { cover: ["تهران"], name: "مانيا نوروزي" },
    5006115: {
      cover: ["آذربایجان شرقی"],
      name: "وحيد عليزاده",
    },
    5006127: { cover: ["همدان"], name: "حسين قرباني" },
    5006233: { cover: ["تهران"], name: "رومينا السادات سکاکي" },
    5006257: {
      cover: ["همدان"],
      name: "رشيد سلطاني حيدرزاده",
    },
    5006307: { cover: ["مرکزی"], name: "عرفان سلامت" },
    5006333: { cover: ["گلستان"], name: "عبدالعزيز شادکام" },
    5006363: { cover: ["مازندران"], name: "حسين يزداني" },
    5006364: {
      cover: ["مازندران"],
      name: "نجمه سادات صالحي نيا",
    },
    5006438: {
      cover: ["آذربایجان غربی"],
      name: "ياور شمزين",
    },
    5006488: { cover: ["سمنان"], name: "احسان نادري" },
    5006558: {
      cover: ["کرمان"],
      name: "مسعود قاسمي رشيد آبادي",
    },
    5006564: { cover: ["کرمان"], name: "عماد نامجو فرد" },
    5006596: {
      cover: ["هرمزگان"],
      name: "پوريا حيدري سيرمندي",
    },
    5006669: { cover: ["فارس"], name: "مجتبي کريمي" },
    5006739: { cover: ["اصفهان"], name: "مهدي قاسمي" },
    5006774: {
      cover: ["اصفهان"],
      name: "فخرالسادات مير مولايي",
    },
    5006786: { cover: ["اصفهان"], name: "رامين نيکونژاد" },
    5006798: { cover: ["یزد"], name: "حميدرضا قانع عزآبادي" },
    5006841: {
      cover: ["تهران"],
      name: "سيدحميدرضا ميرکريمي نميني",
    },
    5007045: { cover: ["خوزستان"], name: "امين برات پور" },
    5007053: {
      cover: ["خوزستان"],
      name: "سميرا عبداله زاده",
    },
    5007109: {
      cover: ["خراسان رضوی"],
      name: "سعيد قاسم پور هدايت آباد",
    },
    5007118: {
      cover: ["خراسان رضوی"],
      name: "رضا عطار",
    },
    5007128: {
      cover: ["خراسان رضوی"],
      name: "مرتضي اكبري شالچي",
    },
    5007147: {
      cover: ["خراسان رضوی"],
      name: "بهاره رمضاني",
    },
    5007172: { cover: ["قم"], name: "مرتضي بندگي كولانكوه" },
    5007212: {
      cover: ["مازندران"],
      name: "ارسطو مرادي پور",
    },
    5007328: {
      cover: ["خراسان رضوی"],
      name: "زهرا اشرفي پارسا",
    },
    5007342: { cover: ["تهران"], name: "ريحانه ارشيا" },
    5007349: { cover: ["مازندران"], name: "ساغر بافنده" },
    5007359: { cover: ["البرز"], name: "بهناز پورفتحي" },
    5007378: {
      cover: ["کرمانشاه"],
      name: "ميلاد شعباني حسين آبادي",
    },
    5007398: {
      cover: ["آذربایجان شرقی"],
      name: "ندا مقدم شبيلو",
    },
    5007512: {
      cover: ["آذربایجان شرقی"],
      name: "احد خدائي",
    },
    5007514: {
      cover: ["آذربایجان غربی"],
      name: "اصغر عمران زاده گمي چي",
    },
    5007709: {
      cover: ["آذربایجان شرقی"],
      name: "پیمان صابری",
    },
    5007773: {
      cover: ["مازندران"],
      name: "فائزه يزدان فر",
    },
    5007854: {
      cover: ["خراسان شمالی"],
      name: "احمد رحيمي",
    },
    5007932: { cover: ["فارس"], name: "مرضيه زنهاري" },
    5007961: {
      cover: ["خوزستان"],
      name: "سيد ابراهيم سماک",
    },
    5008033: { cover: ["تهران"], name: "سعيد سيد صالحي" },
    5008034: { cover: ["خوزستان"], name: "روزبه زرشکي" },
    5008037: {
      cover: ["آذربایجان شرقی"],
      name: "سياوش حسن پورخرازي",
    },
    5008295: {
      cover: ["آذربایجان غربی"],
      name: "بابک محبت",
    },
    5008323: {
      cover: ["خراسان جنوبی"],
      name: "محمود حسن پور",
    },
    5008335: { cover: ["اردبیل"], name: "مهدي رحيمي" },
    6001171: { cover: ["گلستان"], name: "نورالدین کر" },
    6001239: { cover: ["همدان"], name: "علیرضا امینی" },
    6001259: {
      cover: ["خراسان رضوی"],
      name: "رامین مختارزاده",
    },
    6001279: {
      cover: ["گلستان"],
      name: "عبدالمجید صادقی نژاد",
    },
    5008140: { cover: ["تهران"], name: "آوا ایزدی" },
    5007507: {
      cover: ["خراسان رضوی"],
      name: "صفيه مهاجر",
    },
    5006583: { cover: ["هرمزگان"], name: "مريم محمدي ريگ" },
    6001404: { cover: ["کرمانشاه"], name: "مسلم محبی" },
    5006120: {
      cover: ["آذربایجان شرقی"],
      name: "پریسا نریمانی",
    },
    5006117: {
      cover: ["آذربایجان غربی"],
      name: "مائده بیگی",
    },
    5001124: { cover: ["فارس"], name: "فاطمه رهبر" },
    5006748: { cover: ["اصفهان"], name: "نرگس شفیعی" },
    5007139: {
      cover: ["خراسان رضوی"],
      name: "نفیسه زاهدی",
    },
    5001092: { cover: ["تهران"], name: "بهاره فتح اللهی" },
    5006128: { cover: ["البرز"], name: "شقایق تندر " },
    5007771: { cover: ["تهران"], name: "ماندانا نریمانی" },
    5006131: { cover: ["تهران"], name: "زهره برزگر" },
    5001227: { cover: ["تهران"], name: "الناز رجایی" },
    1001011: { name: "جعفر هزاری ", cover: "all" },
    1001012: { cover: ["تهران"], name: "رعنا اقوامی" },
    1001013: { cover: ["تهران"], name: "فاطمه گرجی" },
    1001014: { cover: ["تهران"], name: "آرش یادگاری" },
    1001015: { cover: ["تهران"], name: "امیر بهاری" },
    1001016: { cover: ["تهران"], name: "الهه اسدی" },
    1001017: { cover: ["تهران"], name: "محمد اشرافی " },
    1001018: { cover: ["تهران"], name: "مهسا رمضانی " },
    1001019: { cover: ["تهران"], name: "مایا عظیمی" },
    1001010: { cover: ["تهران"], name: "فراز خلج" },
    1001020: { cover: ["تهران"], name: "سحر یوسفی " },
    1001021: { cover: ["تهران"], name: "مریم اکبرزاده" },
    1001022: { name: " علی اسلامیان", cover: "all" },
    1001023: { cover: ["تهران"], name: "میثم معصومی " },
    1001024: {
      cover: [
        "تهران",
        "سیستان و بلوچستان",
        "خراسان شمالی",
        "خراسان جنوبی",
        "خراسان رضوی",
        "کرمان",
        "هرمزگان",
      ],
      name: "محمدرضا صمصامی",
    },
    1001025: {
      cover: ["تهران", "خوزستان", "بوشهر", "یزد", "اصفهان", "فارس"],
      name: "ابراهیم یوسف پور",
    },
    1001026: { cover: ["تهران"], name: "مجتبی بهرامی" },
    1001027: { cover: ["تهران"], name: "مارینه طهماسیان" },
    1001028: { cover: ["تهران"], name: "نیلوفر ثمودی" },
    1001029: { cover: ["تهران"], name: " میترا باقری " },
    1001030: { cover: ["تهران"], name: "عاطفه خاکسار " },
    1001031: { cover: ["تهران"], name: "آیه پورزینال " },
    1001032: { cover: ["تهران"], name: "مبینا صداقت " },
    1001033: { cover: ["تهران"], name: "حسن عقلمندی " },
    1001034: { cover: ["تهران"], name: "قاسم مظاهری" },
    1001035: { cover: ["تهران"], name: "حجت اثنا عشری" },
    1001036: { cover: ["تهران"], name: "مهدی نوری " },
    1001037: { cover: ["تهران"], name: "پارسا صدر محمدی" },
    5007941: { cover: ["تهران"], name: "مرتضی صبح خیز " },
    5006016: { cover: ["تهران"], name: "مصطفی متاجی " },
    5001072: { cover: ["تهران"], name: "ابراهيم نصيري" },
    5001119: { cover: ["تهران"], name: "قاسم صالحي" },
    5001073: { cover: ["تهران"], name: "امیر نوری" },
    5001149: { cover: ["تهران"], name: "حميدرضا صالحي" },
    5001186: { cover: ["تهران"], name: "آريا منفرد" },
    5001270: { cover: ["تهران"], name: "امید نصیراللهی" },
    5001012: { cover: ["تهران"], name: " حميد قاسمي" },
    5001319: { cover: ["تهران"], name: "ليلا پيكاني" },
    5001559: { cover: ["تهران"], name: "مرجان شیروانی" },
    5006008: { cover: ["تهران"], name: "فریبا صمدی " },
    5001590: { cover: ["تهران"], name: " مهسا نریمانی " },
    1001038: { cover: ["تهران"], name: "شکیبا بنی اسد " },
    1001039: { cover: ["تهران"], name: "فاطمه باقری" },
    1001040: { cover: ["تهران"], name: "مریم سعیدی " },
    1001041: { cover: ["تهران"], name: "الناز شجاعی " },
    1001042: { cover: ["تهران"], name: "مرضیه منطقی " },
    1001043: { cover: ["تهران"], name: "نسیم مصری" },
    1001044: { cover: ["تهران"], name: "پانیذ رئیسی " },
    1001045: { cover: ["تهران"], name: "ماریه نیک پی" },
    1001046: { cover: ["تهران"], name: "اروشا پیرعلی " },
    1001047: { cover: ["تهران"], name: "کیانا شاهین فر " },
    1001048: { cover: ["تهران"], name: "نسیم زکایی" },
    1001049: { cover: ["تهران"], name: "نوشین فرزاد " },
    1001050: { cover: ["تهران"], name: "عسل فداکار " },
    1001051: { cover: ["تهران"], name: "مارال طابعی" },
    1001052: { cover: ["تهران"], name: "سعید خادمی" },
    1001053: { cover: ["تهران"], name: "زهرا ریاضت" },
    1001054: { cover: ["تهران"], name: "لژیا زندیه " },
    1001055: {
      cover: [
        "البرز",
        "ارومیه",
        "ایلام",
        "تبریز",
        "تهران",
        "قزوین",
        "کردستان",
        "کرمانشاه",
        "گلستان",
      ],
      name: "نازیلا مظاهری",
    },
    1001056: {
      cover: [
        "اردبیل",
        "تهران",
        "قم",
        "گیلان",
        "لرستان",
        "مازندران",
        "مرکزی",
        "همدان",
      ],
      name: "ندا بنارویی",
    },
    5001553: { cover: ["تهران"], name: "علیرضا آرش" },
    1001057: { cover: ["تهران"], name: "علیرضا وحید مشتاق" },
    1001058: { cover: ["تهران"], name: "مهسا میرابوطالبی" },
    1001059: { cover: ["تهران"], name: "امین ابتکار" },
    1001060: { cover: ["تهران"], name: "هلیا طهانها" },
    1001061: { cover: ["تهران"], name: "سوانا خدادادیان" },
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
