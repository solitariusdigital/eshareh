import Solution from "@/models/Solution";
import dbConnect from "@/services/dbConnect";

export default async function solutionsHandler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=10");
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const newSolution = await Solution.create(body);
        return res.status(200).json(newSolution);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "GET":
      try {
        let solutions = null;
        if (req.query.id) {
          solutions = await Solution.findById(req.query.id);
        } else {
          solutions = await Solution.find();
        }
        return res.status(200).json(solutions);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "PUT":
      try {
        const updateSolution = await Solution.findByIdAndUpdate(
          body.id || body._id,
          body,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!updateSolution) {
          return res.status(400).json({ msg: err.message });
        }
        return res.status(200).json(updateSolution);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "DELETE":
      try {
        const deleteSolution = await Solution.findByIdAndDelete(req.query.id);
        if (!deleteSolution) {
          return res.status(404).json({ msg: "Solution not found" });
        }
        return res.status(200).json({ msg: "Solution deleted successfully" });
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    default:
      return res.status(405).json({ msg: "Method Not Allowed" });
  }
}
