"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const { lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    window.location.href = `mailto:thepeakcontent5@gmail.com?subject=New Message from ${name} (${email})&body=${encodeURIComponent(message)}`;
    setSubmitted(true);
  };

  const content = {
    en: {
      headline: "The Newsroom",
      col1: "Connect with our editorial desk for inquiries, tips, or breaking stories.",
      col2: "Interested in advertising with The Peak? Reach out to our commercial team.",
      email: "thepeakcontent5@gmail.com",
      footer: "Bhopal, MP | 2026 Edition",
      formTitle: "Send a Direct Dispatch",
      namePlaceholder: "Your Name",
      emailPlaceholder: "Your Email Address",
      messagePlaceholder: "Write your message or news tip here...",
      submitBtn: "Transmit Message",
      successText: "Dispatch prepared! Opening your mail client...",
      directEmailTitle: "Direct Gmail Support",
      directEmailSub:
        "Prefer sending a direct email? Click below to open Gmail instantly:",
      openGmailBtn: "Open Gmail",
    },
    hi: {
      headline: "न्यूज़रूम",
      col1: "पूछताछ, न्यूज़ टिप्स, या ब्रेकिंग स्टोरीज के लिए हमारे एडिटोरियल डेस्क से जुड़ें।",
      col2: "The Peak पर विज्ञापन देने के इच्छुक हैं? हमारी कमर्शियल टीम से संपर्क करें।",
      email: "thepeakcontent5@gmail.com",
      footer: "भोपाल, म.प्र. | 2026 संस्करण",
      formTitle: "सीधा संदेश भेजें",
      namePlaceholder: "आपका नाम",
      emailPlaceholder: "आपका ईमेल पता",
      messagePlaceholder: "यहाँ अपना संदेश या न्यूज़ टिप लिखें...",
      submitBtn: "संदेश भेजें",
      successText: "संदेश तैयार है! आपका मेल क्लाइंट खुल रहा है...",
      directEmailTitle: "डायरेक्ट जीमेल सपोर्ट",
      directEmailSub:
        "सीधे ईमेल भेजना चाहते हैं? तुरंत जीमेल खोलने के लिए नीचे क्लिक करें:",
      openGmailBtn: "जीमेल खोलें",
    },
  }[lang];

  return (
    <main className="min-h-screen bg-[#050507] text-zinc-100 p-6 md:p-16 selection:bg-red-600 selection:text-white">
      {/* Newspaper Header */}
      <header className="border-b-4 border-zinc-100 pb-8 mb-12 text-center max-w-6xl mx-auto">
        <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-red-500 block mb-3">
          // {lang === "hi" ? "आधिकारिक संपर्क" : "Official Directory"}
        </span>
        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter">
          {content.headline}
        </h1>
      </header>

      {/* 3-Column Newspaper Layout */}
      <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto mb-16">
        {/* Col 1 */}
        <div className="md:border-r border-zinc-800 pr-0 md:pr-8">
          <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-red-500 border-b border-zinc-800 mb-6 pb-3">
            01. {lang === "hi" ? "संपादकीय" : "EDITORIAL"}
          </h3>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-6">
            {content.col1}
          </p>
          <a
            href={`mailto:${content.email}`}
            className="inline-block font-mono text-sm font-bold text-zinc-100 underline decoration-red-600 decoration-2 underline-offset-4 hover:text-red-500 transition-colors break-all"
          >
            {content.email}
          </a>
        </div>

        {/* Col 2 */}
        <div className="md:border-r border-zinc-800 pr-0 md:pr-8">
          <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-red-500 border-b border-zinc-800 mb-6 pb-3">
            02. {lang === "hi" ? "विज्ञापन" : "ADVERTISING"}
          </h3>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-6">
            {content.col2}
          </p>
          <a
            href={`mailto:${content.email}`}
            className="inline-block font-mono text-sm font-bold text-zinc-100 underline decoration-red-600 decoration-2 underline-offset-4 hover:text-red-500 transition-colors break-all"
          >
            {content.email}
          </a>
        </div>

        {/* Col 3 */}
        <div>
          <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-red-500 border-b border-zinc-800 mb-6 pb-3">
            03. {lang === "hi" ? "कार्यालय" : "ARCHIVES"}
          </h3>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-6">
            Media Complex, <br />
            Bhopal, Madhya Pradesh <br />
            India.
          </p>
          <div className="mt-8 p-4 bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs font-mono font-bold tracking-widest uppercase text-center rounded-lg">
            {content.footer}
          </div>
        </div>
      </div>

      {/* Direct Gmail Quick Box */}
      <section className="max-w-3xl mx-auto bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-xl p-6 md:p-8 rounded-2xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <h4 className="font-mono text-xs font-bold text-red-500 uppercase tracking-widest mb-1">
            {content.directEmailTitle}
          </h4>
          <p className="text-zinc-300 text-sm">{content.directEmailSub}</p>
        </div>
        <a
          href="mailto:thepeakcontent5@gmail.com"
          className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-mono text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xl transition-colors whitespace-nowrap border border-zinc-700"
        >
          {content.openGmailBtn}
        </a>
      </section>

      {/* Interactive Contact Form Section */}
      <section className="max-w-3xl mx-auto bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-xl p-8 md:p-12 rounded-2xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="mb-8 border-b border-zinc-800 pb-4">
          <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-zinc-100">
            {content.formTitle}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                name="name"
                required
                placeholder={content.namePlaceholder}
                className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                required
                placeholder={content.emailPlaceholder}
                className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>
          </div>

          <div>
            <textarea
              name="message"
              required
              rows={5}
              placeholder={content.messagePlaceholder}
              className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-600 transition-colors resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-xl transition-all shadow-lg shadow-red-600/30"
            >
              {content.submitBtn}
            </button>

            {submitted && (
              <span className="text-xs font-mono text-emerald-400">
                {content.successText}
              </span>
            )}
          </div>
        </form>
      </section>
    </main>
  );
}
