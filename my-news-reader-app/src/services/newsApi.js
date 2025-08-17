const BASE_URL = "https://api.thenewsapi.com/v1/news";

export const fetchLatestNews = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/top?api_token=${import.meta.env.VITE_NEWS_API_KEY}&locale=us&limit=10`
    );
    const data = await response.json();
    return data.data; // The array of articles
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
