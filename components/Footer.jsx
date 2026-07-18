"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { lang } = useLanguage();

  // Translations object
  const t = {
    en: {
      copyright: "© 2026 Logic & Leads. All rights reserved.",
      about: "About Us",
      contact: "Contact",
      privacy: "Privacy Policy",
    },
    hi: {
      copyright: "© 2026 लॉजिक एंड लीड्स. सर्वाधिकार सुरक्षित.",
      about: "हमारे बारे में",
      contact: "संपर्क करें",
      privacy: "गोपनीयता नीति",
    },
  };

  const content = lang === "hi" ? t.hi : t.en;

  return (
    <footer className="border-t border-slate-200 dark:border-zinc-800 py-8 text-center text-sm text-slate-500 dark:text-zinc-400">
      <div className="flex justify-center gap-6 mb-4">
        <a href="#" className="hover:text-red-600 transition">
          {content.about}
        </a>
        <a href="#" className="hover:text-red-600 transition">
          {content.contact}
        </a>
        <a href="#" className="hover:text-red-600 transition">
          {content.privacy}
        </a>
      </div>
      <p>{content.copyright}</p>
    </footer>
  );
}
