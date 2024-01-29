import Cover from "@/models/Cover";
import dbConnect from "@/services/dbConnect";

export default async function coversHandler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=10");
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const newCover = await Cover.create(body);
        return res.status(200).json(newCover);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "GET":
      try {
        const covers = await Cover.find();
        return res.status(200).json(covers);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "PUT":
      try {
        const updateCover = await Cover.findByIdAndUpdate(
          body.id || body["_id"],
          body,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!updateCover) {
          return res.status(400).json({ msg: err.message });
        }
        return res.status(200).json(updateCover);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
  }
}