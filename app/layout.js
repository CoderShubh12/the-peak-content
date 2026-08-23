import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  title: "The Peak Content - Todays News, Latest News & Live Updates",
  description:
    "Get the latest news, todays top breaking news, live news updates, and deep analytical reports on politics, markets, and trends in India and worldwide.",
  keywords:
    "todays news, latest news, live news, breaking news, current affairs, the peak content",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-C56DBBVM1Y"
          strategy="afterInteractive"
        />
        <Script id="google-tag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-C56DBBVM1Y');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#050507] text-zinc-50">
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
