"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";

export default function OpinionsPage() {
  const { lang } = useLanguage();
  const [dbPosts, setDbPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Database se live posts fetch karna
  useEffect(() => {
    async function fetchDbPosts() {
      try {
        const res = await fetch("/api/posts");
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setDbPosts(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch database posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDbPosts();
  }, []);

  // Static articles
  const staticArticles = [
    {
      slug: "claude-and-ai-models-problem-solving",
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
      readTime: "12 min read",
      isDb: false,
    },
    {
      slug: "ai-and-indian-labor-market-challenges",
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
      readTime: "12 min read",
      isDb: false,
    },
    {
      slug: "west-asia-turkey-geopolitical-flashpoints-2026",
      author:
        lang === "hi"
          ? "डॉ. ऋचा वर्मा (ग्लोबल अफेयर्स विश्लेषक)"
          : "Dr. Richa Verma (Global Affairs Analyst)",
      title:
        lang === "hi"
          ? "पश्चिम एशिया में उबाल: ईरान-इजराइल संघर्ष, तुर्की की कूटनीति और भारत-चीन-पाकिस्तान समीकरण का भू-राजनीतिक विश्लेषण"
          : "West Asian Flashpoints: Iran-Israel Standoff, Turkish Diplomacy, and the India-China-Pakistan Strategic Matrix",
      snippet:
        lang === "hi"
          ? "हार्मोन जलडमरूमध्य से लेकर सीरियाई एयरबेस तक, पिछले 60 घंटों में वैश्विक कूटनीति और रक्षा क्षेत्र में बड़े भू-राजनीतिक बदलाव देखने को मिले हैं..."
          : "From the Strait of Hormuz to Syrian airbases, analyzing the last 60 hours of high-stakes geopolitical shifts across West Asia and South Asia...",
      date: "August 23, 2026",
      readTime: "14 min read",
      isDb: false,
    },
    {
      slug: "rise-of-autonomous-ai-agents-2026-business-revolution",
      author:
        lang === "hi"
          ? "प्रशांत सिंह (एआई और फ्यूचर टेक्नोलॉजी लीड)"
          : "Prashant Singh (AI & Future Tech Lead)",
      title:
        lang === "hi"
          ? "चैटबॉट्स से ऑटोनॉमस एजेंट्स तक: साल 2026 में बिजनेस और ऑटोमेशन की दुनिया में आ रही है बड़ी क्रांति"
          : "From Chatbots to Autonomous Agents: How 2026 is Redefining Enterprise Automation and Workflow Intelligence",
      snippet:
        lang === "hi"
          ? "सिर्फ चैट करने वाले एआई का दौर अब पीछे छूट गया है। अब ऐसे ऑटोनॉमस एजेंट्स आ चुके हैं जो खुद फैसले लेते हैं और पूरे वर्कफ़्लो को मैनेज करते हैं..."
          : "The era of simple chat interfaces is over. Autonomous AI agents that plan, decide, and execute entire workflows are transforming modern business...",
      date: "August 23, 2026",
      readTime: "12 min read",
      isDb: false,
    },
  ];

  const formattedDbPosts = dbPosts.map((post) => ({
    slug: post.slug,
    author: post.author || "The Peak Editorial Desk",
    title: post.title,
    snippet: post.content ? post.content.substring(0, 150) + "..." : "",
    date: new Date(post.createdAt).toLocaleDateString(),
    readTime: "5 min read",
    isDb: true,
  }));

  const allArticles = [...formattedDbPosts, ...staticArticles];

  return (
    <main className="bg-[#050507] text-zinc-50 min-h-screen py-24 px-6 selection:bg-red-600 selection:text-white">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* SEO-Optimized Header Section */}
        <div className="border-b border-zinc-900 pb-8 space-y-4">
          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-red-500 block">
            //{" "}
            {lang === "hi"
              ? "विशेष कॉलम, टेक नीतियां और भू-राजनीतिक विश्लेषण"
              : "Expert Columns, Tech Policy & Geopolitical Analysis"}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tighter text-zinc-100">
            {lang === "hi"
              ? "संपादकीय, विचार और करेंट अफेयर्स"
              : "Opinions, Editorials & Current Affairs"}
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            {lang === "hi"
              ? "द पीक कंटेंट के इस संपादकीय खंड में आर्टिफिशियल इंटेलिजेंस (AI) विकास, वैश्विक अर्थव्यवस्था, लेबर मार्केट ट्रेंड्स और भू-राजनीतिक संघर्षों पर गहन विश्लेषणात्मक लेख (in-depth analytical essays) पढ़ें।"
              : "Explore insightful expert columns, tech policy reviews, and deep geopolitical analysis at The Peak Content. Our editorial desk decodes complex trends across artificial intelligence developments, global economic shifts, current affairs, and enterprise automation."}
          </p>
        </div>

        {loading ? (
          <div className="text-zinc-500 font-mono text-sm py-12 text-center">
            Loading editorial content...
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-xs font-mono text-zinc-500 bg-zinc-900/50 border border-zinc-800/60 p-3 rounded-lg flex justify-between items-center">
              <span>Status: Connected</span>
              <span>
                Database Posts:{" "}
                <strong className="text-red-400">{dbPosts.length}</strong> |
                Static Articles:{" "}
                <strong className="text-zinc-300">
                  {staticArticles.length}
                </strong>
              </span>
            </div>

            <div className="grid gap-8">
              {allArticles.map((item, idx) => (
                <Link
                  key={idx}
                  href={
                    item.isDb ? `/posts/${item.slug}` : `/opinions/${item.slug}`
                  }
                  className="group block bg-zinc-900/40 border border-zinc-800/80 hover:border-red-500/50 backdrop-blur-xl p-8 rounded-2xl transition-all duration-500 shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-4">
                    <span className="text-red-500 font-bold uppercase tracking-wider flex items-center gap-2">
                      {item.author}
                      {item.isDb && (
                        <span className="bg-red-500/10 text-red-400 text-[10px] px-2 py-0.5 rounded border border-red-500/20 font-mono">
                          Live DB
                        </span>
                      )}
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
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Keyword-Rich Editorial Policy & Context Section */}
        <div className="mt-16 bg-zinc-900/30 border border-zinc-800/60 p-8 rounded-2xl space-y-4">
          <h3 className="text-xl font-bold text-zinc-200">
            {lang === "hi"
              ? "संपादकीय मानक और अनुसंधान नीति"
              : "Editorial Standards & Research Framework"}
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {lang === "hi"
              ? "द पीक कंटेंट पर प्रकाशित होने वाले प्रत्येक ओपिनियन पीस और करेंट अफेयर्स लेख को उच्च स्तरीय तथ्यात्मक जांच (fact-checking), स्वतंत्र पत्रकारिता के सिद्धांतों और तकनीकी विश्लेषण के मानकों के आधार पर तैयार किया जाता है। हमारा उद्देश्य पाठकों को आधुनिक तकनीक, ग्लोबल मार्केट और पॉलिसी बदलावों पर सबसे सटीक दृष्टिकोण प्रदान करना है।"
              : "Every opinion piece, technology review, and current affairs essay published on The Peak Content undergoes rigorous fact-checking and independent evaluation. Our core coverage spans autonomous AI agents, global market dynamics, international relations, and software engineering architecture to keep professionals and modern readers fully informed."}
          </p>
        </div>
      </div>
    </main>
  );
}
