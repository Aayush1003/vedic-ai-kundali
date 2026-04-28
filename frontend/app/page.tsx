import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-vedic-600/20 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-lunar-600/20 blur-[120px]" />
      
      <div className="z-10 text-center max-w-4xl px-6">
        <div className="inline-flex items-center rounded-full border border-vedic-500/30 bg-vedic-900/30 px-3 py-1 text-sm font-medium text-vedic-300 backdrop-blur-xl mb-8">
          <span className="flex h-2 w-2 rounded-full bg-vedic-500 mr-2"></span>
          Vedic AI Beta is now live
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 font-serif">
          Decode Your <br/>
          <span className="bg-gradient-to-r from-vedic-400 to-lunar-400 bg-clip-text text-transparent">Cosmic Blueprint</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
          Experience the profound wisdom of Vedic Astrology powered by advanced AI. Generate highly accurate Kundalis, discover your compatibility, and chat with your personalized AI astrologer.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/dashboard" className="px-8 py-4 bg-gradient-to-r from-vedic-600 to-lunar-600 hover:from-vedic-500 hover:to-lunar-500 text-white rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-lunar-500/25 hover:-translate-y-1">
            Generate Kundali
          </Link>
          <Link href="/login" className="px-8 py-4 bg-slate-900/50 hover:bg-slate-800 border border-slate-800 text-white rounded-full font-semibold text-lg transition-all backdrop-blur-sm">
            Sign In
          </Link>
        </div>
      </div>
      
      {/* Decorative Zodiac Wheel representation */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-slate-800/50 rounded-full animate-spin-slow opacity-20 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/2 w-4 h-4 bg-vedic-500 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(183,136,112,0.5)]"></div>
        <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-lunar-500 rounded-full -translate-x-1/2 translate-y-1/2 shadow-[0_0_15px_rgba(183,135,255,0.5)]"></div>
      </div>
    </main>
  );
}
