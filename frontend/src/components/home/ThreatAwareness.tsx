import React from "react";
import { Badge } from "../ui/Badge";
import { AlertTriangle, ShieldCheck } from "../ui/Icons";

export function ThreatAwareness() {
  const trends = [
    {
      title: "Postal & Courier Delivery Phishing",
      target: "Sri Lanka Post & Local Logistics",
      scenario:
        "You receive an SMS claiming an inbound parcel cannot be delivered until a minor customs fee (LKR 200 - 800) is paid via a link within 12 hours.",
      redFlags: [
        "Link points to .online, .top, or .xyz rather than official .gov.lk or .lk",
        "Demands instant credit/debit card numbers for a package you never ordered",
        "Creates false urgency with automatic return threats",
      ],
      rule: "Sri Lanka Post never requests online debit card payments through generic link shorteners.",
    },
    {
      title: "Bank KYC & Account Block Alerts",
      target: "Major Sri Lankan Commercial Banks",
      scenario:
        "A text warning that your online banking has been deactivated due to uncompleted KYC or suspicious login, requesting immediate verification.",
      redFlags: [
        "Takes you to a lookalike bank login page requesting username, password, and OTP",
        "Sender header is often a spoofed mask or a standard personal 07X mobile number",
        "Threatens permanent fund forfeiture or legal proceedings",
      ],
      rule: "No bank employee or automated system in Sri Lanka will ever ask you to read back a 6-digit OTP code.",
    },
    {
      title: "CEB / Water Utility Disconnection",
      target: "Ceylon Electricity Board & National Water Supply",
      scenario:
        "Urgent warning that electricity or water services will be disconnected today at 5:00 PM unless an outstanding bill is cleared via an informal transfer.",
      redFlags: [
        "Demands funds transferred to a private individual bank account or unverified phone number",
        "Arrives outside normal billing cycles without prior formal postal notification",
        "Refuses requests to verify through the official 1987 CEB hotline",
      ],
      rule: "Always settle municipal and utility accounts through official banking apps or verified utility counters.",
    },
    {
      title: "Remote Part-Time 'Task' & YouTube Liking Scams",
      target: "WhatsApp, Telegram & Social Media Users",
      scenario:
        "Unsolicited messages offering LKR 3,000 - 15,000 per day simply for liking YouTube videos or rating Google Maps locations, beginning with small trial payouts.",
      redFlags: [
        "Requires 'prepayment deposits' or VIP tier upgrades to withdraw accumulated funds",
        "Operates exclusively in anonymous Telegram or WhatsApp messaging channels",
        "Pressures victims to recruit family members or borrow funds to access frozen balances",
      ],
      rule: "Legitimate employers never demand financial deposits from candidates as a condition for earning wages.",
    },
  ];

  return (
    <section id="threat-awareness" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <Badge variant="caution">Public Awareness & Alert</Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B1730] tracking-tight">
            Recognizing Active Scam Trends in Sri Lanka
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Digital attackers frequently recycle specific psychological pressure tactics. Understanding these common scenarios is your primary line of defense.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {trends.map((trend, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                    {trend.target}
                  </span>
                  <h3 className="text-lg font-bold text-[#0B1730]">
                    {trend.title}
                  </h3>
                </div>
                <div className="p-2 rounded-lg bg-amber-50 text-amber-700 shrink-0">
                  <AlertTriangle size={20} />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                <strong>Pretext:</strong> {trend.scenario}
              </p>

              <div className="space-y-2 text-xs">
                <div className="font-semibold text-slate-700">Identifiable Warning Indicators:</div>
                <ul className="space-y-1.5 text-slate-600">
                  {trend.redFlags.map((flag, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-100 text-xs font-medium text-teal-800 bg-teal-50/70 p-3 rounded-lg border border-teal-100 flex items-start gap-2">
                <ShieldCheck size={16} className="text-teal-600 shrink-0 mt-0.5" />
                <span><strong>Golden Rule:</strong> {trend.rule}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Three Core Rules Card */}
        <div className="bg-[#0B1730] text-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#142B4D] shadow-lg">
          <div className="max-w-3xl space-y-4">
            <Badge variant="teal">Essential Digital Hygiene</Badge>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Three Non-Negotiable Rules When You Receive An Alert
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-xs sm:text-sm text-slate-300">
              <div className="space-y-2 border-l-2 border-blue-500 pl-4">
                <div className="font-bold text-white text-base">1. Never Share OTPs</div>
                <p className="text-slate-400">
                  One-time passwords are authorizations for fund debits or logins. Legitimate support staff will never request them.
                </p>
              </div>
              <div className="space-y-2 border-l-2 border-teal-500 pl-4">
                <div className="font-bold text-white text-base">2. Verify Independently</div>
                <p className="text-slate-400">
                  Never dial numbers provided inside the message. Look up the bank or agency on your official monthly statement or back of your card.
                </p>
              </div>
              <div className="space-y-2 border-l-2 border-amber-500 pl-4">
                <div className="font-bold text-white text-base">3. Pause On Urgency</div>
                <p className="text-slate-400">
                  Scams thrive on sudden panic (&ldquo;act within 30 minutes&rdquo;). Legitimate legal or banking processes afford formal written time.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
