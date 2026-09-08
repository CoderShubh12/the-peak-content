"use client";

import { useState } from "react";
import { marked } from "marked";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Tech");
  const [subcategory, setSubcategory] = useState("coding");
  const [image, setImage] = useState("");
  const [markdownContent, setMarkdownContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Automatically generate clean URL slug from title
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
            className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 font-bold text-xs tracking-widest uppercase transition-all shadow-lg shadow-red-600/20 disabled:opacity-50"
          >
            {isSubmitting ? "Publishing..." : "Publish Post"}
          </button>
        </div>

        {/* Form Meta Controls */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">
              Article Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Beyond the Hydration Wall..."
              className="w-full bg-zinc-900 border border-zinc-800 p-4 text-white font-bold focus:border-red-600 outline-none rounded-xl transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 p-4 text-white font-bold focus:border-red-600 outline-none rounded-xl transition-colors cursor-pointer"
            >
              <option value="Tech">Tech</option>
              <option value="Gaming">Gaming</option>
              <option value="SEO & Marketing">SEO & Marketing</option>
              <option value="AI & Development">AI & Development</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">
              Subcategory
            </label>
            <input
              type="text"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              placeholder="e.g., coding, ai-ml"
              className="w-full bg-zinc-900 border border-zinc-800 p-4 text-white font-bold focus:border-red-600 outline-none rounded-xl transition-colors"
            />
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
              rows="20"
              value={markdownContent}
              onChange={(e) => setMarkdownContent(e.target.value)}
              placeholder="# Beyond the Hydration Wall...&#10;&#10;Write your professional editorial content here using markdown..."
              className="w-full bg-zinc-950 border border-zinc-800 p-6 font-mono text-sm text-zinc-300 focus:border-red-600 outline-none resize-none rounded-b-xl leading-relaxed"
            ></textarea>
          </div>

          {/* Right: Live Preview */}
          <div className="flex flex-col">
            <div className="bg-zinc-900 border border-zinc-800 border-b-0 px-4 py-3 text-xs font-bold uppercase tracking-widest text-zinc-400 rounded-t-xl">
              <span>Live Rendered Preview</span>
            </div>
            <div
              className="w-full bg-zinc-900/40 border border-zinc-800 p-6 min-h-[480px] max-h-[550px] overflow-y-auto prose prose-invert max-w-none rounded-b-xl
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
