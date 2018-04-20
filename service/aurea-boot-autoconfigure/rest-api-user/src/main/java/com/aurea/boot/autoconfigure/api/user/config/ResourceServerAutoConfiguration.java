package com.aurea.boot.autoconfigure.api.user.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

@Configuration
@SuppressWarnings({"PMD.SignatureDeclareThrowsException"})
public class ResourceServerAutoConfiguration extends ResourceServerConfigurerAdapter {

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/swagger-ui.html").permitAll()
                .antMatchers("/api/data/browser/**").permitAll()
                .antMatchers("/api/users/forgot-password").permitAll()
                .antMatchers("/api/users/check-reset-password-token").permitAll()
                .antMatchers("/api/users/reset-password").permitAll()
                .antMatchers("/oauth/**").authenticated()
                .antMatchers("/api/**").authenticated();
    }
}
