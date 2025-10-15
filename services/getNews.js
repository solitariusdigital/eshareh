import dbConnect from "@/services/dbConnect";
import newsModel from "@/models/News";
import { replaceSpacesAndHyphens } from "@/services/utility";

export async function getNews(context) {
  try {
    await dbConnect();
    const news = await newsModel.find();
    const activeNews = news.filter((project) => project.active);

    return {
      news: JSON.parse(JSON.stringify(news)),
      activeNews: JSON.parse(JSON.stringify(activeNews)),
      newsTitle: JSON.parse(
        JSON.stringify(
          context?.query?.news
            ? replaceSpacesAndHyphens(context.query.news)
            : null
        )
      ),
    };
  } catch (error) {
    console.error("getNews error:", error);
    throw error;
  }
}
