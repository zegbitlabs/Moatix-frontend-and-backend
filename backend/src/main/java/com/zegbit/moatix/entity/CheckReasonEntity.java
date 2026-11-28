package com.zegbit.moatix.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "check_reasons")
public class CheckReasonEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "result_id", nullable = false)
    private CheckResultEntity result;

    @Column(name = "code", length = 64, nullable = false)
    private String code = "SIGNAL";

    @Column(name = "description", columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(name = "severity", length = 32, nullable = false)
    private String severity = "INFO";

    public CheckReasonEntity() {
    }

    public CheckReasonEntity(String description) {
        this.description = description;
    }

    public CheckReasonEntity(String code, String description, String severity) {
        this.code = code != null ? code : "SIGNAL";
        this.description = description;
        this.severity = severity != null ? severity : "INFO";
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public CheckResultEntity getResult() { return result; }
    public void setResult(CheckResultEntity result) { this.result = result; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }
}
