"use client";

export default function ArticleModal({ article, onClose }) {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white dark:bg-zinc-950 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onClose}
          className="mb-6 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg font-bold"
        >
          ← Close Article
        </button>
        <h1 className="text-4xl font-extrabold mb-4">{article.title}</h1>
        <img
          src={article.image}
          className="w-full h-64 object-cover rounded-2xl mb-6"
        />
        <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
          {article.description}
        </p>
        <a
          href={article.url}
          target="_blank"
          className="block mt-8 text-red-600 font-bold underline"
        >
          Read full source article here
        </a>
      </div>
    </div>
  );
}
