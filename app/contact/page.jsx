export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-950 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Page Header */}
        <div className="mb-16 border-l-4 border-red-600 pl-6">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter uppercase leading-none">
            Let's <br /> Connect
          </h1>
          <p className="mt-6 text-zinc-500 text-lg max-w-lg">
            Have a lead, a story, or a partnership proposal? Our editorial desk
            is open 24/7.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="space-y-12">
          {/* Email Section */}
          <div className="group">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600 block mb-2">
              Editorial Desk
            </span>
            <a
              href="mailto:editor@thepeakcontent.com"
              className="text-2xl md:text-4xl font-semibold hover:text-red-600 transition-colors"
            >
              editor@thepeakcontent.com
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-12 border-t border-zinc-100 pt-12">
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4">
                Advertising
              </h3>
              <p className="text-zinc-600">
                For sponsored content and brand partnerships, reach our
                marketing team.
              </p>
              <a
                href="mailto:ads@thepeakcontent.com"
                className="mt-2 block font-bold hover:underline"
              >
                ads@thepeakcontent.com
              </a>
            </div>

            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4">
                Office
              </h3>
              <p className="text-zinc-600">
                The Peak Content HQ, Media Complex, Bhopal, MP.
              </p>
              <p className="mt-2 text-sm text-zinc-400">
                Available Mon-Sat: 10am - 7pm IST
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
