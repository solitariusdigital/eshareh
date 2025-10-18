import { useEffect, useState, useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import Image from "next/legacy/image";
import classes from "./Setting.module.scss";
import Password from "./forms/Password";
import { createVcardApi } from "@/services/api";

export default function Setting() {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [vCard, setVcard] = useState(null);

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
    <div>
      <Password />
      <div>
        <h2>vCard QR Code</h2>
        {vCard ? (
          <Image width={250} height={250} src={vCard} alt="vCard" />
        ) : (
          <p>Generating...</p>
        )}
      </div>
    </div>
  );
}
