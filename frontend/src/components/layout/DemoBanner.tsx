import React from "react";

export function DemoBanner() {
  return (
    <aside
      aria-label="System status notice"
      className="bg-[#0B1730] border-b border-[#142B4D] text-slate-100 py-2.5 px-4 text-xs sm:text-sm"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 mx-auto sm:mx-0 text-center sm:text-left">
          <span className="inline-flex items-center justify-center bg-blue-500/20 text-blue-300 rounded px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wider shrink-0 border border-blue-400/30">
            DEMO PREVIEW
          </span>
          <span className="text-slate-200 font-medium">
            Demo mode: the system is not currently assessing the safety of the submitted item.
          </span>
        </div>
        <div className="hidden lg:flex items-center text-xs text-slate-400 shrink-0">
          <span>Phase 1.0 Evaluation</span>
        </div>
      </div>
    </aside>
  );
}
