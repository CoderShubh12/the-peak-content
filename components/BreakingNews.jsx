"use client";
import { useState, useEffect } from "react";

export default function BreakingNews() {
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const res = await fetch("/api/market");
        const data = await res.json();
        if (data && !data.error) setMarketData(data);
      } catch (e) {
        console.error("Market data fetch failed");
      } finally {
        setLoading(false);
      }
    }
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="w-full bg-zinc-900 py-2.5 text-center text-[10px] text-zinc-500 font-bold tracking-widest uppercase">
        Fetching live market updates...
      </div>
    );
  }

  return (
    <div className="w-full bg-red-600 text-white py-2 overflow-hidden shadow-lg border-b-4 border-red-800">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Left Side: Badge */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </div>
          <span className="text-[10px] font-black tracking-[0.2em] uppercase">
            Live Market
          </span>
        </div>

        {/* Right Side: Data */}
        <div className="flex gap-8 md:gap-12 font-mono">
          <div className="flex items-center gap-2">
            <span className="text-red-200 text-[10px] font-bold uppercase">
              Gold:
            </span>
            <span className="font-bold text-sm tracking-tight">
              ₹{marketData?.gold?.price || "..."}
            </span>
            <span className="text-[10px]">
              {marketData?.gold?.trend === "up" ? "▲" : "▼"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-red-200 text-[10px] font-bold uppercase">
              Silver:
            </span>
            <span className="font-bold text-sm tracking-tight">
              ₹{marketData?.silver?.price || "..."}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
