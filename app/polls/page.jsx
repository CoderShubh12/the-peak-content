"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function PollsPage() {
  const { lang } = useLanguage();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [voted, setVoted] = useState(false);

  // API se latest poll fetch karna
  useEffect(() => {
    async function fetchPoll() {
      try {
        const res = await fetch("/api/polls");
        const json = await res.json();
        if (json.success) {
          setPoll(json.data);
          // LocalStorage check karein ki user ne pehle vote kiya hai ya nahi
          const hasVoted = localStorage.getItem(`voted_${json.data._id}`);
          if (hasVoted) setVoted(true);
        }
      } catch (error) {
        console.error("Failed to fetch poll:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPoll();
  }, []);

  // Total votes calculate karna
  const totalVotes = poll
    ? poll.options.reduce((sum, opt) => sum + opt.votes, 0)
    : 0;

  // Vote cast karne ka function
  const handleVote = async (optionId) => {
    if (voted || !poll) return;

    try {
      const res = await fetch("/api/polls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pollId: poll._id, optionId }),
      });
      const json = await res.json();

      if (json.success) {
        setPoll(json.data);
        setVoted(true);
        localStorage.setItem(`voted_${poll._id}`, "true");
      }
    } catch (error) {
      console.error("Failed to submit vote:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050507] text-zinc-400 flex items-center justify-center font-mono text-xs uppercase tracking-widest">
        Loading poll...
      </div>
    );
  }

  if (!poll) {
    return (
      <div className="min-h-screen bg-[#050507] text-zinc-400 flex items-center justify-center font-mono text-xs uppercase tracking-widest">
        No active polls available.
      </div>
    );
  }

  const questionText = lang === "hi" ? poll.questionHi : poll.questionEn;

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
            {questionText}
          </h2>

          <div className="space-y-4">
            {poll.options.map((opt) => {
              const percentage =
                totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
              const optionText = lang === "hi" ? opt.textHi : opt.textEn;

              return (
                <button
                  key={opt.id}
                  disabled={voted}
                  onClick={() => handleVote(opt.id)}
                  className={`w-full text-left relative overflow-hidden p-4 rounded-xl border transition-all duration-300 ${
                    voted
                      ? "bg-zinc-950/60 border-zinc-800 cursor-default"
                      : "bg-zinc-900/60 border-zinc-800 hover:border-red-500/50 hover:bg-zinc-900"
                  }`}
                >
                  {/* Progress bar background when voted */}
                  {voted && (
                    <div
                      className="absolute inset-0 bg-red-600/15 transition-all duration-700"
                      style={{ width: `${percentage}%` }}
                    />
                  )}

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-sm font-medium text-zinc-200">
                      {optionText}
                    </span>
                    {voted && (
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
              {voted
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
