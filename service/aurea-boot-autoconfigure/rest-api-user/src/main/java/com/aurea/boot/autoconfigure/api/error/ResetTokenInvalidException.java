package com.aurea.boot.autoconfigure.api.error;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(BAD_REQUEST)
public class ResetTokenInvalidException extends RuntimeException {

    public ResetTokenInvalidException(String message) {
        super(message);
    }
}
