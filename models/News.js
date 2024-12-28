import { Schema, model, models } from "mongoose";

const NewsSchema = new Schema(
  {
    fa: {
      title: String,
      paragraph: String,
      titleSeo: String,
      descriptionSeo: String,
      category: String,
      date: String,
    },
    en: {
      title: String,
      paragraph: String,
      titleSeo: String,
      descriptionSeo: String,
      category: String,
      date: String,
    },
    dateString: String,
    fields: [],
    media: [],
    voice: [],
    active: Boolean,
    newsId: String,
  },
  { timestamps: true }
);

const News = models.News || model("News", NewsSchema);
export default News;
