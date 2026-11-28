package com.zegbit.moatix.exception;

import com.zegbit.moatix.dto.ApiError;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.support.MissingServletRequestPartException;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Member 4: Centralised REST Exception Handler.
 * Intercepts errors across all API controllers, sanitizes messages, and returns standard ApiError envelopes.
 * Never leaks stack traces, database internals, or environment secrets to clients.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidationException(MethodArgumentNotValidException ex) {
        String requestId = generateRequestId();
        log.warn("[{}] Request validation failed for {}: {}", requestId, ex.getObjectName(), ex.getMessage());

        List<ApiError.FieldErrorItem> errors = new ArrayList<>();
        for (FieldError fe : ex.getBindingResult().getFieldErrors()) {
            errors.add(new ApiError.FieldErrorItem(fe.getField(), fe.getDefaultMessage()));
        }

        ApiError error = new ApiError(
            "VALIDATION_ERROR",
            "Input validation failed. Please correct the highlighted errors.",
            errors,
            requestId
        );

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiError> handleMalformedJson(HttpMessageNotReadableException ex) {
        String requestId = generateRequestId();
        log.warn("[{}] Malformed JSON request body", requestId);

        ApiError error = new ApiError(
            "MALFORMED_JSON",
            "Request body is missing or could not be parsed as valid JSON.",
            requestId
        );

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiError> handleNotFound(ResourceNotFoundException ex) {
        String requestId = generateRequestId();
        log.warn("[{}] Resource not found: {}", requestId, ex.getMessage());

        ApiError error = new ApiError(
            "NOT_FOUND",
            ex.getMessage(),
            requestId
        );

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(InvalidFileException.class)
    public ResponseEntity<ApiError> handleInvalidFile(InvalidFileException ex) {
        String requestId = generateRequestId();
        log.warn("[{}] Invalid file upload request: {}", requestId, ex.getMessage());

        ApiError error = new ApiError(
            "INVALID_FILE",
            ex.getMessage(),
            requestId
        );

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ApiError> handleMaxSize(MaxUploadSizeExceededException ex) {
        String requestId = generateRequestId();
        log.warn("[{}] Upload size limit exceeded", requestId);

        ApiError error = new ApiError(
            "PAYLOAD_TOO_LARGE",
            "The uploaded file exceeds the maximum allowed upload limit (10MB).",
            requestId
        );

        return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE).body(error);
    }

    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<ApiError> handleUnsupportedMediaType(HttpMediaTypeNotSupportedException ex) {
        String requestId = generateRequestId();
        log.warn("[{}] Unsupported media type: {}", requestId, ex.getContentType());

        ApiError error = new ApiError(
            "UNSUPPORTED_MEDIA_TYPE",
            "Content-Type '" + ex.getContentType() + "' is not supported for this endpoint.",
            requestId
        );

        return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).body(error);
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ApiError> handleMethodNotSupported(HttpRequestMethodNotSupportedException ex) {
        String requestId = generateRequestId();
        log.warn("[{}] HTTP method not supported: {}", requestId, ex.getMethod());

        ApiError error = new ApiError(
            "METHOD_NOT_ALLOWED",
            "HTTP method '" + ex.getMethod() + "' is not supported for this route.",
            requestId
        );

        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(error);
    }

    @ExceptionHandler({MissingServletRequestPartException.class, MissingServletRequestParameterException.class})
    public ResponseEntity<ApiError> handleMissingParts(Exception ex) {
        String requestId = generateRequestId();
        log.warn("[{}] Missing request part/parameter: {}", requestId, ex.getMessage());

        ApiError error = new ApiError(
            "MISSING_REQUIRED_PART",
            "Required file upload part or parameter is missing from the request.",
            requestId
        );

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleGenericException(Exception ex) {
        String requestId = generateRequestId();
        log.error("[{}] Internal server error occurred", requestId, ex);

        ApiError error = new ApiError(
            "INTERNAL_SERVER_ERROR",
            "An unexpected error occurred while processing your request. Please try again later.",
            requestId
        );

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }

    private String generateRequestId() {
        return "req-" + UUID.randomUUID().toString().substring(0, 8);
    }
}
