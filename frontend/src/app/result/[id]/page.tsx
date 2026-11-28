'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Shield,
  ShieldCheck,
  AlertTriangle,
  Info,
  CheckCircle2,
  ArrowLeft,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Share2,
} from 'lucide-react';

interface CheckData {
  checkId: string;
  inputType: string;
  status: string;
  demo: boolean;
  verdict: string | null;
  riskScore: number | null;
  recommendation: string;
  reasons: Array<{
    code: string;
    description: string;
    severity?: string;
  }>;
  createdAt?: string;
}

function ResultDetailContent() {
  const params = useParams();
  const checkId = params?.id as string;

  const [data, setData] = useState<CheckData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8081';

  useEffect(() => {
    if (!checkId) return;

    async function fetchResult() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${apiBase}/api/v1/checks/${encodeURIComponent(checkId)}`);
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error(`Check record "${checkId}" not found in security database.`);
          }
          throw new Error(`Server returned HTTP ${res.status}`);
        }
        const json = await res.json();
        setData(json);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Unable to retrieve check result.';
        setError(msg);
      } finally {
        setLoading(false);
      }
    }

    fetchResult();
  }, [checkId, apiBase]);

  const handleFeedback = async (category: string) => {
    if (!checkId) return;
    try {
      await fetch(`${apiBase}/api/v1/checks/${encodeURIComponent(checkId)}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          checkId,
          category,
          comment: `Feedback submitted on result page for ${checkId}`,
        }),
      });
      setFeedbackSent(true);
    } catch {
      setFeedbackSent(true);
    }
  };

  const copyShareLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/check"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition"
        >
          <ArrowLeft size={16} />
          <span>Check Another Item</span>
        </Link>

        <button
          type="button"
          onClick={copyShareLink}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition"
        >
          <Share2 size={14} />
          <span>{copied ? 'Copied Link!' : 'Share Result'}</span>
        </button>
      </div>

      {loading && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <RefreshCw size={28} className="animate-spin text-blue-600 mx-auto" />
          <div className="text-sm font-semibold text-slate-700">Loading assessment record...</div>
        </div>
      )}

      {error && (
        <div className="bg-white rounded-2xl border border-red-200 p-8 text-center space-y-4">
          <AlertTriangle size={36} className="text-red-500 mx-auto" />
          <h2 className="text-lg font-bold text-slate-900">Record Not Available</h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">{error}</p>
          <div className="pt-2">
            <Link
              href="/check"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition"
            >
              Go to Checker
            </Link>
          </div>
        </div>
      )}

      {data && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wide">
                RECORD REFERENCE ID
              </span>
              <div className="text-base font-mono font-extrabold text-[#0B1730]">{data.checkId}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-blue-100 text-blue-800 border border-blue-200 uppercase">
                TYPE: {data.inputType}
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                STATUS: {data.status}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wide text-blue-900 flex items-center gap-1.5">
              <Info size={16} className="text-blue-600" />
              <span>Security Advisory Recommendation</span>
            </div>
            <p className="text-sm text-slate-800 leading-relaxed font-medium">{data.recommendation}</p>
          </div>

          {data.reasons && data.reasons.length > 0 && (
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Identified Technical Signals
              </div>
              <div className="space-y-2">
                {data.reasons.map((r, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-start gap-2.5 text-slate-800"
                  >
                    <CheckCircle2 size={16} className="text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-mono text-slate-900">{r.code}:</strong> {r.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-3">
            <span>Is this assessment helpful or accurate?</span>
            {feedbackSent ? (
              <span className="text-teal-700 font-semibold flex items-center gap-1">
                <CheckCircle2 size={14} /> Feedback recorded!
              </span>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleFeedback('HELPFUL')}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition"
                >
                  <ThumbsUp size={13} />
                  <span>Helpful</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleFeedback('INCORRECT_RESULT')}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition"
                >
                  <ThumbsDown size={13} />
                  <span>Incorrect</span>
                </button>
                <Link
                  href={`/report?checkId=${encodeURIComponent(data.checkId)}`}
                  className="text-xs text-red-600 hover:underline font-semibold ml-2"
                >
                  Report Fraudulent Scam
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ResultDetailPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <div className="bg-[#0A1128] text-white text-xs py-2 px-4 text-center font-medium border-b border-slate-800">
        <span className="text-blue-400 font-semibold mr-1.5">Moatix Verification Intelligence:</span>
        Automated multi-vector threat assessment. Always verify sensitive requests directly with official institutions.
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-10">
        <Suspense
          fallback={
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-sm text-slate-500">
              Loading verification details...
            </div>
          }
        >
          <ResultDetailContent />
        </Suspense>
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 px-4 text-center text-xs text-slate-500">
        &copy; 2026 Moatix Check by ZegBit. Public Scam Assessment Service.
      </footer>
    </div>
  );
}
