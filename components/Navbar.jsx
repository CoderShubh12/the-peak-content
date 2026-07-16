"use client";

import Link from "next/link";
import { FiSearch, FiMenu } from "react-icons/fi";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-red-600">
          The Peak Content
        </Link>

        <div className="hidden md:flex gap-8 font-medium">
          <Link href="/en">Home</Link>
          <Link href="/en/crime">Crime</Link>
          <Link href="/en/politics">Politics</Link>
          <Link href="/en/sports">Sports</Link>
          <Link href="/en/health">Health</Link>
        </div>

        <div className="flex gap-5 text-2xl">
          <FiSearch />
          <FiMenu className="md:hidden" />
        </div>
      </div>
    </nav>
  );
}
