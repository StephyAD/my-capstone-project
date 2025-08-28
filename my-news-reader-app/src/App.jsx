import { useEffect, useState } from "react";
import { fetchLatestNews } from "./services/newsApi";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import SearchBar from "./components/SearchBar";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("General");

  useEffect(() => {
    const getNews = async () => {
      const news = await fetchLatestNews(activeCategory); // pass category
      setArticles(news);
      setLoading(false);
    };
    getNews();
  }, [activeCategory]); // refetch when category changes

  if (loading) return <h1 className="text-center text-2xl mt-10">Loading...</h1>;

  // Filter by search query
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* HEADER */}
      <header className="bg-white text-black flex justify-between items-center px-8 py-4 shadow-sm">
        <h1 className="text-1xl font-extrabold font-['Roboto_Serif'] mt-[-4px]">
          Gold Press
        </h1>
        <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center">
          <div className="w-7 h-7 bg-purple-700 rounded-full"></div>
        </div>
      </header>

      {/* TABS */}
      <nav className="flex justify-center space-x-6 border-b border-gray-300 mt-4">
        {["General", "Politics", "Sports", "Entertainment"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveCategory(tab)}
            className={`px-3 py-1 ${
              activeCategory === tab
                ? "border-b-2 border-gray-800 text-gray-800 font-semibold"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-10 space-y-10">
        <SearchBar query={query} setQuery={setQuery} />

        {filteredArticles.length === 0 ? (
          <p className="text-center text-gray-500">No articles found.</p>
        ) : (
          filteredArticles.map((article) => (
            <div
              key={article.uuid}
              className="flex flex-col md:flex-row gap-6 items-start"
            >
              {article.image_url && (
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full md:w-80 h-60 object-cover rounded-lg shadow"
                />
              )}
              <div className="flex-1">
                <h2 className="text-2xl font-serif mb-3">{article.title}</h2>
                <p className="text-gray-600 text-sm mb-2">
                  {new Date(article.published_at).toLocaleDateString()} |{" "}
                  {article.source}
                </p>
                <p className="text-gray-700 mb-3">{article.snippet}</p>
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
          ))
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-black text-white py-6 px-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-sm">2025 Gold Press | Powered by Stephanie</p>
        <div className="flex space-x-4">
          <a href="#" className="bg-white p-2 rounded-full text-black">
            <FaFacebook size={20} />
          </a>
          <a href="#" className="bg-white p-2 rounded-full text-black">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="bg-white p-2 rounded-full text-black">
            <FaTwitter size={20} />
          </a>
          <a href="#" className="bg-white p-2 rounded-full text-black">
            <FaYoutube size={20} />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
