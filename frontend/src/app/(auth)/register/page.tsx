import { AuthShell } from '@/components/auth/AuthShell';
import { RegisterForm } from '@/components/auth/RegisterForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Account – Moatix Check',
  description: 'Create a free Moatix account to check scam messages and verify fraud trends.',
};

export default function RegisterPage() {
  return (
    <AuthShell pageType="register">
      <RegisterForm />
    </AuthShell>
  );
}
