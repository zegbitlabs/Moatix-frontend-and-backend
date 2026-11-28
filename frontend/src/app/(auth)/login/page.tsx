import { AuthShell } from '@/components/auth/AuthShell';
import { LoginForm } from '@/components/auth/LoginForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In – Moatix Check',
  description: 'Sign in to access your Moatix scam checks and reports.',
};

export default function LoginPage() {
  return (
    <AuthShell pageType="login">
      <LoginForm />
    </AuthShell>
  );
}
