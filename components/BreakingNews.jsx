"use client";
import { useState, useEffect } from "react";

export default function BreakingNews() {
  const [marketData, setMarketData] = useState < any > null;
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
      <div className="w-full bg-[#050507] border-b border-zinc-900 py-3 text-center text-[10px] text-zinc-500 font-mono tracking-[0.25em] uppercase">
        <span className="inline-block animate-pulse">
          ⚡ Synchronizing live market feeds...
        </span>
      </div>
    );
  }

  const isGoldUp = marketData?.gold?.trend === "up";
  const isSilverUp = marketData?.silver?.trend === "up";

  return (
    <div className="w-full bg-[#09090b] text-white py-2.5 overflow-hidden border-b border-zinc-800/80 backdrop-blur-md relative z-20">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Left Side: Live Badge & Ticker Title */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
          </span>
          <span className="text-[10px] font-black tracking-[0.25em] uppercase text-zinc-300">
            Market Live
          </span>
        </div>

        {/* Right Side: Data Items */}
        <div className="flex items-center gap-8 md:gap-12 font-mono text-xs">
          {/* Gold Item */}
          <div className="flex items-center gap-2.5">
            <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">
              Gold:
            </span>
            <span className="font-extrabold text-zinc-200 tracking-tight">
              ₹{marketData?.gold?.price || "---"}
            </span>
            <span
              className={`text-[10px] font-bold ${isGoldUp ? "text-emerald-400" : "text-rose-400"}`}
            >
              {isGoldUp ? "▲" : "▼"}
            </span>
          </div>

          {/* Divider */}
          <span className="text-zinc-800">/</span>

          {/* Silver Item */}
          <div className="flex items-center gap-2.5">
            <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">
              Silver:
            </span>
            <span className="font-extrabold text-zinc-200 tracking-tight">
              ₹{marketData?.silver?.price || "---"}
            </span>
            <span
              className={`text-[10px] font-bold ${isSilverUp ? "text-emerald-400" : "text-rose-400"}`}
            >
              {isSilverUp ? "▲" : "▼"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
