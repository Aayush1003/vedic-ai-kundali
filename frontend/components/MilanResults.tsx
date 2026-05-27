'use client';

import { MilanResultData } from '../lib/api';

interface MilanResultsProps {
  result: MilanResultData;
  downloadUrl: string | null;
  onReset: () => void;
}

// Icon map for each Guna
const GUNA_ICONS: Record<string, string> = {
  Varna: '🕉️',
  Vashya: '🧲',
  Tara: '⭐',
  Yoni: '🐾',
  'Graha Maitri': '🪐',
  Gana: '🌀',
  Bhakoot: '🌙',
  Nadi: '💉',
};

function ScoreRing({ score, max, color }: { score: number; max: number; color: string }) {
  const pct = (score / max) * 100;
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <div className="relative w-40 h-40 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        {/* Background ring */}
        <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="8" className="text-cosmic-700" />
        {/* Score ring */}
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-[2000ms] ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-extrabold font-serif" style={{ color }}>
          {score}
        </span>
        <span className="text-cosmic-400 text-sm font-medium">/ {max}</span>
      </div>
    </div>
  );
}

function GunaBar({ name, obtained, max }: { name: string; obtained: number; max: number }) {
  const pct = (obtained / max) * 100;
  const icon = GUNA_ICONS[name] || '✨';

  let barColor = 'from-red-500 to-red-600';
  if (pct >= 80) barColor = 'from-emerald-400 to-emerald-600';
  else if (pct >= 50) barColor = 'from-amber-400 to-amber-600';
  else if (pct >= 30) barColor = 'from-orange-400 to-orange-600';

  return (
    <div className="group relative p-4 rounded-2xl bg-cosmic-900/30 border border-cosmic-800/60 hover:border-gold-500/30 transition-all duration-300 hover:bg-cosmic-800/50 hover:shadow-glow-gold/10">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className="text-lg drop-shadow-md">{icon}</span>
          <span className="font-semibold text-sm text-cosmic-200">{name}</span>
        </div>
        <span className="text-sm font-bold text-white">
          {obtained}<span className="text-cosmic-500 font-normal">/{max}</span>
        </span>
      </div>
      <div className="w-full h-2.5 bg-cosmic-950/50 rounded-full overflow-hidden shadow-inner">
        <div
          className={`h-full bg-gradient-to-r ${barColor} rounded-full transition-all duration-[1500ms] ease-out shadow-[0_0_10px_currentColor]`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function MilanResults({ result, downloadUrl, onReset }: MilanResultsProps) {
  const { totalScore, maxScore, percentage, verdict, verdictColor, gunaScores, boyDetails, girlDetails, aiAnalysis } = result;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* ─── Main Score Card ─── */}
      <div className="relative rounded-3xl border border-cosmic-800/60 bg-cosmic-900/40 backdrop-blur-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-premium" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-mystic-500/10 to-transparent" />
        </div>

        <div className="p-8 sm:p-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Boy Details */}
            <div className="text-center md:text-right space-y-2 order-2 md:order-1">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center mx-auto md:ml-auto md:mr-0 text-2xl mb-3 shadow-glow-cyan/30">
                🤵
              </div>
              <h3 className="font-bold text-lg text-white">{boyDetails.name}</h3>
              <div className="space-y-1 text-sm text-cosmic-400">
                <p>Nakshatra: <span className="text-cosmic-200 font-medium">{boyDetails.nakshatra}</span></p>
                <p>Rashi: <span className="text-cosmic-200 font-medium">{boyDetails.rashi}</span></p>
              </div>
            </div>

            {/* Score Ring */}
            <div className="text-center order-1 md:order-2">
              <ScoreRing score={totalScore} max={maxScore} color={verdictColor} />
              <div className="mt-4">
                <p className="text-xl font-bold drop-shadow-md" style={{ color: verdictColor, textShadow: `0 0 10px ${verdictColor}40` }}>
                  {verdict}
                </p>
                <p className="text-cosmic-400 text-sm mt-1">{percentage}% Compatibility</p>
              </div>
            </div>

            {/* Girl Details */}
            <div className="text-center md:text-left space-y-2 order-3">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-mystic-500/20 to-fuchsia-500/20 border border-mystic-500/30 flex items-center justify-center mx-auto md:mr-auto md:ml-0 text-2xl mb-3 shadow-glow-mystic/30">
                👰
              </div>
              <h3 className="font-bold text-lg text-white">{girlDetails.name}</h3>
              <div className="space-y-1 text-sm text-cosmic-400">
                <p>Nakshatra: <span className="text-cosmic-200 font-medium">{girlDetails.nakshatra}</span></p>
                <p>Rashi: <span className="text-cosmic-200 font-medium">{girlDetails.rashi}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Guna Breakdown Grid ─── */}
      <div className="rounded-3xl border border-cosmic-800/60 bg-cosmic-900/40 backdrop-blur-xl overflow-hidden shadow-2xl">
        <div className="p-6 sm:p-8 border-b border-cosmic-800/60">
          <h2 className="text-xl font-bold font-serif flex items-center gap-2 text-white">
            <span>📊</span> Ashtakoot Guna Breakdown
          </h2>
          <p className="text-cosmic-400 text-sm mt-1">Detailed scores across all 8 matching parameters</p>
        </div>
        <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {gunaScores.map((guna) => (
            <GunaBar key={guna.name} name={guna.name} obtained={guna.obtainedPoints} max={guna.maxPoints} />
          ))}
        </div>
      </div>

      {/* ─── Detailed Guna Analysis Table ─── */}
      <div className="rounded-3xl border border-cosmic-800/60 bg-cosmic-900/40 backdrop-blur-xl overflow-hidden shadow-2xl">
        <div className="p-6 sm:p-8 border-b border-cosmic-800/60">
          <h2 className="text-xl font-bold font-serif flex items-center gap-2 text-white">
            <span>🔍</span> Detailed Analysis
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cosmic-800/60 text-left bg-cosmic-950/40">
                <th className="px-6 py-4 font-semibold text-cosmic-200">Guna</th>
                <th className="px-6 py-4 font-semibold text-cosmic-200">Score</th>
                <th className="px-6 py-4 font-semibold text-cosmic-200">Groom</th>
                <th className="px-6 py-4 font-semibold text-cosmic-200">Bride</th>
                <th className="px-6 py-4 font-semibold text-cosmic-200 hidden lg:table-cell">Interpretation</th>
              </tr>
            </thead>
            <tbody>
              {gunaScores.map((guna, i) => (
                <tr key={guna.name} className={`border-b border-cosmic-800/40 ${i % 2 === 0 ? 'bg-cosmic-800/20' : ''} hover:bg-cosmic-800/40 transition-colors`}>
                  <td className="px-6 py-4 font-medium text-white">
                    <span className="mr-2 drop-shadow-sm">{GUNA_ICONS[guna.name] || '✨'}</span>
                    {guna.name}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-bold ${guna.obtainedPoints === guna.maxPoints ? 'text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]' : guna.obtainedPoints === 0 ? 'text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.5)]' : 'text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]'}`}>
                      {guna.obtainedPoints}
                    </span>
                    <span className="text-cosmic-500">/{guna.maxPoints}</span>
                  </td>
                  <td className="px-6 py-4 text-cosmic-300">{guna.boyAttribute}</td>
                  <td className="px-6 py-4 text-cosmic-300">{guna.girlAttribute}</td>
                  <td className="px-6 py-4 text-cosmic-400 text-xs leading-relaxed hidden lg:table-cell max-w-xs">{guna.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── AI Analysis Section ─── */}
      {aiAnalysis && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strengths */}
          <div className="rounded-3xl border border-cyan-500/20 bg-cyan-900/10 backdrop-blur-xl overflow-hidden shadow-glow-cyan/5">
            <div className="p-6 border-b border-cyan-500/10 bg-cyan-900/10">
              <h3 className="text-lg font-bold flex items-center gap-2 text-cyan-300 drop-shadow-[0_0_5px_rgba(103,232,249,0.3)]">
                <span>💪</span> Strengths
              </h3>
            </div>
            <div className="p-6 space-y-3">
              {aiAnalysis.strengths.map((s, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <span className="text-cyan-400 mt-0.5 shrink-0">✦</span>
                  <p className="text-cosmic-200 leading-relaxed font-light">{s}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Challenges */}
          <div className="rounded-3xl border border-amber-500/20 bg-amber-900/10 backdrop-blur-xl overflow-hidden shadow-glow-gold/5">
            <div className="p-6 border-b border-amber-500/10 bg-amber-900/10">
              <h3 className="text-lg font-bold flex items-center gap-2 text-amber-300 drop-shadow-[0_0_5px_rgba(253,230,138,0.3)]">
                <span>⚡</span> Challenges
              </h3>
            </div>
            <div className="p-6 space-y-3">
              {aiAnalysis.challenges.map((c, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <span className="text-amber-400 mt-0.5 shrink-0">⚠</span>
                  <p className="text-cosmic-200 leading-relaxed font-light">{c}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Remedies */}
          <div className="rounded-3xl border border-mystic-500/20 bg-mystic-900/10 backdrop-blur-xl overflow-hidden shadow-glow-mystic/5">
            <div className="p-6 border-b border-mystic-500/10 bg-mystic-900/10">
              <h3 className="text-lg font-bold flex items-center gap-2 text-mystic-300 drop-shadow-[0_0_5px_rgba(240,171,252,0.3)]">
                <span>🙏</span> Vedic Remedies
              </h3>
            </div>
            <div className="p-6 space-y-3">
              {aiAnalysis.remedies.map((r, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <span className="text-mystic-400 mt-0.5 shrink-0">◆</span>
                  <p className="text-cosmic-200 leading-relaxed font-light">{r}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Prediction */}
          <div className="rounded-3xl border border-gold-500/20 bg-gold-900/10 backdrop-blur-xl overflow-hidden shadow-glow-gold/10">
            <div className="p-6 border-b border-gold-500/10 bg-gold-900/10">
              <h3 className="text-lg font-bold flex items-center gap-2 text-gold-300 drop-shadow-[0_0_5px_rgba(252,211,77,0.3)]">
                <span>🔮</span> Life Prediction
              </h3>
            </div>
            <div className="p-6">
              <p className="text-cosmic-200 text-sm leading-relaxed font-light">{aiAnalysis.prediction}</p>
            </div>
          </div>
        </div>
      )}

      {/* ─── Summary Section ─── */}
      <div className="rounded-3xl border border-cosmic-800/60 bg-cosmic-900/40 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
        <h3 className="text-lg font-bold font-serif flex items-center gap-2 mb-4 text-white">
          <span>📝</span> Summary
        </h3>
        <p className="text-cosmic-300 leading-relaxed font-light">{result.summary}</p>
      </div>

      {/* ─── Action Buttons ─── */}
      <div className="flex flex-col sm:flex-row gap-5 justify-center items-center pb-8">
        {downloadUrl && (
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-xl bg-gradient-premium hover:from-gold-400 hover:to-mystic-400 text-cosmic-950 font-bold transition-all shadow-glow-gold hover:-translate-y-1 flex items-center gap-2 overflow-hidden group relative"
          >
            <span className="relative z-10 flex items-center gap-2">
              📥 Download Detailed Report
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </a>
        )}
        <button
          onClick={onReset}
          className="px-8 py-4 rounded-xl bg-cosmic-800/60 hover:bg-cosmic-800 border border-cosmic-700/50 text-white font-bold transition-all hover:-translate-y-0.5 flex items-center gap-2 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
        >
          🔄 Check Another Match
        </button>
      </div>
    </div>
  );
}
