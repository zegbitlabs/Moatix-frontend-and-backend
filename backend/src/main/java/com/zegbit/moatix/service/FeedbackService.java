package com.zegbit.moatix.service;

import com.zegbit.moatix.dto.FeedbackRequest;
import com.zegbit.moatix.dto.FeedbackResponse;
import com.zegbit.moatix.entity.FeedbackEntity;
import com.zegbit.moatix.entity.ReportEntity;
import com.zegbit.moatix.repository.FeedbackRepository;
import com.zegbit.moatix.repository.ReportRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Service
public class FeedbackService {

    private static final Logger log = LoggerFactory.getLogger(FeedbackService.class);

    private final FeedbackRepository feedbackRepository;
    private final ReportRepository reportRepository;

    public FeedbackService(FeedbackRepository feedbackRepository, ReportRepository reportRepository) {
        this.feedbackRepository = feedbackRepository;
        this.reportRepository = reportRepository;
    }

    @Transactional
    public FeedbackResponse recordFeedback(FeedbackRequest request) {
        String checkId = request.getCheckId() != null ? request.getCheckId().toString() : "GENERAL";
        String category = request.getCategory() != null ? request.getCategory() : "GENERAL_FEEDBACK";

        FeedbackEntity entity = new FeedbackEntity(checkId, category);
        feedbackRepository.save(entity);

        log.info("Recorded user feedback for checkId: {}, category: {}", checkId, category);

        UUID feedbackId = UUID.randomUUID();
        return new FeedbackResponse(
                feedbackId,
                request.getCheckId(),
                "RECEIVED",
                "Feedback has been successfully logged and queued for triage.",
                Instant.now()
        );
    }

    @Transactional
    public FeedbackResponse recordReport(FeedbackRequest request) {
        String reportId = "REP-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        String target = request.getComment() != null ? request.getComment() : "Unspecified scam target";
        String details = request.getCategory() != null ? request.getCategory() : "SUSPICIOUS_CONTENT";

        ReportEntity report = new ReportEntity(reportId, target, details);
        reportRepository.save(report);

        log.info("Recorded public scam report: {}", reportId);

        return new FeedbackResponse(
                UUID.randomUUID(),
                request.getCheckId(),
                "QUEUED",
                "Community report submitted successfully. Report ID: " + reportId,
                Instant.now()
        );
    }
}
