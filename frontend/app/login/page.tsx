import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-cosmic-950">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-mystic-600/15 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="z-10 w-full max-w-md p-8 bg-cosmic-900/80 backdrop-blur-xl border border-cosmic-800/60 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-serif mb-2 text-white">Welcome Back</h1>
          <p className="text-cosmic-300 text-sm">Sign in to your Vedic AI account</p>
        </div>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-cosmic-200 mb-1">Email Address</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 bg-cosmic-800/50 border border-cosmic-700/50 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none text-white transition-all"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-cosmic-200">Password</label>
              <a href="#" className="text-xs text-mystic-400 hover:text-mystic-300">Forgot password?</a>
            </div>
            <input 
              type="password" 
              className="w-full px-4 py-3 bg-cosmic-800/50 border border-cosmic-700/50 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none text-white transition-all"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full py-3 bg-gradient-premium hover:from-gold-400 hover:to-mystic-400 text-cosmic-950 rounded-lg font-medium transition-all shadow-glow-gold hover:shadow-glow-gold/50 mt-6"
          >
            Sign In
          </button>
        </form>
        
        <p className="mt-8 text-center text-sm text-cosmic-400">
          Don't have an account?{' '}
          <Link href="/signup" className="text-gold-400 hover:text-gold-300 font-medium">
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  )
}
