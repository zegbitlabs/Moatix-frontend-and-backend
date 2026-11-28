package com.zegbit.moatix.service;

import com.zegbit.moatix.dto.*;
import com.zegbit.moatix.entity.CheckEntity;
import com.zegbit.moatix.entity.CheckReasonEntity;
import com.zegbit.moatix.entity.CheckResultEntity;
import com.zegbit.moatix.exception.ResourceNotFoundException;
import com.zegbit.moatix.repository.CheckRepository;
import com.zegbit.moatix.service.detector.DetectionResult;
import com.zegbit.moatix.service.detector.DetectorAdapterRegistry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Member 5: Primary Database-Backed Check Orchestrator.
 * Orchestrates threat assessment, privacy-preserving input hashing,
 * PostgreSQL persistence via JPA, and adapter dispatching.
 */
@Service
@Primary
public class DatabaseCheckOrchestrator implements CheckOrchestrator {

    private static final Logger log = LoggerFactory.getLogger(DatabaseCheckOrchestrator.class);

    private final CheckRepository checkRepository;
    private final DetectorAdapterRegistry detectorRegistry;
    private final FeedbackService feedbackService;
    private final FileValidationService fileValidationService;

    public DatabaseCheckOrchestrator(
            CheckRepository checkRepository,
            DetectorAdapterRegistry detectorRegistry,
            FeedbackService feedbackService,
            FileValidationService fileValidationService
    ) {
        this.checkRepository = checkRepository;
        this.detectorRegistry = detectorRegistry;
        this.feedbackService = feedbackService;
        this.fileValidationService = fileValidationService;
    }

    @Override
    @Transactional
    public CheckResponse submitUrlCheck(UrlCheckRequest request) {
        log.info("Processing URL check with database persistence (hash: {})", sha256(request.getUrl()));
        return executeAndPersist("URL", request.getUrl());
    }

    @Override
    @Transactional
    public CheckResponse submitMessageCheck(MessageCheckRequest request) {
        log.info("Processing Message check with database persistence (lang: {})", request.getLanguage());
        return executeAndPersist("MESSAGE", request.getContent());
    }

    @Override
    @Transactional
    public CheckResponse submitPhoneCheck(PhoneCheckRequest request) {
        log.info("Processing Phone check with database persistence (country: {})", request.getCountryCode());
        String fullNumber = (request.getCountryCode() != null ? request.getCountryCode() : "") + request.getPhoneNumber();
        return executeAndPersist("PHONE", fullNumber);
    }

    @Override
    @Transactional
    public CheckResponse submitImageCheck(MultipartFile file, String language) {
        fileValidationService.validateImage(file);
        log.info("Processing Image check with database persistence (file: {}, size: {} bytes)",
                file.getOriginalFilename(), file.getSize());
        String contentDescriptor = file.getOriginalFilename() + ":" + file.getSize();
        return executeAndPersist("IMAGE", contentDescriptor);
    }

    @Override
    @Transactional
    public CheckResponse submitFileCheck(MultipartFile file) {
        fileValidationService.validateDocument(file);
        log.info("Processing File check with database persistence (file: {}, size: {} bytes)",
                file.getOriginalFilename(), file.getSize());
        String contentDescriptor = file.getOriginalFilename() + ":" + file.getSize();
        return executeAndPersist("FILE", contentDescriptor);
    }

    @Override
    @Transactional(readOnly = true)
    public CheckResponse getCheckResult(UUID checkId) {
        Optional<CheckEntity> opt = checkRepository.findByCheckId(checkId.toString());
        if (opt.isEmpty()) {
            throw new ResourceNotFoundException("Check record not found with id: " + checkId);
        }

        CheckEntity entity = opt.get();
        CheckResultEntity res = entity.getResult();
        List<String> reasons = res != null && res.getReasons() != null
                ? res.getReasons().stream().map(CheckReasonEntity::getDescription).toList()
                : List.of();

        return new CheckResponse(
                entity.getCheckId(),
                entity.getInputType(),
                entity.getStatus(),
                res != null ? res.getVerdict() : "PENDING",
                res != null ? res.getRiskScore() : null,
                reasons,
                res != null ? res.getRecommendation() : "Analysis pending or unavailable.",
                res != null ? res.getOrigin() : "mock",
                true,
                entity.getCreatedAt().toInstant()
        );
    }

    @Override
    @Transactional
    public FeedbackResponse submitFeedback(FeedbackRequest request) {
        return feedbackService.recordFeedback(request);
    }

    private CheckResponse executeAndPersist(String inputType, String rawContent) {
        UUID checkId = UUID.randomUUID();
        String hash = sha256(rawContent);

        // 1. Evaluate via Detector Adapter Registry
        DetectionResult result = detectorRegistry.dispatch(inputType, rawContent);

        // 2. Map and Persist Check Entity
        CheckEntity checkEntity = new CheckEntity(checkId.toString(), inputType, "COMPLETED", hash);
        CheckResultEntity resultEntity = new CheckResultEntity(
                checkEntity,
                result.verdict(),
                result.riskScore(),
                result.recommendation(),
                result.origin()
        );

        if (result.reasons() != null) {
            for (String r : result.reasons()) {
                resultEntity.addReason(new CheckReasonEntity(r));
            }
        }

        checkEntity.setResult(resultEntity);
        checkRepository.save(checkEntity);

        return new CheckResponse(
                checkId.toString(),
                inputType,
                "COMPLETED",
                result.verdict(),
                result.riskScore(),
                result.reasons() != null ? result.reasons() : List.of(),
                result.recommendation(),
                "mock",
                true, // Demo mode explicitly flagged
                Instant.now()
        );
    }

    private String sha256(String input) {
        if (input == null) return "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(input.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            return Integer.toHexString(input.hashCode());
        }
    }
}
