import Resume from "@/models/Resume";
import dbConnect from "@/services/dbConnect";

export default async function jobsHandler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=10");
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const newResume = await Resume.create(body);
        return res.status(200).json(newResume);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "GET":
      try {
        let resume = null;
        if (req.query.id) {
          resume = await Resume.findById(req.query.id);
        } else {
          resume = await Resume.find();
        }
        return res.status(200).json(resume);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "PUT":
      try {
        const updateResume = await Resume.findByIdAndUpdate(
          body.id || body._id,
          body,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!updateResume) {
          return res.status(400).json({ msg: err.message });
        }
        return res.status(200).json(updateResume);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "DELETE":
      try {
        const deleteResume = await Resume.findByIdAndDelete(req.query.id);
        if (!deleteResume) {
          return res.status(404).json({ msg: "Resume not found" });
        }
        return res.status(200).json({ msg: "Resume deleted successfully" });
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    default:
      return res.status(405).json({ msg: "Method Not Allowed" });
  }
}
