import { NextResponse } from "next/server";

export async function GET() {
  // .env.local mein apni key rakhna
  const API_KEY = process.env.YOUR_CURRENCY_API_KEY;
  const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}&base_currency=USD`;

  try {
    const res = await fetch(url);
    const json = await res.json();

    // Tumhare JSON structure ke hisaab se path: json.data.INR
    const usdToInr = json.data.INR;

    // Calculation (10g Gold Price)
    // 2400 USD/oz is the standard benchmark
    const goldPrice10g = Math.round((2400 / 31.1035) * 10 * usdToInr);
    const silverPrice10g = Math.round((30 / 31.1035) * 10 * usdToInr);

    return NextResponse.json({
      gold: { price: goldPrice10g.toLocaleString("en-IN"), trend: "up" },
      silver: { price: silverPrice10g.toLocaleString("en-IN"), trend: "up" },
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({
      gold: { price: "74,300", trend: "up" },
      silver: { price: "89,500", trend: "up" },
    });
  }
}
