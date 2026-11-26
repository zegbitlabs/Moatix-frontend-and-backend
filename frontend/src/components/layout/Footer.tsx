import React from "react";
import { ShieldCheck } from "../ui/Icons";

export function Footer() {
  return (
    <footer className="bg-[#0B1730] text-slate-400 py-6 border-t border-slate-800 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-blue-600/20 text-blue-400 flex items-center justify-center">
            <ShieldCheck size={14} />
          </div>
          <span className="font-semibold text-slate-200">Moatix Check</span>
          <span className="text-slate-500">by ZegBit</span>
        </div>
        <div className="text-slate-500">
          © 2026 Moatix Check by ZegBit. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
