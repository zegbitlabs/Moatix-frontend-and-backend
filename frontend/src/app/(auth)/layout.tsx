import type { Metadata } from 'next';
import '@/app/globals.css';
import '@/components/auth/auth-theme.css';

export const metadata: Metadata = {
  title: 'Moatix Check – Authentication',
  description: 'Sign in or register for Moatix public fraud prevention engine',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen antialiased">
      {children}
    </div>
  );
}
