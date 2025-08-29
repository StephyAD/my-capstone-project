// src/App.jsx
import { useEffect, useState } from "react";
import { fetchLatestNews } from "./services/newsApi";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

import SearchBar from "./components/SearchBar";
import NewsCard from "./components/NewsCard";
import ArticleDetails from "./components/ArticleDetails";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("General");
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const news = await fetchLatestNews(activeCategory);
        // debug: console.log("news:", news);
        setArticles(news || []);
      } catch (err) {
        setError("Failed to load articles. Check console for details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getNews();
  }, [activeCategory]);

  const filteredArticles = articles.filter((article) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    const title = (article.title || "").toLowerCase();
    const desc = (article.description || article.snippet || "").toLowerCase();
    return title.includes(q) || desc.includes(q);
  });

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* HEADER */}
      <header className="bg-white text-black flex justify-between items-center px-8 py-4 shadow-sm">
        <h1 className="text-xl font-extrabold">Gold Press</h1>
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
          <div className="w-6 h-6 bg-purple-700 rounded-full"></div>
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

      {/* MAIN */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-10">
        <SearchBar query={query} setQuery={setQuery} />

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredArticles.length === 0 ? (
          <p className="text-center text-gray-500">No articles found.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <NewsCard
                key={article.uuid}
                article={article}
                onOpen={(a) => setSelectedArticle(a)}
              />
            ))}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-black text-white py-6 px-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-sm">2025 Gold Press | Powered by Stephanie</p>
        <div className="flex space-x-4">
          <a href="#" className="bg-white p-2 rounded-full text-black"><FaFacebook size={18} /></a>
          <a href="#" className="bg-white p-2 rounded-full text-black"><FaInstagram size={18} /></a>
          <a href="#" className="bg-white p-2 rounded-full text-black"><FaTwitter size={18} /></a>
          <a href="#" className="bg-white p-2 rounded-full text-black"><FaYoutube size={20} /></a>
        </div>
      </footer>

      {/* Modal details */}
      {selectedArticle && (
        <ArticleDetails
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
}

export default App;
