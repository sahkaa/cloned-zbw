package com.aurea.boot.autoconfigure.api.config.props;

import java.util.Arrays;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@Setter
@ConfigurationProperties(prefix = "aurea.api")
public class ApiProps {

    private String securitySchemeKeyName = "Aurea";
    private Info info;
    private Cors cors;

    @Getter
    @Setter
    public static final class Info {
        private String title = "Aurea API";
        private String license = "UNLICENSED";
        private String version = "0.0.1";
    }

    @Getter
    @Setter
    public static final class Cors {
        private List<String> allowedOrigins = Arrays.asList("http://localhost:4000");
        private String allowedMethods = "POST,PUT,PATCH,GET,OPTIONS,DELETE";
        private String allowedHeaders = "Content-Type,Authorization,Pragma";
        private String maxAge = "3600";
    }
}
