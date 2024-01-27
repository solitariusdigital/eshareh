import { Schema, model, models } from "mongoose";

const CoverSchema = new Schema(
  {
    title: {
      fa: "",
      en: "",
    },
    media: "",
    link: "",
    color: "",
    active: Boolean,
  },
  { timestamps: true }
);

const Cover = models.Cover || model("Cover", CoverSchema);
export default Cover;
