package com.zegbit.moatix.entity;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "feedback")
public class FeedbackEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "check_id", length = 64, nullable = false)
    private String checkId;

    @Column(name = "reason", length = 64, nullable = false)
    private String reason;

    @Column(name = "review_status", length = 32, nullable = false)
    private String reviewStatus = "PENDING";

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    public FeedbackEntity() {
        this.createdAt = OffsetDateTime.now();
    }

    public FeedbackEntity(String checkId, String reason) {
        this.checkId = checkId;
        this.reason = reason;
        this.reviewStatus = "PENDING";
        this.createdAt = OffsetDateTime.now();
    }

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) createdAt = OffsetDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCheckId() { return checkId; }
    public void setCheckId(String checkId) { this.checkId = checkId; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public String getReviewStatus() { return reviewStatus; }
    public void setReviewStatus(String reviewStatus) { this.reviewStatus = reviewStatus; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }
}
