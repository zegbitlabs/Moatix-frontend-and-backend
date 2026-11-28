import { AuthShell } from '@/components/auth/AuthShell';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Password – Moatix Check',
  description: 'Reset your Moatix account password.',
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell pageType="forgot-password">
      <ForgotPasswordForm />
    </AuthShell>
  );
}
