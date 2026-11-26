import React from "react";
import { Badge } from "../ui/Badge";
import { Search, FileCheck, ShieldCheck, AlertCircle, ArrowRight } from "../ui/Icons";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Submit Suspicious Material",
      headline: "Choose the suspicious content you want to examine.",
      description:
        "Select the appropriate input type—a suspicious URL, text message, phone number, screenshot, or document. The interface gives you field-level format feedback and reminds you to strip out private credentials.",
      icon: <Search size={22} className="text-blue-600" />,
      callout: "Zero passwords, OTPs, or private financial records should ever be uploaded.",
    },
    {
      number: "02",
      title: "Isolated Digital Examination",
      headline: "Submit your information through the appropriate checking interface.",
      description:
        "The submission is validated against strict security boundaries. URLs are never opened on your machine, documents are never executed, and indicators are cross-examined against structured scam patterns.",
      icon: <FileCheck size={22} className="text-teal-600" />,
      callout: "Safely sandboxed so your browser and operating system remain protected.",
    },
    {
      number: "03",
      title: "Understand Available Evidence",
      headline: "Review the available result, limitations and recommended safety actions.",
      description:
        "Receive clear, human-readable explanations of identified warning signs. The system highlights what is known, explicitly notes what remains unknown, and provides concrete next steps to safeguard yourself.",
      icon: <ShieldCheck size={22} className="text-indigo-600" />,
      callout: "No false sense of security: absence of evidence is never presented as safe.",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <Badge variant="info">Clear & Transparent Process</Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B1730] tracking-tight">
            How Moatix Check Works
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Simple, honest, and privacy-preserving assessment in three structured steps. Designed for non-technical users across Sri Lanka.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative flex flex-col justify-between bg-slate-50/80 rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs hover:border-slate-300 transition-all"
            >
              <div className="space-y-4">
                {/* Step number badge & icon */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-black text-blue-600">
                    {step.number}
                  </span>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                    {step.icon}
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-[#0B1730]">
                    {step.title}
                  </h3>
                  <div className="text-sm font-semibold text-blue-700">
                    {step.headline}
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Callout box at bottom */}
              <div className="mt-6 pt-4 border-t border-slate-200/80 text-xs text-slate-500 flex items-start gap-2">
                <AlertCircle size={15} className="text-slate-400 shrink-0 mt-0.5" />
                <span>{step.callout}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Uncertainty Banner (Key principle from PDF) */}
        <div className="mt-12 p-5 sm:p-6 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400"></span>
              <span>Our Guiding Architectural Principle: Transparent Uncertainty</span>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl">
              Cybersecurity threats evolve daily. If an assessment engine does not possess enough corroborated data, it reports <em>Inconclusive</em> rather than fabricating a reassuring verdict.
            </p>
          </div>
          <a href="#threat-awareness" className="shrink-0">
            <span className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 transition-colors">
              <span>Read Sri Lanka scam insights</span>
              <ArrowRight size={14} />
            </span>
          </a>
        </div>

      </div>
    </section>
  );
}
