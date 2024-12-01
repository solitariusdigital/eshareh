import Jobs from "@/models/Jobs";
import dbConnect from "@/services/dbConnect";

export default async function jobsHandler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=10");
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const newJobs = await Jobs.create(body);
        return res.status(200).json(newJobs);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "GET":
      try {
        let jobs = null;
        if (req.query.id) {
          jobs = await Jobs.findById(req.query.id);
        } else {
          jobs = await Jobs.find();
        }
        return res.status(200).json(jobs);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "PUT":
      try {
        const updateJobs = await Jobs.findByIdAndUpdate(
          body.id || body["_id"],
          body,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!updateJobs) {
          return res.status(400).json({ msg: err.message });
        }
        return res.status(200).json(updateJobs);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "DELETE":
      try {
        const deleteJobs = await Jobs.findByIdAndDelete(req.query.id);
        if (!deleteJobs) {
          return res.status(404).json({ msg: "Jobs not found" });
        }
        return res.status(200).json({ msg: "Jobs deleted successfully" });
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    default:
      return res.status(405).json({ msg: "Method Not Allowed" });
  }
}
