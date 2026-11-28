package com.zegbit.moatix.service.detector;

import java.util.List;

public record DetectionResult(
        String verdict,
        Integer riskScore,
        String recommendation,
        String origin,
        List<String> reasons
) {}
