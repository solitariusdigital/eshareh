import { useContext, Fragment, useEffect, useState } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./charity.module.scss";
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

export default function Charity() {
  const { language, setLanguage } = useContext(StateContext);
  const [charity, setCharity] = useState({});
  const [buttonMessage, setButtonMessage] = useState("خیریه");

  const shareUrl = "https://eshareh.com/charity";
  const title = "کمپین خیریه اشاره";

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
      setButtonMessage("مشارکت شما ثبت شد");
    }
  };

  return (
    <Fragment>
      <NextSeo
        title={language ? "خیریه" : "Charity"}
        description={
          language
            ? "اشاره یک استودیوی طراحی چند رشته ای و مستقل است"
            : "Eshareh is a multidisciplinary, independently owned design studio"
        }
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://eshareh.com/charity",
          siteName: "Eshareh Advertising Agency",
        }}
      />
      <div
        className={classes.container}
        style={{
          fontFamily: language ? "FarsiBold" : "FarsiBold",
        }}
      >
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
            url={shareUrl}
            title={title}
          >
            <LinkedInIcon />
          </LinkedinShareButton>
          <TwitterShareButton
            className={classes.share}
            url={shareUrl}
            title={title}
          >
            <XIcon />
          </TwitterShareButton>
          <WhatsappShareButton
            className={classes.share}
            url={shareUrl}
            title={title}
          >
            <WhatsAppIcon />
          </WhatsappShareButton>
          <TelegramShareButton
            className={classes.share}
            url={shareUrl}
            title={title}
          >
            <TelegramIcon
              className={classes.share}
              onClick={() =>
                window.open("https://www.instagram.com/", "_ self")
              }
            />
          </TelegramShareButton>
          <FacebookShareButton
            className={classes.share}
            url={shareUrl}
            quote={title}
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
