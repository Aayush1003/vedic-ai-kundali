export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex justify-between items-center pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-3xl font-bold font-serif bg-gradient-to-r from-vedic-400 to-lunar-400 bg-clip-text text-transparent">My Dashboard</h1>
            <p className="text-slate-400 mt-1">Manage your birth charts and astrology reports.</p>
          </div>
          <button className="px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-full text-sm font-medium transition-colors">
            Profile Settings
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Create New Chart Card */}
          <div className="col-span-1 md:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-8 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-vedic-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:bg-vedic-600/20 transition-all duration-500"></div>
            <div className="z-10">
              <h2 className="text-2xl font-bold mb-2">Generate New Kundali</h2>
              <p className="text-slate-400 mb-6 max-w-md">Enter birth details to generate an accurate Vedic astrology chart with AI-powered insights.</p>
              <button className="px-6 py-3 bg-vedic-600 hover:bg-vedic-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-vedic-900/50 w-max">
                Start New Chart
              </button>
            </div>
          </div>

          {/* AI Astrologer Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col">
            <div className="w-12 h-12 bg-lunar-900/50 rounded-full flex items-center justify-center mb-4">
              <span className="text-lunar-400 text-xl">✨</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Ask AI Astrologer</h3>
            <p className="text-slate-400 text-sm mb-6 flex-grow">Get instant personalized answers based on your saved birth charts.</p>
            <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors border border-slate-700">
              Start Chat
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Saved Charts</h2>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 text-center">
            <p className="text-slate-500">You haven't saved any charts yet.</p>
            <button className="mt-4 text-vedic-400 hover:text-vedic-300 font-medium text-sm">
              Create your first chart +
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
