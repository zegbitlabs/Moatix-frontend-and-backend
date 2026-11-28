# Moatix Check — Sri Lanka Public Cyber Defence Platform

Full-stack scam URL assessment platform built with **Next.js 16** (frontend) and **Spring Boot 3.4 + PostgreSQL 18 + Flyway** (backend).

## Structure

- `frontend/` — Next.js 16 + Tailwind CSS v4 web application (port `3000`)
- `backend/` — Spring Boot 3.4 REST API, JPA entities, Flyway migrations, and PostgreSQL persistence (port `8081`)
- `docs/` — API handbook & project documentation

## Quick Start

### 1. Database (PostgreSQL 18)
Create a database named `moatix_db`:
```sql
CREATE DATABASE moatix_db;
```
Default credentials in `backend/src/main/resources/application.yml`:
- Host: `localhost:5432`
- Database: `moatix_db`
- Username / Password: `postgres` / `postgres` (override via `DB_USER` / `DB_PASSWORD`)

### 2. Backend (Port 8081)
```powershell
cd backend
.\mvnw.cmd spring-boot:run
```
Flyway automatically runs `V1__init_schema.sql` on startup.

*(For offline development without PostgreSQL, run with `-Dspring-boot.run.profiles=dev` to use embedded H2.)*

### 3. Frontend (Port 3000)
```powershell
cd frontend
npm install
npm run dev
```
Open **http://localhost:3000/login** to start.
