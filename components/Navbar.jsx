"use client";

import Link from "next/link";
import Image from "next/image"; // Image component import karo
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/context/LanguageContext"; // Language ke liye

export default function Navbar() {
  const { lang } = useLanguage();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2">
          {/* Logo image public folder se load hogi */}
          <Image
            src="/Peak_Content_logo1.png"
            alt="The Peak Content"
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
          />
          <span className="text-2xl md:text-3xl font-extrabold tracking-tighter text-zinc-950">
            The Peak <span className="text-red-600">Content</span>
          </span>
        </Link>

        {/* Right side items */}
        <div className="flex items-center gap-6">
          <LanguageToggle />

          {/* Contact Link */}
          <Link
            href="/contact"
            className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-red-600 transition-colors"
          >
            {lang === "hi" ? "संपर्क करें" : "Contact Us"}
          </Link>
        </div>
      </div>
    </nav>
  );
}
