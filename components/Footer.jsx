"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { lang } = useLanguage();
  const [showPrivacy, setShowPrivacy] = useState(false);

  const t = {
    en: {
      copyright: "© 2026 The Peak Content. All rights reserved.",
      about: "About Us",
      contact: "Contact",
      privacy: "Privacy Policy",
      tagline: "The peak of every story.",
    },
    hi: {
      copyright: "© 2026 द पीक कंटेंट. सर्वाधिकार सुरक्षित.",
      about: "हमारे बारे में",
      contact: "संपर्क करें",
      privacy: "गोपनीयता नीति",
      tagline: "हर कहानी का शिखर।",
    },
  };

  const content = lang === "hi" ? t.hi : t.en;

  return (
    <footer className="bg-zinc-950 text-zinc-400 py-12 px-6 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand Side */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold text-white">The Peak Content</h3>
          <p className="text-sm mt-1">{content.tagline}</p>
        </div>

        {/* Links Side */}
        <div className="flex flex-wrap justify-center gap-8">
          <a
            href="/about"
            className="text-sm font-medium hover:text-red-600 transition-colors"
          >
            {content.about}
          </a>
          <a
            href="/contact"
            className="text-sm font-medium hover:text-red-600 transition-colors"
          >
            {content.contact}
          </a>
          <button
            onClick={() => setShowPrivacy(true)}
            className="text-sm font-medium hover:text-red-600 transition-colors"
          >
            {content.privacy}
          </button>
        </div>

        <p className="text-xs">{content.copyright}</p>
      </div>

      {/* Privacy Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-950 border border-zinc-800 w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-3xl p-10 text-white relative">
            <button
              onClick={() => setShowPrivacy(false)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-white text-2xl"
            >
              ✕
            </button>
            <h2 className="text-3xl font-bold mb-6">{content.privacy}</h2>
            <div className="prose prose-invert text-zinc-400">
              <p>
                At The Peak Content, we respect your privacy. This platform is
                dedicated to news updates and does not store or share your
                personal data.
              </p>
              <p className="mt-4">
                If you have any questions regarding your data, please reach out
                to us via our contact page.
              </p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
