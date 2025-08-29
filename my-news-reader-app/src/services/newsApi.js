// services/newsApi.js
const API_KEY = import.meta.env.VITE_NEWS_API_KEY; // from .env
const BASE_URL = "https://api.thenewsapi.com/v1/news/top";

/**
 * Fetch the latest news articles from the API
 * @param {string} category - News category (General, Politics, Sports, Entertainment)
 * @param {number} limit - Number of articles to fetch (default 10)
 * @returns {Promise<Array>} - Array of news articles
 */
export async function fetchLatestNews(category = "General", limit = 10) {
  try {
  
    const categoryMap = {
      General: "general",
      Politics: "politics",
      Sports: "sports",
      Entertainment: "entertainment",
    };

    const url = `${BASE_URL}?api_token=${API_KEY}&locale=us&limit=${limit}&categories=${
      categoryMap[category] || "general"
    }`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch news: ${res.status}`);

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("❌ Error fetching news:", error);
    return [];
  }
}
