package com.aurea.boot.autoconfigure.api.config;

import com.aurea.boot.autoconfigure.api.config.props.ApiProps;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(ApiProps.class)
@ComponentScan(basePackages = "com.aurea.boot.autoconfigure.api")
public class ApiAutoConfiguration {

}
