"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function TechBlogsContent() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Posts");

  const categories = [
    "All Posts",
    "Coding & Dev",
    "AI & ML",
    "Digital Marketing",
    "Gaming",
    "Automation",
    "Share Market",
    "Startups & Business",
  ];

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/posts");
        const json = await res.json();
        if (json.success) {
          setPosts(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const filteredPosts =
    selectedCategory === "All Posts"
      ? posts
      : posts.filter(
          (post) =>
            post.category?.toLowerCase() === selectedCategory.toLowerCase(),
        );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050507] text-zinc-400 flex items-center justify-center font-mono text-xs uppercase tracking-widest">
        Loading dispatches...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050507] text-white py-24 px-6 selection:bg-red-600 selection:text-white">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="border-b border-zinc-900 pb-8">
          <span className="text-red-500 font-black text-xs tracking-[0.3em] uppercase block mb-2">
            // Editorial & Dispatch Hub
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-zinc-100">
            Tech, Markets & Insights
          </h1>
          <p className="text-zinc-400 text-sm mt-3 max-w-2xl leading-relaxed">
            Explore specialized dispatches spanning software engineering,
            digital marketing workflows, financial market trends, cybersecurity,
            and gaming infrastructure.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl border transition-all ${
                selectedCategory === cat
                  ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/20"
                  : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-zinc-900 rounded-2xl bg-zinc-900/20">
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
              No dispatches found in this category.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post._id}
                className="bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-xl rounded-2xl p-6 flex flex-col justify-between hover:border-red-500/50 transition-all group"
              >
                <div className="space-y-4">
                  {/* Cover Image Rendering */}
                  {post.image && (
                    <div className="w-full h-48 rounded-xl overflow-hidden border border-zinc-800/80">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="flex justify-between items-center text-xs font-mono text-zinc-500">
                    <span className="text-red-500 font-bold uppercase tracking-widest">
                      {post.category || "Tech"}
                    </span>
                    <span>{new Date(post.createdAt).getFullYear()}</span>
                  </div>

                  <h2 className="text-xl font-bold text-zinc-100 group-hover:text-red-400 transition-colors leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-zinc-400 text-sm line-clamp-3 leading-relaxed">
                    {post.snippet ||
                      post.content?.replace(/[#*`_]/g, "").substring(0, 120) +
                        "..."}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-800/80 flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-500">
                    The Peak Editorial Desk
                  </span>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-400 flex items-center gap-1 transition-colors"
                  >
                    Read Dispatch &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
