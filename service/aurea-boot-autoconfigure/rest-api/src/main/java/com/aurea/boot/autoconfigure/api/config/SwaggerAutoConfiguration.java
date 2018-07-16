package com.aurea.boot.autoconfigure.api.config;

import static com.google.common.base.Predicates.or;
import static springfox.documentation.builders.PathSelectors.ant;
import static springfox.documentation.spi.DocumentationType.SWAGGER_2;

import com.aurea.boot.autoconfigure.api.config.props.AureaApiProperties;
import com.google.common.base.Charsets;
import java.io.IOException;
import java.util.Collections;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import springfox.bean.validators.configuration.BeanValidatorPluginsConfiguration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.data.rest.configuration.SpringDataRestConfiguration;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
@Import({SpringDataRestConfiguration.class, BeanValidatorPluginsConfiguration.class})
@RequiredArgsConstructor
public class SwaggerAutoConfiguration {

    @NonNull
    private final AureaApiProperties aureaApiProperties;

    @Value("classpath:docs/api.md")
    private Resource apiDescriptionResource;
    private static final AuthorizationScope[] AUTHORIZATION_SCOPES = {
            new AuthorizationScope("Global", "To access everything")};

    @Bean
    public Docket restApi() throws IOException {
        return new Docket(SWAGGER_2)
                .apiInfo(new ApiInfoBuilder()
                        .title(aureaApiProperties.getInfo().getTitle())
                        .description(IOUtils.toString(apiDescriptionResource.getInputStream(), Charsets.UTF_8))
                        .license(aureaApiProperties.getInfo().getLicense())
                        .version(aureaApiProperties.getInfo().getVersion())
                        .build())
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(or(
                        ant("/api/**"),
                        ant("/oauth/**"),
                        ant("/user")))
                .build()
                .securitySchemes(Collections.singletonList(
                        new ApiKey("Aurea Security Schema", HttpHeaders.AUTHORIZATION, "header")))
                .securityContexts(Collections.singletonList(
                        SecurityContext.builder()
                                .securityReferences(Collections.singletonList(
                                        new SecurityReference(
                                                aureaApiProperties.getSecuritySchemeKeyName(),
                                                AUTHORIZATION_SCOPES)))
                                .forPaths(PathSelectors.regex("/.*"))
                                .build()
                ));
    }
}
