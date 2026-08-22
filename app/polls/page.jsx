"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function PollsPage() {
  const { lang } = useLanguage();

  // Initial dummy poll data
  const [poll, setPoll] = useState({
    question:
      lang === "hi"
        ? "क्या आगामी डिजिटल मीडिया रेगुलेशन से फर्जी खबरों पर रोक लगेगी?"
        : "Will upcoming digital media regulations effectively curb fake news?",
    options: [
      {
        id: 1,
        text: lang === "hi" ? "हाँ, पूरी तरह से" : "Yes, absolutely",
        votes: 420,
      },
      {
        id: 2,
        text:
          lang === "hi"
            ? "नहीं, इससे मुश्किलें बढ़ेंगी"
            : "No, it will create hurdles",
        votes: 310,
      },
      {
        id: 3,
        text: lang === "hi" ? "कह नहीं सकते" : "Can't say for sure",
        votes: 150,
      },
    ],
    voted: false,
  });

  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);

  const handleVote = (id) => {
    if (poll.voted) return;
    const updatedOptions = poll.options.map((opt) =>
      opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt,
    );
    setPoll({ ...poll, options: updatedOptions, voted: true });
  };

  return (
    <main className="bg-[#050507] text-zinc-50 min-h-screen py-24 px-6 selection:bg-red-600 selection:text-white">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Header */}
        <div className="border-b border-zinc-900 pb-6">
          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-red-500 block mb-2">
            // {lang === "hi" ? "जनमत संग्रह" : "Public Opinion Poll"}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tighter text-zinc-100">
            {lang === "hi" ? "आज का सवाल" : "Daily Spotlight Poll"}
          </h1>
        </div>

        {/* Poll Card */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-xl rounded-2xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 mb-8 leading-snug">
            {poll.question}
          </h2>

          <div className="space-y-4">
            {poll.options.map((opt) => {
              const percentage =
                totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
              return (
                <button
                  key={opt.id}
                  disabled={poll.voted}
                  onClick={() => handleVote(opt.id)}
                  className={`w-full text-left relative overflow-hidden p-4 rounded-xl border transition-all duration-300 ${
                    poll.voted
                      ? "bg-zinc-950/60 border-zinc-800 cursor-default"
                      : "bg-zinc-900/60 border-zinc-800 hover:border-red-500/50 hover:bg-zinc-900"
                  }`}
                >
                  {/* Progress bar background when voted */}
                  {poll.voted && (
                    <div
                      className="absolute inset-0 bg-red-600/15 transition-all duration-700"
                      style={{ width: `${percentage}%` }}
                    />
                  )}

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-sm font-medium text-zinc-200">
                      {opt.text}
                    </span>
                    {poll.voted && (
                      <span className="text-xs font-mono font-bold text-red-400">
                        {percentage}% ({opt.votes})
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-500">
            <span>
              {lang === "hi"
                ? `कुल वोट: ${totalVotes}`
                : `Total Votes: ${totalVotes}`}
            </span>
            <span>
              {poll.voted
                ? lang === "hi"
                  ? "धन्यवाद, आपका वोट दर्ज हो गया है!"
                  : "Thank you for voting!"
                : lang === "hi"
                  ? "अपना विकल्प चुनें"
                  : "Select an option to vote"}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
