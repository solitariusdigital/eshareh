import { useState, useEffect } from "react";

export default function Typewriter({ text, speed = 250 }) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplay(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <h3
      style={{
        fontFamily: "EnglishMedium",
        letterSpacing: "0.2em",
      }}
    >
      {display}
    </h3>
  );
}
