import React, { useRef, useEffect } from "react";
import classes from "./AutoPlaySilentVideo.module.scss";

export default function AutoPlaySilentVideo({ animeSrc }) {
  const videoRef = useRef(undefined);
  useEffect(() => {
    videoRef.current.defaultMuted = true;
  });
  return (
    <video
      className={classes.anime}
      ref={videoRef}
      loop
      autoPlay
      muted
      playsInline
    >
      <source src={animeSrc} type="video/mp4" />
    </video>
  );
}
