package com.aurea.boot.autoconfigure.api.annotation;

import io.swagger.annotations.Api;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import org.springframework.core.annotation.AliasFor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api
@RestController
@RequestMapping
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface ApiEndpointMapping {

    /**
     * The value may indicate a request mapping
     */
    @AliasFor(
            annotation = RequestMapping.class
    )
    String[] value() default {};

    /**
     * A list of tags for API documentation control.
     * Tags can be used for logical grouping of operations by resources or any other qualifier.
     */
    @AliasFor(
        annotation = Api.class
    )
    String[] tags() default {};
}
