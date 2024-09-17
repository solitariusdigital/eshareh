import Cover from "@/models/Cover";
import dbConnect from "@/services/dbConnect";

export default async function coverHandler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=10");
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const cover = await Cover.findById(req.query.id);
        return res.status(200).json(cover);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "DELETE":
      try {
        const deleteCover = await Cover.findByIdAndDelete(req.query.id);
        if (!deleteCover) {
          return res.status(404).json({ msg: "Cover not found" });
        }
        return res.status(200).json({ msg: "Cover deleted successfully" });
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    default:
      return res.status(405).json({ msg: "Method Not Allowed" });
  }
}
