import { Schema, model, models } from "mongoose";

const CoverSchema = new Schema(
  {
    title: {
      fa: String,
      en: String,
    },
    coverMedia: {},
    link: String,
    color: String,
    active: Boolean,
    text: Boolean,
  },
  { timestamps: true }
);

const Cover = models.Cover || model("Cover", CoverSchema);
export default Cover;
