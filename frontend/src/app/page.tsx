"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Link2,
  RotateCcw,
  Search,
  AlertTriangle,
  CheckCircle2,
  Info,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

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

export default function HomePage() {
  const [urlInput, setUrlInput] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CheckOutcome | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const apiBase =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8081";

  const handleReset = () => {
    setUrlInput("");
    setResult(null);
    setError(null);
    setFeedbackSent(false);
  };

  const handleCheckSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) {
      setError("Please paste a URL to check.");
      return;
    }
    setIsChecking(true);
    setResult(null);
    setError(null);
    setFeedbackSent(false);

    try {
      const response = await fetch(`${apiBase}/api/v1/checks/url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlInput.trim(), language: "en" }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(
          errData?.message || `Server error: HTTP ${response.status}`
        );
      }

      const data = await response.json();
      setResult({
        checkId: data.checkId,
        inputType: data.inputType || "URL",
        status: data.status || "CHECKED",
        verdict: data.verdict || null,
        riskScore: data.riskScore ?? null,
        recommendation:
          data.recommendation ||
          "Always verify suspicious links directly with official channels before sharing credentials.",
        reasons: Array.isArray(data.reasons) ? data.reasons : [],
        scannedAt: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to reach the Moatix backend. Please try again shortly."
      );
    } finally {
      setIsChecking(false);
    }
  };

  const handleFeedback = async (category: string) => {
    if (!result?.checkId) return;
    try {
      await fetch(`${apiBase}/api/v1/checks/${result.checkId}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          checkId: result.checkId,
          category,
          comment: `Feedback submitted from home page checker for check ${result.checkId}`,
        }),
      });
    } finally {
      setFeedbackSent(true);
    }
  };

  const verdictColor =
    result?.verdict === "SAFE"
      ? "text-emerald-700 bg-emerald-50 border-emerald-300"
      : result?.verdict === "SUSPICIOUS"
        ? "text-amber-700 bg-amber-50 border-amber-300"
        : result?.verdict === "SCAM" || result?.verdict === "DANGEROUS"
          ? "text-red-700 bg-red-50 border-red-300"
          : "text-blue-700 bg-blue-50 border-blue-300";

  const verdictIcon =
    result?.verdict === "SAFE" ? (
      <CheckCircle2 size={20} className="text-emerald-600" />
    ) : result?.verdict === "SUSPICIOUS" ? (
      <AlertTriangle size={20} className="text-amber-600" />
    ) : result?.verdict === "SCAM" || result?.verdict === "DANGEROUS" ? (
      <AlertTriangle size={20} className="text-red-600" />
    ) : (
      <Info size={20} className="text-blue-600" />
    );

  return (
    <div className="flex flex-col min-h-screen bg-[#9DC4F8] text-[#0F172A]">
      {/* ======================================================= */}
      {/* HERO + URL CHECKER */}
      {/* ======================================================= */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none -z-10 flex justify-center opacity-70">
          <div className="w-[680px] h-[360px] bg-gradient-to-b from-blue-600/25 via-blue-400/20 to-transparent blur-3xl rounded-full" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Headline */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-white text-[#1E40AF] border border-blue-400 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#1D4ED8] animate-pulse" />
              <ShieldCheck size={14} className="text-[#1D4ED8]" />
              <span>Moatix Check • Digital Safety for Sri Lanka</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A1128] tracking-tight leading-tight">
              Think Before You Trust.{" "}
              <span className="text-[#1D4ED8]">Check Before You Click.</span>
            </h1>

            <p className="text-[#0F172A] font-semibold text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Examine suspicious web links with Moatix Check. Spot deceptive
              domains, identify phishing tricks, and make safer digital
              decisions before visiting unknown sites.
            </p>
          </div>

          {/* ===================================================== */}
          {/* URL CHECKER CARD */}
          {/* ===================================================== */}
          <div
            id="checker"
            className="max-w-2xl mx-auto rounded-2xl bg-white border-2 border-blue-300 shadow-2xl shadow-blue-950/20 overflow-hidden"
          >
            {/* Gradient bar */}
            <div className="h-1.5 bg-gradient-to-r from-[#1D4ED8] via-blue-500 to-cyan-400" />

            {/* Card header */}
            <div className="flex items-center px-6 py-4 bg-blue-50 border-b border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-100 text-[#1D4ED8] border border-blue-300">
                  <Link2 size={18} />
                </div>
                <div>
                  <span className="font-extrabold text-sm text-[#0A1128] block">
                    Web Link (URL) Checker
                  </span>
                  <span className="text-[11px] font-semibold text-slate-700 block">
                    Instant deceptive domain &amp; phishing scan
                  </span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-6 sm:p-8 bg-white">
              <form onSubmit={handleCheckSubmit} className="space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="url-input"
                      className="block text-xs font-extrabold uppercase tracking-wider text-[#0A1128]"
                    >
                      Paste Suspicious Web Link:
                    </label>
                    <span className="text-[11px] font-semibold text-slate-600">
                      Plain text analysis only
                    </span>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#1D4ED8] transition-colors">
                      <Link2 size={18} />
                    </div>
                    <input
                      id="url-input"
                      type="text"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="e.g. http://srilanka-post-pay.online or bit.ly/..."
                      className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border-2 border-slate-300 bg-white text-[#0A1128] font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#1D4ED8] focus:ring-4 focus:ring-blue-500/20 transition-all"
                      disabled={isChecking}
                    />
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
                    <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-1">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-2.5 text-sm font-bold rounded-lg text-slate-700 hover:text-[#0A1128] hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Clear
                  </button>
                  <button
                    type="submit"
                    disabled={isChecking}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#1D4ED8] hover:bg-[#1E40AF] active:bg-blue-900 disabled:opacity-50 text-white text-sm font-bold rounded-xl shadow-sm transition-all"
                  >
                    {isChecking ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" />
                        <span>Checking...</span>
                      </>
                    ) : (
                      <>
                        <Search size={16} />
                        <span>Check Link Now</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* ============================================= */}
              {/* RESULTS */}
              {/* ============================================= */}
              {result && (
                <div className="mt-6 pt-6 border-t border-slate-200 space-y-4 animate-in fade-in">
                  {/* Verdict badge */}
                  <div
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 font-bold text-sm ${verdictColor}`}
                  >
                    {verdictIcon}
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-0.5">
                        Assessment Result
                      </div>
                      <div className="text-base font-extrabold">
                        {result.verdict || result.status}
                        {result.riskScore !== null && (
                          <span className="ml-2 text-xs font-semibold opacity-80">
                            Risk Score: {result.riskScore}/100
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wide text-blue-900 flex items-center gap-1.5">
                      <Info size={15} className="text-blue-600" />
                      <span>Security Advisory</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {result.recommendation}
                    </p>
                  </div>

                  {/* Findings */}
                  {result.reasons && result.reasons.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Detection Findings
                      </div>
                      {result.reasons.map((r, i) => {
                        const desc =
                          typeof r === "string" ? r : r.description;
                        const code =
                          typeof r === "string" ? null : r.code;
                        return (
                          <div
                            key={i}
                            className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-start gap-2.5 text-slate-800"
                          >
                            <CheckCircle2
                              size={15}
                              className="text-teal-600 shrink-0 mt-0.5"
                            />
                            <div>
                              {code && (
                                <strong className="font-mono text-slate-900">
                                  {code}:{" "}
                                </strong>
                              )}
                              {desc}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Check ID & Feedback */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                    <span className="font-mono">
                      ID: {result.checkId} · {result.scannedAt}
                    </span>
                    {feedbackSent ? (
                      <span className="text-teal-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 size={13} /> Thank you for your feedback!
                      </span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>Was this helpful?</span>
                        <button
                          type="button"
                          onClick={() => handleFeedback("HELPFUL")}
                          className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                        >
                          <ThumbsUp size={12} /> Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => handleFeedback("INCORRECT_RESULT")}
                          className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                        >
                          <ThumbsDown size={12} /> No
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Reset */}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleReset}
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
        </div>
      </section>

      {/* ======================================================= */}
      {/* HOW IT WORKS */}
      {/* ======================================================= */}
      <section
        id="how-it-works"
        className="py-16 sm:py-20 bg-[#8BB8F5] border-t-2 border-blue-300"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-[#1E40AF] border border-blue-400 shadow-sm">
              <span>Simple &amp; Transparent</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A1128] tracking-tight">
              How Link Checking Works
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#0F172A] font-semibold">
              A transparent 3-step check to protect you before clicking unknown
              web links.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                n: "01",
                title: "1. Paste Suspicious Link",
                desc: "Copy the suspicious web link you received via SMS, WhatsApp, social media, or email and paste it into the checker above.",
              },
              {
                n: "02",
                title: "2. Automated Link Inspection",
                desc: "The link is inspected for deceptive domain names, look-alike characters, and known phishing indicators — without opening it on your device.",
              },
              {
                n: "03",
                title: "3. Review Safety Advice",
                desc: "Receive a clear verdict (Safe, Suspicious, or Dangerous) with a plain-language explanation and actionable security advice.",
              },
            ].map((step) => (
              <div
                key={step.n}
                className="bg-white rounded-2xl p-6 sm:p-7 border-2 border-blue-200 shadow-xl shadow-blue-950/10 hover:shadow-2xl hover:border-blue-400 transition-all duration-200 group"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl font-mono font-black text-lg flex items-center justify-center bg-blue-100 border-2 border-blue-300 text-[#1D4ED8] group-hover:bg-[#1D4ED8] group-hover:text-white transition-all shadow-sm">
                    {step.n}
                  </div>
                  <h3 className="font-extrabold text-base text-[#0A1128] group-hover:text-[#1D4ED8] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-700 font-medium">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================= */}
      {/* SAFETY TIPS */}
      {/* ======================================================= */}
      <section className="py-14 sm:py-18 bg-[#9DC4F8] border-t-2 border-blue-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A1128]">
              Stay Safe Online
            </h2>
            <p className="text-sm text-slate-700 font-semibold">
              Common signs of a phishing or scam web link
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: "🔗",
                tip: "Misspelled domains",
                detail: "e.g. bank0fceylon.com instead of bankofceylon.com",
              },
              {
                icon: "🔒",
                tip: "No HTTPS or padlock",
                detail: "Legitimate sites always use HTTPS for login pages",
              },
              {
                icon: "⚡",
                tip: "Urgency pressure",
                detail: 'Messages saying "Act now!" or "Your account is suspended"',
              },
              {
                icon: "🌐",
                tip: "Unusual domains",
                detail: "Free subdomains like .xyz, .cc, .tk used for phishing",
              },
            ].map((item) => (
              <div
                key={item.tip}
                className="bg-white rounded-xl p-5 border border-blue-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-bold text-sm text-[#0A1128] mb-1">
                  {item.tip}
                </div>
                <div className="text-xs text-slate-600">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================= */}
      {/* FOOTER */}
      {/* ======================================================= */}
      <footer className="bg-[#0A1128] text-slate-400 py-8 px-4 text-center text-xs">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2 text-white font-bold text-sm">
            <ShieldCheck size={18} className="text-blue-400" />
            <span>
              Moatix<span className="text-[#60A5FA]">Check</span>
            </span>
          </div>
          <p className="text-slate-500">
            Sri Lanka Public Cyber Defence Platform · Scam Assessment &amp;
            Digital Verification
          </p>
          <p className="text-slate-600">
            © {new Date().getFullYear()} ZegBit. All rights reserved. · This
            tool provides advisory assessments only and does not constitute
            legal or law enforcement advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
