import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./CardGrid.module.scss";
import Image from "next/legacy/image";
import one from "@/assets/one.jpg";
import two from "@/assets/two.jpg";
import three from "@/assets/three.jpg";

export default function CardGrid({ direction }) {
  const { screenSize, setScreenSize } = useContext(StateContext);

  return (
    <Fragment>
      {screenSize === "desktop" && (
        <div className={direction ? classes.container : classes.reverse}>
          <div className={classes.hero}>
            <div className={classes.image}>
              <Image
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
          <div className={classes.grid}>
            <div>
              <div className={classes.image}>
                <Image
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
              <div className={classes.image}>
                <Image
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
              <div className={classes.image}>
                <Image
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
              <div className={classes.image}>
                <Image
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
          </div>
        </div>
      )}
      {screenSize === "tablet" && <p>tablet</p>}
    </Fragment>
  );
}
