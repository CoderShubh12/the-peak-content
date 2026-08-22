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
      contactTitle: "Get in Touch",
      emailText:
        "Have tips, queries, or feedback? Reach out to us directly at:",
    },
    hi: {
      title: "द पीक.",
      subtitle: "हर कहानी का शिखर। जहाँ सटीकता पत्रकारिता से मिलती है.",
      identity: "हमारी पहचान",
      body1:
        "हम सिर्फ खबरें नहीं दे रहे हैं; हम करंट अफेयर्स की आपाधापी को सटीक और उपयोगी जानकारी में बदल रहे हैं।",
      body2:
        "शोर से भरी डिजिटल दुनिया में, The Peak Content एक फिल्टर की तरह है। अपराध की कठोर सच्चाई से लेकर बाजार के उतार-चढ़ाव तक—हम न्यूनतम सौंदर्य (minimalist aesthetic) के साथ हर पहलू को कवर करते हैं।",
      body3:
        "हमारा मानना है कि पत्रकारिता उतनी ही तेज़ होनी चाहिए जितनी कि दुनिया की घटनाएँ, एक ऐसे इंटरफ़ेस के माध्यम से जो आपके फोकस का सम्मान करता है।",
      quote: "हम सिर्फ कहानी का पीछा नहीं करते। हम उसका शिखर खोजते हैं।",
      cta: "होम फीड पर जाएँ",
      contactTitle: "संपर्क करें",
      emailText: "कोई सुझाव, सवाल या खबर हो? आप सीधे हमसे संपर्क कर सकते हैं:",
    },
  };

  const content = lang === "hi" ? t.hi : t.en;

  return (
    <main className="min-h-screen bg-[#050507] text-zinc-50 pt-20 pb-24 selection:bg-red-600 selection:text-white">
      <div className="max-w-5xl mx-auto px-6">
        {/* Masthead */}
        <div className="relative mb-20 border-b border-zinc-900 pb-12">
          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-red-500 block mb-4">
            // {lang === "hi" ? "हमारे बारे में" : "About The Peak Content"}
          </span>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85] text-zinc-100">
            {content.title}
          </h1>
          <p className="text-xl md:text-2xl font-medium text-zinc-400 mt-6 max-w-xl">
            {content.subtitle}
          </p>
        </div>

        {/* Bilingual Content */}
        <div className="grid md:grid-cols-2 gap-12 pt-4">
          <div className="space-y-6">
            <h2 className="text-xs font-black uppercase tracking-[0.25em] text-red-500 font-mono">
              {content.identity}
            </h2>
            <p className="text-2xl font-light leading-snug text-zinc-200">
              {content.body1}
            </p>
          </div>

          <div className="space-y-6 text-zinc-400 text-base leading-relaxed">
            <p>{content.body2}</p>
            <p>{content.body3}</p>
          </div>
        </div>

        {/* Bold Quote Box */}
        <div className="mt-20 bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-xl rounded-[2rem] p-12 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <h3 className="text-white text-2xl md:text-4xl font-extrabold tracking-tight mb-6">
            "{content.quote}"
          </h3>
          <div className="flex justify-center gap-3 mt-8">
            <span className="w-10 h-1 bg-red-600 rounded-full"></span>
            <span className="w-10 h-1 bg-red-600 rounded-full"></span>
            <span className="w-10 h-1 bg-red-600 rounded-full"></span>
          </div>
        </div>

        {/* Direct Email Card */}
        <div className="mt-12 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xs font-bold text-red-500 uppercase tracking-widest font-mono mb-1">
              {content.contactTitle}
            </h4>
            <p className="text-zinc-400 text-sm">{content.emailText}</p>
          </div>
          <a
            href="mailto:thepeakcontent5@gmail.com"
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold tracking-widest uppercase transition-colors shadow-lg shadow-red-600/20 whitespace-nowrap"
          >
            thepeakcontent5@gmail.com
          </a>
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-col items-center text-center">
          <a
            href="/"
            className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-zinc-300 hover:text-red-500 transition-all"
          >
            <span>{content.cta}</span>
            <span className="group-hover:translate-x-2 transition-transform text-red-500">
              →
            </span>
          </a>
        </div>
      </div>
    </main>
  );
}
