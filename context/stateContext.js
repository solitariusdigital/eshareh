import { useState, createContext } from "react";
export const StateContext = createContext();

export const StateProvider = (props) => {
  const [screenSize, setScreenSize] = useState(
    "desktop" || "tablet-landscape" || "tablet-portrait" || "mobile"
  );
  const [heroHeight, setHeroHeight] = useState(null);

  const stateContext = {
    screenSize,
    setScreenSize,
    heroHeight,
    setHeroHeight,
  };
  return (
    <StateContext.Provider value={stateContext}>
      {props.children}
    </StateContext.Provider>
  );
};
