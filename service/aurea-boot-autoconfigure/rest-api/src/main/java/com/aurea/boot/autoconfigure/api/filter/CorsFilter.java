package com.aurea.boot.autoconfigure.api.filter;

import static org.springframework.http.HttpHeaders.ACCESS_CONTROL_ALLOW_HEADERS;
import static org.springframework.http.HttpHeaders.ACCESS_CONTROL_ALLOW_METHODS;
import static org.springframework.http.HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN;
import static org.springframework.http.HttpHeaders.ACCESS_CONTROL_MAX_AGE;
import static org.springframework.http.HttpHeaders.ORIGIN;

import com.aurea.boot.autoconfigure.api.config.props.ApiProps;
import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;

@Order(Ordered.HIGHEST_PRECEDENCE)
@RequiredArgsConstructor
@Component
public class CorsFilter implements Filter {

    @NonNull
    private final ApiProps apiProps;

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        final HttpServletRequest request = (HttpServletRequest) req;
        final HttpServletResponse response = (HttpServletResponse) res;
        if (apiProps.getCors().getAllowedOrigins().contains(getHeaderValue(request, ORIGIN))) {
            response.setHeader(ACCESS_CONTROL_ALLOW_ORIGIN, getHeaderValue(request, ORIGIN));
        }
        response.setHeader(ACCESS_CONTROL_ALLOW_METHODS, apiProps.getCors().getAllowedMethods());
        response.setHeader(ACCESS_CONTROL_ALLOW_HEADERS, apiProps.getCors().getAllowedHeaders());
        response.setHeader(ACCESS_CONTROL_MAX_AGE, apiProps.getCors().getMaxAge());
        if (HttpMethod.OPTIONS.matches(((HttpServletRequest) req).getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
        } else {
            chain.doFilter(req, res);
        }
    }

    private String getHeaderValue(HttpServletRequest request, String name) {
        return request.getHeader(name);
    }

    @Override
    public void destroy() {
        // emtpy destroy
    }

    @Override
    public void init(FilterConfig config) throws ServletException {
        // empty init
    }
}
