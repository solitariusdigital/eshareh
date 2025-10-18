import QRCode from "qrcode";

export default async function vCardHandler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate");
  if (req.method !== "POST") {
    return res.status(405).json({ msg: "Method Not Allowed" });
  }
  try {
    const qr = await generateVCardQR(req.body);
    return res.status(200).json({ qr });
  } catch (err) {
    return res.status(400).json({ msg: err.message || "QR generation failed" });
  }
}

async function generateVCardQR({
  name,
  org,
  title,
  phone,
  mobile,
  email,
  site,
}) {
  const vCard = `
BEGIN:VCARD
VERSION:3.0
N:${name || ""}
FN:${name || ""}
ORG:${org || ""}
TITLE:${title || ""}
${phone ? `TEL;TYPE=WORK,VOICE:${phone}` : ""}
${mobile ? `TEL;TYPE=CELL:${mobile}` : ""}
${email ? `EMAIL;TYPE=PREF,INTERNET:${email}` : ""}
${site ? `URL:${site}` : ""}
END:VCARD
`.trim();

  const qrDataUrl = await QRCode.toDataURL(vCard, {
    errorCorrectionLevel: "H",
    margin: 2,
    width: 400,
    color: {
      dark: "#000000",
      light: "#FFFFFF",
    },
  });

  return qrDataUrl;
}
