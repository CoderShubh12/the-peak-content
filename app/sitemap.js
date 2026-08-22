export default async function sitemap() {
  const baseUrl = "https://thepeakcontent.in";

  // Aapke main static pages
  const routes = ["", "/about", "/contact", "/polls", "/opinions"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: route === "" ? 1.0 : 0.8,
    }),
  );

  // Agar aapke paas database se aane wale dynamic news articles hain,
  // toh unhe bhi yahan fetch karke map kar sakte hain.

  return [...routes];
}
