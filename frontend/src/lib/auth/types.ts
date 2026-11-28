export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
}

export interface LoginCredentials {
  identifier: string; // Email or Sri Lankan phone number
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  fullName: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword?: string;
  acceptTerms: boolean;
  marketingOptIn?: boolean;
}

export interface ForgotPasswordData {
  email: string;
}

export interface AuthResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  fieldErrors?: Record<string, string>;
  cooldownSeconds?: number;
}

export interface PasswordRuleResult {
  id: string;
  label: string;
  met: boolean;
}

export type PasswordStrengthLevel = 'weak' | 'fair' | 'good' | 'strong';

export interface PasswordStrengthResult {
  score: number; // 0 to 4
  level: PasswordStrengthLevel;
  label: string;
  rules: PasswordRuleResult[];
}

export interface AuthClient {
  login(credentials: LoginCredentials): Promise<AuthResponse<{ user: UserProfile }>>;
  register(data: RegisterData): Promise<AuthResponse<{ userId: string }>>;
  forgotPassword(data: ForgotPasswordData): Promise<AuthResponse<{ sent: boolean }>>;
}
