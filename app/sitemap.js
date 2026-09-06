import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";

// Jo static articles aapke code (articlesData) mein hardcoded hain unke slugs yahan rakhein
const staticArticleSlugs = [
  "claude-and-ai-models-problem-solving",
  "ai-and-indian-labor-market-challenges",
  "west-asia-turkey-geopolitical-flashpoints-2026",
  "rise-of-autonomous-ai-agents-2026-business-revolution",
];

export default async function sitemap() {
  const baseUrl = "https://thepeakcontent.in";

  // 1. Standard Static Pages (Home, About, Contact, etc.)
  const staticPages = ["", "/about", "/contact", "/polls", "/opinions"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: route === "" ? 1.0 : 0.8,
    }),
  );

  // 2. Hardcoded Static Articles
  const staticArticleEntries = staticArticleSlugs.map((slug) => ({
    url: `${baseUrl}/posts/${slug}`,
    lastModified: new Date("2026-08-23"), // Article release date
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // 3. Dynamic Database Posts (MongoDB wale naye posts)
  let dbPostEntries = [];
  try {
    await dbConnect();
    const posts = await Post.find({}).select("slug updatedAt");

    dbPostEntries = posts.map((post) => ({
      url: `${baseUrl}/posts/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    }));
  } catch (error) {
    console.error("Sitemap DB fetch error:", error);
  }

  // Sabhi ko ek sath combine karke return karo
  return [...staticPages, ...staticArticleEntries, ...dbPostEntries];
}
