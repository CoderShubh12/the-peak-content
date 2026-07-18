export default function Hero() {
  return (
    <section className="relative w-full bg-zinc-950 text-white py-20 overflow-hidden border-b border-zinc-800">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-red-600/10 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Left Content */}
          <div className="flex-1">
            <span className="inline-block py-1 px-3 border border-red-500/30 text-red-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 bg-red-500/5">
              Sabse Pehle, Sabse Sahi
            </span>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[0.95] mb-6">
              Khabrein jo <br />
              <span className="text-red-500">Seedha Asar Karein.</span>
            </h1>

            <p className="text-lg text-zinc-400 max-w-lg leading-relaxed mb-8">
              Desh aur duniya ki har badi news, bina kisi faltu ki baaton ke.
              Crime, Politics aur Health - bilkul aasaan bhasha mein.
            </p>

            <button className="bg-white text-zinc-950 px-8 py-4 font-black uppercase text-xs tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all duration-300">
              Aaj ki Taaza Khabrein
            </button>
          </div>

          {/* Right Side: Quick Stats/Highlights (Engagement) */}
          <div className="w-full md:w-auto grid grid-cols-2 gap-4">
            <div className="bg-zinc-900 p-6 border border-zinc-800 rounded-sm">
              <span className="text-red-500 text-3xl font-black">24/7</span>
              <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mt-2">
                Live Updates
              </p>
            </div>
            <div className="bg-zinc-900 p-6 border border-zinc-800 rounded-sm">
              <span className="text-white text-3xl font-black">100%</span>
              <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mt-2">
                Verified News
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
