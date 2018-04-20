# Aurea Boot Module with Autoconfiguration for OAuth2 Authentication

This module autoconfigures default Aurea OAuth2 Authentication. 
It includes in module's resources `META-INF/spring.factories` property file with mapping 
to main `OAuth2AutoConfiguration` class which autoconfigures OAuth2 Authentication, 
extends `UserDetailsService` in `AuthUserDetailsService` class, and adds necessary Auth API mappings 
in `ApiAuthEndpoint` class for authenticated User (principal) and for revoking auth tokens .

`META-INF/spring.factories` content:
```
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
  com.aurea.boot.autoconfigure.oauth2.config.OAuth2AutoConfiguration
```
