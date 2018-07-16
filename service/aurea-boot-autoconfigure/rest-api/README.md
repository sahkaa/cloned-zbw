# Aurea Boot Module with Autoconfiguration for REST API 

This module autoconfigures default Aurea REST API with Swagger UI documentation. 
It includes in module's resources `META-INF/spring.factories` property file with mappings 
to `ApiAutoConfiguration` class which includes `ApiProps` class with application properties and 
scans for components in `com.aurea.boot.autoconfigure.api` package, while other
`SwaggerAutoConfiguration` class autoconfigures generation of Swagger UI documention. 
This module also adds `CorsFilter` for Cross-Origin Resource Sharing configuration response headers.

`META-INF/spring.factories` content:
```
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
  com.aurea.boot.autoconfigure.api.config.ApiAutoConfiguration,\
  com.aurea.boot.autoconfigure.api.config.SwaggerAutoConfiguration
```
