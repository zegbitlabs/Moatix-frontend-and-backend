package com.zegbit.moatix.entity;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "checks")
public class CheckEntity {

    @Id
    @Column(name = "check_id", length = 64, nullable = false)
    private String checkId;

    @Column(name = "input_type", length = 32, nullable = false)
    private String inputType;

    @Column(name = "status", length = 32, nullable = false)
    private String status;

    @Column(name = "input_hash", length = 128, nullable = false)
    private String inputHash;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    @OneToOne(mappedBy = "check", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private CheckResultEntity result;

    public CheckEntity() {
    }

    public CheckEntity(String checkId, String inputType, String status, String inputHash) {
        this.checkId = checkId;
        this.inputType = inputType;
        this.status = status;
        this.inputHash = inputHash;
        this.createdAt = OffsetDateTime.now();
        this.updatedAt = OffsetDateTime.now();
    }

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) createdAt = OffsetDateTime.now();
        if (updatedAt == null) updatedAt = OffsetDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = OffsetDateTime.now();
    }

    public String getCheckId() { return checkId; }
    public void setCheckId(String checkId) { this.checkId = checkId; }

    public String getInputType() { return inputType; }
    public void setInputType(String inputType) { this.inputType = inputType; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getInputHash() { return inputHash; }
    public void setInputHash(String inputHash) { this.inputHash = inputHash; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }

    public OffsetDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(OffsetDateTime updatedAt) { this.updatedAt = updatedAt; }

    public CheckResultEntity getResult() { return result; }
    public void setResult(CheckResultEntity result) {
        this.result = result;
        if (result != null) {
            result.setCheck(this);
        }
    }
}
