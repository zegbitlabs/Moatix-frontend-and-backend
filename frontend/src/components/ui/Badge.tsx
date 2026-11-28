import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "info" | "caution" | "error" | "neutral" | "teal";
  children: React.ReactNode;
}

export function Badge({
  variant = "default",
  className = "",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-slate-100 text-slate-800 border-slate-200",
    info: "bg-blue-50 text-blue-700 border-blue-200",
    caution: "bg-amber-50 text-amber-800 border-amber-200",
    error: "bg-rose-50 text-rose-700 border-rose-200",
    neutral: "bg-slate-100 text-slate-600 border-slate-200",
    teal: "bg-teal-50 text-teal-800 border-teal-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
