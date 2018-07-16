package com.aurea.boot.autoconfigure.api.user.config;

import static com.aurea.boot.autoconfigure.api.user.ApiConsts.API_ROOT;
import static com.aurea.boot.autoconfigure.api.user.ApiConsts.User.Mapping.FORGOT_PASSWORD;
import static com.aurea.boot.autoconfigure.api.user.ApiConsts.User.Mapping.RESET_PASSWORD;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

@Configuration
@SuppressWarnings({"PMD.SignatureDeclareThrowsException"})
public class ResourceServerAutoConfiguration extends ResourceServerConfigurerAdapter {

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS,"/**").permitAll()
                .antMatchers("/swagger-ui.html").permitAll()
                .antMatchers("/api/browser/**").permitAll()
                .antMatchers(API_ROOT + FORGOT_PASSWORD).permitAll()
                .antMatchers(API_ROOT + RESET_PASSWORD).permitAll()
                .antMatchers(API_ROOT + "/search/by_reset_password_token").permitAll()
                .antMatchers("/oauth/**").authenticated()
                .antMatchers("/api/**").authenticated();
    }
}
