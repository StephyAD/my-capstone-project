// services/newsApi.js
const API_KEY = import.meta.env.VITE_NEWS_API_KEY; // use env variable
const BASE_URL = "https://api.thenewsapi.com/v1/news/top";

export async function fetchLatestNews(category = "General") {
  try {
    const categoryMap = {
      General: "general",
      Politics: "politics",
      Sports: "sports",
      Entertainment: "entertainment",
    };

    const url = `${BASE_URL}?api_token=${API_KEY}&locale=us&limit=10&categories=${categoryMap[category] || "general"}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch news");

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

