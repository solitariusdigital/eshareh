import { useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./news.module.scss";
import { NextSeo } from "next-seo";
import Image from "next/legacy/image";
import soon from "@/assets/soon.png";
import logoEnglish from "@/assets/logoEnglish.svg";
import logoFarsi from "@/assets/logoFarsi.svg";

export default function News() {
  const { language, setLanguage } = useContext(StateContext);

  return (
    <Fragment>
      <NextSeo
        title={language ? "اخبار" : "News"}
        description={
          language
            ? "اشاره یک استودیوی طراحی چند رشته ای و مستقل است"
            : "Eshareh is a multidisciplinary, independently owned design studio"
        }
        canonical="https://eshareh.com/news"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://eshareh.com/news",
          title: language ? "اخبار" : "News",
          description: language
            ? "اشاره یک استودیوی طراحی چند رشته ای و مستقل است"
            : "Eshareh is a multidisciplinary, independently owned design studio",
          siteName: language
            ? "آژانس تبلیغاتی اشاره"
            : "Eshareh Advertising Agency",
          images: [
            {
              url: language ? logoFarsi : logoEnglish,
              width: 1200,
              height: 630,
              alt: language
                ? "آژانس تبلیغاتی اشاره"
                : "Eshareh Advertising Agency",
            },
          ],
        }}
        robotsProps={{
          maxSnippet: -1,
          maxImagePreview: "large",
          maxVideoPreview: -1,
        }}
      />

      <div
        className={classes.container}
        style={{
          fontFamily: language ? "English" : "English",
        }}
      >
        <div className={classes.image}>
          <div className={classes.image}>
            <Image
              src={soon}
              blurDataURL={soon}
              placeholder="blur"
              alt="image"
              layout="fill"
              objectFit="cover"
              as="image"
              priority
            />
          </div>
          <div>
            {language ? (
              <p className={classes.click}>به زودی</p>
            ) : (
              <p className={classes.click}>Coming soon</p>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
