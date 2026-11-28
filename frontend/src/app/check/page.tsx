'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Link as LinkIcon,
  ShieldCheck,
  Search,
  RefreshCw,
  Info,
  CheckCircle2,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  ArrowLeft,
} from 'lucide-react';

interface CheckOutcome {
  checkId: string;
  inputType: string;
  status: string;
  verdict: string | null;
  riskScore: number | null;
  recommendation: string;
  reasons: Array<{ code?: string; description: string; severity?: string } | string>;
  scannedAt: string;
}

function CheckContent() {
  const searchParams = useSearchParams();
  const prefill = searchParams.get('url') || '';

  const [inputValue, setInputValue] = useState(prefill);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CheckOutcome | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8081';

  const resetForm = () => {
    setInputValue('');
    setError(null);
    setResult(null);
    setFeedbackSent(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      setError('Please paste a URL to check.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setFeedbackSent(false);

    try {
      const response = await fetch(`${apiBase}/api/v1/checks/url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: inputValue.trim(), language: 'en' }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Server returned HTTP status ${response.status}`);
      }

      const data = await response.json();
      setResult({
        checkId: data.checkId,
        inputType: data.inputType || 'URL',
        status: data.status || 'CHECKED',
        verdict: data.verdict || null,
        riskScore: data.riskScore ?? null,
        recommendation:
          data.recommendation ||
          'Always verify suspicious links directly with official institutional channels before sharing credentials or money.',
        reasons: Array.isArray(data.reasons) ? data.reasons : [],
        scannedAt: new Date().toLocaleTimeString(),
      });
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Unable to connect to the Moatix backend. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSendFeedback = async (category: string) => {
    if (!result?.checkId) return;
    try {
      await fetch(`${apiBase}/api/v1/checks/${result.checkId}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          checkId: result.checkId,
          category,
          comment: `Feedback submitted for check ${result.checkId}`,
        }),
      });
    } finally {
      setFeedbackSent(true);
    }
  };

  const verdictStyle =
    result?.verdict === 'SAFE'
      ? 'text-emerald-700 bg-emerald-50 border-emerald-300'
      : result?.verdict === 'SUSPICIOUS'
      ? 'text-amber-700 bg-amber-50 border-amber-300'
      : result?.verdict === 'SCAM' || result?.verdict === 'DANGEROUS'
      ? 'text-red-700 bg-red-50 border-red-300'
      : 'text-blue-700 bg-blue-50 border-blue-300';

  const verdictIcon =
    result?.verdict === 'SAFE' ? (
      <CheckCircle2 size={20} className="text-emerald-600" />
    ) : result?.verdict === 'SUSPICIOUS' ? (
      <AlertTriangle size={20} className="text-amber-600" />
    ) : result?.verdict === 'SCAM' || result?.verdict === 'DANGEROUS' ? (
      <AlertTriangle size={20} className="text-red-600" />
    ) : (
      <Info size={20} className="text-blue-600" />
    );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Banner */}
      <div className="bg-[#0A1128] text-white text-xs py-2 px-4 text-center font-medium">
        <span className="text-blue-400 font-semibold mr-1.5">Moatix Cyber Defence:</span>
        National Scam Assessment &amp; Threat Verification Network · Sri Lanka
      </div>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-10 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-2">
              <ShieldCheck size={14} className="text-blue-600" />
              <span>Web Link Scam Check</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1730] tracking-tight">
              Scam Assessment Portal
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Paste any suspicious web link to get an instant safety assessment.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 px-3 py-2 rounded-lg transition"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>
        </div>

        {/* URL Checker Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Gradient top bar */}
          <div className="h-1 bg-gradient-to-r from-[#1D4ED8] via-blue-500 to-cyan-400" />

          <div className="p-6 sm:p-8 space-y-6">
            {/* Card label */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-blue-100 text-[#1D4ED8] border border-blue-200">
                <LinkIcon size={18} />
              </div>
              <div>
                <div className="font-extrabold text-sm text-slate-900">Suspicious Website URL or Hyperlink</div>
                <div className="text-xs text-slate-500">Paste the full link you want to verify</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="https://example-bank-verification.com/login"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition"
                  disabled={loading}
                />

                {/* Quick test samples */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold">Try a sample:</span>
                  <button
                    type="button"
                    onClick={() => setInputValue('https://commercial-bank-ebank-login.xyz/verify')}
                    className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-blue-700 font-mono text-[11px]"
                  >
                    Phishing Bank Link
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputValue('https://zegbit.org')}
                    className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-teal-700 font-mono text-[11px]"
                  >
                    Official ZegBit Link
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
                  <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Action row */}
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-bold text-sm flex items-center gap-2 shadow-sm transition disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Search size={16} />
                      <span>Run Scam Check</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* ===================================================== */}
            {/* RESULTS */}
            {/* ===================================================== */}
            {result && (
              <div className="mt-6 pt-6 border-t border-slate-200 space-y-5 animate-in fade-in">
                {/* Check ID header */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-mono font-semibold text-slate-500 uppercase">Check Record ID</div>
                    <div className="text-sm font-mono font-bold text-[#0B1730]">{result.checkId}</div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-100 text-blue-800 border border-blue-200 uppercase">
                      {result.inputType}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {result.status}
                    </span>
                  </div>
                </div>

                {/* Verdict */}
                {result.verdict && (
                  <div className={`flex items-center gap-3 p-4 rounded-xl border-2 font-bold text-sm ${verdictStyle}`}>
                    {verdictIcon}
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-0.5">
                        Assessment Verdict
                      </div>
                      <div className="text-base font-extrabold">
                        {result.verdict}
                        {result.riskScore !== null && (
                          <span className="ml-2 text-xs font-semibold opacity-80">
                            Risk Score: {result.riskScore}/100
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Recommendation */}
                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 space-y-1.5">
                  <div className="text-xs font-bold uppercase tracking-wide text-blue-900 flex items-center gap-1.5">
                    <Info size={16} className="text-blue-600" />
                    <span>Security Advisory Recommendation</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{result.recommendation}</p>
                </div>

                {/* Findings */}
                {result.reasons && result.reasons.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Technical Signal Findings
                    </div>
                    {result.reasons.map((r, i) => {
                      const desc = typeof r === 'string' ? r : r.description;
                      const code = typeof r === 'string' ? null : r.code;
                      return (
                        <div
                          key={i}
                          className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-start gap-2.5 text-slate-800"
                        >
                          <CheckCircle2 size={16} className="text-teal-600 shrink-0 mt-0.5" />
                          <div>
                            {code && <strong className="font-mono text-slate-900">{code}: </strong>}
                            {desc}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Feedback */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-3">
                  <span>Was this security assessment helpful?</span>
                  {feedbackSent ? (
                    <span className="text-teal-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 size={14} /> Thank you for your feedback!
                    </span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleSendFeedback('HELPFUL')}
                        className="flex items-center gap-1 px-3 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                      >
                        <ThumbsUp size={12} /> Helpful
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSendFeedback('INCORRECT_RESULT')}
                        className="flex items-center gap-1 px-3 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                      >
                        <ThumbsDown size={12} /> Incorrect
                      </button>
                    </div>
                  )}
                </div>

                {/* Check another */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-xs font-bold text-[#1D4ED8] hover:text-[#1E40AF] flex items-center gap-1.5 cursor-pointer hover:underline"
                  >
                    <RotateCcw size={13} />
                    <span>Check another link</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CheckPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-slate-500">Loading...</div>}>
      <CheckContent />
    </Suspense>
  );
}
