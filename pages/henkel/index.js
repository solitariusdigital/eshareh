import { useState, useContext, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./henkel.module.scss";
import Image from "next/legacy/image";
import Typewriter from "@/components/Typewriter";
import { toEnglishNumber, isEnglishNumber } from "@/services/utility";

export default function Henkel() {
  const { displayFooter, setDisplayFooter } = useContext(StateContext);
  const { displayMenu, setDisplayMenu } = useContext(StateContext);
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [alert, setAlert] = useState("");
  const [code, setCode] = useState("");
  const [selectedArea, setSelectedArea] = useState(null);
  const [userData, setUserData] = useState(null);
  const [landingLoad, setLandingLoad] = useState(false);

  useEffect(() => {
    setDisplayFooter(false);
    setDisplayMenu(false);
    setLanguageType("fa");
    setLanguage(true);
    document.body.style.marginTop = "0px";
    setTimeout(() => {
      setLandingLoad(true);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const peopleInfo = {
    5001033: {
      area: "gilan",
      farsi: "گیلان",
      name: "رضا راك",
    },
    5001051: {
      area: "khozestan",
      farsi: "خوزستان",
      name: "احمدرضا صالحي پور باورصاد",
    },
    5001068: {
      area: "khorasanrazavi",
      farsi: "خراسان رضوی",
      name: "احسان عطار",
    },
    5001077: {
      area: "alborz",
      farsi: "البرز",
      name: "بابک برهمند",
    },
    5001202: {
      area: "gilan",
      farsi: "گیلان",
      name: "محمد عباسي",
    },
    5001222: {
      area: "fars",
      farsi: "فارس",
      name: "مهدي ثابت",
    },
    5001234: {
      area: "isfahan",
      farsi: "اصفهان",
      name: "سيد مسيح موسوي زاده",
    },
    5001256: {
      area: "boshehar",
      farsi: "بوشهر",
      name: "ابراهيم فيروز اردكاني",
    },
    5001350: {
      area: "fars",
      farsi: "فارس",
      name: "علي پور كاظمي",
    },
    5001351: {
      area: "golestan",
      farsi: "گلستان",
      name: "سيدرضا بني فاطمي",
    },
    5001366: {
      area: "alborz",
      farsi: "البرز",
      name: "شهروز حاجي",
    },
    5001367: {
      area: "tehran",
      farsi: "تهران",
      name: "مهرداد نوري",
    },
    5001372: {
      area: "tehran",
      farsi: "تهران",
      name: "شمس الدين زارع",
    },
    5001373: {
      area: "azarbayejansharghi",
      farsi: "آذربایجان شرقی",
      name: "يونس اصغرزاده فيضي",
    },
    5001383: {
      area: "mazanderan",
      farsi: "مازندران",
      name: "برديا طالعي",
    },
    5001425: {
      area: "alborz",
      farsi: "البرز",
      name: "حميد فتحي",
    },
    5001430: {
      area: "gilan",
      farsi: "گیلان",
      name: "سجاد حقيقي",
    },
    5001434: {
      area: "zanjan",
      farsi: "زنجان",
      name: "رحيم احمدي",
    },
    5001435: {
      area: "ardabil",
      farsi: "اردبیل",
      name: "سجاد قاسمزاده",
    },
    5001437: {
      area: "alborz",
      farsi: "البرز",
      name: "مهدي انصاري",
    },
    5001438: {
      area: "fars",
      farsi: "فارس",
      name: "مصطفي صفاري",
    },
    5001441: {
      area: "sistanbalochestan",
      farsi: "سیستان و بلوچستان",
      name: "سحاب سلطاني",
    },
    5001442: {
      area: "kerman",
      farsi: "کرمان",
      name: "عليرضا نقي زاده سيمکي",
    },
    5001460: {
      area: "kerman",
      farsi: "کرمان",
      name: "پويا مهرجو",
    },
    5001465: {
      area: "tehran",
      farsi: "تهران",
      name: "مرتضي كريمي",
    },
    5001466: {
      area: "tehran",
      farsi: "تهران",
      name: "امير ربيعي",
    },
    5001483: {
      area: "boshehar",
      farsi: "بوشهر",
      name: "علي فريدوني",
    },
    5001485: {
      area: "khorasanrazavi",
      farsi: "خراسان رضوی",
      name: "امير اسمعيل زاده طرقدري",
    },
    5001489: {
      area: "isfahan",
      farsi: "اصفهان",
      name: "رضا بندرعباسي",
    },
    5001493: {
      area: "gilan",
      farsi: "گیلان",
      name: "معيار استوار",
    },
    5001537: {
      area: "alborz",
      farsi: "البرز",
      name: "حجت رستم پور ثمرين",
    },
    5001538: {
      area: "alborz",
      farsi: "البرز",
      name: "قادر غفوريان صباغ عيدگاهي",
    },
    5001544: {
      area: "tehran",
      farsi: "تهران",
      name: "آلن اميريان",
    },
    5001545: {
      area: "fars",
      farsi: "فارس",
      name: "محمد طمراس نيا",
    },
    5001546: {
      area: "isfahan",
      farsi: "اصفهان",
      name: "صادق اريايي",
    },
    5001552: {
      area: "ilam",
      farsi: "ایلام",
      name: "فرشاد بهمني",
    },
    5001560: {
      area: "kordestan",
      farsi: "کردستان",
      name: "عبدالله احمدي",
    },
    5001601: {
      area: "alborz",
      farsi: "البرز",
      name: "چيا دانايي کويک",
    },
    5001603: {
      area: "tehran",
      farsi: "تهران",
      name: "محبوبه باوند پور",
    },
    5001606: {
      area: "fars",
      farsi: "فارس",
      name: "محمدعلي جالبوتي",
    },
    5006025: {
      area: "ghazvin",
      farsi: "قزوین",
      name: "فريبرز قشلاقي",
    },
    5006048: {
      area: "tehran",
      farsi: "تهران",
      name: "محسن قاسمي کندري",
    },
    5006050: {
      area: "tehran",
      farsi: "تهران",
      name: "سيد مهدي حجازي",
    },
    5006051: {
      area: "yazd",
      farsi: "یزد",
      name: "شهاب مزيدي",
    },
    5006094: {
      area: "isfahan",
      farsi: "اصفهان",
      name: "حميدرضا جلالي",
    },
    5006097: {
      area: "isfahan",
      farsi: "اصفهان",
      name: "محمد ابراهيمي راد",
    },
    5006099: {
      area: "khozestan",
      farsi: "خوزستان",
      name: "ياسين مرادي",
    },
    5006104: {
      area: "tehran",
      farsi: "تهران",
      name: "سيامک موحدي",
    },
    5006108: {
      area: "azarbayejansharghi",
      farsi: "آذربایجان شرقی",
      name: "محمد عبدوي بافتاني",
    },
    5006109: {
      area: "tehran",
      farsi: "تهران",
      name: "مانيا نوروزي",
    },
    5006115: {
      area: "azarbayejansharghi",
      farsi: "آذربایجان شرقی",
      name: "وحيد عليزاده",
    },
    5006127: {
      area: "hamedan",
      farsi: "همدان",
      name: "حسين قرباني",
    },
    5006233: {
      area: "tehran",
      farsi: "تهران",
      name: "رومينا السادات سکاکي",
    },
    5006257: {
      area: "hamedan",
      farsi: "همدان",
      name: "رشيد سلطاني حيدرزاده",
    },
    5006307: {
      area: "markazi",
      farsi: "مرکزی",
      name: "عرفان سلامت",
    },
    5006333: {
      area: "golestan",
      farsi: "گلستان",
      name: "عبدالعزيز شادکام",
    },
    5006363: {
      area: "mazanderan",
      farsi: "مازندران",
      name: "حسين يزداني",
    },
    5006364: {
      area: "mazanderan",
      farsi: "مازندران",
      name: "نجمه سادات صالحي نيا",
    },
    5006438: {
      area: "azarbayejangharbi",
      farsi: "آذربایجان غربی",
      name: "ياور شمزين",
    },
    5006488: {
      area: "semnan",
      farsi: "سمنان",
      name: "احسان نادري",
    },
    5006558: {
      area: "kerman",
      farsi: "کرمان",
      name: "مسعود قاسمي رشيد آبادي",
    },
    5006564: {
      area: "kerman",
      farsi: "کرمان",
      name: "عماد نامجو فرد",
    },
    5006596: {
      area: "hormozgan",
      farsi: "هرمزگان",
      name: "پوريا حيدري سيرمندي",
    },
    5006669: {
      area: "fars",
      farsi: "فارس",
      name: "مجتبي کريمي",
    },
    5006739: {
      area: "isfahan",
      farsi: "اصفهان",
      name: "مهدي قاسمي",
    },
    5006774: {
      area: "isfahan",
      farsi: "اصفهان",
      name: "فخرالسادات مير مولايي",
    },
    5006786: {
      area: "isfahan",
      farsi: "اصفهان",
      name: "رامين نيکونژاد",
    },
    5006798: {
      area: "yazd",
      farsi: "یزد",
      name: "حميدرضا قانع عزآبادي",
    },
    5006841: {
      area: "tehran",
      farsi: "تهران",
      name: "سيدحميدرضا ميرکريمي نميني",
    },
    5007045: {
      area: "khozestan",
      farsi: "خوزستان",
      name: "امين برات پور",
    },
    5007053: {
      area: "khozestan",
      farsi: "خوزستان",
      name: "سميرا عبداله زاده",
    },
    5007109: {
      area: "khorasanrazavi",
      farsi: "خراسان رضوی",
      name: "سعيد قاسم پور هدايت آباد",
    },
    5007118: {
      area: "khorasanrazavi",
      farsi: "خراسان رضوی",
      name: "رضا عطار",
    },
    5007128: {
      area: "khorasanrazavi",
      farsi: "خراسان رضوی",
      name: "مرتضي اكبري شالچي",
    },
    5007147: {
      area: "khorasanrazavi",
      farsi: "خراسان رضوی",
      name: "بهاره رمضاني",
    },
    5007172: {
      area: "qom",
      farsi: "قم",
      name: "مرتضي بندگي كولانكوه",
    },
    5007212: {
      area: "mazanderan",
      farsi: "مازندران",
      name: "ارسطو مرادي پور",
    },
    5007328: {
      area: "khorasanrazavi",
      farsi: "خراسان رضوی",
      name: "زهرا اشرفي پارسا",
    },
    5007342: {
      area: "tehran",
      farsi: "تهران",
      name: "ريحانه ارشيا",
    },
    5007349: {
      area: "mazanderan",
      farsi: "مازندران",
      name: "ساغر بافنده",
    },
    5007359: {
      area: "alborz",
      farsi: "البرز",
      name: "بهناز پورفتحي",
    },
    5007378: {
      area: "kermanshah",
      farsi: "کرمانشاه",
      name: "ميلاد شعباني حسين آبادي",
    },
    5007398: {
      area: "azarbayejansharghi",
      farsi: "آذربایجان شرقی",
      name: "ندا مقدم شبيلو",
    },
    5007512: {
      area: "azarbayejansharghi",
      farsi: "آذربایجان شرقی",
      name: "احد خدائي",
    },
    5007514: {
      area: "azarbayejangharbi",
      farsi: "آذربایجان غربی",
      name: "اصغر عمران زاده گمي چي",
    },
    5007709: {
      area: "azarbayejansharghi",
      farsi: "آذربایجان شرقی",
      name: "پیمان صابری",
    },
    5007773: {
      area: "mazanderan",
      farsi: "مازندران",
      name: "فائزه يزدان فر",
    },
    5007854: {
      area: "khorasanshomali",
      farsi: "خراسان شمالی",
      name: "احمد رحيمي",
    },
    5007932: {
      area: "fars",
      farsi: "فارس",
      name: "مرضيه زنهاري",
    },
    5007961: {
      area: "khozestan",
      farsi: "خوزستان",
      name: "سيد ابراهيم سماک",
    },
    5008033: {
      area: "tehran",
      farsi: "تهران",
      name: "سعيد سيد صالحي",
    },
    5008034: {
      area: "khozestan",
      farsi: "خوزستان",
      name: "روزبه زرشکي",
    },
    5008037: {
      area: "azarbayejansharghi",
      farsi: "آذربایجان شرقی",
      name: "سياوش حسن پورخرازي",
    },
    5008295: {
      area: "azarbayejangharbi",
      farsi: "آذربایجان غربی",
      name: "بابک محبت",
    },
    5008323: {
      area: "khorasanjonobi",
      farsi: "خراسان جنوبی",
      name: "محمود حسن پور",
    },
    5008335: {
      area: "ardabil",
      farsi: "اردبیل",
      name: "مهدي رحيمي",
    },
    6001171: {
      area: "golestan",
      farsi: "گلستان",
      name: "نورالدین کر",
    },
    6001239: {
      area: "hamedan",
      farsi: "همدان",
      name: "علیرضا امینی",
    },
    6001259: {
      area: "khorasanrazavi",
      farsi: "خراسان رضوی",
      name: "رامین مختارزاده",
    },
    6001279: {
      area: "golestan",
      farsi: "گلستان",
      name: "عبدالمجید صادقی نژاد",
    },
    5008140: {
      area: "tehran",
      farsi: "تهران",
      name: "آوا ایزدی",
    },
    5007507: {
      area: "khorasanrazavi",
      farsi: "خراسان رضوی",
      name: "صفيه مهاجر",
    },
    5006583: {
      area: "hormozgan",
      farsi: "هرمزگان",
      name: "مريم محمدي ريگ",
    },
    6001404: {
      area: "kermanshah",
      farsi: "کرمانشاه",
      name: "مسلم محبی",
    },
    5006120: {
      area: "azarbayejansharghi",
      farsi: "آذربایجان شرقی",
      name: "پریسا نریمانی",
    },
    5006117: {
      area: "azarbayejangharbi",
      farsi: "آذربایجان غربی",
      name: "مائده بیگی",
    },
    5001124: {
      area: "fars",
      farsi: "فارس",
      name: "فاطمه رهبر",
    },
    5006748: {
      area: "isfahan",
      farsi: "اصفهان",
      name: "نرگس شفیعی",
    },
    5007139: {
      area: "khorasanrazavi",
      farsi: "خراسان رضوی",
      name: "نفیسه زاهدی",
    },
    5001092: {
      area: "tehran",
      farsi: "تهران",
      name: "بهاره فتح اللهی",
    },
    5006128: {
      area: "alborz",
      farsi: "البرز",
      name: "شقایق تندر ",
    },
    5007771: {
      area: "tehran",
      farsi: "تهران",
      name: "ماندانا نریمانی",
    },
    5006131: {
      area: "tehran",
      farsi: "تهران",
      name: "زهره برزگر",
    },
    5001227: {
      area: "tehran",
      farsi: "تهران",
      name: "الناز رجایی",
    },
    1001011: {
      area: "tehran",
      farsi: "تهران",
      name: "جعفر هزاری ",
    },
    1001012: {
      area: "tehran",
      farsi: "تهران",
      name: "رعنا اقوامی",
    },
    1001013: {
      area: "tehran",
      farsi: "تهران",
      name: "فاطمه گرجی",
    },
    1001014: {
      area: "tehran",
      farsi: "تهران",
      name: "آرش یادگاری",
    },
    1001015: {
      area: "tehran",
      farsi: "تهران",
      name: "امیر بهاری",
    },
    1001016: {
      area: "tehran",
      farsi: "تهران",
      name: "الهه اسدی",
    },
    1001017: {
      area: "tehran",
      farsi: "تهران",
      name: "محمد اشرافی ",
    },
    1001018: {
      area: "tehran",
      farsi: "تهران",
      name: "مهسا رمضانی ",
    },
    1001019: {
      area: "tehran",
      farsi: "تهران",
      name: "مایا عظیمی",
    },
    1001010: {
      area: "tehran",
      farsi: "تهران",
      name: "فراز خلج",
    },
    1001020: {
      area: "tehran",
      farsi: "تهران",
      name: "سحر یوسفی ",
    },
    1001021: {
      area: "tehran",
      farsi: "تهران",
      name: "مریم اکبرزاده",
    },
    1001022: {
      area: "tehran",
      farsi: "تهران",
      name: " علی اسلامیان",
    },
    1001023: {
      area: "tehran",
      farsi: "تهران",
      name: "میثم معصومی ",
    },
    1001024: {
      area: "tehran",
      farsi: "تهران",
      name: "محمدرضا صمصامی",
    },
    1001025: {
      area: "tehran",
      farsi: "تهران",
      name: "ابراهیم یوسف پور",
    },
    1001026: {
      area: "tehran",
      farsi: "تهران",
      name: "مجتبی بهرامی",
    },
    1001027: {
      area: "tehran",
      farsi: "تهران",
      name: "مارینه طهماسیان",
    },
    1001028: {
      area: "tehran",
      farsi: "تهران",
      name: "نیلوفر ثمودی",
    },
    1001029: {
      area: "tehran",
      farsi: "تهران",
      name: " میترا باقری ",
    },
    1001030: {
      area: "tehran",
      farsi: "تهران",
      name: "عاطفه خاکسار ",
    },
    1001031: {
      area: "tehran",
      farsi: "تهران",
      name: "آیه پورزینال ",
    },
    1001032: {
      area: "tehran",
      farsi: "تهران",
      name: "مبینا صداقت ",
    },
    1001033: {
      area: "tehran",
      farsi: "تهران",
      name: "حسن عقلمندی ",
    },
    1001034: {
      area: "tehran",
      farsi: "تهران",
      name: "قاسم مظاهری",
    },
    1001035: {
      area: "tehran",
      farsi: "تهران",
      name: "حجت اثنا عشری",
    },
    1001036: {
      area: "tehran",
      farsi: "تهران",
      name: "مهدی نوری ",
    },
    1001037: {
      area: "tehran",
      farsi: "تهران",
      name: "پارسا صدر محمدی",
    },
    5007941: {
      area: "tehran",
      farsi: "تهران",
      name: "مرتضی صبح خیز ",
    },
    5006016: {
      area: "tehran",
      farsi: "تهران",
      name: "مصطفی متاجی ",
    },
    5001072: {
      area: "tehran",
      farsi: "تهران",
      name: "ابراهيم نصيري",
    },
    5001119: {
      area: "tehran",
      farsi: "تهران",
      name: "قاسم صالحي",
    },
    5001073: {
      area: "tehran",
      farsi: "تهران",
      name: "امیر نوری",
    },
    5001149: {
      area: "tehran",
      farsi: "تهران",
      name: "حميدرضا صالحي",
    },
    5001186: {
      area: "tehran",
      farsi: "تهران",
      name: "آريا منفرد",
    },
    5001270: {
      area: "tehran",
      farsi: "تهران",
      name: "امید نصیراللهی",
    },
    5001012: {
      area: "tehran",
      farsi: "تهران",
      name: " حميد قاسمي",
    },
    5001319: {
      area: "tehran",
      farsi: "تهران",
      name: "ليلا پيكاني",
    },
    5001559: {
      area: "tehran",
      farsi: "تهران",
      name: "مرجان شیروانی",
    },
    5006008: {
      area: "tehran",
      farsi: "تهران",
      name: "فریبا صمدی ",
    },
    5001590: {
      area: "tehran",
      farsi: "تهران",
      name: " مهسا نریمانی ",
    },
    1001038: {
      area: "tehran",
      farsi: "تهران",
      name: "شکیبا بنی اسد ",
    },
    1001039: {
      area: "tehran",
      farsi: "تهران",
      name: "فاطمه باقری",
    },
    1001040: {
      area: "tehran",
      farsi: "تهران",
      name: "مریم سعیدی ",
    },
    1001041: {
      area: "tehran",
      farsi: "تهران",
      name: "الناز شجاعی ",
    },
    1001042: {
      area: "tehran",
      farsi: "تهران",
      name: "مرضیه منطقی ",
    },
    1001043: {
      area: "tehran",
      farsi: "تهران",
      name: "نسیم مصری",
    },
    1001044: {
      area: "tehran",
      farsi: "تهران",
      name: "پانیذ رئیسی  ",
    },
    1001045: {
      area: "tehran",
      farsi: "تهران",
      name: "ماریه  نیک پی",
    },
    1001046: {
      area: "tehran",
      farsi: "تهران",
      name: "اروشا پیرعلی ",
    },
    1001047: {
      area: "tehran",
      farsi: "تهران",
      name: "کیانا شاهین فر ",
    },
    1001048: {
      area: "tehran",
      farsi: "تهران",
      name: "نسیم زکایی",
    },
    1001049: {
      area: "tehran",
      farsi: "تهران",
      name: "نوشین فرزاد ",
    },
    1001050: {
      area: "tehran",
      farsi: "تهران",
      name: "عسل فداکار  ",
    },
    1001051: {
      area: "tehran",
      farsi: "تهران",
      name: "مارال طابعی",
    },
    1001052: {
      area: "tehran",
      farsi: "تهران",
      name: "سعید خادمی",
    },
    1001053: {
      area: "tehran",
      farsi: "تهران",
      name: "زهرا ریاضت",
    },
    1001054: {
      area: "tehran",
      farsi: "تهران",
      name: "لژیا زندیه ",
    },
    1001055: {
      area: "tehran",
      farsi: "تهران",
      name: "نازیلا مظاهری",
    },
    1001056: {
      area: "tehran",
      farsi: "تهران",
      name: "ندا بنارویی",
    },
    5001553: {
      area: "tehran",
      farsi: "تهران",
      name: "علیرضا آرش",
    },
    1001057: {
      area: "tehran",
      farsi: "تهران",
      name: "علیرضا وحید مشتاق",
    },
    1001058: {
      area: "tehran",
      farsi: "تهران",
      name: "مهسا میرابوطالبی",
    },
    1001059: {
      area: "tehran",
      farsi: "تهران",
      name: "امین ابتکار",
    },
    1001060: {
      area: "tehran",
      farsi: "تهران",
      name: "هلیا طهانها",
    },
    1001061: {
      area: "tehran",
      farsi: "تهران",
      name: "سوانا خدادادیان",
    },
  };

  const areaFarsi = {
    azarbayejangharbi: "آذربایجان غربی",
    azarbayejansharghi: "آذربایجان شرقی",
    ardabil: "اردبیل",
    isfahan: "اصفهان",
    alborz: "البرز",
    ilam: "ایلام",
    boshehar: "بوشهر",
    tehran: "تهران",
    khorasanjonobi: "خراسان جنوبی",
    khorasanrazavi: "خراسان رضوی",
    khorasanshomali: "خراسان شمالی",
    khozestan: "خوزستان",
    sistanbalochestan: "سیستان و بلوچستان",
    fars: "فارس",
    ghazvin: "قزوین",
    qom: "قم",
    kordestan: "کردستان",
    kerman: "کرمان",
    kermanshah: "کرمانشاه",
    golestan: "گلستان",
    gilan: "گیلان",
    mazanderan: "مازندران",
    markazi: "مرکزی",
    hormozgan: "هرمزگان",
    hamedan: "همدان",
    yazd: "یزد",
    zanjan: "زنجان",
    semnan: "سمنان",
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

  const activeArea = selectedArea || userData?.area;
  const activeFarsi = areaFarsi?.[activeArea] || userData?.farsi;

  return (
    <>
      {!landingLoad && screenSize === "mobile" && (
        <div className={classes.background}></div>
      )}
      {landingLoad && (
        <>
          {!userData ? (
            <div className={classes.container}>
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
              <div
                className={classes.input}
                style={{
                  marginBottom: "24px",
                }}
              >
                <select
                  style={{
                    fontFamily: "Farsi",
                  }}
                  defaultValue={"default"}
                  onChange={(e) => setSelectedArea(e.target.value)}
                >
                  <option value="default" disabled>
                    تغییر استان
                  </option>
                  {Object.entries(areaFarsi).map(
                    ([areaKey, farsiName], index) => (
                      <option key={index} value={areaKey}>
                        {farsiName}
                      </option>
                    )
                  )}
                </select>
              </div>
              <h2
                style={{
                  fontFamily: "FarsiBold",
                }}
              >
                {userData.name}
              </h2>
              <h3>خوش آمدید</h3>
              <div
                key={activeArea}
                className={`${classes.map} animate__animated animate__pulse`}
              >
                <Image
                  src={`https://eshareh.storage.iran.liara.space/henkel/maps/${activeArea}.svg`}
                  blurDataURL={`https://eshareh.storage.iran.liara.space/henkel/maps/${activeArea}.svg`}
                  placeholder="blur"
                  layout="fill"
                  objectFit="contain"
                  alt="map"
                  as="image"
                />
              </div>
              <div>
                <h2
                  style={{
                    fontFamily: "FarsiBold",
                  }}
                >
                  استان {activeFarsi}
                </h2>
                <Typewriter text={`${areaData[activeArea].main}`} />
                <Typewriter text={`RT: ${areaData[activeArea].rt}`} />
                <Typewriter text={`WS: ${areaData[activeArea].ws}`} />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
