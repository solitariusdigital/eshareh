import { useContext, Fragment, useEffect, useState, useMemo } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./therighthint.module.scss";
import { NextSeo } from "next-seo";
import { getCharityApi, updateCharityApi } from "@/services/api";
import secureLocalStorage from "react-secure-storage";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TelegramShareButton,
} from "react-share";

export default function Therighthint() {
  const { language, setLanguage } = useContext(StateContext);
  const [charity, setCharity] = useState({});
  const textsArray = useMemo(
    () => ["متخصص", "اولویت", "منحصربه‌فرد", "مشارکت", "خیریه"],
    []
  );
  const [dynamicText, setDynamicText] = useState(textsArray[0]);
  const [animate, setAnimate] = useState(false);
  const [buttonMessage, setButtonMessage] = useState("اشاره‌ای درست");
  const shareUrl = "https://eshareh.com/therighthint";
  const titleCampaign = "اشاره‌ای درست!";
  const summaryCampaign = "اشاره‌ای درست!";
  const hashtagCampaign = "therighthint";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCharityApi();
        setCharity(data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false);
      setDynamicText((prevFruit) => {
        const currentIndex = textsArray.indexOf(prevFruit);
        const nextIndex = (currentIndex + 1) % textsArray.length;
        return textsArray[nextIndex];
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [textsArray]);

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 10);
  }, [dynamicText]);

  const updateCharityCount = async () => {
    let checkCharityUser = secureLocalStorage.getItem("charityUser");
    if (!checkCharityUser) {
      let count = charity.count;
      count += 1;
      let dataObject = {
        id: charity["_id"],
        count: count,
      };
      await updateCharityApi(dataObject);
      setCharity(dataObject);
      secureLocalStorage.setItem("charityUser", true);
    } else {
      setButtonMessage("اشاره شما ثبت شد");
    }
  };

  return (
    <Fragment>
      <NextSeo
        title={language ? "اشاره‌ای درست!" : "The Right Hint"}
        description={
          language
            ? "اشاره یک استودیوی طراحی چند رشته ای و مستقل است"
            : "Eshareh is a multidisciplinary, independently owned design studio"
        }
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://eshareh.com/therighthint",
          siteName: "Eshareh Advertising Agency",
        }}
      />
      <div
        className={classes.container}
        style={{
          fontFamily: language ? "FarsiBold" : "FarsiBold",
        }}
      >
        <h2>
          <span>!</span>
          اشاره‌ای درست
        </h2>
        <h2
          className={`${classes.dynamicText} animate__animated ${
            animate ? "animate__rubberBand" : ""
          }`}
        >
          {dynamicText}
        </h2>
        <h2>چند رشته ای و مستقل است</h2>
        <h2>{charity.count}</h2>
        <button
          style={{
            fontFamily: language ? "FarsiBold" : "FarsiBold",
          }}
          onClick={() => updateCharityCount()}
        >
          {buttonMessage}
        </button>
        <div
          className={classes.shareContainer}
          onClick={() => navigator.clipboard.writeText(shareUrl)}
        >
          <LinkedinShareButton
            className={classes.share}
            title={titleCampaign}
            url={shareUrl}
            summary={summaryCampaign}
            source={shareUrl}
          >
            <LinkedInIcon />
          </LinkedinShareButton>
          <TwitterShareButton
            className={classes.share}
            title={titleCampaign}
            url={shareUrl}
            hashtags={[hashtagCampaign]}
          >
            <XIcon />
          </TwitterShareButton>
          <WhatsappShareButton
            className={classes.share}
            url={shareUrl}
            title={titleCampaign}
          >
            <WhatsAppIcon />
          </WhatsappShareButton>
          <TelegramShareButton
            className={classes.share}
            url={shareUrl}
            title={titleCampaign}
          >
            <TelegramIcon />
          </TelegramShareButton>
          <FacebookShareButton
            className={classes.share}
            url={shareUrl}
            quote={titleCampaign}
            title={titleCampaign}
            hashtag={hashtagCampaign}
          >
            <FacebookIcon />
          </FacebookShareButton>
          <div className={classes.share}>
            <InstagramIcon
              onClick={() =>
                window.open("https://www.instagram.com/", "_ self")
              }
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
