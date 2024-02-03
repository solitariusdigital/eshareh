import { Schema, model, models } from "mongoose";

const CoverSchema = new Schema(
  {
    title: {
      fa: "",
      en: "",
    },
    coverMedia: {},
    link: "",
    color: "",
    active: Boolean,
    text: Boolean,
  },
  { timestamps: true }
);

const Cover = models.Cover || model("Cover", CoverSchema);
export default Cover;
