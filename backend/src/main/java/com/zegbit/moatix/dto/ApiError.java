package com.zegbit.moatix.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Schema(description = "Standard API error response payload")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiError {

    @Schema(description = "Machine-readable error code", example = "VALIDATION_ERROR")
    private String code;

    @Schema(description = "Human-readable error description", example = "The URL format is invalid.")
    private String message;

    @Schema(description = "ISO 8601 timestamp when the error occurred", example = "2026-11-19T10:00:00Z")
    private Instant timestamp;

    @Schema(description = "Unique correlation request ID for log tracking", example = "req-12345678")
    private String requestId;

    @Schema(description = "List of specific field validation failures")
    private List<FieldErrorItem> fieldErrors = new ArrayList<>();

    public ApiError() {
        this.timestamp = Instant.now();
    }

    public ApiError(String code, String message, String requestId) {
        this.code = code;
        this.message = message;
        this.requestId = requestId;
        this.timestamp = Instant.now();
    }

    public ApiError(String code, String message, List<FieldErrorItem> fieldErrors, String requestId) {
        this.code = code;
        this.message = message;
        this.fieldErrors = fieldErrors != null ? fieldErrors : new ArrayList<>();
        this.requestId = requestId;
        this.timestamp = Instant.now();
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public String getRequestId() {
        return requestId;
    }

    public void setRequestId(String requestId) {
        this.requestId = requestId;
    }

    public List<FieldErrorItem> getFieldErrors() {
        return fieldErrors;
    }

    public void setFieldErrors(List<FieldErrorItem> fieldErrors) {
        this.fieldErrors = fieldErrors;
    }

    @Schema(description = "Field-level validation error detail")
    public static class FieldErrorItem {
        @Schema(description = "Name of the invalid property", example = "url")
        private String field;

        @Schema(description = "Validation failure reason", example = "Please enter a valid HTTP or HTTPS URL")
        private String message;

        public FieldErrorItem() {
        }

        public FieldErrorItem(String field, String message) {
            this.field = field;
            this.message = message;
        }

        public String getField() {
            return field;
        }

        public void setField(String field) {
            this.field = field;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}
