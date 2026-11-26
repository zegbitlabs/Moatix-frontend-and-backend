"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  AlertTriangle,
  AlertCircle,
  Link2,
  RotateCcw,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  // --- State Management ---
  const [urlInput, setUrlInput] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<{
    input: string;
    timestamp: string;
  } | null>(null);

  const handleReset = () => {
    setUrlInput("");
    setCheckResult(null);
  };

  // --- Demo Check Submit Handler ---
  const handleCheckSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsChecking(true);
    setCheckResult(null);

    // Simulate 1.2 second analysis
    setTimeout(() => {
      setIsChecking(false);
      setCheckResult({
        input: urlInput || "http://srilanka-post-pay.online/track?id=LK9821",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      });
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#9DC4F8] text-[#0F172A]">
      
      {/* ========================================================= */}
      {/* HERO SECTION WITH WEB LINK CHECKER */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24">
        
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none -z-10 flex justify-center opacity-70">
          <div className="w-[680px] h-[360px] bg-gradient-to-b from-blue-600/25 via-blue-400/20 to-transparent blur-3xl rounded-full" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Title & Value Proposition */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-white text-[#1E40AF] border border-blue-400 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#1D4ED8] animate-pulse" />
              <ShieldCheck size={14} className="text-[#1D4ED8]" />
              <span>Moatix Check • Digital Safety for Sri Lanka</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A1128] tracking-tight leading-tight">
              Think Before You Trust. <br />
              <span className="text-[#1D4ED8]">
                Check Before You Click.
              </span>
            </h1>

            <p className="text-[#0F172A] font-semibold text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Examine suspicious web links with Moatix Check. Spot deceptive domains, identify phishing tricks, and make safer digital decisions before visiting unknown sites.
            </p>
          </div>

          {/* ===================================================== */}
          {/* WEB LINK CHECKER CARD */}
          {/* ===================================================== */}
          <div
            id="checker"
            className="max-w-2xl mx-auto rounded-2xl bg-white border-2 border-blue-300 shadow-2xl shadow-blue-950/20 overflow-hidden"
          >
            {/* Top Accent Gradient Bar */}
            <div className="h-1.5 bg-gradient-to-r from-[#1D4ED8] via-blue-500 to-cyan-400" />

            {/* Header */}
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
                    Instant deceptive domain & phishing scan
                  </span>
                </div>
              </div>
            </div>

            {/* Checker Form Body */}
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
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-[#1D4ED8] transition-colors">
                      <Link2 size={18} />
                    </div>
                    <input
                      id="url-input"
                      type="text"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="e.g. http://srilanka-post-pay.online or bit.ly/..."
                      className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border-2 border-slate-300 bg-white text-[#0A1128] font-medium placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#1D4ED8] focus:ring-4 focus:ring-blue-500/20 transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
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
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#1D4ED8] hover:bg-[#1E40AF] active:bg-blue-900 disabled:opacity-50 text-white text-sm font-bold rounded-lg shadow-lg shadow-blue-700/30 hover:shadow-xl transition-all cursor-pointer"
                  >
                    {isChecking ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Simulating Check...</span>
                      </>
                    ) : (
                      <>
                        <span>Check Link (Demo)</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* =================================================== */}
              {/* DEMO RESULT CARD (Appears when user clicks Check) */}
              {/* =================================================== */}
              {checkResult && (
                <div className="mt-6 pt-6 border-t border-slate-200 space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between px-4 py-2.5 rounded-xl border bg-[#0A1128] border-slate-800 text-white">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                        Demo Result Preview
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-300">
                      {checkResult.timestamp}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl border-2 border-amber-300 bg-amber-50 text-xs sm:text-sm text-amber-950 space-y-2.5">
                    <div className="font-extrabold flex items-center gap-2 text-amber-950">
                      <AlertTriangle size={18} className="text-amber-700 shrink-0" />
                      <span>Demonstration Only — Simulated Security Assessment</span>
                    </div>
                    <p className="text-xs leading-relaxed text-amber-900 font-medium">
                      This is an offline frontend preview. The submitted web link was checked for common deceptive patterns:
                    </p>
                    <div className="p-3 rounded-lg border border-amber-300 bg-white font-mono text-xs text-[#0A1128] font-bold break-all select-all shadow-xs">
                      {checkResult.input}
                    </div>
                  </div>

                  {/* Typical Warning Indicators (Educational Breakdown) */}
                  <div className="space-y-2.5 text-xs">
                    <div className="font-extrabold uppercase tracking-wider text-[11px] text-[#0A1128]">
                      Potential Warning Signs Detected:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="p-3 rounded-xl border border-slate-300 bg-white text-[#0A1128] font-semibold flex items-start gap-2.5 shadow-xs hover:border-slate-400 transition-colors">
                        <span className="p-1 rounded bg-rose-100 text-rose-700 shrink-0 mt-0.5">
                          <AlertCircle size={14} />
                        </span>
                        <span className="leading-snug">Domain ending with .online / .xyz instead of .gov.lk or .lk</span>
                      </div>
                      <div className="p-3 rounded-xl border border-slate-300 bg-white text-[#0A1128] font-semibold flex items-start gap-2.5 shadow-xs hover:border-slate-400 transition-colors">
                        <span className="p-1 rounded bg-rose-100 text-rose-700 shrink-0 mt-0.5">
                          <AlertCircle size={14} />
                        </span>
                        <span className="leading-snug">Look-alike domain name mimicking official Sri Lankan services</span>
                      </div>
                      <div className="p-3 rounded-xl border border-slate-300 bg-white text-[#0A1128] font-semibold flex items-start gap-2.5 shadow-xs hover:border-slate-400 transition-colors">
                        <span className="p-1 rounded bg-rose-100 text-rose-700 shrink-0 mt-0.5">
                          <AlertCircle size={14} />
                        </span>
                        <span className="leading-snug">Suspicious URL shortener hiding the real destination page</span>
                      </div>
                      <div className="p-3 rounded-xl border border-slate-300 bg-white text-[#0A1128] font-semibold flex items-start gap-2.5 shadow-xs hover:border-slate-400 transition-colors">
                        <span className="p-1 rounded bg-rose-100 text-rose-700 shrink-0 mt-0.5">
                          <AlertCircle size={14} />
                        </span>
                        <span className="leading-snug">Unverified website requesting bank card numbers or login credentials</span>
                      </div>
                    </div>
                  </div>

                  {/* Reset action */}
                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      onClick={() => setCheckResult(null)}
                      className="text-xs font-bold text-[#1D4ED8] hover:text-[#1E40AF] flex items-center gap-1.5 cursor-pointer hover:underline"
                    >
                      <RotateCcw size={13} />
                      <span>Dismiss Preview</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 2: HOW IT WORKS (WEB LINK CHECKING) */}
      {/* ========================================================= */}
      <section
        id="how-it-works"
        className="py-16 sm:py-20 bg-[#8BB8F5] border-t-2 border-blue-300"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-[#1E40AF] border border-blue-400 shadow-sm">
              <span>Simple & Transparent</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A1128] tracking-tight">
              How Link Checking Works
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#0F172A] font-semibold">
              A transparent, straightforward 3-step check to protect you before clicking unknown web links.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border-2 border-blue-200 shadow-xl shadow-blue-950/10 hover:shadow-2xl hover:border-blue-400 transition-all duration-200 group flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl font-mono font-black text-lg flex items-center justify-center bg-blue-100 border-2 border-blue-300 text-[#1D4ED8] group-hover:bg-[#1D4ED8] group-hover:text-white transition-all shadow-sm">
                  01
                </div>
                <h3 className="font-extrabold text-base text-[#0A1128] group-hover:text-[#1D4ED8] transition-colors">
                  1. Paste Suspicious Link
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-700 font-medium">
                  Copy the suspicious web link you received via SMS, WhatsApp, social media, or email and paste it into the checker.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border-2 border-blue-200 shadow-xl shadow-blue-950/10 hover:shadow-2xl hover:border-blue-400 transition-all duration-200 group flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl font-mono font-black text-lg flex items-center justify-center bg-blue-100 border-2 border-blue-300 text-[#1D4ED8] group-hover:bg-[#1D4ED8] group-hover:text-white transition-all shadow-sm">
                  02
                </div>
                <h3 className="font-extrabold text-base text-[#0A1128] group-hover:text-[#1D4ED8] transition-colors">
                  2. Automated Link Inspection
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-700 font-medium">
                  The link is inspected for deceptive domain names, look-alike characters, and known phishing indicators—without opening it on your device.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border-2 border-blue-200 shadow-xl shadow-blue-950/10 hover:shadow-2xl hover:border-blue-400 transition-all duration-200 group flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl font-mono font-black text-lg flex items-center justify-center bg-blue-100 border-2 border-blue-300 text-[#1D4ED8] group-hover:bg-[#1D4ED8] group-hover:text-white transition-all shadow-sm">
                  03
                </div>
                <h3 className="font-extrabold text-base text-[#0A1128] group-hover:text-[#1D4ED8] transition-colors">
                  3. Review Safety Advice
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-700 font-medium">
                  Understand potential warning signs and receive clear guidance so you know whether the web address is trustworthy before you click.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
