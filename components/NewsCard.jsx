import Image from "next/image";

export default function NewsCard({ title, category, image }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
      <Image
        src={image}
        alt={title}
        width={500}
        height={300}
        className="w-full h-56 object-cover"
      />

      <div className="p-4">
        <span className="text-red-600 font-semibold text-sm">{category}</span>

        <h3 className="mt-2 text-lg font-bold">{title}</h3>
      </div>
    </div>
  );
}
