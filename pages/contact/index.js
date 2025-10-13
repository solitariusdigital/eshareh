import { useContext, Fragment, useState } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./contact.module.scss";
import Image from "next/legacy/image";
import { NextSeo } from "next-seo";
import logoEnglish from "@/assets/logoEnglish.svg";
import logoFarsi from "@/assets/logoFarsi.svg";
import dbConnect from "@/services/dbConnect";
import pageModel from "@/models/Page";
import mediaModel from "@/models/Media";
import Router from "next/router";
import Link from "next/link";

export default function Contact({ pageData, mediaData }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const [headAddress, setHeadAddress] = useState({
    en: [pageData.content[1].data.en.split("\n\n")][0],
    fa: [pageData.content[1].data.fa.split("\n\n")][0],
  });
  const [headContact, setHeadContact] = useState({
    en: [pageData.content[2].data.en.split("\n\n")][0],
    fa: [pageData.content[2].data.fa.split("\n\n")][0],
  });
  const [secAddress, setSecAddress] = useState({
    en: [pageData.content[5].data.en.split("\n\n")][0],
    fa: [pageData.content[5].data.fa.split("\n\n")][0],
  });
  const [secContact, setSecContact] = useState({
    en: [pageData.content[6].data.en.split("\n\n")][0],
    fa: [pageData.content[6].data.fa.split("\n\n")][0],
  });
  const [headOfficeSetting, setHeadOfficeSetting] = useState(
    pageData.content[0].setting
  );
  const [headAddressSetting, setHeadAddressSetting] = useState(
    pageData.content[1].setting
  );
  const [headContactSetting, setHeadContactSetting] = useState(
    pageData.content[2].setting
  );
  const [secOfficeSetting, setSecOfficeSetting] = useState(
    pageData.content[4].setting
  );
  const [secAddressSetting, setSecAddressSetting] = useState(
    pageData.content[5].setting
  );
  const [secContactSetting, setSecContactSetting] = useState(
    pageData.content[6].setting
  );
  const headLocationLink = pageData.content[3].data.en;
  const secLocationLink = pageData.content[7].data.en;

  const convertPhoneNumber = (phoneNumber) => {
    const cleanedNumber = phoneNumber.replace(/\D/g, "");
    return cleanedNumber;
  };

  return (
    <Fragment>
      <NextSeo
        title={language ? "تماس با ما" : "Contact Us"}
        description={
          language
            ? "اشاره یک استودیوی طراحی چند رشته‌ای و مستقل است"
            : "Eshareh is a multidisciplinary, independently owned design studio"
        }
        canonical="https://eshareh.com/contact"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://eshareh.com/contact",
          title: language ? "تماس با ما" : "Contact Us",
          description: language
            ? "اشاره یک استودیوی طراحی چند رشته‌ای و مستقل است"
            : "Eshareh is a multidisciplinary, independently owned design studio",
          siteName: language
            ? "آژانس تبلیغاتی اشاره"
            : "Eshareh Advertising Agency",
          images: {
            url: language ? logoFarsi : logoEnglish,
            width: 1200,
            height: 630,
            alt: language ? "اشاره" : "Eshareh",
          },
        }}
        robots="index, follow"
      />
      <div className={classes.container}>
        <div className={classes.image}>
          <Image
            className={classes.image}
            src={mediaData.content[0].link}
            blurDataURL={mediaData.content[0].link}
            placeholder="blur"
            alt={mediaData.content[0].type}
            layout="fill"
            objectFit="cover"
            as="image"
            priority
          />
        </div>
        <div
          className={classes.information}
          style={{
            fontFamily: language ? "Farsi" : "English",
          }}
        >
          <div>
            <div
              className={language ? classes.row : classes.rowReverse}
              style={{
                color: headOfficeSetting
                  ? `#${headOfficeSetting.split(" ")[0]}`
                  : "#fdb714",
                fontSize: `${headOfficeSetting.split(" ")[1]}px`,
                fontFamily: language ? "FarsiBold" : "EnglishBold",
              }}
              onClick={() => window.open(headLocationLink)}
            >
              <h3 className={classes.click}>
                {pageData.content[0].data[languageType]}
              </h3>
            </div>
            <div className={classes.details}>
              {headAddress[languageType].map((address, index) => (
                <Fragment key={index}>
                  <div
                    onClick={() => window.open(headLocationLink)}
                    className={language ? classes.row : classes.rowReverse}
                  >
                    <p
                      className={classes.click}
                      style={{
                        color: `#${headAddressSetting.split(" ")[0]}`,
                        fontSize: `${headAddressSetting.split(" ")[1]}px`,
                      }}
                    >
                      {address}
                    </p>
                  </div>
                </Fragment>
              ))}
            </div>
            <div className={classes.details}>
              {headContact[languageType].map((contact, index) => (
                <Fragment key={index}>
                  <div
                    onClick={() =>
                      window.open(
                        `tel:+${convertPhoneNumber(headContact.en[0])}`,
                        "_self"
                      )
                    }
                    className={language ? classes.row : classes.rowReverse}
                  >
                    {index === 2 ? (
                      <p
                        className={classes.email}
                        style={{
                          fontFamily: language ? "English" : "English",
                          color: `#${headContactSetting.split(" ")[0]}`,
                          fontSize: `${headContactSetting.split(" ")[1]}px`,
                        }}
                      >
                        {contact}
                      </p>
                    ) : (
                      <p
                        className={classes.click}
                        style={{
                          color: `#${headContactSetting.split(" ")[0]}`,
                          fontSize: `${headContactSetting.split(" ")[1]}px`,
                        }}
                      >
                        {contact}
                      </p>
                    )}
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
          <div className={classes.animeContainer}>
            <Image
              src={mediaData.content[1].link}
              blurDataURL={mediaData.content[1].link}
              placeholder="blur"
              alt={mediaData.content[1].type}
              as={mediaData.content[1].type}
              layout="fill"
              objectFit="contain"
              unoptimized={mediaData.content[1].type === "gif"}
              priority
            />
          </div>
          <div>
            <div
              className={language ? classes.row : classes.rowReverse}
              style={{
                color: secOfficeSetting
                  ? `#${secOfficeSetting.split(" ")[0]}`
                  : "#fdb714",
                fontSize: `${secOfficeSetting.split(" ")[1]}px`,
                fontFamily: language ? "FarsiBold" : "EnglishBold",
              }}
              onClick={() => window.open(secLocationLink)}
            >
              <h3 className={classes.click}>
                {pageData.content[4].data[languageType]}
              </h3>
            </div>
            <div className={classes.details}>
              {secAddress[languageType].map((address, index) => (
                <Fragment key={index}>
                  <div
                    onClick={() => window.open(secLocationLink)}
                    className={language ? classes.row : classes.rowReverse}
                  >
                    <p
                      className={classes.click}
                      style={{
                        color: `#${secAddressSetting.split(" ")[0]}`,
                        fontSize: `${secAddressSetting.split(" ")[1]}px`,
                      }}
                    >
                      {address}
                    </p>
                  </div>
                </Fragment>
              ))}
            </div>
            <div className={classes.details}>
              {secContact[languageType].map((contact, index) => (
                <Fragment key={index}>
                  <div
                    onClick={() =>
                      window.open(
                        `tel:+${convertPhoneNumber(secContact.en[0])}`,
                        "_self"
                      )
                    }
                    className={language ? classes.row : classes.rowReverse}
                  >
                    <p
                      className={classes.click}
                      style={{
                        color: `#${secContactSetting.split(" ")[0]}`,
                        fontSize: `${secContactSetting.split(" ")[1]}px`,
                      }}
                    >
                      {contact}
                    </p>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        className={classes.resume}
        style={{
          fontFamily: language ? "Farsi" : "English",
        }}
      >
        <Link href={"/jobs"} passHref>
          {language ? <p>ارسال رزومه</p> : <p>Send your resume</p>}
        </Link>
      </div>
    </Fragment>
  );
}

// initial connection to db
export async function getServerSideProps(context) {
  try {
    await dbConnect();
    const pageData = await pageModel.findOne({ slug: "contact" });
    const mediaData = await mediaModel.findOne({ slug: "contact" });

    return {
      props: {
        pageData: JSON.parse(JSON.stringify(pageData)),
        mediaData: JSON.parse(JSON.stringify(mediaData)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
