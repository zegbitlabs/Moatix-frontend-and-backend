"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, Menu, X } from "../ui/Icons";

export function Navbar() {
  const pathname = usePathname();
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forgot-password";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Checker", href: "#checker" },
    { label: "How It Works", href: "#how-it-works" },
  ];

  return (
    <>
      {/* Skip to Content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#1D4ED8] focus:text-white focus:rounded-md focus:shadow-lg"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-blue-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-2.5 group focus-visible:outline-2 focus-visible:outline-[#1D4ED8] rounded-lg p-1"
                aria-label="Moatix Check by ZegBit Home"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0A1128] flex items-center justify-center text-blue-400 shadow-sm border border-slate-700 group-hover:bg-[#152347] transition-colors">
                  <ShieldCheck size={22} className="text-blue-400" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold tracking-tight text-[#0A1128]">
                      Moatix<span className="text-[#1D4ED8]">Check</span>
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-700 font-semibold">
                    Scam Assessment Portal • Sri Lanka
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation & Actions - Only How It Works (hidden on auth pages) */}
            {!isAuthPage && (
              <div className="hidden md:flex items-center gap-4">
                <nav className="flex items-center gap-1" aria-label="Main Navigation">
                  <Link
                    href="/#how-it-works"
                    className="px-3.5 py-2 text-sm font-bold text-[#0F172A] hover:text-[#1D4ED8] hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    How It Works
                  </Link>
                </nav>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            {!isAuthPage && (
              <div className="flex md:hidden items-center">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-lg text-[#0F172A] hover:text-[#1D4ED8] hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-[#1D4ED8]"
                  aria-expanded={mobileMenuOpen}
                  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            )}

          </div>
        </div>

        {/* Mobile menu dropdown - Only How It Works */}
        {!isAuthPage && mobileMenuOpen && (
          <div
            className="md:hidden border-b border-blue-200 bg-white px-4 pt-3 pb-4 shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <div className="space-y-1">
              <Link
                href="/#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-bold text-[#0F172A] hover:bg-blue-50 hover:text-[#1D4ED8]"
              >
                How It Works
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
