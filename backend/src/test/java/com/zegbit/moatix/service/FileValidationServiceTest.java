package com.zegbit.moatix.service;

import com.zegbit.moatix.exception.InvalidFileException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;

import static org.junit.jupiter.api.Assertions.*;

class FileValidationServiceTest {

    private FileValidationService service;

    @BeforeEach
    void setUp() {
        service = new FileValidationService();
    }

    @Test
    @DisplayName("Should accept valid JPEG image")
    void acceptValidImage() {
        MockMultipartFile file = new MockMultipartFile(
            "file", "screenshot.png", "image/png", new byte[]{1, 2, 3, 4}
        );
        assertDoesNotThrow(() -> service.validateImage(file));
    }

    @Test
    @DisplayName("Should reject empty image")
    void rejectEmptyImage() {
        MockMultipartFile file = new MockMultipartFile(
            "file", "empty.png", "image/png", new byte[]{}
        );
        assertThrows(InvalidFileException.class, () -> service.validateImage(file));
    }

    @Test
    @DisplayName("Should reject unsupported image mime type (e.g., application/exe)")
    void rejectDangerousFileType() {
        MockMultipartFile file = new MockMultipartFile(
            "file", "malware.exe", "application/x-msdownload", new byte[]{1, 2, 3}
        );
        assertThrows(InvalidFileException.class, () -> service.validateImage(file));
    }

    @Test
    @DisplayName("Should accept valid PDF document")
    void acceptValidDocument() {
        MockMultipartFile file = new MockMultipartFile(
            "file", "statement.pdf", "application/pdf", new byte[]{1, 2, 3, 4}
        );
        assertDoesNotThrow(() -> service.validateDocument(file));
    }

    @Test
    @DisplayName("Should reject oversized image")
    void rejectOversizedImage() {
        byte[] largeBytes = new byte[(int) (FileValidationService.MAX_IMAGE_SIZE + 1024)];
        MockMultipartFile file = new MockMultipartFile(
            "file", "huge.jpg", "image/jpeg", largeBytes
        );
        assertThrows(InvalidFileException.class, () -> service.validateImage(file));
    }
}
