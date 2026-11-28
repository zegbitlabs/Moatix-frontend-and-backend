"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, FlaskConical, Sparkles } from "lucide-react";
import { TrustLab } from "@/components/home/TrustLab";

export default function ExperimentPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-[#1D4ED8] transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <FlaskConical size={14} />
            <span>Experimental Features</span>
          </div>
        </div>
      </div>

      {/* Main Experiment Container */}
      <div className="py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 mb-4">
            <Sparkles size={14} />
            <span>ZegBit Lab Prototypes</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-3">
            Moatix Experimental Suite
          </h1>
          <p className="text-slate-600 text-base max-w-xl mx-auto">
            Test and evaluate preview security algorithms, educational modules, and threat prevention features before public release.
          </p>
        </div>

        {/* The Trust Lab section */}
        <TrustLab />
      </div>
    </div>
  );
}
