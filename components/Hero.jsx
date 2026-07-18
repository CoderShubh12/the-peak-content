"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { lang } = useLanguage();

  const t = {
    en: {
      tag: "The Peak of Every Story",
      title: "Reporting that",
      titleRed: "hits home.",
      desc: "Delivering the most significant updates—from crime and current affairs to essential market movements. Precision in every pixel.",
      btn: "Read Daily Feed",
      stat1: "Live Updates",
      stat2: "Verified Facts",
    },
    hi: {
      tag: "हर कहानी का शिखर",
      title: "खबरें जो",
      titleRed: "सीधा असर करें।",
      desc: "देश और दुनिया की हर बड़ी खबर, बिना किसी शोर के। अपराध, राजनीति और बाज़ार के अपडेट्स, एकदम सटीक।",
      btn: "आज की खबरें देखें",
      stat1: "लाइव अपडेट्स",
      stat2: "सत्यापित तथ्य",
    },
  };

  const content = lang === "hi" ? t.hi : t.en;

  return (
    <section className="relative w-full bg-zinc-950 text-white py-24 overflow-hidden border-b border-zinc-900">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-red-600/5 blur-[150px] rounded-full -mr-20"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Content */}
          <div className="flex-1 space-y-8">
            <span className="inline-block py-1 px-3 border border-red-600/30 text-red-500 text-[10px] font-black uppercase tracking-[0.3em] bg-red-600/10">
              {content.tag}
            </span>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
              {content.title} <br />
              <span className="text-red-600">{content.titleRed}</span>
            </h1>

            <p className="text-xl text-zinc-400 max-w-xl leading-relaxed">
              {content.desc}
            </p>

            <button className="bg-white text-zinc-950 px-10 py-4 font-black uppercase text-xs tracking-[0.25em] hover:bg-red-600 hover:text-white transition-all duration-300">
              {content.btn}
            </button>
          </div>

          {/* Right Side Stats */}
          <div className="w-full lg:w-auto grid grid-cols-2 gap-4">
            <div className="bg-zinc-900/50 p-8 border border-zinc-800">
              <span className="text-red-600 text-4xl font-black block">
                24/7
              </span>
              <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mt-2">
                {content.stat1}
              </p>
            </div>
            <div className="bg-zinc-900/50 p-8 border border-zinc-800">
              <span className="text-white text-4xl font-black block">100%</span>
              <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mt-2">
                {content.stat2}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
