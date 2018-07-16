package com.aurea.zbw;

import com.aurea.boot.autoconfigure.oauth2.annotation.OAuth2SecuredBootApplication;
import org.springframework.boot.SpringApplication;

@OAuth2SecuredBootApplication
@SuppressWarnings("PMD.UseUtilityClass")
public class AureaZeroBaseApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(AureaZeroBaseApiApplication.class, args);
    }
}
