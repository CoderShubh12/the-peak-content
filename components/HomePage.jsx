"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import BreakingNews from "@/components/BreakingNews";
import NewsCard from "@/components/NewsCard";

export default function HomePage({ language = "en" }) {
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [debugError, setDebugError] = useState(null);

  useEffect(() => {
    async function fetchLiveNews() {
      try {
        setDebugError(null);
        const res = await fetch("/api/news");

        if (!res.ok) {
          throw new Error(`API Server Responded with HTTP ${res.status}`);
        }

        const data = await res.json();

        if (!data) {
          throw new Error("Received empty or null response from /api/news");
        }

        if (data.articles && Array.isArray(data.articles)) {
          if (data.articles.length === 0) {
            throw new Error(
              "API returned status 200, but articles array is completely empty []",
            );
          }

          const formatted = data.articles
            .filter((art) => art && art.title && art.title !== "[Removed]")
            .slice(0, 7) // Loading up to 7 to support our Featured Layout properly
            .map((art, idx) => ({
              title: art.title,
              category: art.source?.name || "Live News",
              image:
                art.urlToImage || `https://picsum.photos/600/400?random=${idx}`,
              url: art.url || "#",
              description:
                art.description ||
                "Click to read the complete breakdown of this breaking story on the official source coverage.",
              publishedAt: art.publishedAt
                ? new Date(art.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                : "Just Now",
            }));

          setLatestNews(formatted);
        } else {
          throw new Error(
            `JSON structure invalid. Expected 'articles' array but got key: ${Object.keys(data).join(", ")}`,
          );
        }
      } catch (err) {
        console.error("Fetch News Error:", err);
        setDebugError(err.message);
        setLatestNews(getStaticNewsBackup());
      } finally {
        setLoading(false);
      }
    }

    fetchLiveNews();
  }, []);

  function getStaticNewsBackup() {
    return [
      {
        title:
          "Markets reach fresh highs amid positive global cues and domestic buying",
        category: "Business",
        image: "https://picsum.photos/600/400?random=11",
        url: "#",
        description:
          "Investor sentiments surge with high volumes pushing global benchmarks beyond historic resistance levels.",
        publishedAt: "Today",
      },
      {
        title:
          "Weather Update: Meteorological department issues alerts across regions",
        category: "National",
        image: "https://picsum.photos/600/400?random=12",
        url: "#",
        description:
          "Heavy localized precipitation expected with rapid micro-climate alterations throughout the western corridor.",
        publishedAt: "Today",
      },
      {
        title:
          "New technology updates launched with improved routing and performance features",
        category: "Technology",
        image: "https://picsum.photos/600/400?random=13",
        url: "#",
        description:
          "Next-gen routing nodes drastically drop rendering delays on heavy production-level dynamic setups.",
        publishedAt: "Yesterday",
      },
    ];
  }

  // Splitting news into Featured vs Secondary grids
  const featuredArticle = latestNews[0];
  const secondaryArticles = latestNews.slice(1, 7);

  return (
    <main className="bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-50 min-h-screen transition-colors duration-300">
      <Navbar />
      <BreakingNews />
      <Hero />

      {/* Modern Glass Debug Alert (Only shown if error occurs) */}
      {debugError && (
        <section className="max-w-7xl mx-auto px-6 mt-6">
          <div className="bg-rose-500/10 dark:bg-rose-500/5 border border-rose-500/20 rounded-2xl p-4 text-rose-600 dark:text-rose-400 text-sm backdrop-blur-md">
            <div className="flex items-center gap-2 font-bold mb-1">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>Live API Backup Fallback Active:</span>
            </div>
            <p className="font-mono text-xs opacity-90">{debugError}</p>
          </div>
        </section>
      )}

      {/* Main Feed Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {/* Modern Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12 border-b border-slate-200/60 dark:border-zinc-800/60 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
              <span className="text-xs font-semibold tracking-widest uppercase text-red-600 dark:text-red-500">
                Live Coverage Feed
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {language === "hi" ? "ताज़ा खबरें" : "The Core Feed"}
            </h2>
          </div>
          <button className="group px-5 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-800 font-semibold text-sm hover:bg-slate-100 dark:hover:bg-zinc-900 transition-all duration-200 flex items-center gap-2 active:scale-95">
            <span>View All Stories</span>
            <span className="group-hover:translate-x-1 transition-transform">
              &rarr;
            </span>
          </button>
        </div>

        {/* Dynamic Skeleton Loader */}
        {loading ? (
          <div className="space-y-8">
            {/* Featured Skeleton */}
            <div className="bg-slate-200 dark:bg-zinc-900 rounded-3xl h-[450px] animate-pulse border border-slate-300/40 dark:border-zinc-800/40" />
            {/* Grid Skeleton */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-slate-200 dark:bg-zinc-900 rounded-2xl h-96 animate-pulse border border-slate-300/40 dark:border-zinc-800/40"
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* ⚡ FEATURED HERO ARTICLE (Premium Landing Aesthetic) */}
            {featuredArticle && (
              <a
                href={featuredArticle.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="grid lg:grid-cols-12 gap-0 items-stretch min-h-[450px]">
                  {/* Image Block */}
                  <div className="lg:col-span-7 relative overflow-hidden bg-slate-100 dark:bg-zinc-800 min-h-[280px]">
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent lg:hidden" />
                    <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg uppercase tracking-wider shadow-lg">
                      {featuredArticle.category}
                    </span>
                  </div>

                  {/* Content Block */}
                  <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold text-red-600 dark:text-red-500 tracking-widest uppercase block mb-3">
                        ★ Featured Story • {featuredArticle.publishedAt}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-200">
                        {featuredArticle.title}
                      </h3>
                      <p className="text-slate-600 dark:text-zinc-400 mt-4 text-base leading-relaxed line-clamp-4">
                        {featuredArticle.description}
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between">
                      <span className="text-sm font-semibold flex items-center gap-1.5 text-red-600 dark:text-red-400">
                        Read Investigation{" "}
                        <span className="group-hover:translate-x-1.5 transition-transform duration-200">
                          &rarr;
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            )}

            {/* ⚡ SECONDARY STORIES GRID */}
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

      <Footer />
    </main>
  );
}
