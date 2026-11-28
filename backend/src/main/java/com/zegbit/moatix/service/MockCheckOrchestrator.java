package com.zegbit.moatix.service;

import com.zegbit.moatix.dto.*;
import com.zegbit.moatix.exception.ResourceNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Isolated Mock Implementation of CheckOrchestrator for Member 4.
 * Provides in-memory test doubles so the REST API layer functions standalone
 * without requiring PostgreSQL, JPA repositories, or external AI/cybersecurity engines.
 * Member 5 will replace this with their database-backed orchestration service.
 */
@Service
public class MockCheckOrchestrator implements CheckOrchestrator {

    private static final Logger log = LoggerFactory.getLogger(MockCheckOrchestrator.class);

    private static final String DEMO_RECOMMENDATION =
        "Demonstration only - no real security analysis was performed. Specialist detection services will be integrated.";

    private final FileValidationService fileValidationService;

    // In-memory stores strictly for local mock demonstration
    private final Map<UUID, CheckResponse> mockCheckStore = new ConcurrentHashMap<>();
    private final Map<UUID, FeedbackResponse> mockFeedbackStore = new ConcurrentHashMap<>();

    public MockCheckOrchestrator(FileValidationService fileValidationService) {
        this.fileValidationService = fileValidationService;
    }

    @Override
    public CheckResponse submitUrlCheck(UrlCheckRequest request) {
        log.info("Mock Orchestrator: Received URL check request (length: {})", request.getUrl().length());
        return createDemoResponse("URL");
    }

    @Override
    public CheckResponse submitMessageCheck(MessageCheckRequest request) {
        log.info("Mock Orchestrator: Received message check request (length: {}, lang: {})",
            request.getContent().length(), request.getLanguage());
        return createDemoResponse("MESSAGE");
    }

    @Override
    public CheckResponse submitPhoneCheck(PhoneCheckRequest request) {
        log.info("Mock Orchestrator: Received phone check request (country: {})", request.getCountryCode());
        return createDemoResponse("PHONE");
    }

    @Override
    public CheckResponse submitImageCheck(MultipartFile file, String language) {
        fileValidationService.validateImage(file);
        log.info("Mock Orchestrator: Received image upload check (name: {}, size: {} bytes)",
            file.getOriginalFilename(), file.getSize());
        return createDemoResponse("IMAGE");
    }

    @Override
    public CheckResponse submitFileCheck(MultipartFile file) {
        fileValidationService.validateDocument(file);
        log.info("Mock Orchestrator: Received document upload check (name: {}, size: {} bytes)",
            file.getOriginalFilename(), file.getSize());
        return createDemoResponse("FILE");
    }

    @Override
    public CheckResponse getCheckResult(UUID checkId) {
        CheckResponse response = mockCheckStore.get(checkId);
        if (response == null) {
            throw new ResourceNotFoundException("Check with ID " + checkId + " was not found");
        }
        return response;
    }

    @Override
    public FeedbackResponse submitFeedback(FeedbackRequest request) {
        if (!mockCheckStore.containsKey(request.getCheckId())) {
            throw new ResourceNotFoundException("Cannot submit feedback for non-existent check: " + request.getCheckId());
        }

        UUID feedbackId = UUID.randomUUID();
        FeedbackResponse response = new FeedbackResponse(
            feedbackId,
            request.getCheckId(),
            request.getCategory(),
            "ACCEPTED",
            Instant.now()
        );

        mockFeedbackStore.put(feedbackId, response);
        log.info("Mock Orchestrator: Recorded feedback ID: {} for check ID: {}", feedbackId, request.getCheckId());
        return response;
    }

    private CheckResponse createDemoResponse(String inputType) {
        UUID checkId = UUID.randomUUID();
        CheckResponse response = new CheckResponse(
            checkId.toString(),
            inputType,
            "DEMO",
            null,
            null,
            new ArrayList<>(),
            DEMO_RECOMMENDATION,
            "mock",
            true,
            Instant.now()
        );
        mockCheckStore.put(checkId, response);
        return response;
    }
}
