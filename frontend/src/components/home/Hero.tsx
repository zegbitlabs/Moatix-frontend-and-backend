import React from "react";
import { ArrowRight, Info, ShieldCheck, AlertTriangle, Search, HelpCircle } from "../ui/Icons";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200 pt-12 pb-16 lg:pt-20 lg:pb-24">
      {/* Subtle structural grid background for professional cybersecurity feel */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#0B1730 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2">
              <Badge variant="info">
                Sri Lanka Public Cyber Defense
              </Badge>
              <span className="text-xs text-slate-500 font-medium">
                Moatix Check v2.0
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1730] tracking-tight leading-[1.15]">
              Think Before You Trust. <br className="hidden sm:inline" />
              <span className="text-blue-600">Check Before You Click.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Examine suspicious links, messages, phone numbers, images and files with Moatix Check. Understand potential warning signs, identify digital deceit, and make safer digital decisions.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a href="#methods">
                <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-md">
                  <span>Check Something Now</span>
                  <ArrowRight size={18} />
                </Button>
              </a>
              <a href="#how-it-works">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <span>Learn How It Works</span>
                </Button>
              </a>
            </div>

            {/* Trust points / Principles */}
            <div className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-teal-600 shrink-0" />
                <span>No automated accusations</span>
              </div>
              <div className="flex items-center gap-2">
                <Info size={18} className="text-blue-600 shrink-0" />
                <span>Transparent uncertainty</span>
              </div>
              <div className="flex items-center gap-2">
                <HelpCircle size={18} className="text-slate-600 shrink-0" />
                <span>Zero sensitive data saved</span>
              </div>
            </div>
          </div>

          {/* Right Hero Column: Authentic CSS/SVG Inspection Schematic */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative subtle border frame */}
              <div className="rounded-2xl bg-gradient-to-b from-slate-100 to-slate-200/60 p-1.5 shadow-xl border border-slate-200">
                <div className="rounded-xl bg-[#0B1730] text-white p-5 sm:p-6 space-y-4">
                  
                  {/* Top Bar of the Inspection Card */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                      <span className="text-xs font-mono font-semibold tracking-wide text-slate-300 uppercase">
                        Message Inspection Example
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-teal-400 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-800">
                      Demonstration
                    </span>
                  </div>

                  {/* Incoming Sample Content */}
                  <div className="bg-slate-900/90 rounded-lg p-3.5 border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-400">
                      <span className="font-semibold text-slate-200">Sender: &ldquo;LK-POST-ALERT&rdquo;</span>
                      <span className="text-[11px]">Today 09:41 AM</span>
                    </div>
                    <p className="text-slate-300 font-sans leading-relaxed">
                      &ldquo;Notice: Your package LK894321 is on hold due to unpaid customs fee of LKR 450. Update details within 2 hours or package will be returned:&rdquo;
                    </p>
                    <div className="font-mono text-blue-400 bg-slate-950 px-2 py-1.5 rounded border border-slate-800 break-all select-all">
                      http://srilanka-post-pay.online/trace
                    </div>
                  </div>

                  {/* Highlighted Warning Signals (Human-designed analysis breakdown) */}
                  <div className="space-y-2 pt-1">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Search size={14} className="text-blue-400" />
                      <span>Examined Signals</span>
                    </div>

                    {/* Signal 1 */}
                    <div className="flex items-start gap-2.5 bg-slate-900/60 p-2.5 rounded-md border border-slate-800 text-xs">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-[11px] shrink-0 border border-amber-500/40">
                        ?
                      </span>
                      <div className="space-y-0.5">
                        <div className="font-medium text-slate-200">Sender Masking (Header SMS)</div>
                        <div className="text-[11px] text-slate-400">
                          Unregistered sender ID not verifiable through telecommunication registry.
                        </div>
                      </div>
                    </div>

                    {/* Signal 2 */}
                    <div className="flex items-start gap-2.5 bg-slate-900/60 p-2.5 rounded-md border border-slate-800 text-xs">
                      <AlertTriangle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <div className="font-medium text-slate-200">Deceptive Web Domain</div>
                        <div className="text-[11px] text-slate-400">
                          Domain uses <code className="text-slate-300">.online</code>, whereas official postal services use <code className="text-teal-400">.gov.lk</code>.
                        </div>
                      </div>
                    </div>

                    {/* Signal 3 */}
                    <div className="flex items-start gap-2.5 bg-slate-900/60 p-2.5 rounded-md border border-slate-800 text-xs">
                      <Info size={16} className="text-blue-400 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <div className="font-medium text-slate-200">Urgency & Fee Pressure</div>
                        <div className="text-[11px] text-slate-400">
                          Artificial 2-hour deadline designed to prevent cautious verification.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Note */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Target: Sri Lanka Public</span>
                    <span className="text-slate-500">Illustration — Demonstration Only</span>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
