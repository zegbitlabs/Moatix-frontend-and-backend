package com.zegbit.moatix.exception;

public class MoatixException extends RuntimeException {
    public MoatixException(String message) {
        super(message);
    }

    public MoatixException(String message, Throwable cause) {
        super(message, cause);
    }
}
