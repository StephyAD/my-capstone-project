import React from "react";

function ArticleDetails({ article, onClose }) {
  if (!article) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white max-w-2xl w-full rounded-lg shadow-lg p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h1 className="text-2xl font-bold mb-4">{article.title}</h1>

        {article.image_url && (
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full rounded-lg mb-4"
          />
        )}

        <p className="text-gray-700 mb-4">
          {article.description || "No description available."}
        </p>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Read full article
        </a>
      </div>
    </div>
  );
}

export default ArticleDetails;
