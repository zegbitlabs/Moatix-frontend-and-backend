-- ==============================================================================
-- Moatix Scam Detection Website - Member 5 Schema Migration
-- V1__init_schema.sql: PostgreSQL schema for checks, results, feedback, reports
-- ==============================================================================

-- 1. Checks Table: stores metadata without storing raw user credentials / secrets
CREATE TABLE IF NOT EXISTS checks (
    check_id VARCHAR(64) PRIMARY KEY,
    input_type VARCHAR(32) NOT NULL,
    status VARCHAR(32) NOT NULL,
    input_hash VARCHAR(128) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_checks_input_type ON checks(input_type);
CREATE INDEX IF NOT EXISTS idx_checks_created_at ON checks(created_at);

-- 2. Check Results Table: stores evaluated outcome metadata
CREATE TABLE IF NOT EXISTS check_results (
    id BIGSERIAL PRIMARY KEY,
    check_id VARCHAR(64) NOT NULL REFERENCES checks(check_id) ON DELETE CASCADE,
    verdict VARCHAR(32),
    risk_score INTEGER,
    recommendation TEXT,
    origin VARCHAR(32) NOT NULL DEFAULT 'DEMO',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_check_results_check_id ON check_results(check_id);

-- 3. Check Reasons Table: detailed indicators associated with a result
CREATE TABLE IF NOT EXISTS check_reasons (
    id BIGSERIAL PRIMARY KEY,
    result_id BIGINT NOT NULL REFERENCES check_results(id) ON DELETE CASCADE,
    code VARCHAR(64) NOT NULL,
    description TEXT NOT NULL,
    severity VARCHAR(32) NOT NULL DEFAULT 'INFO'
);

CREATE INDEX IF NOT EXISTS idx_check_reasons_result_id ON check_reasons(result_id);

-- 4. User Feedback Table: helpful or incorrect ratings
CREATE TABLE IF NOT EXISTS feedback (
    id BIGSERIAL PRIMARY KEY,
    check_id VARCHAR(64) NOT NULL,
    reason VARCHAR(64) NOT NULL,
    review_status VARCHAR(32) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_feedback_check_id ON feedback(check_id);

-- 5. Threat Reports Table: user submitted scam reports
CREATE TABLE IF NOT EXISTS reports (
    id BIGSERIAL PRIMARY KEY,
    report_id VARCHAR(64) NOT NULL UNIQUE,
    target TEXT NOT NULL,
    allegation_details TEXT,
    status VARCHAR(32) NOT NULL DEFAULT 'PENDING_REVIEW',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
