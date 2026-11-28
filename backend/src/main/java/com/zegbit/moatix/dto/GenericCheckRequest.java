package com.zegbit.moatix.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class GenericCheckRequest {

    @NotBlank(message = "inputType is required (URL, MESSAGE, PHONE, IMAGE, FILE)")
    private String inputType;

    @NotBlank(message = "content is required")
    @Size(max = 10000, message = "content cannot exceed 10000 characters")
    private String content;

    @Size(max = 10, message = "language code cannot exceed 10 characters")
    private String language;

    public GenericCheckRequest() {
    }

    public GenericCheckRequest(String inputType, String content, String language) {
        this.inputType = inputType;
        this.content = content;
        this.language = language;
    }

    public String getInputType() {
        return inputType;
    }

    public void setInputType(String inputType) {
        this.inputType = inputType;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }
}
