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
            ? "اشاره یک استودیوی طراحی چند رشته ای و مستقل است"
            : "Eshareh is a multidisciplinary, independently owned design studio"
        }
        canonical="https://eshareh.com/contact"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://eshareh.com/contact",
          title: language ? "تماس با ما" : "Contact Us",
          description: language
            ? "اشاره یک استودیوی طراحی چند رشته ای و مستقل است"
            : "Eshareh is a multidisciplinary, independently owned design studio",
          siteName: language
            ? "آژانس تبلیغاتی اشاره"
            : "Eshareh Advertising Agency",
          images: {
            url: language ? logoFarsi : logoEnglish,
            width: 1200,
            height: 630,
            alt: language
              ? "آژانس تبلیغاتی اشاره"
              : "Eshareh Advertising Agency",
          },
        }}
        robotsProps={{
          maxSnippet: -1,
          maxImagePreview: "large",
          maxVideoPreview: -1,
        }}
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
                color: `#fdb714`,
                fontFamily: language ? "FarsiBold" : "EnglishBold",
              }}
              onClick={() => window.open(headLocationLink)}
            >
              {language ? (
                <h3 className={classes.click}>{pageData.content[0].data.fa}</h3>
              ) : (
                <h3 className={classes.click}>{pageData.content[0].data.en}</h3>
              )}
            </div>
            <div className={classes.details}>
              {headAddress[languageType].map((address, index) => (
                <Fragment key={index}>
                  <div
                    onClick={() => window.open(headLocationLink)}
                    className={language ? classes.row : classes.rowReverse}
                  >
                    <p className={classes.click}>{address}</p>
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
                          fontSize: language ? "0.9rem" : "1rem",
                        }}
                      >
                        {contact}
                      </p>
                    ) : (
                      <p className={classes.click}>{contact}</p>
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
                color: `#fdb714`,
                fontFamily: language ? "FarsiBold" : "EnglishBold",
              }}
              onClick={() => window.open(secLocationLink)}
            >
              {language ? (
                <h3 className={classes.click}>{pageData.content[4].data.fa}</h3>
              ) : (
                <h3 className={classes.click}>{pageData.content[4].data.en}</h3>
              )}
            </div>
            <div className={classes.details}>
              {secAddress[languageType].map((address, index) => (
                <Fragment key={index}>
                  <div
                    onClick={() => window.open(secLocationLink)}
                    className={language ? classes.row : classes.rowReverse}
                  >
                    <p className={classes.click}>{address}</p>
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
                    <p className={classes.click}>{contact}</p>
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
        {language ? <p>ارسال رزومه</p> : <p>Send your resume</p>}
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
