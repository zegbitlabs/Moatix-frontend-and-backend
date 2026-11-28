import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Moatix Check | Scam Assessment & Digital Verification by ZegBit",
  description:
    "Think Before You Trust. Check Before You Click. Public scam-assessment platform for Sri Lanka to examine suspicious links.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#9DC4F8] text-[#0F172A] font-sans">
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
