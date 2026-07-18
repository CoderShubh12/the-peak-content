import { NextResponse } from "next/server";

export async function GET(request) {
  // 1. URL se lang parameter uthao
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang") || "en"; // Default 'en'

  const apiKey = "8f82ce039ba94c78a9983603faa0a179";

  // 2. Lang ke basis par dynamic endpoints banao
  const endpoints = [
    `https://newsapi.org/v2/everything?q=india&sortBy=publishedAt&language=${lang}&pageSize=15&apiKey=${apiKey}`,
    `https://newsapi.org/v2/top-headlines?language=${lang}&country=${lang === "hi" ? "in" : "us"}&pageSize=10&apiKey=${apiKey}`,
    `https://newsapi.org/v2/top-headlines?category=technology&language=${lang}&pageSize=10&apiKey=${apiKey}`,
  ];

  let lastError = null;

  for (const url of endpoints) {
    try {
      console.log(
        `[Caching-Fetch] Fetching fresh data for ${lang} from: ${url}`,
      );

      const res = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        next: { revalidate: 3600 },
      });

      if (!res.ok) continue;

      const data = await res.json();

      if (data?.articles?.length > 0) {
        return NextResponse.json(data, {
          headers: {
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=59",
          },
        });
      }
    } catch (error) {
      lastError = error.message;
    }
  }

  return NextResponse.json({ error: "Failed", articles: [] }, { status: 200 });
}
