"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Hero from "@/components/Hero";
import NewsCard from "@/components/NewsCard";

export default function HomePage() {
  const { lang } = useLanguage();
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [debugError, setDebugError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");

  // New State for Modal (Popup to read news on site)
  const [activeArticle, setActiveArticle] = useState(null);

  const categories = [
    { id: "general", name: lang === "hi" ? "ताज़ा खबरें" : "General" },
    { id: "sports", name: lang === "hi" ? "खेल (Sports)" : "Sports" },
    { id: "entertainment", name: lang === "hi" ? "मनोरंजन" : "Entertainment" },
    { id: "business", name: lang === "hi" ? "व्यापार" : "Business" },
    { id: "technology", name: lang === "hi" ? "तकनीक" : "Technology" },
    { id: "health", name: lang === "hi" ? "स्वास्थ्य" : "Health" },
  ];

  useEffect(() => {
    async function fetchNewsByCategory() {
      setLoading(true);
      setLatestNews([]);

      try {
        setDebugError(null);
        const res = await fetch(
          `/api/news?lang=${lang}&category=${selectedCategory}`,
        );

        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();

        if (!data?.articles || data.articles.length === 0) {
          throw new Error("No articles found");
        }

        const formatted = data.articles
          .filter((art) => art && art.title && art.title !== "[Removed]")
          .slice(0, 12)
          .map((art, idx) => ({
            title: art.title,
            category: art.source?.name || selectedCategory,
            image:
              art.urlToImage || `https://picsum.photos/600/400?random=${idx}`,
            url: art.url || "#",
            description:
              art.description || "Read the full story at the source.",
            content:
              art.content ||
              art.description ||
              "No additional content available.",
            publishedAt: art.publishedAt
              ? new Date(art.publishedAt).toLocaleDateString()
              : "Just Now",
          }));

        setLatestNews(formatted);
      } catch (err) {
        console.error("Fetch error:", err);
        setDebugError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchNewsByCategory();
  }, [lang, selectedCategory]);

  const filteredArticles = latestNews.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const goldSilverNews = filteredArticles.find(
    (item) =>
      item.title.toLowerCase().includes("gold") ||
      item.title.toLowerCase().includes("silver") ||
      item.title.includes("सोना") ||
      item.title.includes("चांदी"),
  );

  const featuredArticle = goldSilverNews || filteredArticles[0];
  const secondaryArticles = filteredArticles.filter(
    (item) => item !== featuredArticle,
  );

  return (
    <main className="bg-[#050507] text-zinc-50 min-h-screen selection:bg-red-600 selection:text-white relative">
      <Hero />

      {debugError && (
        <section className="max-w-7xl mx-auto px-6 mt-8">
          <div className="bg-rose-950/30 border border-rose-500/20 backdrop-blur-md rounded-xl p-4 text-rose-400 text-xs font-mono">
            <span className="font-bold uppercase tracking-wider">
              {lang === "hi" ? "सिस्टम स्टेटस:" : "System Status:"}
            </span>{" "}
            {debugError}.
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-6 py-20">
        {/* Section Header & Search */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 pb-6 border-b border-zinc-900 gap-6">
          <div>
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-red-500 block mb-2">
              // {lang === "hi" ? "लाइव कवरेज" : "Live Coverage Feed"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-zinc-100">
              {lang === "hi" ? "ताज़ा खबरें" : "The Core Feed"}
            </h2>
          </div>

          <div className="w-full lg:w-72">
            <div className="relative">
              <input
                type="text"
                placeholder={
                  lang === "hi" ? "खबरें खोजें..." : "Search live feed..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors"
              />
              <span className="absolute right-3 top-3 text-zinc-500 text-xs pointer-events-none">
                🔍
              </span>
            </div>
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-6 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                selectedCategory === cat.id
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/25"
                  : "bg-zinc-900/60 text-zinc-400 border border-zinc-800 hover:text-white hover:border-zinc-700"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-8 animate-pulse">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl h-[450px]" />
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-zinc-900/40 border border-zinc-800/60 h-80 rounded-xl" />
              <div className="bg-zinc-900/40 border border-zinc-800/60 h-80 rounded-xl" />
              <div className="bg-zinc-900/40 border border-zinc-800/60 h-80 rounded-xl" />
            </div>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/30 border border-zinc-800/80 rounded-2xl">
            <p className="text-zinc-400 text-sm font-mono">
              {lang === "hi"
                ? "इस कैटेगरी में कोई खबर नहीं मिली।"
                : "No stories found in this category."}
            </p>
          </div>
        ) : (
          <div className="space-y-16">
            {/* Featured Hero Article (Click opens modal instead of external link) */}
            {featuredArticle && (
              <div
                onClick={() => setActiveArticle(featuredArticle)}
                className="group cursor-pointer block relative rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-900/40 hover:border-red-500/50 backdrop-blur-xl transition-all duration-500 shadow-2xl"
              >
                <div className="grid lg:grid-cols-12 min-h-[480px]">
                  <div className="lg:col-span-7 bg-zinc-950 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent lg:hidden z-10" />
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-widest font-mono">
                        <span>★</span>
                        <span>{selectedCategory.toUpperCase()}</span>
                        <span className="text-zinc-600">•</span>
                        <span className="text-zinc-400">
                          {featuredArticle.publishedAt}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-zinc-100 group-hover:text-red-400 transition-colors leading-[1.1]">
                        {featuredArticle.title}
                      </h3>

                      <p className="text-zinc-400 text-sm sm:text-base leading-relaxed line-clamp-3">
                        {featuredArticle.description}
                      </p>
                    </div>

                    <div className="pt-8 flex items-center gap-3 text-xs font-bold text-zinc-300 group-hover:text-white uppercase tracking-widest">
                      <span>
                        {lang === "hi"
                          ? "यहीं पढ़ें (Read Inside)"
                          : "Read Article Here"}
                      </span>
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Secondary Articles Grid - Wrapping with onClick to trigger modal */}
            {secondaryArticles.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {secondaryArticles.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveArticle(item)}
                    className="cursor-pointer"
                  >
                    <NewsCard {...item} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* --- NEWS ARTICLE POPUP MODAL --- */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 bg-zinc-800 hover:bg-red-600 text-zinc-300 hover:text-white w-9 h-9 rounded-full flex items-center justify-center transition-colors font-bold text-sm"
            >
              ✕
            </button>

            {/* Article Meta */}
            <div className="flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-widest font-mono mb-3">
              <span>{activeArticle.category}</span>
              <span>•</span>
              <span className="text-zinc-400">{activeArticle.publishedAt}</span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-100 tracking-tight leading-tight mb-4">
              {activeArticle.title}
            </h2>

            {/* Image */}
            <div className="rounded-xl overflow-hidden mb-6 h-64 sm:h-80 bg-zinc-950">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content / Description */}
            <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed mb-8">
              <p>{activeArticle.content}</p>
              <p className="text-zinc-400 text-xs">
                {activeArticle.description}
              </p>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-800">
              <a
                href={activeArticle.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-red-400 hover:text-red-300 underline font-mono"
              >
                {lang === "hi"
                  ? "मूल स्रोत (Original Source) पर देखें"
                  : "View at original source ↗"}
              </a>
              <button
                onClick={() => setActiveArticle(null)}
                className="w-full sm:w-auto px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold transition-colors"
              >
                {lang === "hi" ? "बंद करें" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
