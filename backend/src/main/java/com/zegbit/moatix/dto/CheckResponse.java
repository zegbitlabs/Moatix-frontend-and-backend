package com.zegbit.moatix.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Schema(description = "Unified scam check assessment response envelope")
public class CheckResponse {

    @Schema(description = "Unique opaque check identifier (UUID)", example = "550e8400-e29b-41d4-a716-446655440000")
    private String checkId;

    @Schema(description = "Input type submitted (URL, MESSAGE, PHONE, IMAGE, FILE)", example = "URL")
    private String inputType;

    @Schema(description = "Current lifecycle status (PENDING, PROCESSING, COMPLETED, FAILED, DEMO, INCONCLUSIVE)", example = "DEMO")
    private String status;

    @Schema(description = "Final security classification verdict (null for demo)", example = "null", nullable = true)
    private String verdict;

    @Schema(description = "Calculated risk score 0-100 (null for demo)", example = "null", nullable = true)
    private Integer riskScore;

    @Schema(description = "List of concrete signals, evidence, or warning indicators")
    private List<String> reasons = new ArrayList<>();

    @Schema(description = "Safe actionable guidance for the end user", example = "Demonstration only - no real security analysis was performed.")
    private String recommendation;

    @Schema(description = "Identifier of detection engine or adapter", example = "mock")
    private String provider;

    @Schema(description = "Explicit flag indicating whether this is a demonstration response", example = "true")
    private boolean demo;

    @Schema(description = "ISO 8601 creation timestamp", example = "2026-11-19T10:00:00Z")
    private Instant createdAt;

    public CheckResponse() {
    }

    public CheckResponse(String checkId, String inputType, String status, String verdict,
                         Integer riskScore, List<String> reasons, String recommendation,
                         String provider, boolean demo, Instant createdAt) {
        this.checkId = checkId;
        this.inputType = inputType;
        this.status = status;
        this.verdict = verdict;
        this.riskScore = riskScore;
        this.reasons = reasons != null ? reasons : new ArrayList<>();
        this.recommendation = recommendation;
        this.provider = provider;
        this.demo = demo;
        this.createdAt = createdAt;
    }

    public String getCheckId() {
        return checkId;
    }

    public void setCheckId(String checkId) {
        this.checkId = checkId;
    }

    public String getInputType() {
        return inputType;
    }

    public void setInputType(String inputType) {
        this.inputType = inputType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getVerdict() {
        return verdict;
    }

    public void setVerdict(String verdict) {
        this.verdict = verdict;
    }

    public Integer getRiskScore() {
        return riskScore;
    }

    public void setRiskScore(Integer riskScore) {
        this.riskScore = riskScore;
    }

    public List<String> getReasons() {
        return reasons;
    }

    public void setReasons(List<String> reasons) {
        this.reasons = reasons;
    }

    public String getRecommendation() {
        return recommendation;
    }

    public void setRecommendation(String recommendation) {
        this.recommendation = recommendation;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public boolean isDemo() {
        return demo;
    }

    public void setDemo(boolean demo) {
        this.demo = demo;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
