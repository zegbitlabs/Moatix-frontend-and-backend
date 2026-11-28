import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  LifeBuoy,
  PhoneCall,
  AlertOctagon,
  CheckCircle2,
  ShieldAlert,
  ExternalLink,
} from 'lucide-react';

export const metadata = {
  title: 'Emergency Scam Guidance & Help – Moatix Check',
  description: 'Emergency response steps if you clicked a suspicious link or transferred money to a scammer in Sri Lanka.',
};

export default function HelpPage() {
  const emergencyContacts = [
    {
      title: 'Sri Lanka CERT (Computer Emergency Readiness Team)',
      desc: 'National center for cyber security incident reporting.',
      contact: 'Hotline: +94 11 269 1692 / 101',
      link: 'https://cert.gov.lk',
    },
    {
      title: 'Sri Lanka Police Cyber Crime Division',
      desc: 'Investigates digital financial fraud and online extortion.',
      contact: 'Hotline: 011 230 4571 / 1938',
      link: 'https://cybercrime.police.lk',
    },
    {
      title: 'CBSL Financial Consumer Relations Department',
      desc: 'Central Bank department handling unauthorized banking transactions.',
      contact: 'Hotline: +94 11 247 7966 / 1935',
      link: 'https://cbsl.gov.lk',
    },
  ];

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
            Emergency Scam Help &amp; Guidance
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Immediate steps to take if you suspect your account, card, or phone has been compromised.
          </p>
        </div>

        {/* Immediate Action Checklist */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold">
              <AlertOctagon size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-red-950">
                Did you already click a link or enter your OTP?
              </h2>
              <p className="text-xs text-red-800">Follow these critical containment steps immediately:</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="bg-white p-4 rounded-xl border border-red-100 space-y-1 text-xs">
              <span className="font-bold text-red-900 block text-sm">Step 1: Contact Your Bank</span>
              <p className="text-slate-600">
                Call your bank&apos;s 24-hour card hotline immediately to temporarily freeze your credit/debit
                card and pause mobile banking credentials.
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-red-100 space-y-1 text-xs">
              <span className="font-bold text-red-900 block text-sm">Step 2: Change Passwords</span>
              <p className="text-slate-600">
                From a separate secure device, reset the passwords on your email and banking portals. Ensure
                2-factor authentication uses an authenticator app.
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-red-100 space-y-1 text-xs">
              <span className="font-bold text-red-900 block text-sm">Step 3: Disconnect Network</span>
              <p className="text-slate-600">
                If you downloaded or opened a suspicious APK or PDF attachment, turn off Wi-Fi and Mobile Data
                to stop unauthorized background data exfiltration.
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-red-100 space-y-1 text-xs">
              <span className="font-bold text-red-900 block text-sm">Step 4: Report to CERT</span>
              <p className="text-slate-600">
                Log an incident with Sri Lanka CERT and the Police Cyber Crime Division to create an official
                investigation reference number.
              </p>
            </div>
          </div>
        </div>

        {/* Official Emergency Contact Directory */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#0B1730]">
            Official Sri Lankan Cyber Crime Hotlines
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {emergencyContacts.map((c, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <span className="text-sm font-bold text-[#0B1730] block">{c.title}</span>
                  <p className="text-xs text-slate-600 leading-relaxed">{c.desc}</p>
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <div className="text-xs font-bold text-blue-700">{c.contact}</div>
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-slate-500 hover:text-blue-600 flex items-center gap-1 mt-1 transition"
                  >
                    <span>Official Portal</span>
                    <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back to Checker CTA */}
        <div className="text-center pt-4">
          <Link
            href="/check"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm transition"
          >
            <span>Verify Another Suspicious Link Now</span>
          </Link>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 px-4 text-center text-xs text-slate-500">
        &copy; 2026 Moatix Check by ZegBit. Public Emergency Guidance.
      </footer>
    </div>
  );
}
