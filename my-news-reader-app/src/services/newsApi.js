// services/newsApi.js
const API_KEY = "YOUR_API_KEY"; // put your actual key here or better: use .env
const BASE_URL = "https://api.thenewsapi.com/v1/news/top";

export async function fetchLatestNews(category = "General") {
  try {
    // Map frontend category names to API category params
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

