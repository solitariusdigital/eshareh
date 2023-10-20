import { useState, useContext, Fragment, useEffect } from "react";
import classes from "./works.module.scss";
import { replaceSpacesAndHyphens } from "@/services/utility";
import two from "@/assets/two.jpg";
import three from "@/assets/three.jpg";

export default function Work({ name }) {
  const work = {
    image: three,
    title: "شرکت آریان کیمیا",
    description:
      "طراحی بسته‌بندی لانچ و معرفی کرم آبرسان گیاهی نوروزلانچ و معرفی کرم آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان آبرسان آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان گیاهی نوروز",
    type: "image",
  };

  const [isFullWidth, setIsFullWidth] = useState(true);
  const items = [1, 2, 3, 4, 5, 6, 7];

  const toggleGrid = () => {
    setIsFullWidth(!isFullWidth);
  };

  return (
    <div className={classes.container}>
      <div className={classes.workTitle}>
        <p>{work.description}</p>
        <div className={classes.title}>
          <h1>{work.title}</h1>
          <h2>{work.title}</h2>
        </div>
      </div>

      <button onClick={toggleGrid}>Toggle Grid</button>

      <div className={isFullWidth ? classes.fullWidth : classes.halfWidth}>
        {items.map((item, index) => (
          <div key={index} className={classes.gridItem}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

// initial connection to db
export async function getServerSideProps(context) {
  try {
    let name = replaceSpacesAndHyphens(context.params.work);

    return {
      props: {
        name: JSON.parse(JSON.stringify(name)),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
