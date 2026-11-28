# Moatix — Member 4 REST API Engineering Handbook

**Author:** Member 4 — Backend REST API Developer  
**Branch:** `feature/backend-api`  
**Date:** November 2026  
**Status:** 100% Implemented, Tested, and Verified Standalone  

---

## 1. Executive Summary & Ownership Scope

This document specifies the REST API layer implemented for the **Moatix Scam Detection Website** as part of Member 4's individual ownership in the five-member team.

### Ownership Boundary
- **Included (Member 4):**
  - REST Controllers:
    - `CheckController` (URL, Message, Phone, Image upload, File upload, Check lookup)
    - `FeedbackController` (Feedback & report submissions)
    - `HealthController` (Service health status)
  - Request & Response DTOs with Jackson serialization & aliases
  - Bean Validation & Custom Constraint handling
  - Safe multipart upload intake & file boundaries (`FileValidationService`)
  - Centralized `@RestControllerAdvice` Global Exception Handling (`GlobalExceptionHandler`)
  - Correlation Request ID generation (`req-XXXXXXXX`)
  - CORS security configuration (`WebConfig`)
  - OpenAPI 3.0 / Swagger UI documentation (`OpenApiConfig`)
  - MockMvc controller & exception handling test suites (26 passing tests)
  - Contract interface definition (`CheckOrchestrator`) and standalone in-memory test double (`MockCheckOrchestrator`)
- **Deliberately Excluded (Owned by Other Team Members):**
  - Member 1, 2, 3: Next.js website UI, input forms, and results pages
  - Member 5: PostgreSQL persistence, JPA entities, database migrations (Flyway)
  - External Teams: Real AI models, URL threat intelligence feeds, malware scanning sandbox

---

## 2. API Endpoints Specification

All endpoints are versioned under `/api/v1`.

| Method | Endpoint | Consumes | Produces | Description | Status |
|--------|----------|----------|----------|-------------|--------|
| `POST` | `/api/v1/checks/url` | `application/json` | `application/json` | Submit URL for scam checking | Ready (Demo) |
| `POST` | `/api/v1/checks/message` | `application/json` | `application/json` | Submit SMS/WhatsApp/Email text | Ready (Demo) |
| `POST` | `/api/v1/checks/phone` | `application/json` | `application/json` | Submit phone number for lookup | Ready (Demo) |
| `POST` | `/api/v1/checks/image` | `multipart/form-data` | `application/json` | Upload screenshot/image (max 5MB) | Ready (Demo) |
| `POST` | `/api/v1/checks/file` | `multipart/form-data` | `application/json` | Upload document/file (max 10MB) | Ready (Demo) |
| `GET` | `/api/v1/checks/{checkId}` | - | `application/json` | Retrieve check status & result | Ready |
| `POST` | `/api/v1/checks/{checkId}/feedback` | `application/json` | `application/json` | Submit feedback for specific check | Ready |
| `POST` | `/api/v1/feedback` | `application/json` | `application/json` | Submit general feedback or report | Ready |
| `GET` | `/api/v1/health` | - | `application/json` | Service health status | Ready |

---

## 3. Request and Response Schemas

### 3.1 URL Check
**`POST /api/v1/checks/url`**
```json
{
  "url": "https://example-scam-bank.com/login",
  "language": "en"
}
```
**Validation:**
- `url`: Required, max 2048 chars, strictly HTTP or HTTPS scheme pattern `^https?://...`
- `language`: Optional, max 10 chars

### 3.2 Message Check
**`POST /api/v1/checks/message`**
```json
{
  "content": "Urgent: Your bank account will be closed today. Click here to confirm OTP.",
  "language": "en"
}
```
*Note: Accepts both `"content"` and `"message"` interchangeably via Jackson `@JsonAlias`.*
**Validation:**
- `content`: Required, non-blank, max 5000 chars

### 3.3 Phone Check
**`POST /api/v1/checks/phone`**
```json
{
  "phoneNumber": "+94771234567",
  "countryCode": "LK"
}
```
**Validation:**
- `phoneNumber`: Required, international format pattern `^\+?[0-9\s\-().]{7,20}$`
- `countryCode`: Optional, max 10 chars

