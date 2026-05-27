'use client';

import { useState } from 'react';

interface MilanFormProps {
  onSubmit: (details: {
    name: string;
    dateOfBirth: string;
    time: string;
    place: string;
  }) => void;
  loading: boolean;
  error: string | null;
}

export default function MilanForm({ onSubmit, loading, error }: MilanFormProps) {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [time, setTime] = useState('');
  const [ampm, setAmpm] = useState('AM');
  const [place, setPlace] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Convert date from YYYY-MM-DD to DD/MM/YYYY
    const [year, month, day] = dob.split('-');
    const formattedDate = `${day}/${month}/${year}`;

    // Format time with AM/PM
    const formattedTime = `${time} ${ampm}`;

    onSubmit({
      name,
      dateOfBirth: formattedDate,
      time: formattedTime,
      place,
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Form Card */}
      <div className="relative rounded-3xl border border-cosmic-800/60 bg-cosmic-900/40 backdrop-blur-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        {/* Top decorative gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-premium" />

        {/* Inner glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-mystic-500/10 to-transparent pointer-events-none" />

        <div className="p-8 sm:p-10 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-500/20 to-mystic-500/20 border border-gold-500/30 flex items-center justify-center mx-auto mb-4 shadow-glow-gold/50">
              <span className="text-3xl drop-shadow-md">💍</span>
            </div>
            <h2 className="text-2xl font-bold font-serif mb-2 text-white">Bride&apos;s Details</h2>
            <p className="text-cosmic-300 text-sm font-light">
              Enter the birth details of the bride for compatibility matching
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="group">
              <label htmlFor="milan-name" className="block text-sm font-medium text-cosmic-200 mb-2">
                <span className="inline-flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-cosmic-800/80 flex items-center justify-center text-xs border border-cosmic-700/50">👤</span>
                  Full Name
                </span>
              </label>
              <input
                id="milan-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={2}
                placeholder="Enter bride's full name"
                className="w-full px-4 py-3.5 rounded-xl bg-cosmic-950/50 border border-cosmic-800 text-white placeholder-cosmic-500 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500/50 transition-all duration-300 hover:border-cosmic-600 shadow-inner"
              />
            </div>

            {/* Date of Birth Field */}
            <div className="group">
              <label htmlFor="milan-dob" className="block text-sm font-medium text-cosmic-200 mb-2">
                <span className="inline-flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-cosmic-800/80 flex items-center justify-center text-xs border border-cosmic-700/50">📅</span>
                  Date of Birth
                </span>
              </label>
              <input
                id="milan-dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
                className="w-full px-4 py-3.5 rounded-xl bg-cosmic-950/50 border border-cosmic-800 text-white placeholder-cosmic-500 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500/50 transition-all duration-300 hover:border-cosmic-600 [color-scheme:dark] shadow-inner"
              />
            </div>

            {/* Time of Birth Field */}
            <div className="group">
              <label htmlFor="milan-time" className="block text-sm font-medium text-cosmic-200 mb-2">
                <span className="inline-flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-cosmic-800/80 flex items-center justify-center text-xs border border-cosmic-700/50">🕐</span>
                  Time of Birth
                </span>
              </label>
              <div className="flex gap-3">
                <input
                  id="milan-time"
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  placeholder="e.g. 2:41"
                  pattern="[0-9]{1,2}:[0-9]{2}"
                  className="flex-1 px-4 py-3.5 rounded-xl bg-cosmic-950/50 border border-cosmic-800 text-white placeholder-cosmic-500 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500/50 transition-all duration-300 hover:border-cosmic-600 shadow-inner"
                />
                <div className="flex rounded-xl overflow-hidden border border-cosmic-800">
                  <button
                    type="button"
                    onClick={() => setAmpm('AM')}
                    className={`px-4 py-3.5 text-sm font-semibold transition-all duration-300 ${
                      ampm === 'AM'
                        ? 'bg-gold-500 text-cosmic-950 shadow-inner'
                        : 'bg-cosmic-950/50 text-cosmic-400 hover:text-white hover:bg-cosmic-800'
                    }`}
                  >
                    AM
                  </button>
                  <button
                    type="button"
                    onClick={() => setAmpm('PM')}
                    className={`px-4 py-3.5 text-sm font-semibold transition-all duration-300 ${
                      ampm === 'PM'
                        ? 'bg-gold-500 text-cosmic-950 shadow-inner'
                        : 'bg-cosmic-950/50 text-cosmic-400 hover:text-white hover:bg-cosmic-800'
                    }`}
                  >
                    PM
                  </button>
                </div>
              </div>
            </div>

            {/* Place of Birth Field */}
            <div className="group">
              <label htmlFor="milan-place" className="block text-sm font-medium text-cosmic-200 mb-2">
                <span className="inline-flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-cosmic-800/80 flex items-center justify-center text-xs border border-cosmic-700/50">📍</span>
                  Place of Birth
                </span>
              </label>
              <input
                id="milan-place"
                type="text"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                required
                minLength={2}
                placeholder="Enter city / town name"
                className="w-full px-4 py-3.5 rounded-xl bg-cosmic-950/50 border border-cosmic-800 text-white placeholder-cosmic-500 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500/50 transition-all duration-300 hover:border-cosmic-600 shadow-inner"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-xl bg-red-950/50 border border-red-500/30 text-red-300 text-sm flex items-start gap-3 backdrop-blur-sm">
                <span className="text-red-400 text-lg mt-0.5">⚠️</span>
                <div>
                  <p className="font-medium mb-1">Error</p>
                  <p className="text-red-400/80">{error}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-premium hover:from-gold-400 hover:to-mystic-400 text-cosmic-950 font-bold text-lg transition-all duration-300 shadow-glow-gold hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 relative overflow-hidden group"
            >
              {loading ? (
                <span className="inline-flex items-center gap-3 relative z-10">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Calculating Compatibility...
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 relative z-10">
                  💑 Calculate Guna Milan
                </span>
              )}
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </button>
          </form>

          {/* Info note */}
          <p className="mt-6 text-center text-xs text-cosmic-500 font-light">
            The groom&apos;s details are pre-loaded from the system. 
            This calculates all 8 Kootas of the Ashtakoot system.
          </p>
        </div>
      </div>
    </div>
  );
}
