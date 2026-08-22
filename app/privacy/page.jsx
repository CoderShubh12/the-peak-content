"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function PrivacyPolicy() {
  const { lang } = useLanguage();

  return (
    <main className="bg-[#050507] text-zinc-300 min-h-screen py-24 px-6 selection:bg-red-600 selection:text-white">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="border-b border-zinc-900 pb-6">
          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-red-500 block mb-2">
            // {lang === "hi" ? "कानूनी जानकारी" : "Legal Document"}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tighter text-zinc-100">
            {lang === "hi" ? "गोपनीयता नीति" : "Privacy Policy"}
          </h1>
        </div>

        <div className="space-y-6 text-sm sm:text-base leading-relaxed">
          <p>
            {lang === "hi"
              ? "हमारी वेबसाइट पर आपकी गोपनीयता हमारे लिए अत्यंत महत्वपूर्ण है। यह प्राइवेसी पॉलिसी दस्तावेज़ बताता है कि हम आपकी किस प्रकार की व्यक्तिगत जानकारी एकत्र करते हैं और उसका उपयोग कैसे करते हैं।"
              : "Your privacy is important to us. This Privacy Policy document outlines the types of personal information is received and collected and how it is used."}
          </p>

          <h2 className="text-xl font-bold text-zinc-100 pt-4">
            {lang === "hi"
              ? "गूगल एडसेंस और कुकीज़"
              : "Google AdSense and Cookies"}
          </h2>
          <p>
            {lang === "hi"
              ? "तृतीय-पक्ष विक्रेता के रूप में गूगल, हमारी साइट पर विज्ञापन दिखाने के लिए कुकीज़ (Cookies) का उपयोग करता है। गूगल की DART कुकीज़ का उपयोग उपयोगकर्ताओं को हमारी साइट और इंटरनेट पर अन्य साइटों के पिछले दौरों के आधार पर विज्ञापन दिखाने में सक्षम बनाता है।"
              : "Google, as a third party vendor, uses cookies to serve ads on our site. Google's use of the DART cookie enables it to serve ads to our users based on their visit to our sites and other sites on the Internet."}
          </p>

          <h2 className="text-xl font-bold text-zinc-100 pt-4">
            {lang === "hi" ? "सहमति" : "Consent"}
          </h2>
          <p>
            {lang === "hi"
              ? "हमारी वेबसाइट का उपयोग करके, आप हमारी गोपनीयता नीति से सहमत होते हैं और इसके नियमों को स्वीकार करते हैं।"
              : "By using our website, you hereby consent to our privacy policy and agree to its terms."}
          </p>
        </div>
      </div>
    </main>
  );
}
