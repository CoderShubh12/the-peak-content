import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = "8f82ce039ba94c78a9983603faa0a179";

  // Dynamic keyword queries (Free tier reliable routes)
  const endpoints = [
    `https://newsapi.org/v2/everything?q=india&sortBy=publishedAt&language=en&pageSize=15&apiKey=${apiKey}`,
    `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`,
    `https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=10&apiKey=${apiKey}`,
  ];

  let lastError = null;

  for (const url of endpoints) {
    try {
      console.log(`[Caching-Fetch] Fetching fresh data from: ${url}`);

      const res = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        // NEXT.JS CACHING: Data 1 ghante (3600 seconds) tak cache rahega.
        // Is duration me koi kitni baar bhi refresh kare, NewsAPI ko direct hit nahi jayegi.
        next: { revalidate: 3600 },
      });

      if (!res.ok) {
        console.warn(
          `[Proxy] Endpoint failed with status ${res.status}. Trying fallback...`,
        );
        continue;
      }

      const data = await res.json();

      if (
        data &&
        data.articles &&
        Array.isArray(data.articles) &&
        data.articles.length > 0
      ) {
        console.log(
          `[Success] Loaded ${data.articles.length} cached/fresh articles.`,
        );

        // Browser level par bhi cache header set kar dete hain 1 hour ke liye
        return NextResponse.json(data, {
          headers: {
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=59",
          },
        });
      }
    } catch (error) {
      console.error(`[Error] Endpoint error: ${error.message}`);
      lastError = error.message;
    }
  }

  // Pure failure case: Safe fallback empty structure
  return NextResponse.json(
    {
      error: "All NewsAPI endpoints returned empty or failed.",
      details: lastError,
      articles: [],
    },
    { status: 200 },
  );
}
