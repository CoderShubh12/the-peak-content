"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function OpinionsPage() {
  const { lang } = useLanguage();
  const [activeOpinion, setActiveOpinion] = useState(null);

  const articles = [
    {
      author:
        lang === "hi"
          ? "द पीक कंटेंट डेस्क (प्रौद्योगिकी विश्लेषण)"
          : "The Peak Content Desk (Tech Bureau)",
      title:
        lang === "hi"
          ? "क्लाउड और एआई मॉडल: जटिल समस्या समाधान (Problem Solving) में इंसानी सोच का विकल्प या एक क्रांतिकारी साथी?"
          : "Claude and AI Models: Are Advanced Language Models Solving Complex Problems or Just Mimicking Logic?",
      snippet:
        lang === "hi"
          ? "हाल के वर्षों में एआई और क्लॉड (Claude) जैसे उन्नत मॉडल्स ने कोडिंग, डेटा विश्लेषण और तार्किक पहेलियों को सुलझाने में असाधारण क्षमता दिखाई है..."
          : "In recent years, advanced AI models like Claude have demonstrated unprecedented capabilities in coding, logical reasoning, and complex problem-solving...",
      date: "August 23, 2026",
      readTime: "8 min read",
      fullContent: {
        intro:
          lang === "hi"
            ? "आज के डिजिटल युग में आर्टिफिशियल इंटेलिजेंस (AI) हमारी ज़िंदगी का एक अनिवार्य हिस्सा बन चुका है। Anthropic के Claude और अन्य उन्नत लार्ज लैंग्वेज मॉडल्स (LLMs) ने तकनीकी दुनिया में एक भूचाल ला दिया है।"
            : "In today's digital age, Artificial Intelligence (AI) has become an indispensable part of our lives. Advanced Large Language Models (LLMs) like Anthropic's Claude have revolutionized the tech world.",
        section1Title:
          lang === "hi"
            ? "1. एआई और जटिल समस्या समाधान का बदलता स्वरूप"
            : "1. The Evolving Nature of AI and Complex Problem Solving",
        section1Text:
          lang === "hi"
            ? "पारंपरिक रूप से, जब किसी सॉफ्टवेयर इंजीनियर के सामने कोई जटिल समस्या आती थी, तो उसे सुलझाने में हफ्तों लग जाते थे। लेकिन क्लाउड (Claude) जैसे मॉडल्स के आने के बाद, कोडिंग बग्ज और तार्किक पहेलियाँ सेकंडों में हल हो रही हैं।"
            : "Traditionally, debugging and problem-solving took weeks. With models like Claude, intricate coding bugs and logical puzzles are resolved in seconds.",
        section2Title:
          lang === "hi"
            ? "2. क्लाउड (Claude) की विशिष्टता"
            : "2. Claude's Uniqueness",
        section2Text:
          lang === "hi"
            ? "यह न केवल कोड लिखकर देता है, बल्कि यह भी बताता है कि वह कोड क्यों और कैसे काम करेगा, जो डेवलपर्स के लिए एक 'मेंटर' की तरह है।"
            : "It not only generates code but explains the architecture, acting like a mentor for developers.",
        conclusionTitle: lang === "hi" ? "निष्कर्ष (Conclusion)" : "Conclusion",
        conclusionText:
          lang === "hi"
            ? "The Peak Content का मानना है कि टेक्नोलॉजी कोई खतरा नहीं, बल्कि हमारे विकास का अगला चरण है।"
            : "The Peak Content believes technology is not a threat, but the next phase of human evolution.",
      },
    },
    {
      author:
        lang === "hi"
          ? "आदित्य शर्मा (विशेष संवाददाता, द पीक कंटेंट)"
          : "Aditya Sharma (Special Correspondent, The Peak Content)",
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
      fullContent: {
        intro:
          lang === "hi"
            ? "भारतीय श्रम बाज़ार एक ऐसे मोड़ पर खड़ा है जहाँ तकनीक और मानव कौशल का सीधा टकराव और तालमेल दोनों देखने को मिल रहे हैं।"
            : "The Indian labor market stands at a crossroads where technological integration and human skills meet.",
        section1Title:
          lang === "hi"
            ? "कौशल विकास की आवश्यकता"
            : "Need for Skill Upgradation",
        section1Text:
          lang === "hi"
            ? "पारंपरिक नौकरियों का स्वरूप बदल रहा है। अब केवल डिग्री काफी नहीं है, बल्कि निरंतर सीखने (Upskilling) की आवश्यकता है।"
            : "Traditional job profiles are shifting. Degrees are no longer enough; continuous upskilling has become imperative.",
        conclusionTitle: lang === "hi" ? "निष्कर्ष" : "Conclusion",
        conclusionText:
          lang === "hi"
            ? "सही समय पर नीतियों और शिक्षा में बदलाव करके भारत इस तकनीकी क्रांति का पूरा फायदा उठा सकता है।"
            : "With timely policy and educational interventions, India can harness the full potential of this technological revolution.",
      },
    },
    {
      author:
        lang === "hi"
          ? "डॉ. ऋचा वर्मा (ग्लोबल अफेयर्स विश्रेषक)"
          : "Dr. Richa Verma (Global Affairs Analyst)",
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
      fullContent: {
        intro:
          lang === "hi"
            ? "वैश्विक अर्थव्यवस्था में हो रहे बदलावों और अमेरिकी फेडरल रिजर्व की ब्याज दरों का असर सीधे तौर पर उभरती हुई अर्थव्यवस्थाओं जैसे भारत पर पड़ता है।"
            : "Global economic shifts and US Federal Reserve policies directly influence emerging economies like India.",
        section1Title:
          lang === "hi"
            ? "मुद्रास्फीति और घरेलू बाज़ार"
            : "Inflation and Domestic Markets",
        section1Text:
          lang === "hi"
            ? "आयातित महंगाई और विनिमय दर में उतार-चढ़ाव भारतीय निवेशकों और नीति निर्माताओं के लिए लगातार चुनौती बने हुए हैं।"
            : "Imported inflation and currency fluctuations remain persistent challenges for domestic investors and policy makers.",
        conclusionTitle: lang === "hi" ? "निष्कर्ष" : "Conclusion",
        conclusionText:
          lang === "hi"
            ? "भारतीय अर्थव्यवस्था के मजबूत बुनियादी कारक इसे वैश्विक झटकों से मुकाबला करने की ताकत देते हैं।"
            : "India's strong macroeconomic fundamentals provide resilience against global shocks.",
      },
    },
  ];

  return (
    <main className="bg-[#050507] text-zinc-50 min-h-screen py-24 px-6 selection:bg-red-600 selection:text-white relative">
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
              onClick={() => setActiveOpinion(item)}
              className="group cursor-pointer bg-zinc-900/40 border border-zinc-800/80 hover:border-red-500/50 backdrop-blur-xl p-8 rounded-2xl transition-all duration-500 shadow-2xl relative overflow-hidden"
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

              <div className="inline-flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-widest group-hover:text-white transition-colors">
                <span>
                  {lang === "hi" ? "पूरा लेख पढ़ें" : "Read Full Column"}
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* --- OPINION ARTICLE MODAL POPUP --- */}
      {activeOpinion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 relative shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setActiveOpinion(null)}
              className="absolute top-4 right-4 bg-zinc-800 hover:bg-red-600 text-zinc-300 hover:text-white w-9 h-9 rounded-full flex items-center justify-center transition-colors font-bold text-sm"
            >
              ✕
            </button>

            {/* Meta */}
            <div className="flex items-center gap-2 text-xs font-mono text-red-500 font-bold uppercase tracking-wider mb-3">
              <span>{activeOpinion.author}</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400">{activeOpinion.date}</span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-4xl font-black text-zinc-100 tracking-tight leading-tight mb-6">
              {activeOpinion.title}
            </h2>

            {/* Full Detailed Content Sections */}
            <div className="space-y-6 text-zinc-300 text-sm sm:text-base leading-relaxed border-t border-zinc-800 pt-6">
              <p className="text-zinc-200 font-medium">
                {activeOpinion.fullContent.intro}
              </p>

              <h3 className="text-lg font-bold text-red-400 pt-2">
                {activeOpinion.fullContent.section1Title}
              </h3>
              <p>{activeOpinion.fullContent.section1Text}</p>

              {activeOpinion.fullContent.section2Title && (
                <>
                  <h3 className="text-lg font-bold text-red-400 pt-2">
                    {activeOpinion.fullContent.section2Title}
                  </h3>
                  <p>{activeOpinion.fullContent.section2Text}</p>
                </>
              )}

              <h3 className="text-lg font-bold text-red-400 pt-2">
                {activeOpinion.fullContent.conclusionTitle}
              </h3>
              <p>{activeOpinion.fullContent.conclusionText}</p>
            </div>

            {/* Footer Action */}
            <div className="mt-8 pt-4 border-t border-zinc-800 flex justify-end">
              <button
                onClick={() => setActiveOpinion(null)}
                className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold transition-colors"
              >
                {lang === "hi" ? "लेख बंद करें" : "Close Article"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
