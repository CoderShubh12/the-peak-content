// components/NewsCard.jsx

// Agar top par "import Image from 'next/image'" hai, toh use hata sakte hain ya rehne de sakte hain.
export default function NewsCard({ title, category, image, url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-zinc-800">
        {/* Standard <img> tag handle karega har tarah ke dynamic domains bina crash kiye */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            // Agar koi live news image broken ho, toh fall-back to a clean placeholder
            e.target.src = "https://picsum.photos/600/400?random=news";
          }}
        />
        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider">
          {category}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg leading-snug text-slate-900 dark:text-zinc-100 line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-150">
          {title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-zinc-400 mt-2 flex items-center gap-1 font-medium">
          Read More <span>&rarr;</span>
        </p>
      </div>
    </a>
  );
}
