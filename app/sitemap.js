import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";

export default async function sitemap() {
  const baseUrl = "https://thepeakcontent.in";

  // 1. Static Pages
  const staticPages = ["", "/about", "/contact", "/polls", "/opinions"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: route === "" ? 1.0 : 0.8,
    }),
  );

  // 2. Dynamic Database Posts
  let postEntries = [];
  try {
    await dbConnect();
    const posts = await Post.find({}).select("slug updatedAt");

    postEntries = posts.map((post) => ({
      url: `${baseUrl}/posts/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    }));
  } catch (error) {
    console.error("Sitemap DB fetch error:", error);
  }

  return [...staticPages, ...postEntries];
}
