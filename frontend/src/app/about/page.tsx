import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, Users, Building2, Lock, Code2, Globe } from 'lucide-react';

export const metadata = {
  title: 'About Moatix – ZegBit Digital Fraud Defense',
  description: 'Learn about the Moatix project, the ZegBit engineering team, and our mission to defend Sri Lanka.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-12 space-y-10">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition mb-3"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1730] tracking-tight">
            About Moatix Check
          </h1>
          <p className="text-slate-600 text-base mt-2 leading-relaxed">
            A public cybersecurity initiative developed by ZegBit to protect Sri Lankan citizens from digital
            financial scams, social engineering, and fraudulent websites.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <h2 className="text-xl font-bold text-[#0B1730]">Our Core Mission</h2>
          <p className="text-slate-700 text-sm leading-relaxed">
            In recent years, digital scams targeting Sri Lankan mobile users have grown dramatically. Deceptive
            SMS campaigns mimicking <strong>Sri Lanka Post</strong> parcel deliveries, fraudulent bank OTP requests,
            and fake CEB bill disconnection notices cause severe financial loss daily. Moatix Check was engineered
            to give regular users an easy, accessible first line of defense before they tap, enter passwords, or send money.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <Globe size={20} />
            </div>
            <h3 className="text-base font-bold text-[#0B1730]">Local Context</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tuned specifically to recognize regional Sri Lankan telecom prefixes (+94), local bank formats,
              and colloquial scam phrasing.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
              <Lock size={20} />
            </div>
            <h3 className="text-base font-bold text-[#0B1730]">Privacy by Design</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We never store raw user passwords, active OTP tokens, or personal identifiers in permanent plain text.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Code2 size={20} />
            </div>
            <h3 className="text-base font-bold text-[#0B1730]">5-Member Architecture</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Built on a decoupled Spring Boot 3.4 REST layer, Next.js 16 frontend, and modular detector adapters.
            </p>
          </div>
        </div>

        <div className="bg-slate-100 rounded-xl p-6 text-center space-y-3">
          <h3 className="text-base font-bold text-slate-800">Ready to test something suspicious?</h3>
          <Link
            href="/check"
            className="inline-block px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition"
          >
            Open Scam Assessment Portal →
          </Link>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 px-4 text-center text-xs text-slate-500">
        &copy; 2026 Moatix Check by ZegBit. All rights reserved.
      </footer>
    </div>
  );
}
