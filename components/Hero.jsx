"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { lang } = useLanguage();

  const t = {
    en: {
      tag: "The Peak of Every Story",
      title: "Reporting that",
      titleRed: "hits home.",
      desc: "Delivering the most significant updates from crime and current affairs to essential market movements. Precision in every pixel.",
      btn: "Read Daily Feed",
      breaking: "BREAKING NEWS FEED",
    },
    hi: {
      tag: "हर कहानी का शिखर",
      title: "खबरें जो",
      titleRed: "सीधा असर करें।",
      desc: "देश और दुनिया की हर बड़ी खबर, बिना किसी शोर के। अपराध, राजनीति और बाज़ार के अपडेट्स, एकदम सटीक।",
      btn: "आज की खबरें देखें",
      breaking: "ब्रेकिंग न्यूज़ फीड",
    },
  };

  const content = lang === "hi" ? t.hi : t.en;

  return (
    <section className="relative w-full bg-zinc-950 text-white py-28 md:py-36 overflow-hidden border-b border-zinc-900/80">
      {/* Background Image - Now Clear & Bright */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.jpg"
          alt="News Hero Background"
          className="w-full h-full object-cover object-center opacity-85 scale-100"
        />
        {/* Soft Dark Vignette Overlay (Text साफ पढ़ने के लिए सिर्फ किनारों पर हल्का शेड) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050507]/90 via-[#050507]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-[#050507]/70" />
      </div>

      {/* Dynamic Editorial Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600/20 blur-[180px] rounded-full pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-20">
        {/* Top Ticker Bar Badge */}
        <div className="inline-flex items-center gap-3 py-1.5 px-4 rounded-full bg-zinc-900/90 border border-zinc-800 backdrop-blur-md mb-10 shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
          </span>
          <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-zinc-300">
            {content.breaking}
          </span>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl space-y-8">
          <div className="space-y-4">
            <span className="inline-block text-red-500 text-xs font-black uppercase tracking-[0.35em]">
              // {content.tag}
            </span>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-zinc-100 drop-shadow-md">
              {content.title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-red-600 drop-shadow-sm">
                {content.titleRed}
              </span>
            </h1>
          </div>

          <p className="text-lg sm:text-xl text-zinc-200 max-w-2xl font-normal leading-relaxed drop-shadow">
            {content.desc}
          </p>

          <div className="pt-2">
            <button className="group relative inline-flex items-center gap-4 bg-red-600 text-white px-9 py-4 font-black uppercase text-xs tracking-[0.25em] overflow-hidden rounded-sm transition-all duration-300 hover:bg-white hover:text-zinc-950 shadow-xl shadow-red-600/40">
              <span className="relative z-10">{content.btn}</span>
              <svg
                className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
