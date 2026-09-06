"use client";

import { useState, useEffect } from "react";

export default function ManagePostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all posts on load
  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      if (data.success) {
        setPosts(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Delete handler
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this editorial post?"))
      return;

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        // UI se turant hata do bina page reload kiye
        setPosts(posts.filter((post) => post._id !== id));
        alert("Post deleted successfully.");
      } else {
        alert(data.message || "Failed to delete post.");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Something went wrong.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center font-mono">
        LOADING EDITORIAL DESK...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10 border-b border-zinc-800 pb-6">
          <div>
            <span className="text-red-600 font-black text-xs tracking-widest uppercase">
              The Peak Content
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight mt-1">
              Manage & Delete Posts
            </h1>
          </div>
          <a
            href="/admin/create-post"
            className="bg-white text-zinc-950 px-5 py-3 font-bold text-xs uppercase tracking-wider hover:bg-red-600 hover:text-white transition"
          >
            + Create New
          </a>
        </div>

        {/* Posts Table / List */}
        {posts.length === 0 ? (
          <div className="text-center py-20 text-zinc-500 font-mono">
            No editorial posts found in database.
          </div>
        ) : (
          <div className="space-y-4">
            {posts.вати ||
              posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-zinc-900 border border-zinc-800 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-zinc-700 transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-red-600/10 text-red-500 border border-red-500/20">
                        {post.category}
                      </span>
                      <span className="text-xs text-zinc-500 font-mono">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-white">
                      {post.title}
                    </h3>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="bg-zinc-950 border border-red-600/40 text-red-500 px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-red-600 hover:text-white transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
