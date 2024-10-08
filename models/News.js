import { Schema, model, models } from "mongoose";

const NewsSchema = new Schema(
  {
    fa: {
      title: String,
      paragraph: String,
    },
    en: {
      title: String,
      paragraph: String,
    },
    media: String,
    active: Boolean,
  },
  { timestamps: true }
);

const News = models.News || model("News", NewsSchema);
export default News;
