package com.zegbit.moatix.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zegbit.moatix.dto.*;
import com.zegbit.moatix.exception.InvalidFileException;
import com.zegbit.moatix.exception.ResourceNotFoundException;
import com.zegbit.moatix.service.CheckOrchestrator;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;
import java.util.ArrayList;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Member 4: Comprehensive MockMvc Controller Tests for CheckController.
 */
@WebMvcTest(CheckController.class)
class CheckControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private CheckOrchestrator checkOrchestrator;

    // --- 1. URL CHECK ENDPOINT TESTS ---

    @Test
    @DisplayName("POST /api/v1/checks/url - 201 Created for valid HTTPS URL")
    void checkUrlValidHttps() throws Exception {
        UUID checkId = UUID.randomUUID();
        CheckResponse response = new CheckResponse(
            checkId.toString(), "URL", "DEMO", null, null,
            new ArrayList<>(), "Demonstration only", "mock", true, Instant.now()
        );

        when(checkOrchestrator.submitUrlCheck(any(UrlCheckRequest.class))).thenReturn(response);

        UrlCheckRequest req = new UrlCheckRequest("https://scam-bank-login.com/verify", "en");

        mockMvc.perform(post("/api/v1/checks/url")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.checkId").value(checkId.toString()))
            .andExpect(jsonPath("$.inputType").value("URL"))
            .andExpect(jsonPath("$.status").value("DEMO"))
            .andExpect(jsonPath("$.demo").value(true));
    }

    @Test
    @DisplayName("POST /api/v1/checks/url - 201 Created for valid HTTP URL")
    void checkUrlValidHttp() throws Exception {
        UUID checkId = UUID.randomUUID();
        CheckResponse response = new CheckResponse(
            checkId.toString(), "URL", "DEMO", null, null,
            new ArrayList<>(), "Demonstration only", "mock", true, Instant.now()
        );

        when(checkOrchestrator.submitUrlCheck(any(UrlCheckRequest.class))).thenReturn(response);

        UrlCheckRequest req = new UrlCheckRequest("http://suspicious-discount.xyz/promo");

        mockMvc.perform(post("/api/v1/checks/url")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.checkId").value(checkId.toString()));
    }

    @Test
    @DisplayName("POST /api/v1/checks/url - 400 Bad Request for missing URL")
    void checkUrlMissing() throws Exception {
        mockMvc.perform(post("/api/v1/checks/url")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{}"))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"))
            .andExpect(jsonPath("$.fieldErrors").isArray());
    }

    @Test
    @DisplayName("POST /api/v1/checks/url - 400 Bad Request for malformed URL")
    void checkUrlMalformed() throws Exception {
        UrlCheckRequest req = new UrlCheckRequest("not-a-valid-url");

        mockMvc.perform(post("/api/v1/checks/url")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"));
    }

    @Test
    @DisplayName("POST /api/v1/checks/url - 400 Bad Request for unsupported scheme (e.g. ftp://)")
    void checkUrlUnsupportedScheme() throws Exception {
        UrlCheckRequest req = new UrlCheckRequest("ftp://files.example.com/data");

        mockMvc.perform(post("/api/v1/checks/url")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"));
    }

    // --- 2. MESSAGE CHECK ENDPOINT TESTS ---

    @Test
    @DisplayName("POST /api/v1/checks/message - 201 Created for valid message")
    void checkMessageValid() throws Exception {
        UUID checkId = UUID.randomUUID();
        CheckResponse response = new CheckResponse(
            checkId.toString(), "MESSAGE", "DEMO", null, null,
            new ArrayList<>(), "Demonstration only", "mock", true, Instant.now()
        );

        when(checkOrchestrator.submitMessageCheck(any(MessageCheckRequest.class))).thenReturn(response);

        MessageCheckRequest req = new MessageCheckRequest("Your bank account will be blocked. Send OTP immediately.", "en");

        mockMvc.perform(post("/api/v1/checks/message")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.checkId").value(checkId.toString()))
            .andExpect(jsonPath("$.inputType").value("MESSAGE"));
    }

    @Test
    @DisplayName("POST /api/v1/checks/message - 400 Bad Request for whitespace-only message")
    void checkMessageWhitespaceOnly() throws Exception {
        MessageCheckRequest req = new MessageCheckRequest("   \n\t  ", "en");

        mockMvc.perform(post("/api/v1/checks/message")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"));
    }

    // --- 3. PHONE CHECK ENDPOINT TESTS ---

    @Test
    @DisplayName("POST /api/v1/checks/phone - 201 Created for valid international phone")
    void checkPhoneValid() throws Exception {
        UUID checkId = UUID.randomUUID();
        CheckResponse response = new CheckResponse(
            checkId.toString(), "PHONE", "DEMO", null, null,
            new ArrayList<>(), "Demonstration only", "mock", true, Instant.now()
        );

        when(checkOrchestrator.submitPhoneCheck(any(PhoneCheckRequest.class))).thenReturn(response);

        PhoneCheckRequest req = new PhoneCheckRequest("+94771234567", "LK");

        mockMvc.perform(post("/api/v1/checks/phone")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.checkId").value(checkId.toString()))
            .andExpect(jsonPath("$.inputType").value("PHONE"));
    }

    @Test
    @DisplayName("POST /api/v1/checks/phone - 400 Bad Request for invalid phone format")
    void checkPhoneInvalid() throws Exception {
        PhoneCheckRequest req = new PhoneCheckRequest("abc-not-a-number", "LK");

        mockMvc.perform(post("/api/v1/checks/phone")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"));
    }

    // --- 4. IMAGE UPLOAD ENDPOINT TESTS ---

    @Test
    @DisplayName("POST /api/v1/checks/image - 201 Created for valid image upload")
    void checkImageValid() throws Exception {
        UUID checkId = UUID.randomUUID();
        CheckResponse response = new CheckResponse(
            checkId.toString(), "IMAGE", "DEMO", null, null,
            new ArrayList<>(), "Demonstration only", "mock", true, Instant.now()
        );

        when(checkOrchestrator.submitImageCheck(any(), any())).thenReturn(response);

        MockMultipartFile file = new MockMultipartFile(
            "file", "suspicious-screenshot.png", "image/png", new byte[]{1, 2, 3, 4}
        );

        mockMvc.perform(multipart("/api/v1/checks/image")
                .file(file)
                .param("language", "en"))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.checkId").value(checkId.toString()))
            .andExpect(jsonPath("$.inputType").value("IMAGE"));
    }

    @Test
    @DisplayName("POST /api/v1/checks/image - 400 Bad Request for unsupported file format")
    void checkImageUnsupported() throws Exception {
        when(checkOrchestrator.submitImageCheck(any(), any()))
            .thenThrow(new InvalidFileException("Unsupported image type: application/x-msdownload"));

        MockMultipartFile file = new MockMultipartFile(
            "file", "malicious.exe", "application/x-msdownload", new byte[]{1, 2, 3}
        );

        mockMvc.perform(multipart("/api/v1/checks/image").file(file))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.code").value("INVALID_FILE"));
    }

    // --- 5. FILE UPLOAD ENDPOINT TESTS ---

    @Test
    @DisplayName("POST /api/v1/checks/file - 201 Created for valid document upload")
    void checkFileValid() throws Exception {
        UUID checkId = UUID.randomUUID();
        CheckResponse response = new CheckResponse(
            checkId.toString(), "FILE", "DEMO", null, null,
            new ArrayList<>(), "Demonstration only", "mock", true, Instant.now()
        );

        when(checkOrchestrator.submitFileCheck(any())).thenReturn(response);

        MockMultipartFile file = new MockMultipartFile(
            "file", "invoice.pdf", "application/pdf", new byte[]{37, 80, 68, 70}
        );

        mockMvc.perform(multipart("/api/v1/checks/file").file(file))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.checkId").value(checkId.toString()))
            .andExpect(jsonPath("$.inputType").value("FILE"));
    }

    // --- 6. GET RESULT ENDPOINT TESTS ---

    @Test
    @DisplayName("GET /api/v1/checks/{checkId} - 200 OK for existing check")
    void getCheckSuccess() throws Exception {
        UUID checkId = UUID.randomUUID();
        CheckResponse response = new CheckResponse(
            checkId.toString(), "URL", "DEMO", null, null,
            new ArrayList<>(), "Demonstration only", "mock", true, Instant.now()
        );

        when(checkOrchestrator.getCheckResult(checkId)).thenReturn(response);

        mockMvc.perform(get("/api/v1/checks/" + checkId))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.checkId").value(checkId.toString()))
            .andExpect(jsonPath("$.status").value("DEMO"));
    }

    @Test
    @DisplayName("GET /api/v1/checks/{checkId} - 404 Not Found for unknown check ID")
    void getCheckNotFound() throws Exception {
        UUID checkId = UUID.randomUUID();
        when(checkOrchestrator.getCheckResult(checkId))
            .thenThrow(new ResourceNotFoundException("Check with ID " + checkId + " was not found"));

        mockMvc.perform(get("/api/v1/checks/" + checkId))
            .andExpect(status().isNotFound())
            .andExpect(jsonPath("$.code").value("NOT_FOUND"))
            .andExpect(jsonPath("$.requestId").exists());
    }
}
