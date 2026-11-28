import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export function TrustLab() {
  return (
    <section id="trust-lab" className="py-16 sm:py-24 bg-white border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B1730] tracking-tight">
            The Trust Lab
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            See what we&apos;re cooking up next. Test drive our latest tools.
          </p>
        </div>

        {/* 3 Lab Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Card 1: Moatix Lens (Blue) */}
          <div className="bg-[#1877F2] rounded-2xl p-7 flex flex-col justify-between text-white shadow-xl shadow-blue-500/20 hover:shadow-2xl transition-all duration-200 min-h-[300px]">
            <div className="space-y-4">
              <h3 className="text-2xl font-black tracking-tight text-white">
                Moatix Lens
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-blue-50 font-medium">
                Got a sketchy link or ad? Don&apos;t tap, just snap. Screenshot anything suspicious and let Moatix verify it.
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/check?tab=image"
                className="w-full inline-flex items-center justify-center py-3.5 px-4 rounded-xl font-extrabold text-xs tracking-wider uppercase bg-[#E50914] hover:bg-[#CC0813] active:bg-[#B20710] text-white shadow-md hover:shadow-lg transition-colors text-center"
              >
                TRY NOW
              </Link>
            </div>
          </div>

          {/* Card 2: Scam IQ Test (Dark Green) */}
          <div className="bg-[#163829] rounded-2xl p-7 flex flex-col justify-between text-white shadow-xl shadow-emerald-950/20 hover:shadow-2xl transition-all duration-200 min-h-[300px]">
            <div className="space-y-4">
              <h3 className="text-2xl font-black tracking-tight text-white">
                Scam IQ Test
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-emerald-100 font-medium">
                Can you spot the scam? Answer the real-world test and get your personalized verdict.
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/help#scam-guide"
                className="w-full inline-flex items-center justify-center py-3.5 px-4 rounded-xl font-extrabold text-xs tracking-wider uppercase bg-[#E50914] hover:bg-[#CC0813] active:bg-[#B20710] text-white shadow-md hover:shadow-lg transition-colors text-center"
              >
                TRY NOW
              </Link>
            </div>
          </div>

          {/* Card 3: Scam University (Dark Purple / Plum) */}
          <div className="bg-[#3D1A30] rounded-2xl p-7 flex flex-col justify-between text-white shadow-xl shadow-rose-950/20 hover:shadow-2xl transition-all duration-200 min-h-[300px]">
            <div className="space-y-4">
              <h3 className="text-2xl font-black tracking-tight text-white">
                Scam University
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-rose-100 font-medium">
                Scams have evolved. Step into Scam University to work and avoid real-world snares.
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/register"
                className="w-full inline-flex items-center justify-center py-3.5 px-4 rounded-xl font-extrabold text-xs tracking-wider uppercase bg-[#E50914] hover:bg-[#CC0813] active:bg-[#B20710] text-white shadow-md hover:shadow-lg transition-colors text-center"
              >
                SIGN UP NOW
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
