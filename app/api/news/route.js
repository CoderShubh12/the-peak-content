import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang") || "en";
  const category = searchParams.get("category") || "general"; // यहाँ से कैटेगरी पकड़ रहे हैं

  const apiKey = "8f82ce039ba94c78a9983603faa0a179";
  const country = lang === "hi" ? "in" : "us";

  // अब कैटेगरी के हिसाब से डायनेमिक यूआरएल बनेगा
  const endpoints = [
    `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&language=${lang}&pageSize=15&apiKey=${apiKey}`,
    `https://newsapi.org/v2/everything?q=${category === "general" ? "india" : category}&sortBy=publishedAt&language=${lang}&pageSize=15&apiKey=${apiKey}`,
  ];

  let lastError = null;

  for (const url of endpoints) {
    try {
      console.log(
        `[News-API] Fetching for category: ${category}, lang: ${lang} from: ${url}`,
      );

      const res = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        next: { revalidate: 1800 },
      });

      if (!res.ok) continue;

      const data = await res.json();

      if (data?.articles?.length > 0) {
        return NextResponse.json(data, {
          headers: {
            "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=59",
          },
        });
      }
    } catch (error) {
      lastError = error.message;
    }
  }

  return NextResponse.json({ error: "Failed", articles: [] }, { status: 200 });
}
