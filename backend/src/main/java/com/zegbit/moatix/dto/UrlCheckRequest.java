package com.zegbit.moatix.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Schema(description = "Request payload for URL scam analysis")
public class UrlCheckRequest {

    @NotBlank(message = "URL is required")
    @Size(max = 2048, message = "URL cannot exceed 2048 characters")
    @Pattern(
        regexp = "^https?://[a-zA-Z0-9][-a-zA-Z0-9*.]*\\.[a-zA-Z]{2,}(/.*)?$",
        message = "Please enter a valid HTTP or HTTPS URL (e.g., https://example.com)"
    )
    @Schema(description = "The target HTTP or HTTPS URL to verify", example = "https://example.com/login", requiredMode = Schema.RequiredMode.REQUIRED)
    private String url;

    @Size(max = 10, message = "Language code cannot exceed 10 characters")
    @Schema(description = "Optional language code (e.g., en, si, ta)", example = "en")
    private String language;

    public UrlCheckRequest() {
    }

    public UrlCheckRequest(String url) {
        this.url = url;
    }

    public UrlCheckRequest(String url, String language) {
        this.url = url;
        this.language = language;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }
}
