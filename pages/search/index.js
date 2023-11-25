import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./search.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { NextSeo } from "next-seo";
import Image from "next/legacy/image";
import {
  enToFaDigits,
  onlyLettersAndNumbers,
  faToEnDigits,
} from "@/services/utility";

export default function Search() {
  const { language, setLanguage } = useContext(StateContext);
  const [search, setSearch] = useState("");
  const [documents, setDocuments] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [displayDetails, setDisplayDetails] = useState(false);
  const [searchEmpty, setSearchEmpty] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);

  const searchDocuments = () => {};

  return (
    <Fragment>
      <NextSeo
        title={language ? "جستجو" : "Search"}
        description={
          language
            ? "جستجو ... پروژه، نوع مشتری، نوع کار، سال"
            : "Search ... project, client type, work type, year"
        }
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://eshareh.com/",
          siteName: "Eshareh",
        }}
      />
      <div
        className={`${classes.container} animate__animated animate__slideInDown`}
      >
        <div
          className={
            language ? classes.inputSearch : classes.inputSearchReverse
          }
        >
          <div className={classes.action} onClick={() => searchDocuments()}>
            {language ? "جستجو" : "Search"}
          </div>
          <input
            style={{
              fontFamily: language ? "Farsi" : "English",
            }}
            placeholder={
              language
                ? "جستجو ... پروژه، نوع مشتری، نوع کار، سال"
                : "Search ... project, client type, work type, year"
            }
            type="text"
            id="search"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            maxLength={30}
            value={search}
            autoComplete="off"
            dir={language ? "rtl" : "ltr"}
          />
          <CloseIcon
            className="icon"
            onClick={() => {
              setDocuments([]);
              setSearch("");
              setSearchEmpty(false);
            }}
            sx={{ color: "#d6d6d6" }}
          />
        </div>
        {searchEmpty && (
          <p className="message">مطلبی برای نمایش موجود نیست جستجو کنید</p>
        )}
      </div>
    </Fragment>
  );
}
