import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./work.module.scss";
import { replaceSpacesAndHyphens } from "@/services/utility";
import Image from "next/legacy/image";
import GallerySlider from "@/components/GallerySlider";
import CloseIcon from "@mui/icons-material/Close";
import two from "@/assets/two.jpg";
import three from "@/assets/three.jpg";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function Work({ name }) {
  const { language, setLanguage } = useContext(StateContext);
  const { displayMenu, setDisplayMenu } = useContext(StateContext);

  const [isFullWidth, setIsFullWidth] = useState([]);
  const [displayGallerySlider, setDisplayGallerySlider] = useState(false);
  const [displayController, setDisplayController] = useState(false);

  const work = {
    title: {
      fa: "شرکت آریان کیمیا",
      en: "Arian Kimia Company",
    },
    type: "image",
    images: [three, two, three, two, three, two, three],
    descriptions: {
      fa: [
        "طراحی بسته‌بندی لانچ و معرفی کرم آبرسان گیاهی نوروزلانچ و معرفی کرم آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان آبرسان آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان گیاهی نوروز",
        "طراحی بسته‌بندی لانچ و معرفی کرم آبرسان گیاهی نوروزلانچ و معرفی کرم آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان آبرسان آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان گیاهی نوروز",
        "طراحی بسته‌بندی لانچ و معرفی کرم آبرسان گیاهی نوروزلانچ و معرفی کرم آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان آبرسان آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان گیاهی نوروز",
        "طراحی بسته‌بندی لانچ و معرفی کرم آبرسان گیاهی نوروزلانچ و معرفی کرم آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان آبرسان آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان گیاهی نوروز",
        "طراحی بسته‌بندی لانچ و معرفی کرم آبرسان گیاهی نوروزلانچ و معرفی کرم آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان آبرسان آبرسان گیاهی نوروز لانچ و معرفی کرم آبرسان گیاهی نوروز",
      ],
      en: [
        "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups",
        "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups",
        "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups",
        "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups",
        "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups",
      ],
    },
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
          setDisplayController(true);
        } else if (currentScrollY < prevScrollY) {
          setDisplayMenu(true);
          setDisplayController(false);
        }
        prevScrollY = currentScrollY;
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [displayGallerySlider, setDisplayMenu]);

  const gallerySlider = () => {
    setDisplayMenu(false);
    setDisplayController(false);
    setDisplayGallerySlider(true);
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
  };

  return (
    <div className={classes.container}>
      <div
        className={language ? classes.information : classes.informationReverse}
      >
        {language ? (
          <h2>{work.descriptions.fa[0]}</h2>
        ) : (
          <h2>{work.descriptions.en[0]}</h2>
        )}
        <div>
          {language ? <h1>{work.title.fa}</h1> : <h1>{work.title.en}</h1>}
          {language ? <h3>{work.title.fa}</h3> : <h3>{work.title.en}</h3>}
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
            onClick={() => gallerySlider()}
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
              <p className={classes.text}>
                {language ? "بزرگنمایی +" : "+ Enlarge"}
              </p>
            </div>
            {index % 2 === 0 && (
              <h2 style={{ textAlign: language ? "right" : "left" }}>
                {language
                  ? work.descriptions.fa[index]
                  : work.descriptions.en[index]}
              </h2>
            )}
          </div>
        </Fragment>
      ))}
      {displayController && (
        <div
          className={`${classes.projectController}  animate__animated animate__slideInUp`}
        >
          <div className={classes.controller}>
            <ArrowBackIosIcon className="icon" />
            <p>NEXT</p>
            <ArrowForwardIosIcon className="icon" />
          </div>
        </div>
      )}
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
          {language ? <h3>{work.title.fa}</h3> : <h3>{work.title.en}</h3>}
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
