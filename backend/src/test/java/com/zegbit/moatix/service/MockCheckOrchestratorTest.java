package com.zegbit.moatix.service;

import com.zegbit.moatix.dto.CheckResponse;
import com.zegbit.moatix.dto.FeedbackRequest;
import com.zegbit.moatix.dto.FeedbackResponse;
import com.zegbit.moatix.dto.UrlCheckRequest;
import com.zegbit.moatix.exception.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class MockCheckOrchestratorTest {

    private MockCheckOrchestrator orchestrator;

    @BeforeEach
    void setUp() {
        orchestrator = new MockCheckOrchestrator(new FileValidationService());
    }

    @Test
    @DisplayName("Should create and store demo check, then retrieve it")
    void createAndGetCheck() {
        UrlCheckRequest req = new UrlCheckRequest("https://example.com/test");
        CheckResponse created = orchestrator.submitUrlCheck(req);

        assertNotNull(created);
        assertNotNull(created.getCheckId());
        assertEquals("URL", created.getInputType());
        assertEquals("DEMO", created.getStatus());
        assertTrue(created.isDemo());

        UUID checkUuid = UUID.fromString(created.getCheckId());
        CheckResponse retrieved = orchestrator.getCheckResult(checkUuid);

        assertEquals(created.getCheckId(), retrieved.getCheckId());
    }

    @Test
    @DisplayName("Should throw ResourceNotFoundException for unknown check ID")
    void getNonExistentCheck() {
        UUID unknownId = UUID.randomUUID();
        assertThrows(ResourceNotFoundException.class, () -> orchestrator.getCheckResult(unknownId));
    }

    @Test
    @DisplayName("Should submit feedback for existing check")
    void submitFeedback() {
        UrlCheckRequest req = new UrlCheckRequest("https://example.com/test");
        CheckResponse created = orchestrator.submitUrlCheck(req);
        UUID checkUuid = UUID.fromString(created.getCheckId());

        FeedbackRequest feedbackReq = new FeedbackRequest(checkUuid, "INCORRECT_RESULT", "Testing comment");
        FeedbackResponse feedbackRes = orchestrator.submitFeedback(feedbackReq);

        assertNotNull(feedbackRes);
        assertEquals(checkUuid, feedbackRes.getCheckId());
        assertEquals("ACCEPTED", feedbackRes.getStatus());
    }
}
