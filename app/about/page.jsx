"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { lang } = useLanguage();

  const t = {
    en: {
      title: "The Peak.",
      subtitle:
        "The peak of every story. Where fast news meets clear, meaningful journalism.",

      identity: "Our Identity",

      body1:
        "The Peak Content is a digital news platform focused on delivering the stories that matter — from breaking news and current affairs to technology, business, gaming and digital trends.",

      body2:
        "In a digital world filled with information, we aim to cut through the noise and make important stories easier to understand. We cover breaking and crime news alongside technology, AI, gadgets, gaming, business and emerging trends.",

      body3:
        "We believe modern journalism should be fast, accessible and responsible. Our goal is to bring you relevant stories with clarity while keeping the reading experience simple and focused.",

      quote: "We don't just follow the story. We find the peak.",

      cta: "Go to Feed",

      contactTitle: "Get in Touch",

      emailText:
        "Have a news tip, query, correction, or feedback? Reach out to us directly at:",
    },

    hi: {
      title: "द पीक.",
      subtitle:
        "हर कहानी का शिखर। जहाँ तेज़ खबरें स्पष्ट और सार्थक पत्रकारिता से मिलती हैं।",

      identity: "हमारी पहचान",

      body1:
        "The Peak Content एक डिजिटल न्यूज़ प्लेटफॉर्म है, जहाँ हम ब्रेकिंग न्यूज़ और करंट अफेयर्स से लेकर टेक्नोलॉजी, बिज़नेस, गेमिंग और डिजिटल ट्रेंड्स तक महत्वपूर्ण खबरें कवर करते हैं।",

      body2:
        "जानकारियों से भरी डिजिटल दुनिया में हमारा उद्देश्य जरूरी खबरों को आसान और स्पष्ट तरीके से सामने लाना है। हम ब्रेकिंग और क्राइम न्यूज़ के साथ टेक्नोलॉजी, AI, गैजेट्स, गेमिंग, बिज़नेस और नए डिजिटल ट्रेंड्स को भी कवर करते हैं।",

      body3:
        "हमारा मानना है कि आधुनिक पत्रकारिता तेज़, सुलभ और जिम्मेदार होनी चाहिए। हमारा लक्ष्य है कि आपको जरूरी खबरें स्पष्टता के साथ मिलें और आपका रीडिंग एक्सपीरियंस सरल और focused रहे।",

      quote: "हम सिर्फ कहानी का पीछा नहीं करते। हम उसका शिखर खोजते हैं।",

      cta: "होम फीड पर जाएँ",

      contactTitle: "संपर्क करें",

      emailText:
        "कोई खबर, सुझाव, सवाल, करेक्शन या फीडबैक है? सीधे हमसे संपर्क करें:",
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

        {/* Coverage Tags */}
        <div className="mt-16 flex flex-wrap gap-3">
          {[
            "Breaking News",
            "Crime",
            "Current Affairs",
            "Technology",
            "AI",
            "Gaming",
            "Business",
            "Digital Trends",
          ].map((item) => (
            <span
              key={item}
              className="px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs font-medium text-zinc-400"
            >
              {item}
            </span>
          ))}
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
