import { useEffect, useState, useContext } from "react";
import { StateContext } from "@/context/stateContext";
import Image from "next/legacy/image";
import classes from "./Setting.module.scss";
import Password from "./forms/Password";
import { createVcardApi } from "@/services/api";
import prevYellow from "@/assets/prevYellow.svg";

export default function Setting() {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [vCard, setVcard] = useState(null);
  const [settingType, setSettingType] = useState("vcard" || "password");

  const typesName = ["vcard", "password"];

  useEffect(() => {
    const qrCodeData = {
      name: currentUser.name.fa,
      org: "Eshareh Digital Agency",
      title: currentUser.title.fa,
      phone: "+982188044244",
      mobile: "+",
      email: currentUser.email,
      site: "https://eshareh.com",
    };
    const handleVcard = async () => {
      const result = await createVcardApi(qrCodeData);
      setVcard(result.qr);
    };
    handleVcard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.container}>
      <div
        className={classes.navigation}
        style={{
          fontFamily: "English",
        }}
      >
        {typesName.map((type, index) => (
          <p
            key={index}
            className={settingType === type ? classes.navActive : classes.nav}
            onClick={() => setSettingType(type)}
          >
            {type}
          </p>
        ))}
      </div>
      {settingType === "password" && <Password />}
      {settingType === "vcard" && vCard && (
        <div className={classes.vcard}>
          <h3
            style={{
              fontFamily: "FarsiBold",
            }}
          >
            کارت ویزیت دیجیتال
          </h3>
          <div className={classes.vcard}>
            <Image width={280} height={280} src={vCard} alt="vCard" />
            <div className={classes.logo}>
              <Image width={100} height={100} src={prevYellow} alt="logo" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
