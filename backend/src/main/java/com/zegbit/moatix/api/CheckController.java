package com.zegbit.moatix.api;

import com.zegbit.moatix.dto.*;
import com.zegbit.moatix.service.CheckOrchestrator;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
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
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

/**
 * Member 4: REST Controller for Scam Checks.
 * Exposes endpoints for URL, Message, Phone, Image, and File checking.
 * Depends strictly on the CheckOrchestrator service abstraction.
 */
@RestController
@RequestMapping("/api/v1/checks")
@Tag(name = "Scam Checks API", description = "Endpoints for initiating and querying scam assessment workflows (Member 4)")
public class CheckController {

    private final CheckOrchestrator checkOrchestrator;

    public CheckController(CheckOrchestrator checkOrchestrator) {
        this.checkOrchestrator = checkOrchestrator;
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
        summary = "Submit a unified text check (URL, MESSAGE, or PHONE) - Frontend compatibility",
        description = "Routes the check based on inputType (URL, MESSAGE, PHONE) to the appropriate workflow."
    )
    public ResponseEntity<CheckResponse> checkGeneric(@Valid @RequestBody GenericCheckRequest request) {
        String type = request.getInputType() != null ? request.getInputType().toUpperCase().trim() : "";
        CheckResponse response;
        switch (type) {
            case "URL" -> response = checkOrchestrator.submitUrlCheck(new UrlCheckRequest(request.getContent(), request.getLanguage()));
            case "MESSAGE" -> response = checkOrchestrator.submitMessageCheck(new MessageCheckRequest(request.getContent(), request.getLanguage()));
            case "PHONE" -> response = checkOrchestrator.submitPhoneCheck(new PhoneCheckRequest(request.getContent(), null));
            default -> throw new IllegalArgumentException("Unsupported inputType: " + request.getInputType());
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping(value = "/uploads", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
        summary = "Submit an upload check (IMAGE or FILE) - Frontend compatibility",
        description = "Routes the upload based on inputType (IMAGE or FILE) to the appropriate workflow."
    )
    public ResponseEntity<CheckResponse> checkUploads(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "inputType", defaultValue = "IMAGE") String inputType,
            @RequestParam(value = "language", required = false) String language) {
        CheckResponse response;
        if ("FILE".equalsIgnoreCase(inputType)) {
            response = checkOrchestrator.submitFileCheck(file);
        } else {
            response = checkOrchestrator.submitImageCheck(file, language);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping(value = "/url", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
        summary = "Submit a website URL for scam assessment (Demo)",
        description = "Validates URL syntax and scheme (HTTP/HTTPS) and routes to the check orchestrator. Does NOT fetch external URLs directly."
    )
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Check initiated successfully",
            content = @Content(schema = @Schema(implementation = CheckResponse.class))),
        @ApiResponse(responseCode = "400", description = "Invalid URL syntax or unsupported scheme",
            content = @Content(schema = @Schema(implementation = ApiError.class))),
        @ApiResponse(responseCode = "500", description = "Internal server error",
            content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<CheckResponse> checkUrl(@Valid @RequestBody UrlCheckRequest request) {
        CheckResponse response = checkOrchestrator.submitUrlCheck(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping(value = "/message", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
        summary = "Submit a text message for scam analysis (Demo)",
        description = "Accepts SMS, WhatsApp message, or email text. Enforces length boundaries without storing raw content."
    )
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Check initiated successfully",
            content = @Content(schema = @Schema(implementation = CheckResponse.class))),
        @ApiResponse(responseCode = "400", description = "Empty message or message exceeds size limit",
            content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<CheckResponse> checkMessage(@Valid @RequestBody MessageCheckRequest request) {
        CheckResponse response = checkOrchestrator.submitMessageCheck(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping(value = "/phone", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
        summary = "Submit a phone number for reputation lookup (Demo)",
        description = "Validates international phone format. Returns evidence-aware demonstration findings without identifying individuals."
    )
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Check initiated successfully",
            content = @Content(schema = @Schema(implementation = CheckResponse.class))),
        @ApiResponse(responseCode = "400", description = "Invalid phone number format",
            content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<CheckResponse> checkPhone(@Valid @RequestBody PhoneCheckRequest request) {
        CheckResponse response = checkOrchestrator.submitPhoneCheck(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping(value = "/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
        summary = "Submit a screenshot or image for visual/OCR scam check (Demo)",
        description = "Validates file type (JPEG, PNG, GIF, WEBP) and size (max 5MB) before staging for analysis."
    )
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Image check initiated successfully",
            content = @Content(schema = @Schema(implementation = CheckResponse.class))),
        @ApiResponse(responseCode = "400", description = "Invalid image file type or empty file",
            content = @Content(schema = @Schema(implementation = ApiError.class))),
        @ApiResponse(responseCode = "413", description = "Image file exceeds size limit (5MB)",
            content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<CheckResponse> checkImage(
            @Parameter(description = "Image file (JPEG, PNG, GIF, WEBP, max 5MB)", required = true)
            @RequestParam("file") MultipartFile file,
            @Parameter(description = "Optional language hint (e.g., en, si, ta)")
            @RequestParam(value = "language", required = false) String language) {
        CheckResponse response = checkOrchestrator.submitImageCheck(file, language);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping(value = "/file", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
        summary = "Submit a document or file for suspicious content analysis (Demo)",
        description = "Validates document type (PDF, DOC, DOCX, TXT) and size (max 10MB). Does not execute file content."
    )
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "File check initiated successfully",
            content = @Content(schema = @Schema(implementation = CheckResponse.class))),
        @ApiResponse(responseCode = "400", description = "Invalid document file type or empty file",
            content = @Content(schema = @Schema(implementation = ApiError.class))),
        @ApiResponse(responseCode = "413", description = "File exceeds size limit (10MB)",
            content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<CheckResponse> checkFile(
            @Parameter(description = "Document file (PDF, DOC, DOCX, TXT, max 10MB)", required = true)
            @RequestParam("file") MultipartFile file) {
        CheckResponse response = checkOrchestrator.submitFileCheck(file);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{checkId}")
    @Operation(
        summary = "Retrieve check status and outcome by Check ID",
        description = "Fetches the current status (PENDING, PROCESSING, COMPLETED, DEMO, FAILED) of an existing check."
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Check record retrieved successfully",
            content = @Content(schema = @Schema(implementation = CheckResponse.class))),
        @ApiResponse(responseCode = "404", description = "Check ID not found",
            content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<CheckResponse> getCheck(
            @Parameter(description = "UUID of the check record", required = true)
            @PathVariable UUID checkId) {
        CheckResponse response = checkOrchestrator.getCheckResult(checkId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{checkId}/feedback")
    @Operation(
        summary = "Submit feedback for a specific check ID",
        description = "Associates user feedback or report with the specified check ID."
    )
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Feedback recorded",
            content = @Content(schema = @Schema(implementation = FeedbackResponse.class))),
        @ApiResponse(responseCode = "404", description = "Check ID not found",
            content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<FeedbackResponse> submitCheckFeedback(
            @PathVariable UUID checkId,
            @Valid @RequestBody FeedbackRequest request) {
        request.setCheckId(checkId);
        FeedbackResponse response = checkOrchestrator.submitFeedback(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
