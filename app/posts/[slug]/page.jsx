import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";
import { marked } from "marked";
import Link from "next/link";
import { notFound } from "next/navigation";

// Purana static articles data (Fallback ke liye)
const articlesData = {
  "claude-and-ai-models-problem-solving": {
    author: "The Peak Content Desk (Tech Bureau)",
    title:
      "Claude and AI Models: Are Advanced Language Models Solving Complex Problems or Just Mimicking Logic?",
    date: "August 23, 2026",
    readTime: "12 min read",
    intro:
      "In today's hyper-digital ecosystem, Artificial Intelligence has transitioned from being a supportive experimental tool to becoming the core engine of technical infrastructure...",
    section1Title:
      "1. The Metamorphosis of Problem Solving in the Age of Generative AI",
    section1Text:
      "Historically, software engineering, scientific research, and advanced mathematical modelling required extensive human cycles...",
    section2Title:
      "2. Architectural Superiority: Context Windows and Constitutional AI",
    section2Text:
      "What sets modern frontier models apart is their massive context retention and adherence to safety guidelines...",
    section3Title:
      "3. The Boundaries of Silicon Intelligence: Intuition vs Computation",
    section3Text:
      "Despite undeniable computational prowess, a profound philosophical and technical boundary remains...",
    section4Title:
      "4. The Economics of Developer Productivity and System Reliability",
    section4Text:
      "From an enterprise perspective, integrating advanced AI assistants into daily engineering workflows has driven exponential surges...",
    conclusionTitle:
      "Conclusion: The Symbiotic Future of Human and Machine Logic",
    conclusionText:
      "The Peak Content newsroom maintains that technology is not a hostile usurper, but the ultimate catalyst...",
  },
  "ai-and-indian-labor-market-challenges": {
    author: "Aditya Sharma (Special Correspondent, The Peak Content)",
    title: "AI and the Indian Labor Market: Navigating Future Challenges",
    date: "August 22, 2026",
    readTime: "12 min read",
    intro:
      "The Indian labor market—pegged as one of the most vibrant and youthful economic workforces globally—stands at an unprecedented historic crossroads...",
    section1Title: "1. The Disruption of Entry-Level IT and Service Sectors",
    section1Text:
      "For over two decades, India’s booming IT-BPM sector acted as the primary escalator for upward social mobility...",
    section2Title:
      "2. The Imperative of Massive National Reskilling and Upskilling",
    section2Text:
      "Traditional university curricula, long criticized for lagging behind industry velocity, are now dangerously misaligned...",
    section3Title: "3. Startup Ecosystem and Regional Innovation Hubs",
    section3Text:
      "Amidst corporate downsizing of legacy roles, India’s dynamic startup ecosystem is blazing alternative trails...",
    section4Title:
      "4. Policy Frameworks, Labor Protections, and Social Security",
    section4Text:
      "As the nature of employment pivots toward gig work, remote contracting, and automated task management...",
    conclusionTitle:
      "Conclusion: Harnessing Demographic Dividend Through Technological Agility",
    conclusionText:
      "India's economic destiny in the mid-21st century depends entirely on its proactive adaptability...",
  },
  "west-asia-turkey-geopolitical-flashpoints-2026": {
    author: "Dr. Richa Verma (Global Affairs Analyst)",
    title:
      "West Asian Flashpoints: Iran-Israel Standoff, Turkish Diplomacy, and the India-China-Pakistan Strategic Matrix",
    date: "August 23, 2026",
    readTime: "14 min read",
    intro:
      "Over the past 60 hours, the global geopolitical chessboard has witnessed an intensification of multi-front friction points...",
    section1Title: "1. The Iran-Israel War Quagmire and Economic Chokeholds",
    section1Text:
      "Nearly six months into the protracted military escalation involving the United States, Israel, and Iran...",
    section2Title: "2. Turkey's Calculated Stance and Syrian Airbase Maneuvers",
    section2Text:
      "In the Levantine theater, Turkey has found itself at the center of delicate regional friction...",
    section3Title:
      "3. India’s Strategic Doctrine: 'Distrust and Diversify' Amid China-Pakistan Dynamics",
    section3Text:
      "Shifting focus to South Asia, External Affairs Minister S. Jaishankar’s recent comprehensive foreign policy addresses...",
    section4Title:
      "4. The Weaponization of Global Choke Points and Economic Resilience",
    section4Text:
      "What unifies these disparate theaters—from West Asia's maritime shipping lanes to Himalayan frontier demarcations...",
    conclusionTitle:
      "Conclusion: Navigating a Fragmented, Hyper-Competitive Global Order",
    conclusionText:
      "As regional conflicts grind on with no immediate diplomatic silver bullets in sight...",
  },
  "rise-of-autonomous-ai-agents-2026-business-revolution": {
    author: "Prashant Singh (AI & Future Tech Lead)",
    title:
      "From Chatbots to Autonomous Agents: How 2026 is Redefining Enterprise Automation and Workflow Intelligence",
    date: "August 23, 2026",
    readTime: "12 min read",
    intro:
      "The year 2026 marks a watershed moment in corporate technology history: the calendar year where artificial intelligence graduated permanently...",
    section1Title:
      "1. The Evolution from Passive Chatbots to Active Agentic AI",
    section1Text:
      "For years, business automation relied on rigid, rule-based software scripts or human-prompted conversational interfaces...",
    section2Title: "2. Enterprise Adoption Metrics and Industry Transformation",
    section2Text:
      "Market research underscores the sheer velocity of this transformation. Leading global analytics firms report...",
    section3Title:
      "3. Multi-Agent Systems and Cross-Departmental Collaboration",
    section3Text:
      "A defining breakthrough of 2026 is the deployment of collaborative multi-agent systems...",
    section4Title:
      "4. Security, Governance, and Human Oversight in Autonomous Workflows",
    section4Text:
      "While autonomous agents offer breathtaking speed and cost reduction, they introduce complex governance challenges...",
    conclusionTitle: "Conclusion: The Autonomous Enterprise of Tomorrow",
    conclusionText:
      "The rise of autonomous AI agents in 2026 signals the dawn of a new corporate era...",
  },
};

