import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./CardGrid.module.scss";
import Image from "next/legacy/image";
import one from "@/assets/one.jpg";
import two from "@/assets/two.jpg";
import three from "@/assets/three.jpg";
import four from "@/assets/one.jpg";
import five from "@/assets/two.jpg";

export default function CardGrid({ direction }) {
  const { screenSize, setScreenSize } = useContext(StateContext);

  return (
    <Fragment>
      {screenSize === "desktop" && (
        <div className={direction ? classes.gridDesktop : classes.reverse}>
          <div className={classes.hero}>
            <Image
              className={classes.image}
              src={one}
              blurDataURL={one}
              placeholder="blur"
              alt="image"
              layout="fill"
              objectFit="cover"
              priority
            />
            <h3>صنعت خشکبار و حبوبات کوروش</h3>
          </div>
          <div className={classes.grid}>
            <div>
              <div className={classes.box}>
                <Image
                  className={classes.image}
                  src={two}
                  blurDataURL={two}
                  placeholder="blur"
                  alt="image"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
              <h3>صنعت خشکبار و حبوبات کوروش</h3>
            </div>
            <div>
              <div className={classes.box}>
                <Image
                  className={classes.image}
                  src={three}
                  blurDataURL={three}
                  placeholder="blur"
                  alt="image"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
              <h3>صنعت خشکبار و حبوبات کوروش</h3>
            </div>
            <div>
              <div className={classes.box}>
                <Image
                  className={classes.image}
                  src={four}
                  blurDataURL={four}
                  placeholder="blur"
                  alt="image"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
              <h3>صنعت خشکبار و حبوبات کوروش</h3>
            </div>
            <div>
              <div className={classes.box}>
                <Image
                  className={classes.image}
                  src={five}
                  blurDataURL={five}
                  placeholder="blur"
                  alt="image"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
              <h3>صنعت خشکبار و حبوبات کوروش</h3>
            </div>
          </div>
        </div>
      )}
      {screenSize !== "desktop" && (
        <div className={classes.responsive}>
          <div>
            <div className={classes.box}>
              <Image
                className={classes.image}
                src={one}
                blurDataURL={one}
                placeholder="blur"
                alt="image"
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
            <h3>صنعت خشکبار و حبوبات کوروش</h3>
          </div>
          <div>
            <div className={classes.box}>
              <Image
                className={classes.image}
                src={two}
                blurDataURL={two}
                placeholder="blur"
                alt="image"
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
            <h3>صنعت خشکبار و حبوبات کوروش</h3>
          </div>
          <div>
            <div className={classes.box}>
              <Image
                className={classes.image}
                src={three}
                blurDataURL={three}
                placeholder="blur"
                alt="image"
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
            <h3>صنعت خشکبار و حبوبات کوروش</h3>
          </div>
          <div>
            <div className={classes.box}>
              <Image
                className={classes.image}
                src={four}
                blurDataURL={four}
                placeholder="blur"
                alt="image"
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
            <h3>صنعت خشکبار و حبوبات کوروش</h3>
          </div>
        </div>
      )}
    </Fragment>
  );
}
