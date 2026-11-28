package com.zegbit.moatix.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.UUID;

@Schema(description = "Request payload for submitting feedback or reporting inaccurate results")
public class FeedbackRequest {

    @Schema(description = "UUID of the associated check record", example = "550e8400-e29b-41d4-a716-446655440000")
    private UUID checkId;

    @NotBlank(message = "Feedback category is required (e.g. INCORRECT_RESULT, REPORT_SCAM, HELPFUL, NOT_HELPFUL, OTHER)")
    @JsonAlias({"feedbackType", "category"})
    @JsonProperty("category")
    @Schema(description = "Category of feedback", example = "INCORRECT_RESULT", requiredMode = Schema.RequiredMode.REQUIRED)
    private String category;

    @Size(max = 1000, message = "Comment cannot exceed 1000 characters")
    @Schema(description = "Optional user comment or reason for feedback", example = "The displayed result did not match my experience.")
    private String comment;

    public FeedbackRequest() {
    }

    public FeedbackRequest(UUID checkId, String category, String comment) {
        this.checkId = checkId;
        this.category = category;
        this.comment = comment;
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

    public String getFeedbackType() {
        return category;
    }

    public void setFeedbackType(String feedbackType) {
        this.category = feedbackType;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
