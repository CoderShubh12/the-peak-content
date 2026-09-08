import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";
export const dynamic = "force-dynamic";

const staticArticleSlugs = [
  "claude-and-ai-models-problem-solving",
  "ai-and-indian-labor-market-challenges",
  "west-asia-turkey-geopolitical-flashpoints-2026",
  "rise-of-autonomous-ai-agents-2026-business-revolution",
];

export default async function sitemap() {
  const baseUrl = "https://thepeakcontent.in";

  // 1. Standard Static Pages (Added "/tech-and-gaming")
  const staticPages = [
    "",
    "/tech-and-gaming",
    "/about",
    "/contact",
    "/polls",
    "/opinions",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // 2. Hardcoded Static Articles
  const staticArticleEntries = staticArticleSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date("2026-08-23"),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // 3. Dynamic Database Posts
  let dbPostEntries = [];
  try {
    await dbConnect();
    const posts = await Post.find({}).select("slug updatedAt");

    dbPostEntries = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    }));
  } catch (error) {
    console.error("Sitemap DB fetch error:", error);
  }

  return [...staticPages, ...staticArticleEntries, ...dbPostEntries];
}
