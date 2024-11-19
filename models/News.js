import { Schema, model, models } from "mongoose";

const NewsSchema = new Schema(
  {
    fa: {
      title: String,
      subtitle: String,
      paragraph: String,
      date: String,
    },
    en: {
      title: String,
      subtitle: String,
      paragraph: String,
      date: String,
    },
    dateString: String,
    media: [],
    voice: [],
    active: Boolean,
    newsId: String,
  },
  { timestamps: true }
);

const News = models.News || model("News", NewsSchema);
export default News;
