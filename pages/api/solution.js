import Solution from "@/models/Solution";
import dbConnect from "@/services/dbConnect";

export default async function solutionHandler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=10");
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const solution = await Solution.findById(req.query.id);
        return res.status(200).json(solution);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
  }
}
