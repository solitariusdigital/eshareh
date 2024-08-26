import { Schema, model, models } from "mongoose";

const ContentTextSchema = new Schema({
  type: { type: String, enum: ["text"], required: true },
  data: {
    text: {
      fa: { type: String, required: true },
      en: { type: String, required: true },
    },
  },
});

const ContentImageSchema = new Schema({
  type: { type: String, enum: ["image"], required: true },
  data: {
    url: { type: String, required: true },
    alt: { type: String, required: true },
  },
});

const ContentSchema = new Schema({
  $or: [ContentTextSchema, ContentImageSchema],
});

const PageSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    content: [ContentSchema],
  },
  { timestamps: true }
);

const Page = models.Page || model("Page", PageSchema);
export default Page;
