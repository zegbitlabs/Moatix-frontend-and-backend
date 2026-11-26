import React from "react";
import { Badge } from "../ui/Badge";
import { Accordion, AccordionItem } from "../ui/Accordion";
import { HelpCircle } from "../ui/Icons";

export function FaqSection() {
  const faqItems: AccordionItem[] = [
    {
      id: "what-is-moatix",
      question: "What is Moatix Check and who operates it?",
      answer:
        "Moatix Check is an educational scam-assessment and cyber hygiene platform developed by ZegBit. It is designed specifically for people and organizations in Sri Lanka to evaluate suspicious links, messages, phone numbers, screenshots, and documents before taking risky actions.",
    },
    {
      id: "guarantee-safe",
      question: "Does a 'no warning signs' result mean an item is 100% safe?",
      answer:
        "No. Responsible cybersecurity systems never claim 100% safety. Malicious actors frequently register new domains or change tactics hours before intelligence databases update. Moatix Check highlights visible indicators and explains what cannot be determined, encouraging prudent verification.",
    },
    {
      id: "what-to-do-clicked",
      question: "What should I do if I already clicked a suspicious link or submitted my card?",
      answer: (
        <div className="space-y-2">
          <p>If you suspect you have entered credentials or approved a fraudulent transaction:</p>
          <ol className="list-decimal list-inside space-y-1.5 pl-1 text-slate-700">
            <li>
              <strong>Call your bank immediately:</strong> Dial the official customer service number printed on the back of your payment card to freeze accounts or cards.
            </li>
            <li>
              <strong>Change passwords immediately:</strong> From a clean, separate device, change login passwords for affected email and banking portals.
            </li>
            <li>
              <strong>Enable Multi-Factor Authentication:</strong> Switch to authenticator app-based MFA wherever available.
            </li>
            <li>
              <strong>Notify Sri Lanka CERT:</strong> Call 101 or contact the Police Cyber Crime Division (+94 11 242 2176) to log official evidence.
            </li>
          </ol>
        </div>
      ),
    },
    {
      id: "phone-reputation",
      question: "Can Moatix Check identify the personal identity of a phone number?",
      answer:
        "No. To protect privacy and adhere to telecommunications legislation, Moatix does not identify or publish personal citizen identities from phone numbers. We evaluate numbering plan validity (such as Sri Lankan 07X mobile vs geographic landline ranges) and known public fraud reporting patterns.",
    },
    {
      id: "data-security",
      question: "What happens to the screenshots or messages I upload?",
      answer:
        "During this preview phase, all demonstration processing executes purely inside your web browser; no content is transmitted to external servers. In the upcoming production backend, data minimization principles will apply: raw messages and files are inspected in temporary quarantined memory and automatically discarded.",
    },
    {
      id: "browser-languages",
      question: "Will Moatix Check support Sinhala and Tamil languages?",
      answer:
        "Yes. The interface is engineered with a multilingual architecture ready for localization across Sinhala, Tamil, and English. The typography stack includes native Sinhala and Tamil font fallbacks to ensure full readability on mobile devices.",
    },
  ];

  return (
    <section id="faq" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12 sm:mb-16">
          <Badge variant="neutral">Clear Answers</Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B1730] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Transparent guidance about our verification methodology, privacy boundaries, and security standards.
          </p>
        </div>

        {/* Accordion Component */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <Accordion items={faqItems} defaultOpenId="what-is-moatix" />
        </div>

        {/* Supplementary Help Note */}
        <div className="mt-8 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <HelpCircle size={16} className="text-slate-400" />
          <span>Need specialized enterprise verification? Connect with the ZegBit security research team.</span>
        </div>

      </div>
    </section>
  );
}
