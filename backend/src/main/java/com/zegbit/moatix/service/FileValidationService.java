package com.zegbit.moatix.service;

import com.zegbit.moatix.exception.InvalidFileException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;

@Service
public class FileValidationService {

    public static final long MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
    public static final long MAX_FILE_SIZE = 10 * 1024 * 1024;  // 10 MB

    private static final List<String> ALLOWED_IMAGE_TYPES = Arrays.asList(
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp"
    );

    private static final List<String> ALLOWED_IMAGE_EXTENSIONS = Arrays.asList(
        ".jpg", ".jpeg", ".png", ".gif", ".webp"
    );

    private static final List<String> ALLOWED_DOCUMENT_TYPES = Arrays.asList(
        "application/pdf",
        "text/plain",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );

    private static final List<String> ALLOWED_DOCUMENT_EXTENSIONS = Arrays.asList(
        ".pdf", ".txt", ".doc", ".docx"
    );

    public void validateImage(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new InvalidFileException("Image file cannot be empty");
        }

        if (file.getSize() > MAX_IMAGE_SIZE) {
            throw new InvalidFileException("Image size exceeds maximum allowed limit of 5MB");
        }

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_IMAGE_TYPES.contains(contentType.toLowerCase())) {
            throw new InvalidFileException("Unsupported image type: " + contentType + ". Allowed: JPEG, PNG, GIF, WEBP");
        }

        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || !hasValidExtension(originalFilename, ALLOWED_IMAGE_EXTENSIONS)) {
            throw new InvalidFileException("Image filename must have a valid extension (.jpg, .jpeg, .png, .gif, .webp)");
        }
    }

    public void validateDocument(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new InvalidFileException("Uploaded file cannot be empty");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new InvalidFileException("File size exceeds maximum allowed limit of 10MB");
        }

        String contentType = file.getContentType();
        // Allow text/plain or valid document types, or generic octet-stream if extension matches
        boolean validContentType = contentType != null && ALLOWED_DOCUMENT_TYPES.contains(contentType.toLowerCase());
        
        String originalFilename = file.getOriginalFilename();
        boolean validExtension = originalFilename != null && hasValidExtension(originalFilename, ALLOWED_DOCUMENT_EXTENSIONS);

        if (!validExtension && !validContentType) {
            throw new InvalidFileException("Unsupported document type. Allowed formats: PDF, DOC, DOCX, TXT");
        }
    }

    private boolean hasValidExtension(String filename, List<String> allowedExtensions) {
        String lower = filename.toLowerCase();
        for (String ext : allowedExtensions) {
            if (lower.endsWith(ext)) {
                return true;
            }
        }
        return false;
    }
}
