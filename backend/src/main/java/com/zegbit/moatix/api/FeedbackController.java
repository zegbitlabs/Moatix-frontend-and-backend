package com.zegbit.moatix.api;

import com.zegbit.moatix.dto.ApiError;
import com.zegbit.moatix.dto.FeedbackRequest;
import com.zegbit.moatix.dto.FeedbackResponse;
import com.zegbit.moatix.service.CheckOrchestrator;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Member 4: REST Controller for User Feedback & Scam Reports.
 */
@RestController
@RequestMapping("/api/v1")
@Tag(name = "Feedback API", description = "Endpoints for user feedback and scam report submissions (Member 4)")
public class FeedbackController {

    private final CheckOrchestrator checkOrchestrator;
    private final com.zegbit.moatix.service.FeedbackService feedbackService;

    public FeedbackController(CheckOrchestrator checkOrchestrator, com.zegbit.moatix.service.FeedbackService feedbackService) {
        this.checkOrchestrator = checkOrchestrator;
        this.feedbackService = feedbackService;
    }

    @PostMapping(value = "/feedback", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Submit user feedback or report an incorrect classification", description = "Associates user feedback with a valid checkId. Requires review before altering reputation records.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Feedback accepted and recorded", content = @Content(schema = @Schema(implementation = FeedbackResponse.class))),
            @ApiResponse(responseCode = "400", description = "Invalid request structure or missing fields", content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "404", description = "Associated check record does not exist", content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<FeedbackResponse> submitFeedback(@Valid @RequestBody FeedbackRequest request) {
        FeedbackResponse response = feedbackService.recordFeedback(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping(value = "/reports", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Submit general suspicious content report - Frontend compatibility", description = "Allows submitting suspicious reports without an initial checkId.")
    public ResponseEntity<FeedbackResponse> submitReport(@RequestBody FeedbackRequest request) {
        if (request.getCategory() == null || request.getCategory().isBlank()) {
            request.setCategory("SUSPICIOUS_CONTENT");
        }
        FeedbackResponse response = feedbackService.recordReport(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
