import Task from "@/models/Task";
import dbConnect from "@/services/dbConnect";

export default async function taskHandler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=10");
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const newTask = await Task.create(body);
        return res.status(200).json(newTask);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "GET":
      try {
        let task = null;
        if (req.query.id) {
          task = await Task.findById(req.query.id);
        } else {
          task = await Task.find();
        }
        return res.status(200).json(project);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "PUT":
      try {
        const updateTask = await Task.findByIdAndUpdate(
          body.id || body._id,
          body,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!updateTask) {
          return res.status(400).json({ msg: err.message });
        }
        return res.status(200).json(updateTask);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "DELETE":
      try {
        const deletedTask = await Task.findByIdAndDelete(req.query.id);
        if (!deletedTask) {
          return res.status(404).json({ msg: "Task not found" });
        }
        return res.status(200).json({ msg: "Task deleted successfully" });
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    default:
      return res.status(405).json({ msg: "Method Not Allowed" });
  }
}
