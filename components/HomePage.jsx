import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import BreakingNews from "@/components/BreakingNews";
import NewsCard from "@/components/NewsCard";

export default function HomePage({ language = "en" }) {
  const latestNews = [
    {
      title:
        language === "hi"
          ? "आंध्र प्रदेश में कोविड मामलों में बढ़ोतरी"
          : "COVID Cases Rise in Andhra Pradesh",
      category: "Health",
      image: "https://picsum.photos/600/400?1",
    },
    {
      title:
        language === "hi"
          ? "भारत ने रोमांचक मुकाबला जीता"
          : "India Wins Thrilling Cricket Match",
      category: "Sports",
      image: "https://picsum.photos/600/400?2",
    },
    {
      title:
        language === "hi"
          ? "नई टेक्नोलॉजी से बदलेगी दुनिया"
          : "New Technology Changing The World",
      category: "Technology",
      image: "https://picsum.photos/600/400?3",
    },
  ];

  const trending = [
    "Breaking: Latest National Updates",
    "Weather Alert Across India",
    "Stock Market Today",
    "Technology Updates",
  ];

  return (
    <main className="bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white">
      <Navbar />

      <BreakingNews />

      <Hero />

      {/* Trending */}

      <section className="max-w-7xl mx-auto px-5 py-10">
        <div
          className="
        bg-white 
        dark:bg-zinc-900
        rounded-3xl
        shadow-lg
        border
        border-slate-200
        dark:border-zinc-800
        p-6
        "
        >
          <h2 className="text-2xl font-bold mb-6">🔥 Trending Now</h2>

          <div className="flex gap-5 overflow-x-auto">
            {trending.map((item, index) => (
              <div
                key={index}
                className="
              min-w-[280px]
              rounded-2xl
              p-6
              text-white
              font-semibold
              bg-gradient-to-r
              from-red-600
              via-orange-500
              to-yellow-500
              hover:scale-105
              transition
              cursor-pointer
              "
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}

      <section className="max-w-7xl mx-auto px-5 py-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">
            {language === "hi" ? "ताज़ा खबरें" : "Latest News"}
          </h2>

          <button
            className="
          px-6
          py-2
          rounded-full
          bg-red-600
          text-white
          hover:bg-red-700
          transition
          "
          >
            View All
          </button>
        </div>

        <div
          className="
        grid
        md:grid-cols-2
        lg:grid-cols-3
        gap-8
        "
        >
          {latestNews.map((item, index) => (
            <NewsCard key={index} {...item} />
          ))}
        </div>
      </section>

      {/* Categories */}

      <section className="max-w-7xl mx-auto px-5 py-10">
        <h2 className="text-3xl font-bold mb-8">Categories</h2>

        <div
          className="
        grid
        grid-cols-2
        md:grid-cols-4
        gap-6
        "
        >
          {["Politics", "Crime", "Sports", "Technology"].map((cat, index) => (
            <div
              key={index}
              className="
              bg-white
              dark:bg-zinc-900
              rounded-3xl
              p-8
              text-center
              shadow-md
              border
              border-slate-200
              dark:border-zinc-800
              hover:border-red-500
              hover:-translate-y-2
              transition
              cursor-pointer
              "
            >
              <h3 className="text-xl font-bold">{cat}</h3>

              <p className="text-slate-500 mt-2">Latest Updates</p>
            </div>
          ))}
        </div>
      </section>

      {/* Video News */}

      <section className="max-w-7xl mx-auto px-5 py-10">
        <h2 className="text-3xl font-bold mb-8">🎥 Video News</h2>

        <div
          className="
        grid
        md:grid-cols-3
        gap-6
        "
        >
          {[1, 2, 3].map((v) => (
            <div
              key={v}
              className="
          h-52
          rounded-3xl
          bg-gradient-to-br
          from-zinc-900
          to-black
          flex
          items-center
          justify-center
          text-white
          text-6xl
          hover:scale-105
          transition
          "
            >
              ▶
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}

      <section className="max-w-7xl mx-auto px-5 py-12">
        <div
          className="
        rounded-3xl
        bg-gradient-to-r
        from-red-600
        via-orange-500
        to-yellow-500
        p-12
        text-white
        text-center
        shadow-xl
        "
        >
          <h2 className="text-3xl font-bold">Get Daily News Updates</h2>

          <p className="mt-3">Subscribe and never miss important news</p>

          <div className="mt-6 flex justify-center">
            <input
              placeholder="Enter email"
              className="
            px-5
            py-3
            rounded-l-xl
            text-black
            outline-none
            w-64
            "
            />

            <button
              className="
            bg-black
            px-6
            rounded-r-xl
            hover:bg-zinc-800
            "
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
