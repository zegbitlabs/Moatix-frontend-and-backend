import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "bordered" | "interactive";
}

export function Card({
  children,
  variant = "default",
  className = "",
  ...props
}: CardProps) {
  const variantStyles = {
    default: "bg-white border border-slate-200/80 shadow-xs",
    elevated: "bg-white border border-slate-200/60 shadow-sm",
    bordered: "bg-white border-2 border-slate-200",
    interactive:
      "bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all duration-200 cursor-pointer",
  };

  return (
    <div
      className={`rounded-xl overflow-hidden p-6 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
