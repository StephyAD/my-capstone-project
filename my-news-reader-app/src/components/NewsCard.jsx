function NewsCard({ article, onOpen }) {
  if (!article) return null;

  return (
    <div
      onClick={() => onOpen(article)}
      className="flex flex-col md:flex-row gap-6 items-start cursor-pointer hover:bg-gray-50 p-4 rounded-lg transition"
    >
      {/* Thumbnail */}
      {article.image_url && (
        <img
          src={article.image_url}
          alt={article.title}
          className="w-full md:w-80 h-60 object-cover rounded-lg shadow"
        />
      )}

      {/* Article Info */}
      <div className="flex-1">
        <h2 className="text-2xl font-serif mb-3">{article.title}</h2>
        <p className="text-gray-600 text-sm mb-2">
          {new Date(article.published_at).toLocaleDateString()} |{" "}
          {article.source}
        </p>
        <p className="text-gray-700 mb-3">{article.snippet}</p>
        <span className="text-blue-600 hover:underline text-sm">
          Read More →
        </span>
      </div>
    </div>
  );
}

export default NewsCard;
