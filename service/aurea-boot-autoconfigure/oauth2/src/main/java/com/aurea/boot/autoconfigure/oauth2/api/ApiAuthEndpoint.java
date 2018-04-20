package com.aurea.boot.autoconfigure.oauth2.api;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.security.oauth2.common.OAuth2AccessToken.BEARER_TYPE;

import com.aurea.boot.autoconfigure.oauth2.api.json.AuthServerRevokeTokenJson;
import java.security.Principal;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.provider.token.ConsumerTokenServices;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class ApiAuthEndpoint {

    @NonNull
    private final ConsumerTokenServices consumerTokenServices;

    @GetMapping("/user")
    Principal principal(Principal principal) {
        return principal;
    }

    @DeleteMapping("/oauth/revoke-token")
    public ResponseEntity<AuthServerRevokeTokenJson> revokeToken(@RequestHeader(AUTHORIZATION) String bearerToken) {
        log.info("Revoking access token: {}", bearerToken);
        if (this.consumerTokenServices.revokeToken(bearerToken.replaceAll(BEARER_TYPE, "").trim())) {
            return new ResponseEntity<>(AuthServerRevokeTokenJson.builder()
                    .message("Token revoked.").build(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(AuthServerRevokeTokenJson.builder()
                    .error("Error. Token invalid.").build(), HttpStatus.BAD_REQUEST);
        }
    }
}
