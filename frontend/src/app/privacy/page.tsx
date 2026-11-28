import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock, ShieldCheck, EyeOff, Server, Clock } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy & Data Retention – Moatix Check',
  description: 'How Moatix minimizes data, protects user submissions, and handles cybersecurity telemetry.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-12 space-y-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition mb-3"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1730] tracking-tight">
            Privacy Policy &amp; Data Safeguards
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Last Updated: November 2026 • Moatix Cybersecurity Data Protocol
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs text-sm text-slate-700 leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1730] flex items-center gap-2">
              <EyeOff size={20} className="text-blue-600" />
              <span>1. Zero Password / Credential Collection</span>
            </h2>
            <p>
              Moatix Check never requests, stores, or logs account passwords, credit card PINs, or active OTP codes.
              If a message or screenshot submitted contains private account details, our frontend strongly advises
              redacting this information before transmission.
            </p>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-5">
            <h2 className="text-lg font-bold text-[#0B1730] flex items-center gap-2">
              <Server size={20} className="text-teal-600" />
              <span>2. How Submitted URLs and Files Are Handled</span>
            </h2>
            <p>
              Submitted links are parsed strictly as raw text to inspect domain syntactic indicators. Moatix never
              executes remote scripts or downloads browser payloads on your machine. Uploaded files (PDFs, images)
              are checked for format signatures and MIME types; they are never permanently archived or executed.
            </p>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-5">
            <h2 className="text-lg font-bold text-[#0B1730] flex items-center gap-2">
              <Clock size={20} className="text-indigo-600" />
              <span>3. Data Retention and Anonymization</span>
            </h2>
            <p>
              Check records are retained with SHA-256 cryptographic hashes and timestamps for auditing and
              threat mitigation purposes. You may contest or request removal of any check reference via
              the public Report form.
            </p>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-5">
            <h2 className="text-lg font-bold text-[#0B1730] flex items-center gap-2">
              <ShieldCheck size={20} className="text-blue-600" />
              <span>4. Assessment Scope &amp; User Caution</span>
            </h2>
            <p>
              Automated assessments evaluate suspicious domain infrastructure, lookalike strings, and heuristic risk triggers. Always exercise cautious digital decisions before sharing passwords or making financial transactions.
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 px-4 text-center text-xs text-slate-500">
        &copy; 2026 Moatix Check by ZegBit. Data Protection &amp; Privacy.
      </footer>
    </div>
  );
}
