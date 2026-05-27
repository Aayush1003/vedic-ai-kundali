import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center bg-cosmic-950">
        {/* Background Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-mystic-600/25 blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gold-600/15 blur-[150px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full bg-cyan-500/10 blur-[100px]" />
        
        <div className="z-10 text-center max-w-5xl px-6 pt-20">
          {/* Beta Badge */}
          <div className="inline-flex items-center rounded-full border border-gold-500/40 bg-gold-900/20 px-4 py-2 text-sm font-semibold text-gold-300 backdrop-blur-xl mb-8 shadow-glow-gold/30 hover:border-gold-500/60 transition-all">
            <span className="flex h-2.5 w-2.5 rounded-full bg-gold-400 mr-2.5 animate-pulse"></span>
            ✨ Vedic AI Beta is now live
          </div>
          
          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 font-serif text-white leading-tight">
            Decode Your <br/>
            <span className="bg-gradient-to-r from-gold-400 via-mystic-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">Cosmic Blueprint</span>
          </h1>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-cosmic-200 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
            Experience the profound wisdom of Vedic Astrology powered by advanced AI. Generate highly accurate Kundalis, discover your compatibility, and chat with your personalized AI astrologer.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link href="/dashboard" className="relative px-10 py-4 bg-gradient-premium hover:from-gold-400 hover:to-mystic-400 text-cosmic-950 rounded-full font-bold text-lg transition-all shadow-glow-gold hover:shadow-glow-gold/50 hover:-translate-y-1 overflow-hidden group">
              <span className="relative z-10 flex items-center gap-2">
                <span>✨ Generate Kundali</span>
              </span>
              <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </Link>
            <Link href="/login" className="px-10 py-4 bg-cosmic-800/50 hover:bg-cosmic-700/70 border border-cosmic-700/60 text-white rounded-full font-semibold text-lg transition-all backdrop-blur-md shadow-[0_0_20px_rgba(217,70,215,0.2)] hover:shadow-[0_0_30px_rgba(217,70,215,0.3)]">
              Sign In →
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-cosmic-900/30 border border-cosmic-800/40 rounded-2xl p-6 backdrop-blur-sm hover:border-mystic-500/30 transition-all hover:bg-cosmic-900/50">
              <div className="text-4xl mb-3">🌙</div>
              <h3 className="text-lg font-bold text-white mb-2">Kundali Charts</h3>
              <p className="text-cosmic-300 text-sm font-light">Accurate D1 & D9 charts with planetary positions</p>
            </div>
            
            <div className="bg-cosmic-900/30 border border-cosmic-800/40 rounded-2xl p-6 backdrop-blur-sm hover:border-gold-500/30 transition-all hover:bg-cosmic-900/50">
              <div className="text-4xl mb-3">💑</div>
              <h3 className="text-lg font-bold text-white mb-2">Guna Milan</h3>
              <p className="text-cosmic-300 text-sm font-light">36-guna compatibility matching for relationships</p>
            </div>
            
            <div className="bg-cosmic-900/30 border border-cosmic-800/40 rounded-2xl p-6 backdrop-blur-sm hover:border-cyan-400/30 transition-all hover:bg-cosmic-900/50">
              <div className="text-4xl mb-3">🔮</div>
              <h3 className="text-lg font-bold text-white mb-2">AI Astrologer</h3>
              <p className="text-cosmic-300 text-sm font-light">Chat with AI for personalized astrological insights</p>
            </div>
          </div>
        </div>
        
        {/* Decorative Zodiac Wheel representation */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-cosmic-800/30 rounded-full animate-spin-slow opacity-20 pointer-events-none -z-10 shadow-[inset_0_0_100px_rgba(27,38,51,0.3)]">
          <div className="absolute top-0 left-1/2 w-4 h-4 bg-gold-400 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-glow-gold"></div>
          <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-mystic-400 rounded-full -translate-x-1/2 translate-y-1/2 shadow-glow-mystic"></div>
          <div className="absolute left-0 top-1/2 w-3 h-3 bg-cyan-400 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-glow-cyan opacity-50"></div>
          <div className="absolute right-0 top-1/2 w-3 h-3 bg-cyan-400 rounded-full translate-x-1/2 -translate-y-1/2 shadow-glow-cyan opacity-50"></div>
        </div>
        
        {/* Inner subtle wheel */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-cosmic-800/20 rounded-full animate-spin-slow opacity-15 pointer-events-none -z-10" style={{ animationDirection: 'reverse', animationDuration: '20s' }}></div>
      </main>
    </>
  );
}
