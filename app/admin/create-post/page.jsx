"use client";

import { useState } from "react";
import { marked } from "marked";

// Category aur unke corresponding subcategories ki mapping (News included)
const categoryMapping = {
  Tech: ["Coding & Dev", "AI & ML", "Automation", "Cybersecurity"],
  Gaming: ["Hardware & GPUs", "Indie Games", "Esports", "Game Dev"],
  News: ["Tech News", "Global Events", "Policy & Regs", "Industry Updates"],
  "SEO & Marketing": [
    "Technical SEO",
    "Content Strategy",
    "Social Media",
    "Analytics",
  ],
  "Markets & Business": ["Share Market", "Startups", "Fintech", "Economy"],
};

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Tech");
  const [subcategory, setSubcategory] = useState(categoryMapping["Tech"][0]);
  const [image, setImage] = useState("");
  const [markdownContent, setMarkdownContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setSubcategory(categoryMapping[newCategory]?.[0] || "");
  };

  const getMarkup = (content) => {
    return { __html: marked(content || "") };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !markdownContent || !subcategory) {
      alert("Please fill in the title, subcategory, and markdown content.");
      return;
    }

    setIsSubmitting(true);

    const generatedSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug: generatedSlug,
          category,
          subcategory,
          image,
          content: markdownContent,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || "Failed to publish post");
      }

      alert("Post published successfully to MongoDB!");
      setTitle("");
      setImage("");
      setMarkdownContent("");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-12 selection:bg-red-600 selection:text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-zinc-800 pb-6">
          <div>
            <span className="text-red-500 font-black text-xs tracking-[0.3em] uppercase">
              // The Peak Content Desk
            </span>
            <h1 className="text-3xl font-black tracking-tight text-zinc-100 mt-1">
              Tech & SEO Editorial Editor
            </h1>
          </div>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 font-bold text-xs tracking-widest uppercase transition-all shadow-lg shadow-red-600/20 disabled:opacity-50 rounded-xl"
          >
            {isSubmitting ? "Publishing..." : "Publish Post"}
          </button>
        </div>

        {/* Title Input */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">
            Article Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Breaking tech updates..."
            className="w-full bg-zinc-900 border border-zinc-800 p-4 text-white font-bold focus:border-red-600 outline-none rounded-xl transition-colors"
          />
        </div>

        {/* Category Selection Pills */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">
            Select Main Category
          </label>
          <div className="flex flex-wrap gap-3">
            {Object.keys(categoryMapping).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl border transition-all ${
                  category === cat
                    ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/20"
                    : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Subcategory Selection Pills */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">
            Select Subcategory
          </label>
          <div className="flex flex-wrap gap-3">
            {categoryMapping[category]?.map((sub) => (
              <button
                key={sub}
                type="button"
                onClick={() => setSubcategory(sub)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                  subcategory === sub
                    ? "bg-zinc-100 border-zinc-100 text-zinc-950 shadow-md"
                    : "bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* Image URL Input */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">
            Cover Image URL (Optional)
          </label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className="w-full bg-zinc-900 border border-zinc-800 p-4 text-white font-bold focus:border-red-600 outline-none rounded-xl transition-colors"
          />
        </div>

        {/* Split Screen Editor & Live Preview */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Markdown Input */}
          <div className="flex flex-col">
            <div className="bg-zinc-900 border border-zinc-800 border-b-0 px-4 py-3 flex justify-between items-center text-xs font-bold uppercase tracking-widest text-zinc-400 rounded-t-xl">
              <span>Markdown Source</span>
              <span>Use standard #, **, `code`</span>
            </div>
            <textarea
              rows="18"
              value={markdownContent}
              onChange={(e) => setMarkdownContent(e.target.value)}
              placeholder="# Breaking News Headline...&#10;&#10;Write your news dispatch here using markdown..."
              className="w-full bg-zinc-950 border border-zinc-800 p-6 font-mono text-sm text-zinc-300 focus:border-red-600 outline-none resize-none rounded-b-xl leading-relaxed"
            ></textarea>
          </div>

          {/* Right: Live Preview */}
          <div className="flex flex-col">
            <div className="bg-zinc-900 border border-zinc-800 border-b-0 px-4 py-3 text-xs font-bold uppercase tracking-widest text-zinc-400 rounded-t-xl">
              <span>Live Rendered Preview</span>
            </div>
            <div
              className="w-full bg-zinc-900/40 border border-zinc-800 p-6 min-h-[440px] max-h-[515px] overflow-y-auto prose prose-invert max-w-none rounded-b-xl
                prose-headings:text-red-400 prose-headings:font-bold 
                prose-a:text-red-500 prose-code:text-red-400 prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-800"
              dangerouslySetInnerHTML={getMarkup(markdownContent)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
