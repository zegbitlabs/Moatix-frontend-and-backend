import React from "react";
import { Badge } from "../ui/Badge";
import { Lock, ShieldCheck, Info } from "../ui/Icons";

export function PrivacyNotice() {
  return (
    <section id="privacy" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <Badge variant="default">Privacy & Public Trust</Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B1730] tracking-tight">
            Data Minimisation & Safe Verification Policy
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Moatix Check is engineered from the ground up with privacy-by-design. We examine digital indicators, not your personal life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: What users must NEVER submit */}
          <div className="rounded-2xl border-2 border-rose-200 bg-rose-50/40 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-100 text-rose-700">
                <Lock size={22} />
              </div>
              <h3 className="text-lg font-bold text-rose-950">
                What You Must NEVER Submit
              </h3>
            </div>
            <p className="text-sm text-rose-900/90 leading-relaxed">
              To protect your financial security and personal safety, please ensure you redact or exclude the following items before submitting any content:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-rose-900 font-medium">
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span>Active One-Time Passwords (OTPs) or 2FA codes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span>Online banking usernames, passwords, or ATM PINs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span>Complete 16-digit credit card numbers or CVV codes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span>Government National Identity Card (NIC) photocopies</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Current Frontend Demo Behaviour */}
          <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700">
                <Info size={22} />
              </div>
              <h3 className="text-lg font-bold text-blue-950">
                Current Demo Behavior
              </h3>
            </div>
            <p className="text-sm text-blue-900/90 leading-relaxed">
              During this active preview milestone (Phase 1.0), the platform adheres to strict local demonstration boundaries:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-blue-900">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Zero submission text is stored on external databases</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Uploaded images & files are handled via local browser memory only</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>No IP tracking or personal telemetry profiles are collected</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Results generated locally are clearly labelled as demonstration</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Future Backend Storage Policy */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-slate-200 text-slate-800">
                <ShieldCheck size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Future Production Architecture
              </h3>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              When live threat intelligence and Spring Boot backend connectors are deployed:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-slate-400 font-bold">•</span>
                <span>Cryptographic one-way hashing for URL matching (no raw query logs)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-400 font-bold">•</span>
                <span>Short-lived retention policies with automatic purges</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-400 font-bold">•</span>
                <span>Isolated sandbox analysis for documents (no host system execution)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-400 font-bold">•</span>
                <span>Independent audit trails under Sri Lanka cyber regulations</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}
