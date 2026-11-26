import React from "react";
import { ArrowRight, ShieldCheck, Lock } from "../ui/Icons";
import { Button } from "../ui/Button";

export function FinalCta() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#0B1730] to-[#142B4D] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl border border-slate-800">
          
          {/* Subtle background decoration */}
          <div 
            className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-blue-500/10 pointer-events-none blur-3xl"
            aria-hidden="true"
          />

          <div className="relative max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold border border-blue-400/30">
              <ShieldCheck size={16} />
              <span>Moatix Check Community Protection</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
              Don&apos;t Let Digital Deceit Cost You Your Savings.
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Whenever you receive an unexpected message, an urgent link, or an unfamiliar payment request, take thirty seconds to review the warning signs.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a href="#methods">
                <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-md">
                  <span>Start Verification Now</span>
                  <ArrowRight size={18} />
                </Button>
              </a>
              <a href="#threat-awareness">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/20">
                  <span>Review Scam Red Flags</span>
                </Button>
              </a>
            </div>

            <div className="flex items-center gap-2 pt-4 text-xs text-slate-400">
              <Lock size={14} className="text-teal-400" />
              <span>100% Free Public Resource • No Registration Required • Built by ZegBit</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
