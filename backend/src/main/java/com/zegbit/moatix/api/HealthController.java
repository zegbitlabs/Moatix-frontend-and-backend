package com.zegbit.moatix.api;

import com.zegbit.moatix.dto.HealthResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;

/**
 * Member 4: REST Controller for Service Health.
 */
@RestController
@RequestMapping("/api/v1")
@Tag(name = "Health API", description = "Service operational status and uptime check (Member 4)")
public class HealthController {

    @GetMapping("/health")
    @Operation(summary = "Get basic service operational health status")
    @ApiResponse(responseCode = "200", description = "Service is operational",
        content = @Content(schema = @Schema(implementation = HealthResponse.class)))
    public ResponseEntity<HealthResponse> getHealth() {
        return ResponseEntity.ok(new HealthResponse("UP", "active", Instant.now()));
    }
}
