import Charity from "@/models/Charity";
import dbConnect from "@/services/dbConnect";

export default async function charityHandler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=10");
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const newCharity = await Charity.create(body);
        return res.status(200).json(newCharity);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "GET":
      try {
        const charity = await Charity.find();
        return res.status(200).json(charity);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "PUT":
      try {
        const updateCharity = await Charity.findByIdAndUpdate(
          body.id || body["_id"],
          body,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!updateCharity) {
          return res.status(400).json({ msg: err.message });
        }
        return res.status(200).json(updateCharity);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
  }
}
