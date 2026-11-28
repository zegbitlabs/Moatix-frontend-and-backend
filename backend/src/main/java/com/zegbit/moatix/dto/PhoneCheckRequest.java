package com.zegbit.moatix.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Schema(description = "Request payload for suspicious phone number lookup")
public class PhoneCheckRequest {

    @NotBlank(message = "Phone number is required")
    @Size(min = 7, max = 20, message = "Phone number must be between 7 and 20 characters")
    @Pattern(
        regexp = "^\\+?[0-9\\s\\-().]{7,20}$",
        message = "Please provide a valid phone number format (e.g., +94771234567)"
    )
    @Schema(description = "International or national phone number string", example = "+94771234567", requiredMode = Schema.RequiredMode.REQUIRED)
    private String phoneNumber;

    @Size(max = 10, message = "Country code cannot exceed 10 characters")
    @Schema(description = "ISO 3166-1 alpha-2 country code", example = "LK")
    private String countryCode;

    public PhoneCheckRequest() {
    }

    public PhoneCheckRequest(String phoneNumber, String countryCode) {
        this.phoneNumber = phoneNumber;
        this.countryCode = countryCode;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }
}
