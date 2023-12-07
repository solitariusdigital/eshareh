import { Schema, model, models } from "mongoose";

const SolutionSchema = new Schema(
  {
    fa: {
      title: String,
      subtitle: String,
      summary: String,
      problem: String,
      solution: String,
      year: Number,
    },
    en: {
      title: String,
      subtitle: String,
      summary: String,
      problem: String,
      solution: String,
      year: Number,
    },
    media: [{ link: String, type: String }],
  },
  { timestamps: true }
);

const Solution = models.Solution || model("Solution", SolutionSchema);
export default Solution;
