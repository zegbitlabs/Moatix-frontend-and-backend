# Authentication API Proposal for Moatix (ZegBit Theme)

**Author:** Member 2 (Sandun)  
**Intended Reviewers:** Member 4 & Member 5 (Backend Engineering), Project Manager  
**Status:** Proposal / Pending Approval  

---

## 1. Overview
This document specifies the proposed RESTful API contract for the authentication system of Moatix. Currently, all client-side authentication screens (`/login`, `/register`, `/forgot-password`) run against a mock interface (`AuthClient` in `frontend/src/lib/auth/mock-auth.ts`). Once backend endpoints are ready, the mock implementation can be swapped for a live HTTP client without touching UI components.

---

## 2. API Endpoints

### 2.1 Register New Account
- **Endpoint:** `POST /api/v1/auth/register`
- **Rate Limit:** 10 requests / minute / IP
- **Request Headers:**
  - `Content-Type: application/json`

**Request Body:**
```json
{
  "fullName": "Kasun Perera",
  "email": "kasun@example.lk",
  "phone": "+94771234567",
  "password": "StrongPassword!2026",
  "acceptTerms": true,
  "marketingOptIn": false
}
```

**Responses:**
- `201 Created`
  ```json
  {
    "success": true,
    "data": {
      "userId": "usr_7f83a1b2c3d4"
    }
  }
  ```
- `400 Bad Request` (Validation errors)
  ```json
  {
    "code": "VALIDATION_ERROR",
    "message": "Input validation failed",
    "fieldErrors": {
      "email": "Please provide a valid email address",
      "password": "Password must be at least 8 characters"
    },
    "requestId": "req_88a91"
  }
  ```
- `409 Conflict` (Email already registered)
  ```json
  {
    "code": "EMAIL_TAKEN",
    "message": "An account with this email already exists.",
    "fieldErrors": {
      "email": "An account with this email already exists."
    },
    "requestId": "req_88a92"
  }
  ```

---

### 2.2 User Login
- **Endpoint:** `POST /api/v1/auth/login`
- **Rate Limit:** 5 failed attempts per 5 minutes per IP/Identifier before a 30s lockout (`429 Too Many Requests`).

**Request Body:**
```json
{
  "identifier": "kasun@example.lk",
  "password": "StrongPassword!2026",
  "rememberMe": true
}
```

**Responses:**
- `200 OK`
  - Sets HTTP-Only Secure Cookie: `Set-Cookie: moatix_session=<session_id>; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=2592000`
  - No secret tokens or passwords returned in JSON payload.
  ```json
  {
    "success": true,
    "data": {
      "user": {
        "id": "usr_7f83a1b2c3d4",
        "fullName": "Kasun Perera",
        "email": "kasun@example.lk"
      }
    }
  }
  ```
- `401 Unauthorized` (Generic error to prevent user enumeration)
  ```json
  {
    "code": "INVALID_CREDENTIALS",
    "message": "Email or password is incorrect.",
    "requestId": "req_99b12"
  }
  ```
- `429 Too Many Requests`
  ```json
  {
    "code": "RATE_LIMITED",
    "message": "Too many failed login attempts. Please wait 30 seconds.",
    "retryAfter": 30,
    "requestId": "req_99b13"
  }
  ```

---

### 2.3 Forgot Password
- **Endpoint:** `POST /api/v1/auth/forgot-password`
- **Rate Limit:** 5 requests / hour / IP

**Request Body:**
```json
{
  "email": "user@example.lk"
}
```

**Responses:**
- `202 Accepted` (Always returns `202 Accepted` regardless of whether the account exists, preventing email enumeration)
  ```json
  {
    "success": true,
    "data": {
      "sent": true
    }
  }
  ```

---

## 3. Security Guidelines for Backend Implementation
1. **Password Hashing:** Passwords must be hashed using **Argon2id** (memory: 64MB, iterations: 3, parallelism: 4) or **bcrypt** (work factor $\ge 12$).
2. **Session Storage:** Use secure, server-side session stores (e.g. Redis) bound to `HttpOnly`, `Secure`, `SameSite=Lax` cookies. Never send bearer JWTs stored in client `localStorage`.
3. **Anti-CSRF:** Enforce double-submit cookie or origin/referer header verification for all state-changing endpoints.
4. **Sri Lanka Specifics:** Support `+94` phone normalisation in the database matching `lib/phone.ts`.
