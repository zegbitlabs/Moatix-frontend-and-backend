package com.zegbit.moatix.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zegbit.moatix.dto.FeedbackRequest;
import com.zegbit.moatix.dto.FeedbackResponse;
import com.zegbit.moatix.exception.ResourceNotFoundException;
import com.zegbit.moatix.service.CheckOrchestrator;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Member 4: Comprehensive MockMvc Controller Tests for FeedbackController.
 */
@WebMvcTest(FeedbackController.class)
class FeedbackControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private CheckOrchestrator checkOrchestrator;

    @MockBean
    private com.zegbit.moatix.service.FeedbackService feedbackService;

    @Test
    @DisplayName("POST /api/v1/feedback - 201 Created for valid feedback")
    void submitFeedbackValid() throws Exception {
        UUID checkId = UUID.randomUUID();
        UUID feedbackId = UUID.randomUUID();

        FeedbackResponse response = new FeedbackResponse(
            feedbackId, checkId, "INCORRECT_RESULT", "ACCEPTED", Instant.now()
        );

        when(feedbackService.recordFeedback(any(FeedbackRequest.class))).thenReturn(response);

        FeedbackRequest req = new FeedbackRequest(checkId, "INCORRECT_RESULT", "This was actually a phishing attempt");

        mockMvc.perform(post("/api/v1/feedback")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.feedbackId").value(feedbackId.toString()))
            .andExpect(jsonPath("$.status").value("ACCEPTED"));
    }

    @Test
    @DisplayName("POST /api/v1/feedback - 404 Not Found when associated check does not exist")
    void submitFeedbackNotFound() throws Exception {
        UUID checkId = UUID.randomUUID();
        when(feedbackService.recordFeedback(any(FeedbackRequest.class)))
            .thenThrow(new ResourceNotFoundException("Cannot submit feedback for non-existent check: " + checkId));

        FeedbackRequest req = new FeedbackRequest(checkId, "INCORRECT_RESULT", "Comment");

        mockMvc.perform(post("/api/v1/feedback")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
            .andExpect(status().isNotFound())
            .andExpect(jsonPath("$.code").value("NOT_FOUND"))
            .andExpect(jsonPath("$.requestId").exists());
    }

    @Test
    @DisplayName("POST /api/v1/feedback - 400 Bad Request when category is missing")
    void submitFeedbackMissingCategory() throws Exception {
        UUID checkId = UUID.randomUUID();
        FeedbackRequest req = new FeedbackRequest(checkId, null, "Comment");

        mockMvc.perform(post("/api/v1/feedback")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"));
    }
}
