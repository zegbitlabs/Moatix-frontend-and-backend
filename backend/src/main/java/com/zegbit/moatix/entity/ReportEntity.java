package com.zegbit.moatix.entity;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "reports")
public class ReportEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "report_id", length = 64, nullable = false, unique = true)
    private String reportId;

    @Column(name = "target", columnDefinition = "TEXT", nullable = false)
    private String target;

    @Column(name = "allegation_details", columnDefinition = "TEXT")
    private String allegationDetails;

    @Column(name = "status", length = 32, nullable = false)
    private String status = "PENDING_REVIEW";

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    public ReportEntity() {
        this.createdAt = OffsetDateTime.now();
    }

    public ReportEntity(String reportId, String target, String allegationDetails) {
        this.reportId = reportId;
        this.target = target;
        this.allegationDetails = allegationDetails;
        this.status = "PENDING_REVIEW";
        this.createdAt = OffsetDateTime.now();
    }

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) createdAt = OffsetDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getReportId() { return reportId; }
    public void setReportId(String reportId) { this.reportId = reportId; }

    public String getTarget() { return target; }
    public void setTarget(String target) { this.target = target; }

    public String getAllegationDetails() { return allegationDetails; }
    public void setAllegationDetails(String allegationDetails) { this.allegationDetails = allegationDetails; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }
}
