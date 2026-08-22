export default function robots() {
  const baseUrl = "https://thepeakcontent.in";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // agar koi private page chupana ho toh yahan likhein
      // disallow: '/private/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
