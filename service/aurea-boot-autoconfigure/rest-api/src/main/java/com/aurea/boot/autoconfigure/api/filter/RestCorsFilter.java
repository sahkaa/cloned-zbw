package com.aurea.boot.autoconfigure.api.filter;

import static org.springframework.http.HttpHeaders.ACCESS_CONTROL_ALLOW_HEADERS;
import static org.springframework.http.HttpHeaders.ACCESS_CONTROL_ALLOW_METHODS;
import static org.springframework.http.HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN;
import static org.springframework.http.HttpHeaders.ACCESS_CONTROL_MAX_AGE;
import static org.springframework.http.HttpHeaders.ORIGIN;

import com.aurea.boot.autoconfigure.api.config.props.AureaApiProperties;
import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Order(Ordered.HIGHEST_PRECEDENCE)
@RequiredArgsConstructor
@Component
public class RestCorsFilter extends OncePerRequestFilter {

    @NonNull
    private final AureaApiProperties aureaApiProperties;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws IOException, ServletException {
        String origin = getHeaderValue(request, ORIGIN);
        if (aureaApiProperties.getCors().getAllowedOrigins().contains(origin)
                || aureaApiProperties.getUiUrl().equals(origin)) {
            response.setHeader(ACCESS_CONTROL_ALLOW_ORIGIN, origin);
        }
        response.setHeader(ACCESS_CONTROL_ALLOW_METHODS, aureaApiProperties.getCors().getAllowedMethods());
        response.setHeader(ACCESS_CONTROL_ALLOW_HEADERS, aureaApiProperties.getCors().getAllowedHeaders());
        response.setHeader(ACCESS_CONTROL_MAX_AGE, aureaApiProperties.getCors().getMaxAge());
        if (HttpMethod.OPTIONS.matches(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
        } else {
            filterChain.doFilter(request, response);
        }
    }

    private String getHeaderValue(HttpServletRequest request, String name) {
        return request.getHeader(name);
    }
}
