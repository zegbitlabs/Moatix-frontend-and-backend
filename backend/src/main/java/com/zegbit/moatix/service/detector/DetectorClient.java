package com.zegbit.moatix.service.detector;

public interface DetectorClient {
    boolean supports(String inputType);
    DetectionResult detect(String inputType, String content);
}
