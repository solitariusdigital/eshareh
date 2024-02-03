import { Schema, model, models } from "mongoose";

const SolutionSchema = new Schema(
  {
    fa: {
      title: String,
      subtitle: String,
      brief: String,
      solution: String,
      year: Number,
      category: String,
    },
    en: {
      title: String,
      subtitle: String,
      brief: String,
      solution: String,
      year: Number,
      category: String,
    },
    media: [],
    mediaDouble: [],
    mediaQuadruple: [],
    slideMedia: [],
    coverMedia: {},
    active: Boolean,
  },
  { timestamps: true }
);

const Solution = models.Solution || model("Solution", SolutionSchema);
export default Solution;
