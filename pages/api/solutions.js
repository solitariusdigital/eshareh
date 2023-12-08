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
        const solutions = await Solution.find();
        return res.status(200).json(solutions);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "PUT":
      try {
        const updateSolution = await Solution.findByIdAndUpdate(
          body.id || body["_id"],
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
  }
}