"use client";

import { FaBolt } from "react-icons/fa";

export default function BreakingNews() {
  const news = [
    "Andhra Pradesh reports new COVID-19 cases",
    "India vs England Test series updates",
    "Heavy rainfall alert issued for multiple states",
  ];

  return (
    <div className="bg-red-600 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center">
        <div className="flex items-center gap-2 bg-black px-4 py-3 font-bold whitespace-nowrap">
          <FaBolt />
          BREAKING
        </div>

        <div className="overflow-hidden flex-1">
          <div className="animate-marquee whitespace-nowrap py-3 px-4">
            {news.join("  •  ")}
          </div>
        </div>
      </div>
    </div>
  );
}
