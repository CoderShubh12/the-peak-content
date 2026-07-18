"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const { lang } = useLanguage();

  const content = {
    en: {
      headline: "The Newsroom",
      col1: "Connect with our editorial desk for inquiries, tips, or breaking stories.",
      col2: "Interested in advertising with The Peak? Reach out to our commercial team.",
      email1: "editor@thepeakcontent.com",
      email2: "ads@thepeakcontent.com",
      footer: "Bhopal, MP | 2026 Edition",
    },
    hi: {
      headline: "न्यूज़रूम",
      col1: "पूछताछ, न्यूज़ टिप्स, या ब्रेकिंग स्टोरीज के लिए हमारे एडिटोरियल डेस्क से जुड़ें।",
      col2: "The Peak पर विज्ञापन देने के इच्छुक हैं? हमारी कमर्शियल टीम से संपर्क करें।",
      email1: "editor@thepeakcontent.com",
      email2: "ads@thepeakcontent.com",
      footer: "भोपाल, म.प्र. | 2026 संस्करण",
    },
  }[lang];

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 p-6 md:p-12 font-serif">
      {/* Newspaper Header */}
      <header className="border-b-4 border-zinc-900 dark:border-zinc-100 pb-8 mb-12 text-center">
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">
          {content.headline}
        </h1>
      </header>

      {/* 3-Column Newspaper Layout */}
      <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {/* Col 1 */}
        <div className="md:border-r border-zinc-300 dark:border-zinc-800 pr-0 md:pr-6">
          <h3 className="font-bold border-b border-zinc-900 dark:border-zinc-100 mb-4 pb-2">
            01. EDITORIAL
          </h3>
          <p className="text-lg leading-relaxed mb-6">{content.col1}</p>
          <a
            href={`mailto:${content.email1}`}
            className="font-bold underline decoration-red-600 decoration-2 underline-offset-4 hover:text-red-600"
          >
            {content.email1}
          </a>
        </div>

        {/* Col 2 */}
        <div className="md:border-r border-zinc-300 dark:border-zinc-800 pr-0 md:pr-6">
          <h3 className="font-bold border-b border-zinc-900 dark:border-zinc-100 mb-4 pb-2">
            02. ADVERTISING
          </h3>
          <p className="text-lg leading-relaxed mb-6">{content.col2}</p>
          <a
            href={`mailto:${content.email2}`}
            className="font-bold underline decoration-red-600 decoration-2 underline-offset-4 hover:text-red-600"
          >
            {content.email2}
          </a>
        </div>

        {/* Col 3 */}
        <div>
          <h3 className="font-bold border-b border-zinc-900 dark:border-zinc-100 mb-4 pb-2">
            03. ARCHIVES
          </h3>
          <p className="text-lg leading-relaxed">
            Media Complex, <br />
            Bhopal, Madhya Pradesh <br />
            India.
          </p>
          <div className="mt-8 p-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-bold tracking-widest uppercase">
            {content.footer}
          </div>
        </div>
      </div>
    </div>
  );
}
