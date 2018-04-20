package com.aurea.boot.autoconfigure.api.config;

import static com.google.common.base.Predicates.or;
import static springfox.documentation.builders.PathSelectors.ant;
import static springfox.documentation.spi.DocumentationType.SWAGGER_2;

import com.aurea.boot.autoconfigure.api.config.props.ApiProps;
import com.google.common.base.Charsets;
import java.io.IOException;
import java.util.Arrays;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
@RequiredArgsConstructor
public class SwaggerAutoConfiguration {

    @NonNull
    private final ApiProps apiProps;

    @Value("classpath:docs/api.md")
    private Resource apiDescriptionResource;
    private static final AuthorizationScope[] AUTHORIZATION_SCOPES = {
            new AuthorizationScope("Global", "To access everything")};

    @Bean
    public Docket restApi() throws IOException {
        return new Docket(SWAGGER_2)
                .apiInfo(new ApiInfoBuilder()
                        .title(apiProps.getInfo().getTitle())
                        .description(IOUtils.toString(apiDescriptionResource.getInputStream(), Charsets.UTF_8))
                        .license(apiProps.getInfo().getLicense())
                        .version(apiProps.getInfo().getVersion())
                        .build())
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(or(
                        ant("/api/**"),
                        ant("/oauth/**"),
                        ant("/user")))
                .build()
                .securitySchemes(Arrays.asList(
                        new ApiKey("Aurea Security Schema", HttpHeaders.AUTHORIZATION, "header")))
                .securityContexts(Arrays.asList(
                        SecurityContext.builder()
                                .securityReferences(Arrays.asList(
                                        new SecurityReference(
                                                apiProps.getSecuritySchemeKeyName(),
                                                AUTHORIZATION_SCOPES)))
                                .forPaths(PathSelectors.regex("/.*"))
                                .build()
                ));
    }
}
