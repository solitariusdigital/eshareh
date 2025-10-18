import { useEffect, useState, useContext } from "react";
import { StateContext } from "@/context/stateContext";
import Image from "next/legacy/image";
import classes from "./Setting.module.scss";
import Password from "./forms/Password";
import { createVcardApi } from "@/services/api";
import prevYellow from "@/assets/prevYellow.svg";
import CloseIcon from "@mui/icons-material/Close";
import { getSingleUserApi, updateUserApi } from "@/services/api";

export default function Setting() {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [settingType, setSettingType] = useState("vcard" || "password");
  const [vCard, setVcard] = useState(null);
  const [mobile, setMobile] = useState("");
  const typesName = ["vcard", "password"];

  useEffect(() => {
    const handleUserData = async () => {
      const userData = await getSingleUserApi(currentUser._id);
      if (userData.mobile) {
        setMobile(userData.mobile);
      }
    };
    handleUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const updateUserAndVcard = async () => {
      if (mobile && mobile.length < 11) return;
      try {
        if (mobile.length === 11) {
          const userData = await getSingleUserApi(currentUser._id);
          const updateUserData = {
            ...userData,
            mobile,
          };
          await updateUserApi(updateUserData);
        }
        const qrCodeData = {
          name: currentUser.name.fa,
          org: "Eshareh Digital Agency",
          title: currentUser.title.fa,
          phone: "+982188044244",
          mobile: mobile ? `+98${mobile.slice(1)}` : null,
          email: currentUser.email,
          site: "https://eshareh.com",
        };
        const result = await createVcardApi(qrCodeData);
        setVcard(result.qr);
      } catch (error) {
        console.error("Error updating user or generating vCard:", error);
      }
    };
    updateUserAndVcard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobile]);

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
          <div className={classes.input}>
            <div className={classes.bar}>
              <p className={classes.label}>موبایل</p>
              <CloseIcon
                className="icon"
                onClick={() => {
                  setMobile("");
                }}
                sx={{ fontSize: 16 }}
              />
            </div>
            <input
              style={{
                fontFamily: "English",
              }}
              placeholder="09121234567"
              type="tel"
              id="mobile"
              name="mobile"
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
              autoComplete="off"
              maxLength={11}
            />
          </div>
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
