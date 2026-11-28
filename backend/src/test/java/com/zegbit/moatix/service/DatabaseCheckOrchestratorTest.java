package com.zegbit.moatix.service;

import com.zegbit.moatix.dto.*;
import com.zegbit.moatix.entity.CheckEntity;
import com.zegbit.moatix.entity.CheckResultEntity;
import com.zegbit.moatix.exception.ResourceNotFoundException;
import com.zegbit.moatix.repository.CheckRepository;
import com.zegbit.moatix.repository.FeedbackRepository;
import com.zegbit.moatix.repository.ReportRepository;
import com.zegbit.moatix.service.detector.MockDetectorClient;
import com.zegbit.moatix.service.detector.DetectorAdapterRegistry;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DatabaseCheckOrchestratorTest {

    @Mock
    private CheckRepository checkRepository;

    @Mock
    private FeedbackRepository feedbackRepository;

    @Mock
    private ReportRepository reportRepository;

    @Mock
    private FileValidationService fileValidationService;

    private DatabaseCheckOrchestrator orchestrator;

    @BeforeEach
    void setUp() {
        MockDetectorClient mockDetector = new MockDetectorClient();
        DetectorAdapterRegistry registry = new DetectorAdapterRegistry(List.of(mockDetector));
        FeedbackService feedbackService = new FeedbackService(feedbackRepository, reportRepository);
        orchestrator = new DatabaseCheckOrchestrator(checkRepository, registry, feedbackService, fileValidationService);
    }

    @Test
    @DisplayName("submitUrlCheck: persists check entity and calculates hash")
    void submitUrlCheckPersists() {
        when(checkRepository.save(any(CheckEntity.class))).thenAnswer(i -> i.getArgument(0));

        UrlCheckRequest request = new UrlCheckRequest("http://srilanka-post-pay.online/verify");
        CheckResponse response = orchestrator.submitUrlCheck(request);

        assertThat(response).isNotNull();
        assertThat(response.getCheckId()).isNotNull();
        assertThat(response.getInputType()).isEqualTo("URL");
        assertThat(response.getStatus()).isEqualTo("COMPLETED");
        assertThat(response.isDemo()).isTrue();
        assertThat(response.getVerdict()).isEqualTo("SUSPICIOUS");

        verify(checkRepository, times(1)).save(any(CheckEntity.class));
    }

    @Test
    @DisplayName("getCheckResult: retrieves existing record from repository")
    void getCheckResultSuccess() {
        UUID checkId = UUID.randomUUID();
        CheckEntity entity = new CheckEntity(checkId.toString(), "URL", "COMPLETED", "dummyhash");
        CheckResultEntity result = new CheckResultEntity(entity, "SAFE", 10, "Clean domain", "DEMO");
        entity.setResult(result);

        when(checkRepository.findByCheckId(checkId.toString())).thenReturn(Optional.of(entity));

        CheckResponse response = orchestrator.getCheckResult(checkId);

        assertThat(response.getCheckId()).isEqualTo(checkId.toString());
        assertThat(response.getVerdict()).isEqualTo("SAFE");
        assertThat(response.getRiskScore()).isEqualTo(10);
    }

    @Test
    @DisplayName("getCheckResult: throws ResourceNotFoundException for unknown ID")
    void getCheckResultNotFound() {
        UUID unknownId = UUID.randomUUID();
        when(checkRepository.findByCheckId(unknownId.toString())).thenReturn(Optional.empty());

        assertThatThrownBy(() -> orchestrator.getCheckResult(unknownId))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Check record not found");
    }
}
