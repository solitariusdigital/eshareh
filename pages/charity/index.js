import { useContext, Fragment, useEffect, useState } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./charity.module.scss";
import { NextSeo } from "next-seo";
import { getCharityApi, updateCharityApi } from "@/services/api";
import secureLocalStorage from "react-secure-storage";

export default function Charity() {
  const { language, setLanguage } = useContext(StateContext);
  const [charity, setCharity] = useState({});

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
      <div className={classes.container}>
        <h2>{charity.count}</h2>
        <button
          style={{
            fontFamily: language ? "FarsiBold" : "FarsiBold",
          }}
          onClick={() => updateCharityCount()}
        >
          خیریه
        </button>
      </div>
    </Fragment>
  );
}
