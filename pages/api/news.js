import News from "@/models/News";
import dbConnect from "@/services/dbConnect";

export default async function newsHandler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=10");
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const newNews = await News.create(body);
        return res.status(200).json(newNews);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "GET":
      try {
        let news = null;
        if (req.query.id) {
          news = await News.findById(req.query.id);
        } else {
          news = await News.find();
        }
        return res.status(200).json(news);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "PUT":
      try {
        const updateNews = await News.findByIdAndUpdate(
          body.id || body["_id"],
          body,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!updateNews) {
          return res.status(400).json({ msg: err.message });
        }
        return res.status(200).json(updateNews);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "DELETE":
      try {
        const deleteNews = await News.findByIdAndDelete(req.query.id);
        if (!deleteNews) {
          return res.status(404).json({ msg: "News not found" });
        }
        return res.status(200).json({ msg: "News deleted successfully" });
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    default:
      return res.status(405).json({ msg: "Method Not Allowed" });
  }
}
