package com.aurea.sample.zbw;

import com.aurea.boot.autoconfigure.oauth2.annotation.OAuth2SecuredBootApplication;
import org.springframework.boot.SpringApplication;

@OAuth2SecuredBootApplication
@SuppressWarnings("PMD.UseUtilityClass")
public class SampleZbwApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(SampleZbwApiApplication.class, args);
    }
}
