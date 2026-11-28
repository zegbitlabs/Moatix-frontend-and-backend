package com.zegbit.moatix.dto;

import java.time.Instant;
import java.util.UUID;

public class FeedbackResponse {

    private UUID feedbackId;
    private UUID checkId;
    private String category;
    private String status;
    private Instant createdAt;

    public FeedbackResponse() {
    }

    public FeedbackResponse(UUID feedbackId, UUID checkId, String category, String status, Instant createdAt) {
        this.feedbackId = feedbackId;
        this.checkId = checkId;
        this.category = category;
        this.status = status;
        this.createdAt = createdAt;
    }

    public UUID getFeedbackId() {
        return feedbackId;
    }

    public void setFeedbackId(UUID feedbackId) {
        this.feedbackId = feedbackId;
    }

    public UUID getCheckId() {
        return checkId;
    }

    public void setCheckId(UUID checkId) {
        this.checkId = checkId;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
