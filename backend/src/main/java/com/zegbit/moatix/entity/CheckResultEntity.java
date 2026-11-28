package com.zegbit.moatix.entity;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "check_results")
public class CheckResultEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "check_id", referencedColumnName = "check_id", nullable = false)
    private CheckEntity check;

    @Column(name = "verdict", length = 32)
    private String verdict;

    @Column(name = "risk_score")
    private Integer riskScore;

    @Column(name = "recommendation", columnDefinition = "TEXT")
    private String recommendation;

    @Column(name = "origin", length = 32, nullable = false)
    private String origin = "DEMO";

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @OneToMany(mappedBy = "result", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<CheckReasonEntity> reasons = new ArrayList<>();

    public CheckResultEntity() {
        this.createdAt = OffsetDateTime.now();
    }

    public CheckResultEntity(CheckEntity check, String verdict, Integer riskScore, String recommendation, String origin) {
        this.check = check;
        this.verdict = verdict;
        this.riskScore = riskScore;
        this.recommendation = recommendation;
        this.origin = origin != null ? origin : "DEMO";
        this.createdAt = OffsetDateTime.now();
    }

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) createdAt = OffsetDateTime.now();
    }

    public void addReason(CheckReasonEntity reason) {
        reasons.add(reason);
        reason.setResult(this);
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public CheckEntity getCheck() { return check; }
    public void setCheck(CheckEntity check) { this.check = check; }

    public String getVerdict() { return verdict; }
    public void setVerdict(String verdict) { this.verdict = verdict; }

    public Integer getRiskScore() { return riskScore; }
    public void setRiskScore(Integer riskScore) { this.riskScore = riskScore; }

    public String getRecommendation() { return recommendation; }
    public void setRecommendation(String recommendation) { this.recommendation = recommendation; }

    public String getOrigin() { return origin; }
    public void setOrigin(String origin) { this.origin = origin; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }

    public List<CheckReasonEntity> getReasons() { return reasons; }
    public void setReasons(List<CheckReasonEntity> reasons) { this.reasons = reasons; }
}
