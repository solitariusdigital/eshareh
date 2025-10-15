import News from "@/components/News";
import { getNews } from "@/services/getNews";

export default function NewsPage({ adminNews, activeNews }) {
  return <News adminNews={adminNews} activeNews={activeNews} portal={false} />;
}

// initial connection to db
export async function getServerSideProps(context) {
  try {
    const { news, activeNews } = await getNews(context);
    return { props: { adminNews: news, activeNews } };
  } catch (e) {
    return { notFound: true };
  }
}
