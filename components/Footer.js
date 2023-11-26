import { useContext } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./Footer.module.scss";
import Image from "next/legacy/image";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import MuseTechLab from "@/assets/MuseTechLab.svg";

export default function Footer() {
  const { language, setLanguage } = useContext(StateContext);

  return (
    <div
      className={classes.footer}
      style={{
        fontFamily: language ? "English" : "English",
      }}
    >
      <div className={classes.copyright}>
        {language ? (
          <p>© 1376 - 1402 eshareh.com</p>
        ) : (
          <p>© 1997 - 2023 eshareh.com</p>
        )}
        {/* <div
          className={classes.row}
          onClick={() => window.open("https://musetechlab.com/")}
        >
          <Image
            className={classes.image}
            src={MuseTechLab}
            alt="MuseTechLab"
            width={120}
            height={30}
            loading="eager"
            as="image"
          />
          <p className={classes.action}>{language ? "توسعه" : "Development"}</p>
          <PrecisionManufacturingIcon sx={{ fontSize: 18 }} />
        </div> */}
      </div>
    </div>
  );
}
