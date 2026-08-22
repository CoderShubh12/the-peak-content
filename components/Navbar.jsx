"use client";

import Link from "next/link";
import Image from "next/image";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const { lang } = useLanguage();

  return (
    <nav className="sticky top-0 z-50 bg-[#050507]/90 backdrop-blur-md border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/Peak_Content_logo1.png"
            alt="The Peak Content"
            width={40}
            height={40}
            className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="text-2xl md:text-3xl font-black tracking-tighter text-zinc-100">
            The Peak <span className="text-red-600">Content</span>
          </span>
        </Link>

        {/* Center / Right Menu Links (Hidden on small screens, visible on md+) */}
        <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-zinc-400">
          <Link href="/polls" className="hover:text-red-500 transition-colors">
            {lang === "hi" ? "पोल (Polls)" : "Polls"}
          </Link>
          <Link
            href="/opinions"
            className="hover:text-red-500 transition-colors"
          >
            {lang === "hi" ? "विचार (Opinions)" : "Opinions"}
          </Link>
          <Link href="/about" className="hover:text-red-500 transition-colors">
            {lang === "hi" ? "हमारे बारे में" : "About Us"}
          </Link>
          <Link
            href="/contact"
            className="hover:text-red-500 transition-colors"
          >
            {lang === "hi" ? "संपर्क" : "Contact"}
          </Link>
        </div>

        {/* Right side items: Language Toggle & Mobile Quick Link */}
        <div className="flex items-center gap-4">
          <LanguageToggle />

          {/* Contact Button for smaller screens */}
          <Link
            href="/contact"
            className="md:hidden text-[10px] font-black uppercase tracking-[0.2em] bg-zinc-900 border border-zinc-800 text-zinc-300 px-3 py-2 rounded-lg hover:border-red-500 transition-colors"
          >
            {lang === "hi" ? "संपर्क" : "Contact"}
          </Link>
        </div>
      </div>
    </nav>
  );
}
