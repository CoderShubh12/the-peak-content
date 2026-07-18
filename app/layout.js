import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

// Components import karo
import Navbar from "@/components/Navbar";
import BreakingNews from "@/components/BreakingNews";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "The Peak Content",
  description: "Sabse Pehle, Sabse Sahi - Breaking News & Trends",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <LanguageProvider>
          {/* Global Components: Har page par dikhenge */}
          {/* <BreakingNews /> */}
          <Navbar />

          {/* Dynamic Pages yahan load honge */}
          <main className="flex-grow">{children}</main>

          <Footer />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
