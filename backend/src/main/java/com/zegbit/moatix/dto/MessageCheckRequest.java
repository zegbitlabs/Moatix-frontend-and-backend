package com.zegbit.moatix.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "Request payload for suspicious message text analysis (SMS, WhatsApp, email)")
public class MessageCheckRequest {

    @NotBlank(message = "Message content is required and cannot be empty or whitespace-only")
    @Size(max = 5000, message = "Message content cannot exceed 5000 characters")
    @JsonAlias({"message", "content"})
    @JsonProperty("content")
    @Schema(description = "The raw text content of the message", example = "Your account will be blocked. Send your OTP immediately.", requiredMode = Schema.RequiredMode.REQUIRED)
    private String content;

    @Size(max = 10, message = "Language code cannot exceed 10 characters")
    @Schema(description = "Optional language preference (en, si, ta)", example = "en")
    private String language;

    public MessageCheckRequest() {
    }

    public MessageCheckRequest(String content, String language) {
        this.content = content;
        this.language = language;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    // Convenience alias getter/setter for compatibility
    public String getMessage() {
        return content;
    }

    public void setMessage(String message) {
        this.content = message;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }
}
