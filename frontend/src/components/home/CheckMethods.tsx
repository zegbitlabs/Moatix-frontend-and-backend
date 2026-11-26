"use client";

import React, { useState } from "react";
import {
  LinkIcon,
  MessageSquare,
  Phone,
  ImageIcon,
  FileText,
  ArrowRight,
  ShieldAlert,
  Info,
  CheckCircle2,
} from "../ui/Icons";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

interface Method {
  id: "url" | "message" | "image" | "phone" | "file";
  title: string;
  badge: string;
  icon: React.ReactNode;
  summary: string;
  checksFor: string[];
  safeGuidelines: string;
  inputHint: string;
  colorScheme: "blue" | "teal" | "amber" | "indigo" | "navy";
}

export function CheckMethods() {
  const [selectedMethod, setSelectedMethod] = useState<Method["id"]>("url");

  const methods: Method[] = [
    {
      id: "url",
      title: "Suspicious Website / Link",
      badge: "Phishing & Fake Portals",
      icon: <LinkIcon size={24} className="text-blue-600" />,
      summary:
        "Check web addresses sent via SMS, WhatsApp, or email before visiting. Spot look-alike banking portals, suspicious domains, and disguised redirection tricks.",
      checksFor: [
        "Domain typo-squatting (e.g., com-bank.xyz instead of combank.net)",
        "Missing official government or banking TLD (.gov.lk / .lk)",
        "Obfuscated subdomains and recent unindexed domain registrations",
        "Known phishing patterns targeting Sri Lankan financial services",
      ],
      safeGuidelines:
        "Moatix never opens or executes suspicious links on your device. Links are parsed safely as raw text only.",
      inputHint: "Enter full URL starting with https:// or http://",
      colorScheme: "blue",
    },
    {
      id: "message",
      title: "Suspicious Text / Message",
      badge: "SMS & WhatsApp Deceit",
      icon: <MessageSquare size={24} className="text-teal-600" />,
      summary:
        "Paste the wording of messages claiming bank account freezes, courier fees, lottery winnings, or emergency family assistance.",
      checksFor: [
        "Impersonation of institutions (Sri Lanka Post, CEB, Central Bank, local commercial banks)",
        "Urgency triggers (threat of immediate account closure, legal action, 1-hour deadlines)",
        "Requests to share OTP codes or approve unrequested login tokens",
        "Unsolicited job offers and task-earning group invites",
      ],
      safeGuidelines:
        "Remove any personal names, account numbers, or OTP codes before submitting. Never share an active one-time password.",
      inputHint: "Paste full message text. Multilingual support for English, Sinhala, and Tamil context.",
      colorScheme: "teal",
    },
    {
      id: "phone",
      title: "Phone Number Verification",
      badge: "Sri Lanka (+94) & Intl",
      icon: <Phone size={24} className="text-indigo-600" />,
      summary:
        "Evaluate caller numbers, WhatsApp contact numbers, or SMS sender origins against format conventions and reported impersonation trends.",
      checksFor: [
        "Sri Lankan mobile network ranges (070, 071, 072, 074, 075, 076, 077, 078)",
        "Landline area codes vs purported location (e.g., 011 Colombo, 081 Kandy)",
        "International virtual and VoIP prefixes frequently used in automated cold-call fraud",
        "Caller ID spoofing awareness and known reporting records",
      ],
      safeGuidelines:
        "A valid phone number format is not proof of good intent. Moatix never identifies or accuses private citizens without verified evidence.",
      inputHint: "Enter number such as 0771234567 or +94 77 123 4567",
      colorScheme: "indigo",
    },
    {
      id: "image",
      title: "Screenshot / Payment Slip",
      badge: "Slip & Receipt Tampering",
      icon: <ImageIcon size={24} className="text-amber-600" />,
      summary:
        "Inspect screenshots of online bank transfers, QR codes, or digital receipts for evidence of layout manipulation and mismatched typography.",
      checksFor: [
        "Font and alignment inconsistencies on purported bank slips",
        "Tampered transaction reference numbers and fabricated confirmation timestamps",
        "Suspicious LankaQR or private payment QR overlays",
        "Cloned mobile banking app interfaces",
      ],
      safeGuidelines:
        "Inspects metadata and visual indicators only. Uploads remain strictly private and are never publicly shared.",
      inputHint: "Supports standard PNG, JPEG, and WebP image formats (up to 5 MB).",
      colorScheme: "amber",
    },
    {
      id: "file",
      title: "Suspicious Document / File",
      badge: "Untrusted Attachments",
      icon: <FileText size={24} className="text-slate-700" />,
      summary:
        "Assess received email attachments (invoices, job contracts, tender notices) without putting your device at risk of malicious execution.",
      checksFor: [
        "Double-extension deception (e.g. invoice.pdf.exe)",
        "Embedded macro triggers and malicious script indicators",
        "Mismatched MIME signatures vs file extension",
        "Suspicious file origin metadata",
      ],
      safeGuidelines:
        "Suspicious files are never opened or run on your device. The system checks safe headers in an isolated quarantine workflow.",
      inputHint: "Supports PDF, DOCX, and text documents (up to 10 MB).",
      colorScheme: "navy",
    },
  ];

  const current = methods.find((m) => m.id === selectedMethod) || methods[0];

  return (
    <section id="methods" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <Badge variant="teal">Comprehensive Coverage</Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B1730] tracking-tight">
            Five Dedicated Checking Methods
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Every digital scam arrives differently. Select a verification method below to see how Moatix examines warning signs without compromising your personal privacy.
          </p>
        </div>

        {/* Five Interactive Cards / Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-8" role="tablist">
          {methods.map((method) => {
            const isSelected = selectedMethod === method.id;
            return (
              <button
                key={method.id}
                role="tab"
                aria-selected={isSelected}
                aria-controls={`panel-${method.id}`}
                onClick={() => setSelectedMethod(method.id)}
                className={`text-left p-4 rounded-xl border transition-all duration-200 focus-visible:outline-2 focus-visible:outline-blue-600 cursor-pointer ${
                  isSelected
                    ? "bg-white border-blue-600 shadow-md ring-2 ring-blue-600/10"
                    : "bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white hover:shadow-xs"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${isSelected ? "bg-blue-50" : "bg-slate-100"}`}>
                    {method.icon}
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  )}
                </div>
                <div className="font-bold text-sm text-[#0B1730] leading-snug mb-1">
                  {method.title}
                </div>
                <div className="text-xs text-slate-500 line-clamp-2">
                  {method.badge}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Method Details Panel */}
        <div
          id={`panel-${current.id}`}
          role="tabpanel"
          className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-xs"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left detail description */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-100">
                  {current.icon}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0B1730]">
                    {current.title}
                  </h3>
                  <Badge variant="info" className="mt-1">
                    {current.badge}
                  </Badge>
                </div>
              </div>

              <p className="text-slate-700 text-base leading-relaxed">
                {current.summary}
              </p>

              {/* What Moatix examines */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Key Warning Signs Examined
                </div>
                <ul className="space-y-2">
                  {current.checksFor.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle2 size={18} className="text-teal-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Safe submission guideline */}
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start gap-3 text-xs sm:text-sm text-blue-900">
                <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-semibold">Security & Privacy Protocol</div>
                  <div>{current.safeGuidelines}</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Mock Checker Box */}
            <div className="lg:col-span-5 bg-slate-50 rounded-xl border border-slate-200 p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs font-mono font-semibold text-slate-600 uppercase tracking-wide">
                  Quick Input Preview
                </span>
                <span className="text-[11px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                  Demo Preview
                </span>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-semibold text-slate-700">
                  Enter {current.title} details:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value={current.inputHint}
                    className="w-full bg-white border border-slate-300 rounded-lg py-2.5 px-3 text-xs sm:text-sm text-slate-500 cursor-not-allowed select-all"
                  />
                </div>
                <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <ShieldAlert size={14} className="text-amber-500" />
                  <span>Always double-check source before interacting</span>
                </div>
              </div>

              <div className="pt-2">
                <a href="#how-it-works">
                  <Button variant="primary" size="md" className="w-full">
                    <span>Explore Step-by-Step Verification</span>
                    <ArrowRight size={16} />
                  </Button>
                </a>
              </div>

              <div className="text-[11px] text-center text-slate-400">
                Full multi-method checking engine integrated by ZegBit engineering.
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
