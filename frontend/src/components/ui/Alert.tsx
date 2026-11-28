import React from "react";
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from "./Icons";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "caution" | "error" | "neutral" | "success";
  title?: string;
  children: React.ReactNode;
}

export function Alert({
  variant = "info",
  title,
  children,
  className = "",
  ...props
}: AlertProps) {
  const configs = {
    info: {
      bg: "bg-blue-50/80 border-blue-200 text-blue-900",
      icon: <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />,
      label: "Information",
    },
    caution: {
      bg: "bg-amber-50/80 border-amber-200 text-amber-900",
      icon: <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />,
      label: "Caution",
    },
    error: {
      bg: "bg-rose-50/80 border-rose-200 text-rose-900",
      icon: <AlertCircle size={18} className="text-rose-600 shrink-0 mt-0.5" />,
      label: "Notice",
    },
    neutral: {
      bg: "bg-slate-50 border-slate-200 text-slate-800",
      icon: <Info size={18} className="text-slate-500 shrink-0 mt-0.5" />,
      label: "Note",
    },
    success: {
      bg: "bg-teal-50/80 border-teal-200 text-teal-900",
      icon: <CheckCircle2 size={18} className="text-teal-600 shrink-0 mt-0.5" />,
      label: "Verified Note",
    },
  };

  const config = configs[variant];

  return (
    <div
      role={variant === "error" || variant === "caution" ? "alert" : "status"}
      className={`flex items-start gap-3 p-4 rounded-lg border text-sm ${config.bg} ${className}`}
      {...props}
    >
      {config.icon}
      <div className="flex-1 space-y-1">
        {title ? (
          <div className="font-semibold flex items-center gap-2">
            <span>{title}</span>
            <span className="text-xs uppercase tracking-wider font-bold opacity-75">
              ({config.label})
            </span>
          </div>
        ) : (
          <span className="sr-only">{config.label}: </span>
        )}
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
