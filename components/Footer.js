import classes from "./Footer.module.scss";
import Image from "next/legacy/image";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import MuseTechLab from "@/assets/MuseTechLab.svg";
import { enToFaDigits } from "@/services/utility";

export default function Footer() {
  return (
    <div className={classes.footer}>
      <div className={classes.copyright}>
        <p>
          © {enToFaDigits(1376)} - {enToFaDigits(1402)} eshareh.com
        </p>
        <div
          className={classes.row}
          onClick={() =>
            window.open(
              "https://docs.google.com/forms/d/e/1FAIpQLSdqKHLBydQIfm06LTtw0wELHaDJJFGU3GNQFsVWNd3t0jz5hA/viewform?usp=sf_link",
              "_ self"
            )
          }
        >
          <Image
            className={classes.image}
            src={MuseTechLab}
            alt="MuseTechLab"
            width={120}
            height={30}
            loading="eager"
          />
          <p className={classes.action}>طراحی توسعه پشتیبانی</p>
          <PrecisionManufacturingIcon sx={{ fontSize: 18 }} />
        </div>
      </div>
    </div>
  );
}
