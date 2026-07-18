"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      className="px-3 py-1.5 rounded-md border border-zinc-300 text-sm font-semibold hover:bg-zinc-100 transition"
    >
      {lang === "en" ? "हिन्दी" : "EN"}
    </button>
  );
}
