import { Schema, model, models } from "mongoose";

// Define the schema for text content
const ContentSchema = new Schema({
  type: { type: String, required: true },
  data: {
    fa: { type: String, required: true },
    en: { type: String, required: true },
  },
});

// Define the main Page schema
const PageSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    content: {
      type: [ContentSchema],
      required: true,
    },
  },
  { timestamps: true }
);

// Create the model
const Page = models.Page || model("Page", PageSchema);
export default Page;
