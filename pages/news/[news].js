import NewsArticle from "@/components/NewsArticle";
import { getNews } from "@/services/getNews";

export default function News({ news, newsTitle }) {
  return <NewsArticle news={news} newsTitle={newsTitle} />;
}

// initial connection to db
export async function getServerSideProps(context) {
  try {
    const { news, newsTitle } = await getNews(context);
    return { props: { news, newsTitle } };
  } catch (e) {
    return { notFound: true };
  }
}
