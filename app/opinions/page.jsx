"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function OpinionsPage() {
  const { lang } = useLanguage();

  const articles = [
    {
      author:
        lang === "hi"
          ? "आदित्य शर्मा (वरिष्ठ संपादक)"
          : "Aditya Sharma (Senior Editor)",
      title:
        lang === "hi"
          ? "आर्टिफिशियल इंटेलिजेंस और भारतीय श्रम बाज़ार: भविष्य की चुनौतियाँ"
          : "AI and the Indian Labor Market: Navigating Future Challenges",
      snippet:
        lang === "hi"
          ? "जैसे-जैसे ऑटोमेशन बढ़ रहा है, देश के टेक और मैन्युफैक्चरिंग सेक्टर में किस तरह के बदलाव देखने को मिल सकते हैं..."
          : "As automation accelerates, how the tech and manufacturing sectors across the country are expected to transform...",
      date: "August 22, 2026",
      readTime: "5 min read",
    },
    {
      author: lang === "hi" ? "डॉ. ऋचा वर्मा" : "Dr. Richa Verma",
      title:
        lang === "hi"
          ? "ग्लोबल इकॉनमी और भारतीय रुपए की स्थिति: एक गहरी समीक्षा"
          : "Global Economy and the Indian Rupee: A Deep Dive Review",
      snippet:
        lang === "hi"
          ? "वैश्विक स्तर पर मुद्रास्फीति और केंद्रीय बैंकों की नीतियों का भारतीय बाजारों पर कितना गहरा असर पड़ रहा है..."
          : "Analyzing the profound impact of global inflation and central bank policies on domestic markets...",
      date: "August 21, 2026",
      readTime: "7 min read",
    },
  ];

  return (
    <main className="bg-[#050507] text-zinc-50 min-h-screen py-24 px-6 selection:bg-red-600 selection:text-white">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="border-b border-zinc-900 pb-6">
          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-red-500 block mb-2">
            //{" "}
            {lang === "hi"
              ? "विशेष कॉलम और विश्लेषण"
              : "Expert Columns & Analysis"}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tighter text-zinc-100">
            {lang === "hi" ? "संपादकीय और विचार" : "Opinions & Editorials"}
          </h1>
        </div>

        {/* List of Opinions */}
        <div className="grid gap-8">
          {articles.map((item, idx) => (
            <article
              key={idx}
              className="group bg-zinc-900/40 border border-zinc-800/80 hover:border-red-500/50 backdrop-blur-xl p-8 rounded-2xl transition-all duration-500 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-4">
                <span className="text-red-500 font-bold uppercase tracking-wider">
                  {item.author}
                </span>
                <span>
                  {item.date} • {item.readTime}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-zinc-100 group-hover:text-red-400 transition-colors tracking-tight leading-tight mb-4">
                {item.title}
              </h2>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
                {item.snippet}
              </p>

              <button className="inline-flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-widest group-hover:text-white transition-colors">
                <span>
                  {lang === "hi" ? "पूरा लेख पढ़ें" : "Read Full Column"}
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
