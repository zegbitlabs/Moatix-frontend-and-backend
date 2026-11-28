import { AuthClient, LoginCredentials, RegisterData, ForgotPasswordData, AuthResponse, UserProfile } from './types';
import { isValidIdentifier, isValidEmail, validateFullName } from './validators';

/**
 * ZegBit Moatix Mock Authentication Client
 * 
 * DEMO ONLY:
 * - No credentials, sessions, or tokens are stored in localStorage, cookies, or remote databases.
 * - Simulates realistic network latency and security responses.
 * - Ready to be substituted with a real HTTP client conforming to AuthClient.
 */

// Demo credentials
const DEMO_USER = {
  identifier: 'demo@zegbit.lk',
  password: 'Demo@1234',
  name: 'Sandun Perera',
};

const TAKEN_EMAIL = 'taken@zegbit.lk';

class MockAuthClient implements AuthClient {
  private failedAttempts = 0;
  private cooldownUntil = 0;

  async login(credentials: LoginCredentials): Promise<AuthResponse<{ user: UserProfile }>> {
    const now = Date.now();
    if (now < this.cooldownUntil) {
      const remainingSec = Math.ceil((this.cooldownUntil - now) / 1000);
      return {
        success: false,
        error: `Too many attempts. Please try again in ${remainingSec} seconds.`,
        cooldownSeconds: remainingSec,
      };
    }

    // Simulate 900ms server response time
    await new Promise((resolve) => setTimeout(resolve, 900));

    const identifier = credentials.identifier.trim();
    const password = credentials.password;

    if (!isValidIdentifier(identifier) || !password || password.length < 8) {
      return {
        success: false,
        error: 'Email or password is incorrect.', // Never reveal which one is wrong (OWASP)
      };
    }

    // Check credentials against demo account
    if (identifier.toLowerCase() === DEMO_USER.identifier && password === DEMO_USER.password) {
      this.failedAttempts = 0;
      return {
        success: true,
        data: {
          user: {
            id: 'usr_demo_94770001',
            fullName: DEMO_USER.name,
            email: DEMO_USER.identifier,
          },
        },
      };
    }

    // Failed attempt logic
    this.failedAttempts += 1;
    if (this.failedAttempts >= 5) {
      this.cooldownUntil = Date.now() + 30 * 1000; // 30 second cooldown
      return {
        success: false,
        error: 'Too many failed login attempts. Please wait 30 seconds.',
        cooldownSeconds: 30,
      };
    }

    return {
      success: false,
      error: 'Email or password is incorrect.',
    };
  }

  async register(data: RegisterData): Promise<AuthResponse<{ userId: string }>> {
    // Simulate 1100ms server response
    await new Promise((resolve) => setTimeout(resolve, 1100));

    const nameCheck = validateFullName(data.fullName);
    if (!nameCheck.isValid) {
      return {
        success: false,
        fieldErrors: { fullName: nameCheck.error || 'Invalid name' },
      };
    }

    if (!isValidEmail(data.email)) {
      return {
        success: false,
        fieldErrors: { email: 'Please enter a valid email address.' },
      };
    }

    if (!data.acceptTerms) {
      return {
        success: false,
        fieldErrors: { acceptTerms: 'You must agree to the Terms and Privacy Policy.' },
      };
    }

    // Check taken email test case
    if (data.email.trim().toLowerCase() === TAKEN_EMAIL) {
      return {
        success: false,
        fieldErrors: {
          email: 'An account with this email already exists.',
        },
      };
    }

    // Success response: returns generated mock userId
    return {
      success: true,
      data: {
        userId: `usr_mock_${Math.random().toString(36).substring(2, 10)}`,
      },
    };
  }

  async forgotPassword(data: ForgotPasswordData): Promise<AuthResponse<{ sent: boolean }>> {
    // Simulate 800ms response
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Uniform response to avoid account enumeration
    return {
      success: true,
      data: { sent: true },
    };
  }
}

export const mockAuthClient = new MockAuthClient();