// Helper function to fetch post metadata & content for both generateMetadata and page component
async function fetchPostBySlug(slug) {
  let postData = null;

  try {
    await dbConnect();
    const dbPost = await Post.findOne({ slug });
    if (dbPost) {
      postData = {
        title: dbPost.title,
        author: dbPost.author || "The Peak Editorial Desk",
        date: new Date(dbPost.createdAt).toLocaleDateString(),
        category: dbPost.category || "Tech",
        content: dbPost.content,
        isMarkdown: true,
      };
    }
  } catch (error) {
    console.log("DB fetch skipped or failed...");
  }

  if (!postData && articlesData[slug]) {
    const staticArticle = articlesData[slug];
    const fullText = `
      ${staticArticle.intro}
      ${staticArticle.section1Title} ${staticArticle.section1Text}
      ${staticArticle.section2Title} ${staticArticle.section2Text}
    `;
    postData = {
      title: staticArticle.title,
      author: staticArticle.author,
      date: staticArticle.date,
      category: "Opinions",
      content: fullText,
      isStatic: true,
      staticArticle,
    };
  }

  return postData;
}

// 🚀 DYNAMIC SEO METADATA FOR GOOGLE & SOCIAL SHARING
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | The Peak Content",
      description: "The requested editorial piece could not be found.",
    };
  }

  const plainDescription = post.content
    .replace(/[#*`_]/g, "")
    .substring(0, 160);

  return {
    title: `${post.title} | The Peak Content`,
    description: plainDescription,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: plainDescription,
      type: "article",
      siteName: "The Peak Content",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: plainDescription,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // 🔍 NewsArticle JSON-LD Schema Markup
  const plainDescription = post.content
    ? post.content.replace(/[#*`_]/g, "").substring(0, 160)
    : "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: plainDescription,
    image: [
      "https://thepeakcontent.in/logo.png", // Aap yahan default banner ya post image laga sakte hain
    ],
    datePublished: post.date,
    dateModified: post.date,
    author: [
      {
        "@type": "Person",
        name: post.author || "The Peak Editorial Desk",
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "The Peak Content",
      logo: {
        "@type": "ImageObject",
        url: "https://thepeakcontent.in/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://thepeakcontent.in/posts/${slug}`,
    },
  };

  let htmlContent = "";

  if (post.isMarkdown) {
    htmlContent = marked(post.content || "");
  } else if (post.isStatic) {
    const staticArticle = post.staticArticle;
    htmlContent = `
      <p class="text-zinc-100 font-medium text-lg sm:text-xl">${staticArticle.intro}</p>
      
      <h2 class="text-xl sm:text-2xl font-bold text-red-400 pt-4">${staticArticle.section1Title}</h2>
      <p>${staticArticle.section1Text}</p>

      <h2 class="text-xl sm:text-2xl font-bold text-red-400 pt-4">${staticArticle.section2Title}</h2>
      <p>${staticArticle.section2Text}</p>

      <h2 class="text-xl sm:text-2xl font-bold text-red-400 pt-4">${staticArticle.section3Title}</h2>
      <p>${staticArticle.section3Text}</p>

      ${
        staticArticle.section4Title
          ? `
        <h2 class="text-xl sm:text-2xl font-bold text-red-400 pt-4">${staticArticle.section4Title}</h2>
        <p>${staticArticle.section4Text}</p>
      `
          : ""
      }

      <h2 class="text-xl sm:text-2xl font-bold text-red-400 pt-4">${staticArticle.conclusionTitle}</h2>
      <p>${staticArticle.conclusionText}</p>
    `;
  }

  return (
    <main className="bg-[#050507] text-zinc-50 min-h-screen py-24 px-6 selection:bg-red-600 selection:text-white">
      {/* 🚀 JSON-LD Schema Script Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-3xl mx-auto space-y-8">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-red-500 hover:text-red-400 transition-colors uppercase tracking-widest font-bold mb-4"
        >
          ← Back to Editorial Feed
        </Link>

        {/* Meta Info */}
        <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
          <span className="text-red-500 font-bold uppercase tracking-wider">
            {post.author}
          </span>
          <span>•</span>
          <span>{post.date}</span>
          <span>•</span>
          <span className="bg-red-600/10 text-red-500 border border-red-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-black text-zinc-150 tracking-tight leading-[1.1]">
          {post.title}
        </h1>

        {/* Content Rendered */}
        <article
          className="prose prose-invert max-w-none text-zinc-300 text-base sm:text-lg leading-relaxed border-t border-zinc-900 pt-8
            prose-headings:text-red-400 prose-headings:font-bold prose-headings:pt-6
            prose-a:text-red-500 prose-code:text-red-400 prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Bottom CTA */}
        <div className="pt-12 border-t border-zinc-900 flex items-center justify-between">
          <Link
            href="/"
            className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
