'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import MilanForm from '../../components/MilanForm';
import MilanResults from '../../components/MilanResults';
import { MilanResultData, submitMilanMatch, getDownloadUrl } from '../../lib/api';

export default function MilanPage() {
  const [result, setResult] = useState<MilanResultData | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (girlDetails: {
    name: string;
    dateOfBirth: string;
    time: string;
    place: string;
  }) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setDownloadUrl(null);

    try {
      const response = await submitMilanMatch(girlDetails);
      if (response.success) {
        setResult(response.data.result);
        setDownloadUrl(getDownloadUrl(response.data.downloadUrl));
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setDownloadUrl(null);
    setError(null);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-16 relative overflow-hidden">
        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none -z-10">
          <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-mystic-600/15 blur-[150px]" />
          <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-gold-600/10 blur-[150px]" />
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] rounded-full bg-cyan-600/5 blur-[120px]" />
        </div>

        {/* Header Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-6 text-center">
          <div className="inline-flex items-center rounded-full border border-mystic-500/40 bg-mystic-900/20 px-4 py-1.5 text-sm font-medium text-mystic-300 backdrop-blur-sm mb-6">
            <span className="flex h-2 w-2 rounded-full bg-mystic-500 mr-2 animate-pulse" />
            36-Point Ashtakoot Matching
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 font-serif">
            Guna{' '}
            <span className="bg-gradient-to-r from-mystic-400 via-gold-400 to-cyan-400 bg-clip-text text-transparent">
              Milan
            </span>
          </h1>
          <p className="text-cosmic-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Discover your compatibility through the ancient Vedic 8-fold matching system.
            Enter the bride&apos;s details to calculate the sacred 36-point Guna Milan score.
          </p>
        </section>

        {/* Content */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6">
          {!result ? (
            <MilanForm onSubmit={handleSubmit} loading={loading} error={error} />
          ) : (
            <MilanResults result={result} downloadUrl={downloadUrl} onReset={handleReset} />
          )}
        </section>
      </main>
    </>
  );
}
