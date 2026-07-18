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

  useEffect(() => {
    async function fetchLiveNews() {
      setLoading(true);
      setLatestNews([]);

      try {
        setDebugError(null);
        const res = await fetch(`/api/news?lang=${lang}`);

        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();

        if (!data?.articles || data.articles.length === 0) {
          throw new Error("No articles found");
        }

        const formatted = data.articles
          .filter((art) => art && art.title && art.title !== "[Removed]")
          .slice(0, 7)
          .map((art, idx) => ({
            title: art.title,
            category: art.source?.name || "Live News",
            image:
              art.urlToImage || `https://picsum.photos/600/400?random=${idx}`,
            url: art.url || "#",
            description:
              art.description || "Read the full story at the source.",
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

    fetchLiveNews();
  }, [lang]);

  // --- LOGIC: Gold/Silver Priority ---
  const goldSilverNews = latestNews.find(
    (item) =>
      item.title.toLowerCase().includes("gold") ||
      item.title.toLowerCase().includes("silver") ||
      item.title.includes("सोना") ||
      item.title.includes("चांदी"),
  );

  const featuredArticle = goldSilverNews || latestNews[0];
  const secondaryArticles = latestNews.filter(
    (item) => item !== featuredArticle,
  );
  // ------------------------------------

  return (
    <main className="bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-50 min-h-screen transition-colors duration-300">
      <Hero />

      {debugError && (
        <section className="max-w-7xl mx-auto px-6 mt-6">
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 text-rose-600 text-sm">
            <span className="font-bold">
              {lang === "hi" ? "सिस्टम स्टेटस:" : "System Status:"}
            </span>{" "}
            {debugError}.
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-12 border-b border-slate-200/60 dark:border-zinc-800/60 pb-6">
          <span className="text-xs font-semibold tracking-widest uppercase text-red-600">
            {lang === "hi" ? "लाइव कवरेज" : "Live Coverage Feed"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {lang === "hi" ? "ताज़ा खबरें" : "The Core Feed"}
          </h2>
        </div>

        {loading ? (
          <div className="space-y-8 animate-pulse">
            <div className="bg-slate-200 dark:bg-zinc-900 rounded-3xl h-[450px]" />
          </div>
        ) : (
          <div className="space-y-12">
            {featuredArticle && (
              <a
                href={featuredArticle.url}
                className="group block relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="grid lg:grid-cols-12 min-h-[450px]">
                  <div className="lg:col-span-7 bg-slate-100 dark:bg-zinc-800">
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold text-red-600 uppercase block mb-3">
                        ★{" "}
                        {goldSilverNews
                          ? lang === "hi"
                            ? "बाज़ार अपडेट"
                            : "Market Update"
                          : lang === "hi"
                            ? "मुख्य खबर"
                            : "Featured Story"}{" "}
                        • {featuredArticle.publishedAt}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold">
                        {featuredArticle.title}
                      </h3>
                      <p className="text-slate-600 dark:text-zinc-400 mt-4">
                        {featuredArticle.description}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            )}

            {secondaryArticles.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {secondaryArticles.map((item, index) => (
                  <NewsCard key={index} {...item} />
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
