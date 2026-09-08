"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const { lang } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

        {/* Desktop Menu Links (Visible on md+) */}
        <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-white">
          <Link href="/polls" className="hover:text-red-500 transition-colors">
            {lang === "hi" ? "पोल (Polls)" : "Polls"}
          </Link>
          <Link
            href="/opinions"
            className="hover:text-red-500 transition-colors"
          >
            {lang === "hi" ? "विचार (Opinions)" : "Opinions"}
          </Link>
          <Link
            href="/tech-and-gaming"
            className="hover:text-red-500 transition-colors"
          >
            {lang === "hi" ? "टेक & गेमिंग" : "Tech & Gaming"}
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

        {/* Right side items: Language Toggle & Mobile Hamburger Button */}
        <div className="flex items-center gap-4">
          <LanguageToggle />

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden bg-zinc-900 border border-zinc-800 text-white p-2.5 rounded-xl hover:border-red-500 hover:text-red-500 transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#050507]/95 backdrop-blur-xl border-b border-zinc-900 px-6 py-6 space-y-4 shadow-2xl animate-fadeIn">
          <div className="flex flex-col space-y-4 text-sm font-bold uppercase tracking-wider text-white">
            <Link
              href="/polls"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-red-500 transition-colors py-2 border-b border-zinc-900"
            >
              {lang === "hi" ? "पोल (Polls)" : "Polls"}
            </Link>
            <Link
              href="/opinions"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-red-500 transition-colors py-2 border-b border-zinc-900"
            >
              {lang === "hi" ? "विचार (Opinions)" : "Opinions"}
            </Link>
            <Link
              href="/tech-and-gaming"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-red-500 transition-colors py-2 border-b border-zinc-900"
            >
              {lang === "hi" ? "टेक & गेमिंग" : "Tech & Gaming"}
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-red-500 transition-colors py-2 border-b border-zinc-900"
            >
              {lang === "hi" ? "हमारे बारे में" : "About Us"}
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-red-500 transition-colors py-2"
            >
              {lang === "hi" ? "संपर्क" : "Contact"}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
