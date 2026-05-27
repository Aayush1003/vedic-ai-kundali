export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-cosmic-950 p-8 pt-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-mystic-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gold-600/5 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        <header className="flex justify-between items-center pb-6 border-b border-cosmic-800/50">
          <div>
            <h1 className="text-3xl font-bold font-serif text-white">My Dashboard</h1>
            <p className="text-cosmic-300 mt-1 font-light">Manage your birth charts and astrology reports.</p>
          </div>
          <button className="px-6 py-2 bg-cosmic-800/40 hover:bg-cosmic-800 border border-cosmic-700/50 rounded-full text-sm font-medium transition-colors backdrop-blur-sm text-cosmic-100">
            Profile Settings
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Create New Chart Card */}
          <div className="col-span-1 md:col-span-2 bg-cosmic-900/40 border border-cosmic-800/60 rounded-2xl p-8 flex flex-col justify-center relative overflow-hidden group backdrop-blur-xl shadow-glow-mystic/5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:bg-gold-600/20 transition-all duration-700"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-mystic-600/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>
            
            <div className="z-10">
              <div className="inline-block p-2 bg-gold-500/10 rounded-lg border border-gold-500/20 mb-4">
                <span className="text-gold-400 text-xl">✨</span>
              </div>
              <h2 className="text-2xl font-bold mb-2 text-white">Generate New Kundali</h2>
              <p className="text-cosmic-300 mb-6 max-w-md font-light">Enter birth details to generate an accurate Vedic astrology chart with premium AI-powered insights.</p>
              <button className="px-6 py-3 bg-gradient-premium hover:from-gold-400 hover:to-mystic-400 text-cosmic-950 rounded-lg font-bold transition-all shadow-glow-gold hover:-translate-y-0.5 w-max">
                Start New Chart
              </button>
            </div>
          </div>

          {/* AI Astrologer Card */}
          <div className="bg-cosmic-900/40 border border-cosmic-800/60 rounded-2xl p-6 flex flex-col backdrop-blur-xl group hover:border-mystic-500/30 transition-all">
            <div className="w-12 h-12 bg-mystic-900/40 border border-mystic-500/30 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-mystic-400 text-xl">🔮</span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Ask AI Astrologer</h3>
            <p className="text-cosmic-300 text-sm mb-6 flex-grow font-light">Get instant personalized answers based on your saved birth charts.</p>
            <button className="w-full py-2.5 bg-cosmic-800/50 hover:bg-cosmic-700 rounded-lg text-sm font-medium transition-colors border border-cosmic-700/50 text-white shadow-[0_0_15px_rgba(0,0,0,0.2)]">
              Start Chat
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4 text-white">Saved Charts</h2>
          <div className="bg-cosmic-900/20 border border-cosmic-800/40 border-dashed rounded-xl p-12 text-center backdrop-blur-sm">
            <p className="text-cosmic-400 font-light">You haven't saved any charts yet.</p>
            <button className="mt-4 text-gold-400 hover:text-gold-300 font-medium text-sm transition-colors flex items-center gap-2 mx-auto">
              <span>Create your first chart</span>
              <span className="text-lg">+</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