### 3.4 Image Upload
**`POST /api/v1/checks/image`**
- Multipart part `file`: binary file
- Form param `language`: optional string
**Validation:**
- Max size: 5 MB
- Allowed MIME types: `image/jpeg`, `image/jpg`, `image/png`, `image/gif`, `image/webp`
- Allowed extensions: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`

### 3.5 File Upload
**`POST /api/v1/checks/file`**
- Multipart part `file`: binary document
**Validation:**
- Max size: 10 MB
- Allowed MIME types: `application/pdf`, `text/plain`, `application/msword`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
- Allowed extensions: `.pdf`, `.txt`, `.doc`, `.docx`

### 3.6 Unified Check Response Envelope
All check creation and retrieval endpoints return the consistent response envelope:
```json
{
  "checkId": "550e8400-e29b-41d4-a716-446655440000",
  "inputType": "URL",
  "status": "DEMO",
  "verdict": null,
  "riskScore": null,
  "reasons": [],
  "recommendation": "Demonstration only - no real security analysis was performed. Specialist detection services will be integrated.",
  "provider": "mock",
  "demo": true,
  "createdAt": "2026-11-19T10:00:00Z"
}
```

### 3.7 Feedback Submission
**`POST /api/v1/feedback`**
```json
{
  "checkId": "550e8400-e29b-41d4-a716-446655440000",
  "category": "INCORRECT_RESULT",
  "comment": "The URL was an actual phishing clone."
}
```
*Note: Accepts both `"category"` and `"feedbackType"` via Jackson `@JsonAlias`.*

Response (`201 Created`):
```json
{
  "feedbackId": "771e8400-e29b-41d4-a716-446655440000",
  "checkId": "550e8400-e29b-41d4-a716-446655440000",
  "category": "INCORRECT_RESULT",
  "status": "ACCEPTED",
  "createdAt": "2026-11-19T10:05:00Z"
}
```

---

## 4. Error Handling and Status Codes

The `@RestControllerAdvice` in `GlobalExceptionHandler` intercepts all exceptions and returns standard JSON error envelopes:

```json
{
  "code": "VALIDATION_ERROR",
  "message": "Input validation failed. Please correct the highlighted errors.",
  "fieldErrors": [
    {
      "field": "url",
      "message": "Please enter a valid HTTP or HTTPS URL (e.g., https://example.com)"
    }
  ],
  "requestId": "req-8b0bf01e",
  "timestamp": "2026-11-19T13:27:00Z"
}
```

### Supported Status Codes:
- **`400 Bad Request`**: Validation errors, malformed JSON, invalid file formats (`VALIDATION_ERROR`, `MALFORMED_JSON`, `INVALID_FILE`).
- **`404 Not Found`**: Non-existent check ID (`NOT_FOUND`).
- **`405 Method Not Allowed`**: Unsupported HTTP verbs (`METHOD_NOT_ALLOWED`).
- **`413 Payload Too Large`**: Upload file exceeding 10MB (`PAYLOAD_TOO_LARGE`).
- **`415 Unsupported Media Type`**: Unrecognized Content-Type (`UNSUPPORTED_MEDIA_TYPE`).
- **`500 Internal Server Error`**: Generic error handler hiding stack traces and internal secrets (`INTERNAL_SERVER_ERROR`).

---

## 5. Member 5 Service Integration Contract

Controllers in Member 4's package depend strictly on the `CheckOrchestrator` interface:

```java
package com.zegbit.moatix.service;

public interface CheckOrchestrator {
    CheckResponse submitUrlCheck(UrlCheckRequest request);
    CheckResponse submitMessageCheck(MessageCheckRequest request);
    CheckResponse submitPhoneCheck(PhoneCheckRequest request);
    CheckResponse submitImageCheck(MultipartFile file, String language);
    CheckResponse submitFileCheck(MultipartFile file);
    CheckResponse getCheckResult(UUID checkId);
    FeedbackResponse submitFeedback(FeedbackRequest request);
}
```

### Handover to Member 5:
1. Member 5 implements `CheckOrchestrator` using Spring `@Service` and `@Primary` annotation to supersede the default `MockCheckOrchestrator`.
2. Any database operations, transactional boundaries, and adapter lookups belong inside Member 5's service implementation.
3. Controllers will not need any modification when Member 5 connects PostgreSQL persistence.

---

## 6. Frontend Integration Guide (Members 2 & 3)

The Next.js frontend connects directly to these endpoints:
- **Base URL:** `http://localhost:8080`
- **CORS Allowed Origins:** `http://localhost:3000`, `http://127.0.0.1:3000`
- **Swagger Documentation:** `http://localhost:8080/swagger-ui.html`
- **OpenAPI JSON Spec:** `http://localhost:8080/api-docs`

---

## 7. How to Run & Test

```bash
# From moatix/backend directory:

# 1. Compile and run all tests
./mvnw clean test

# 2. Run the Spring Boot application locally
./mvnw spring-boot:run

# 3. Access Swagger UI in browser:
http://localhost:8080/swagger-ui.html
```
