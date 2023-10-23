import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./work.module.scss";
import { replaceSpacesAndHyphens } from "@/services/utility";
import Image from "next/legacy/image";
import GallerySlider from "@/components/GallerySlider";
import CloseIcon from "@mui/icons-material/Close";
import two from "@/assets/two.jpg";
import three from "@/assets/three.jpg";

export default function Work({ name }) {
  const [isFullWidth, setIsFullWidth] = useState([]);
  const [displayGallerySlider, setDisplayGallerySlider] = useState(false);

  const { displayMenu, setDisplayMenu } = useContext(StateContext);

  const work = {
    title: "شرکت آریان کیمیا",
    type: "image",
    images: [three, two, three, two, three, two, three],
    descriptions: [
      "طراحی بسته‌بندی لانچ و معرفی کرم آبرسان گیاهی نوروزلانچ و معرفی کرم آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان آبرسان آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان گیاهی نوروز",
      "طراحی بسته‌بندی لانچ و معرفی کرم آبرسان گیاهی نوروزلانچ و معرفی کرم آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان آبرسان آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان گیاهی نوروز",
      "طراحی بسته‌بندی لانچ و معرفی کرم آبرسان گیاهی نوروزلانچ و معرفی کرم آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان آبرسان آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان گیاهی نوروز",
      "طراحی بسته‌بندی لانچ و معرفی کرم آبرسان گیاهی نوروزلانچ و معرفی کرم آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان آبرسان آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان گیاهی نوروز",
      "طراحی بسته‌بندی لانچ و معرفی کرم آبرسان گیاهی نوروزلانچ و معرفی کرم آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان آبرسان آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان گیاهی نوروز",
    ],
  };

  useEffect(() => {
    setIsFullWidth(Array(work.images.length).fill(true));
  }, [work.images.length]);

  const toggleGrid = (index) => {
    setIsFullWidth((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  useEffect(() => {
    if (!displayGallerySlider) {
      let prevScrollY = window.scrollY;
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > prevScrollY) {
          setDisplayMenu(false);
        } else if (currentScrollY < prevScrollY) {
          setDisplayMenu(true);
        }
        prevScrollY = currentScrollY;
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [displayGallerySlider, setDisplayMenu]);

  return (
    <div className={classes.container}>
      <div className={classes.information}>
        <p>{work.descriptions[0]}</p>
        <div>
          <h1>{work.title}</h1>
          <h2>{work.title}</h2>
        </div>
      </div>
      {work.images.map((image, index) => (
        <Fragment key={index}>
          <button onClick={() => toggleGrid(index)} å>
            Toggle Grid
          </button>
          <div
            className={
              isFullWidth[index] ? classes.fullWidth : classes.halfWidth
            }
            onClick={() => {
              setDisplayMenu(false);
              setDisplayGallerySlider(true);
              window.scrollTo(0, 0);
              document.body.style.overflow = "hidden";
            }}
          >
            <div className={classes.imageBox}>
              <Image
                src={image}
                blurDataURL={image}
                placeholder="blur"
                alt={work.title}
                layout="responsive"
                objectFit="cover"
                priority
              />
              <p className={classes.text}>بزرگنمایی +</p>
            </div>
            {index % 2 === 0 && <h2>{work.descriptions[index]}</h2>}
          </div>
        </Fragment>
      ))}
      {displayGallerySlider && (
        <div className={classes.gallerySlider}>
          <div className={classes.icon}>
            <CloseIcon
              onClick={() => {
                setDisplayMenu(true);
                setDisplayGallerySlider(false);
                document.body.style.overflow = "auto";
              }}
            />
          </div>
          <h3>{work.title}</h3>
          <GallerySlider images={work.images} />
        </div>
      )}
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
