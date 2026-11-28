package com.zegbit.moatix.service.detector;

import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Member 5: Detector Adapter Registry.
 * Coordinates routing between input types and available detector clients.
 */
@Service
public class DetectorAdapterRegistry {

    private final List<DetectorClient> detectorClients;

    public DetectorAdapterRegistry(List<DetectorClient> detectorClients) {
        this.detectorClients = detectorClients;
    }

    public DetectionResult dispatch(String inputType, String content) {
        for (DetectorClient client : detectorClients) {
            if (client.supports(inputType)) {
                return client.detect(inputType, content);
            }
        }
        throw new IllegalStateException("No registered detector client supports input type: " + inputType);
    }
}
