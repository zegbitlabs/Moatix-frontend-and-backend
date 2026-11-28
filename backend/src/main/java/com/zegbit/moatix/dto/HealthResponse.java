package com.zegbit.moatix.dto;

import java.time.Instant;

public class HealthResponse {

    private String status;
    private String environment;
    private Instant timestamp;

    public HealthResponse() {
    }

    public HealthResponse(String status, String environment, Instant timestamp) {
        this.status = status;
        this.environment = environment;
        this.timestamp = timestamp;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getEnvironment() {
        return environment;
    }

    public void setEnvironment(String environment) {
        this.environment = environment;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }
}
