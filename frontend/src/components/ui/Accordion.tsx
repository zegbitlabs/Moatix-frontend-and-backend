"use client";

import React, { useState } from "react";
import { ChevronDown } from "./Icons";

export interface AccordionItem {
  id: string;
  question: string;
  answer: string | React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
  className?: string;
}

export function Accordion({ items, defaultOpenId, className = "" }: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(
    defaultOpenId ? [defaultOpenId] : []
  );

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className={`divide-y divide-slate-200 border-y border-slate-200 ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const buttonId = `accordion-btn-${item.id}`;
        const panelId = `accordion-panel-${item.id}`;

        return (
          <div key={item.id} className="py-4">
            <h3>
              <button
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between text-left font-semibold text-slate-900 hover:text-blue-600 transition-colors py-1 focus-visible:outline-2 focus-visible:outline-blue-600 rounded-sm"
              >
                <span className="text-base sm:text-lg pr-4">{item.question}</span>
                <ChevronDown
                  size={20}
                  className={`text-slate-500 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-blue-600" : ""
                  }`}
                />
              </button>
            </h3>
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="pt-3 pb-1 text-slate-600 text-sm sm:text-base leading-relaxed"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
