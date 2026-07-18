"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { lang } = useLanguage();

  const t = {
    en: {
      title: "The Peak.",
      subtitle: "The peak of every story. Where precision meets journalism.",
      identity: "Our Identity",
      body1:
        "We aren't just reporting news; we are distilling the chaos of current affairs into sharp, actionable insights.",
      body2:
        "In a digital landscape filled with noise, The Peak Content stands as a filter. From the gritty reality of crime reporting to the delicate balance of market trends—we cover the spectrum with a minimalist aesthetic and maximum impact.",
      body3:
        "We believe journalism should be as fast as the events that shape our world, delivered through an interface that respects your focus.",
      quote: "We don't just follow the story. We find the summit.",
      cta: "Go to Feed",
    },
    hi: {
      title: "द पीक.",
      subtitle: "हर कहानी का शिखर। जहाँ सटीकता पत्रकारिता से मिलती है।",
      identity: "हमारी पहचान",
      body1:
        "हम सिर्फ खबरें नहीं दे रहे हैं; हम करंट अफेयर्स की आपाधापी को सटीक और उपयोगी जानकारी में बदल रहे हैं।",
      body2:
        "शोर से भरी डिजिटल दुनिया में, The Peak Content एक फिल्टर की तरह है। अपराध की कठोर सच्चाई से लेकर बाजार के उतार-चढ़ाव तक—हम न्यूनतम सौंदर्य (minimalist aesthetic) के साथ हर पहलू को कवर करते हैं।",
      body3:
        "हमारा मानना है कि पत्रकारिता उतनी ही तेज़ होनी चाहिए जितनी कि दुनिया की घटनाएँ, एक ऐसे इंटरफ़ेस के माध्यम से जो आपके फोकस का सम्मान करता है।",
      quote: "हम सिर्फ कहानी का पीछा नहीं करते। हम उसका शिखर खोजते हैं।",
      cta: "होम फीड पर जाएँ",
    },
  };

  const content = lang === "hi" ? t.hi : t.en;

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 pt-20 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Masthead */}
        <div className="relative mb-20">
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85]">
            {content.title}
          </h1>
          <p className="text-xl md:text-2xl font-medium text-zinc-500 mt-6 max-w-lg">
            {content.subtitle}
          </p>
        </div>

        {/* Bilingual Content */}
        <div className="grid md:grid-cols-2 gap-12 border-t border-zinc-200 dark:border-zinc-800 pt-12">
          <div className="space-y-6">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-red-600">
              {content.identity}
            </h2>
            <p className="text-2xl font-light leading-snug">{content.body1}</p>
          </div>

          <div className="space-y-6 text-zinc-600 dark:text-zinc-400">
            <p>{content.body2}</p>
            <p>{content.body3}</p>
          </div>
        </div>

        {/* Bold Quote Box */}
        <div className="mt-20 bg-zinc-950 dark:bg-zinc-900 rounded-[2rem] p-12 md:p-20 text-center">
          <h3 className="text-white text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
            "{content.quote}"
          </h3>
          <div className="flex justify-center gap-4 mt-8">
            <span className="w-12 h-1 bg-red-600"></span>
            <span className="w-12 h-1 bg-red-600"></span>
            <span className="w-12 h-1 bg-red-600"></span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 flex flex-col items-center text-center">
          <a
            href="/"
            className="group flex items-center gap-2 text-xl font-bold hover:text-red-600 transition-all"
          >
            {content.cta}{" "}
            <span className="group-hover:translate-x-2 transition-transform">
              →
            </span>
          </a>
        </div>
      </div>
    </main>
  );
}
