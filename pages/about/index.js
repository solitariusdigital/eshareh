import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./about.module.scss";
import Image from "next/legacy/image";
import Router from "next/router";
import team from "@/assets/team.jpg";
import cover from "@/assets/cover.jpg";
import { enToFaDigits } from "@/services/utility";

export default function About() {
  useEffect(() => {
    document.body.style.background = "#1b1b1b";
  }, []);

  const photos = [
    {
      image: team,
      title: "سیامک پورجبار",
      position: "مدیر واحد خلاقیت",
    },
    {
      image: team,
      title: "سیامک پورجبار",
      position: "مدیر واحد خلاقیت",
    },
    {
      image: team,
      title: "سیامک پورجبار",
      position: "مدیر واحد خلاقیت",
    },
    {
      image: team,
      title: "سیامک پورجبار",
      position: "مدیر واحد خلاقیت",
    },
    {
      image: team,
      title: "سیامک پورجبار",
      position: "مدیر واحد خلاقیت",
    },
  ];

  return (
    <div className={classes.container}>
      <div className={classes.information}>
        <div className={classes.cover}>
          <Image
            className={classes.image}
            src={cover}
            blurDataURL={cover}
            placeholder="blur"
            alt="cover"
            layout="fill"
            objectFit="cover"
            priority
          />
          <h1>اشاره</h1>
        </div>
        <p>
          اشاره در سال {enToFaDigits(1376)} به عنوان یک آژانس تبلیغاتی آغاز به
          کار کرد. در نتیجه‌ی فرآیندی اُرگانیک، به یک آژانس ارتباطات بازاریابی
          فول سرویس با رویکردی راه‌حل‌گرا تبدیل شد. در حال حاضر، آژانس اشاره
          به‌‌ عنوان عضوی از خانواده <bdi>dnaunion</bdi> به طیفی گسترده از
          مشتریان بومی و بین‌المللی خدمات کیفی ارائه می‌دهد. به عنوان یک آژانس
          خلاق، با تکیه بر خلاقیت که جوهر کار ماست، باور داریم که می‌توانیم
          بوسیله دانش حرفه‌ای روزآمد، پژوهش مدار و بومی شده اعضای تیم‌مان، چشم
          انداز خود را در ارتباطات بازاریابی موثر و نوین، تحقق بخشیم. همچنین از
          آنجا که رشد ما، بطور مستقیم به رشد برندهای مشتریان ما بستگی دارد، ما
          به نوعی از همکاری اعتقاد داریم که گونه‌ای شراکت راهبردی بلند مدت است و
          نه صرفاً ارائه خدمات
        </p>
      </div>

      <div className={classes.grid}>
        {photos.map((photo, index) => (
          <div key={index}>
            <div className={classes.box}>
              <Image
                className={classes.image}
                src={photo.image}
                blurDataURL={photo.image}
                placeholder="blur"
                alt={photo.title}
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
            <h3>{photo.title}</h3>
            <h3 className={classes.position}>{photo.position}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
