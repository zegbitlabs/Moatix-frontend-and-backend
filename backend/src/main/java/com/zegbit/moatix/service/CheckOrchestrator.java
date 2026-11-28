package com.zegbit.moatix.service;

import com.zegbit.moatix.dto.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

/**
 * Service Contract for Member 4 (REST Controllers) and Member 5 (Business & Persistence Services).
 * Controllers call this contract; Member 5 implements the real persistence and orchestration logic behind it.
 */
public interface CheckOrchestrator {

    /**
     * Coordinate and assess a URL check request.
     */
    CheckResponse submitUrlCheck(UrlCheckRequest request);

    /**
     * Coordinate and assess a text message check request.
     */
    CheckResponse submitMessageCheck(MessageCheckRequest request);

    /**
     * Coordinate and assess a phone number reputation check request.
     */
    CheckResponse submitPhoneCheck(PhoneCheckRequest request);

    /**
     * Coordinate and assess an image upload check request.
     */
    CheckResponse submitImageCheck(MultipartFile file, String language);

    /**
     * Coordinate and assess a document/file upload check request.
     */
    CheckResponse submitFileCheck(MultipartFile file);

    /**
     * Retrieve the outcome and lifecycle status of an existing check.
     */
    CheckResponse getCheckResult(UUID checkId);

    /**
     * Submit user feedback or an incorrect classification report.
     */
    FeedbackResponse submitFeedback(FeedbackRequest request);
}
