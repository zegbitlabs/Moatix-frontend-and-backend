package com.zegbit.moatix.service.detector;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Member 5: Deterministic Mock Detector Client.
 * Simulates threat assessment while explicitly marking origin as DEMO.
 */
@Component
public class MockDetectorClient implements DetectorClient {

    @Override
    public boolean supports(String inputType) {
        return true; // Default fallback for all types
    }

    @Override
    public DetectionResult detect(String inputType, String content) {
        String normalizedType = inputType != null ? inputType.toUpperCase() : "UNKNOWN";
        List<String> reasons = new ArrayList<>();
        String verdict;
        int riskScore;
        String recommendation;

        switch (normalizedType) {
            case "URL" -> {
                boolean isSuspicious = content != null && (content.contains(".online") || content.contains(".xyz") || content.contains("post-pay") || content.contains("bit.ly"));
                if (isSuspicious) {
                    verdict = "SUSPICIOUS";
                    riskScore = 78;
                    recommendation = "Do not enter login credentials, passwords, or credit card details on this domain.";
                    reasons.add("Domain uses an untrusted or newly registered top-level extension (.online/.xyz)");
                    reasons.add("Domain name appears to mimic an official Sri Lankan financial or postal service");
                } else {
                    verdict = "SAFE";
                    riskScore = 15;
                    recommendation = "No known deceptive patterns or phishing reports detected for this web address.";
                    reasons.add("Domain is not listed on known Sri Lanka phishing feeds");
                }
            }
            case "MESSAGE" -> {
                boolean urgent = content != null && (content.toLowerCase().contains("otp") || content.toLowerCase().contains("blocked") || content.toLowerCase().contains("urgent") || content.toLowerCase().contains("lottery"));
                if (urgent) {
                    verdict = "SUSPICIOUS";
                    riskScore = 85;
                    recommendation = "Never share one-time passwords (OTPs) or verify accounts via unsolicited messages.";
                    reasons.add("Message manufactures false urgency threatening immediate account suspension");
                    reasons.add("Message requests one-time passwords (OTPs) or personal identification");
                } else {
                    verdict = "SAFE";
                    riskScore = 20;
                    recommendation = "Standard message structure; no immediate phishing or lottery scam indicators detected.";
                    reasons.add("No high-risk deceptive keywords or malicious call-to-actions identified");
                }
            }
            case "PHONE" -> {
                verdict = "SUSPICIOUS";
                riskScore = 65;
                recommendation = "Exercise caution when receiving unexpected calls requesting financial transactions.";
                reasons.add("Phone number is not registered with official enterprise caller registries");
                reasons.add("Number has been reported by community members for unsolicited promotional calls");
            }
            case "IMAGE" -> {
                verdict = "SUSPICIOUS";
                riskScore = 72;
                recommendation = "Always verify electronic fund transfers directly inside your banking portal before dispatching goods.";
                reasons.add("Font metrics on transaction reference number differ from standard bank receipt templates");
                reasons.add("Transaction reference format could not be reconciled against bank clearing standards");
            }
            case "FILE" -> {
                verdict = "SAFE";
                riskScore = 10;
                recommendation = "Document passed static inspection. Safe for viewing in standard sandbox viewers.";
                reasons.add("Static inspection detected no executable VBA macros, Javascript, or launch actions");
                reasons.add("File structure complies with standard PDF/Document specification");
            }
            default -> {
                verdict = "SUSPICIOUS";
                riskScore = 50;
                recommendation = "Demonstration evaluation for unclassified input.";
                reasons.add("Evaluated under standard demonstration security criteria");
            }
        }

        return new DetectionResult(verdict, riskScore, recommendation, "DEMO", reasons);
    }
}
