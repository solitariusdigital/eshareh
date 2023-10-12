import classes from "./Footer.module.scss";
import Image from "next/legacy/image";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import MuseTechLab from "@/assets/MuseTechLab.svg";

export default function Footer() {
  return (
    <div className={classes.footer}>
      <div className={classes.copyright}>
        <p>کليه حقوق اين وب اپلیکیشن به اشاره تعلق دارد</p>
        <p>eshareh.com @Copyright 2023</p>
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
            alt="image"
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
