import Project from "@/models/Project";
import dbConnect from "@/services/dbConnect";

export default async function projectHandler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=10");
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const newProject = await Project.create(body);
        return res.status(200).json(newProject);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "GET":
      try {
        let project = null;
        if (req.query.id) {
          project = await Project.findById(req.query.id);
        } else {
          project = await Project.find();
        }
        return res.status(200).json(project);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "PUT":
      try {
        const updateProject = await Project.findByIdAndUpdate(
          body.id || body._id,
          body,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!updateProject) {
          return res.status(400).json({ msg: err.message });
        }
        return res.status(200).json(updateProject);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "DELETE":
      try {
        const deletedProject = await Project.findByIdAndDelete(req.query.id);
        if (!deletedProject) {
          return res.status(404).json({ msg: "Project not found" });
        }
        return res.status(200).json({ msg: "Project deleted successfully" });
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    default:
      return res.status(405).json({ msg: "Method Not Allowed" });
  }
}
