import { useEffect, useState } from "react";
import { fetchLatestNews } from "./services/newsApi";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNews = async () => {
      const news = await fetchLatestNews();
      setArticles(news);
      setLoading(false);
    };
    getNews();
  }, []);

  if (loading) return <h1 className="text-center text-2xl mt-10">Loading...</h1>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-yellow-600">
        Gold Press
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        {articles.map((article) => (
          <div
            key={article.uuid}
            className="bg-white shadow rounded-lg overflow-hidden"
          >
            {article.image_url && (
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-600 text-sm mb-3">{article.snippet}</p>
              <p className="text-gray-500 text-xs mb-2">
                {new Date(article.published_at).toLocaleDateString()} |{" "}
                {article.source}
              </p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
