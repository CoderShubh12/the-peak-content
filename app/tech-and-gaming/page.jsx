"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function TechAndBlogsPage() {
  const { lang } = useLanguage();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSubcat, setActiveSubcat] = useState("all");

  // Comprehensive subcategories list for all important domains
  const subcategories = [
    { id: "all", labelEn: "All Posts", labelHi: "सभी लेख" },
    { id: "coding", labelEn: "Coding & Dev", labelHi: "कोडिंग और देव" },
    { id: "ai-ml", labelEn: "AI & ML", labelHi: "एआई और एमएल" },
    {
      id: "digital-marketing",
      labelEn: "Digital Marketing",
      labelHi: "डिजिटल मार्केटिंग",
    },
    { id: "gaming", labelEn: "Gaming", labelHi: "गेमिंग" },
    { id: "automation", labelEn: "Automation", labelHi: "ऑटोमेशन" },
    { id: "share-market", labelEn: "Share Market", labelHi: "शेयर मार्केट" },
    {
      id: "startups",
      labelEn: "Startups & Business",
      labelHi: "स्टार्टअप और बिजनेस",
    },
    { id: "cybersecurity", labelEn: "Cybersecurity", labelHi: "साइबर सुरक्षा" },
    {
      id: "cloud-devops",
      labelEn: "Cloud & DevOps",
      labelHi: "क्लाउड और देवऑप्स",
    },
  ];

  // Database / API se posts fetch karne ke liye
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch("/api/posts?category=tech");
        const json = await res.json();
        // Support both direct array and object response structures
        const postsData = Array.isArray(json) ? json : json.data || [];
        setBlogs(postsData);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  // Filter logic based on active subcategory
  const filteredBlogs =
    activeSubcat === "all"
      ? blogs
      : blogs.filter(
          (item) =>
            item.subcategory?.toLowerCase() === activeSubcat ||
            item.category?.toLowerCase() === activeSubcat,
        );

  return (
    <main className="min-h-screen bg-[#050507] text-zinc-100 py-24 px-6 md:px-16 selection:bg-red-600 selection:text-white">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="border-b border-zinc-900 pb-8 space-y-4">
          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-red-500 block">
            //{" "}
            {lang === "hi" ? "संपादकीय और लेख हब" : "Editorial & Dispatch Hub"}
          </span>
          <h1 className="text-3xl sm:text-6xl font-black tracking-tighter text-zinc-100">
            {lang === "hi"
              ? "टेक, मार्केट्स और ब्लॉग्स"
              : "Tech, Markets & Insights"}
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            {lang === "hi"
              ? "कोडिंग आर्किटेक्चर, डिजिटल मार्केटिंग स्ट्रैटेजी, शेयर मार्केट एनालिटिक्स, एआई और गेमिंग ट्रेंड्स पर आधारित गहन विश्लेषण।"
              : "Explore specialized dispatches spanning software engineering, digital marketing workflows, financial market trends, cybersecurity, and gaming infrastructure."}
          </p>
        </div>

        {/* Subcategory Filter Bar */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none border-b border-zinc-800/80">
          {subcategories.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setActiveSubcat(sub.id)}
              className={`font-mono text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                activeSubcat === sub.id
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                  : "bg-zinc-900/60 text-zinc-400 hover:text-zinc-100 border border-zinc-800"
              }`}
            >
              {lang === "hi" ? sub.labelHi : sub.labelEn}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20 font-mono text-xs text-zinc-500 uppercase tracking-widest">
            {lang === "hi" ? "डेटा लोड हो रहा है..." : "Loading dispatches..."}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredBlogs.length === 0 && (
          <div className="bg-zinc-900/40 border border-zinc-800/80 p-12 rounded-2xl text-center space-y-4">
            <h3 className="text-xl font-bold text-zinc-200">
              {lang === "hi"
                ? "इस श्रेणी में कोई लेख नहीं है"
                : "No Articles Found in This Category"}
            </h3>
            <p className="text-zinc-400 text-sm max-w-md mx-auto">
              {lang === "hi"
                ? "कृपया अपने admin dashboard से इस subcategory के अंतर्गत नया पोस्ट पब्लिश करें।"
                : "New articles matching this subcategory will appear here once published from your dashboard."}
            </p>
          </div>
        )}

        {/* Articles Grid */}
        {!loading && filteredBlogs.length > 0 && (
          <div className="grid md:grid-cols-2 gap-8">
            {filteredBlogs.map((item) => (
              <Link
                key={item._id || item.slug}
                href={`/tech/${item.slug}`}
                className="group block bg-zinc-900/40 border border-zinc-800/80 hover:border-red-500/50 backdrop-blur-xl p-8 rounded-2xl transition-all duration-500 shadow-2xl relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-4">
                    <span className="text-red-500 font-bold uppercase tracking-wider flex items-center gap-2">
                      {item.author || "Editorial Desk"}
                      <span className="bg-zinc-800 text-zinc-300 text-[10px] px-2.5 py-0.5 rounded border border-zinc-700 font-mono uppercase">
                        {item.subcategory || item.category || "General"}
                      </span>
                    </span>
                    <span>
                      {item.date
                        ? new Date(item.date).toLocaleDateString()
                        : "2026"}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-zinc-100 group-hover:text-red-400 transition-colors tracking-tight leading-tight mb-4">
                    {item.title}
                  </h2>

                  <p className="text-zinc-300 text-sm leading-relaxed mb-6 line-clamp-3">
                    {item.snippet ||
                      item.description ||
                      item.content?.substring(0, 150) + "..."}
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-widest group-hover:text-white transition-colors pt-4 border-t border-zinc-800/60">
                  <span>
                    {lang === "hi" ? "पूरा लेख पढ़ें" : "Read Full Story"}
                  </span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
