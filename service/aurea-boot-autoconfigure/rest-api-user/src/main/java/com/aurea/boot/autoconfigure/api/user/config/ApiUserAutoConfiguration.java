package com.aurea.boot.autoconfigure.api.user.config;

import com.aurea.boot.autoconfigure.api.config.props.AureaApiProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(AureaApiProperties.class)
@ComponentScan(basePackages = "com.aurea.boot.autoconfigure.api.user")
public class ApiUserAutoConfiguration {

}
