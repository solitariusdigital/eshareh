import { Schema, model, models } from "mongoose";

const MediaSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    content: [
      {
        type: { type: String, required: true },
        link: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Media = models.Media || model("Media", MediaSchema);
export default Media;
