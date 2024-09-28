import Page from "@/models/Page";
import dbConnect from "@/services/dbConnect";

export default async function pagesHandler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=10");
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const newPage = await Page.create(body);
        return res.status(200).json(newPage);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "GET":
      try {
        const pages = await Page.find();
        return res.status(200).json(pages);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "PUT":
      try {
        const updatePage = await Page.findByIdAndUpdate(
          body.id || body["_id"],
          body,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!updatePage) {
          return res.status(400).json({ msg: err.message });
        }
        return res.status(200).json(updatePage);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
  }
}
