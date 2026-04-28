import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-slate-950">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-vedic-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="z-10 w-full max-w-md p-8 bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-serif mb-2 text-white">Welcome Back</h1>
          <p className="text-slate-400 text-sm">Sign in to your Vedic AI account</p>
        </div>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg focus:ring-2 focus:ring-vedic-500 focus:border-vedic-500 outline-none text-white transition-all"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-slate-300">Password</label>
              <a href="#" className="text-xs text-vedic-400 hover:text-vedic-300">Forgot password?</a>
            </div>
            <input 
              type="password" 
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg focus:ring-2 focus:ring-vedic-500 focus:border-vedic-500 outline-none text-white transition-all"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full py-3 bg-gradient-to-r from-vedic-600 to-lunar-600 hover:from-vedic-500 hover:to-lunar-500 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-vedic-500/25 mt-6"
          >
            Sign In
          </button>
        </form>
        
        <p className="mt-8 text-center text-sm text-slate-400">
          Don't have an account?{' '}
          <Link href="/signup" className="text-vedic-400 hover:text-vedic-300 font-medium">
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  )
}
