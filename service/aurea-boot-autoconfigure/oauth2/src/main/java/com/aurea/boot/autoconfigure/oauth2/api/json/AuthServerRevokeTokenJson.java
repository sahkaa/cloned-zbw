package com.aurea.boot.autoconfigure.oauth2.api.json;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthServerRevokeTokenJson {
    private String message;
    private String error;
}
