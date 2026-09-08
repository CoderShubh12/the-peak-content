import TechBlogsContent from "@/components/TechBlogsContent";

export const metadata = {
  title: "Tech, Markets & Insights | The Peak Content",
  description:
    "Explore specialized dispatches spanning software engineering, digital marketing workflows, financial market trends, AI/ML developments, cybersecurity, and gaming infrastructure.",
  keywords: [
    "Tech Blogs",
    "Coding Architecture",
    "Digital Marketing",
    "Share Market Analysis",
    "AI and ML Trends",
    "Gaming Infrastructure",
  ],
  openGraph: {
    title: "Tech, Markets & Insights | The Peak Content",
    description:
      "Expert dispatches on software engineering, financial markets, digital marketing, and tech innovations.",
    type: "website",
    locale: "en_US",
    alternateLocale: "hi_IN",
  },
};

export default function TechAndBlogsPage() {
  return (
    <>
      {/* AI & Generative Engine JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Tech, Markets & Insights Desk",
            description:
              "Professional technology, coding, finance, and digital marketing dispatches by The Peak Content.",
            publisher: {
              "@type": "Organization",
              name: "The Peak Content",
              url: "https://thepeakcontent.com",
            },
          }),
        }}
      />
      <TechBlogsContent />
    </>
  );
}
