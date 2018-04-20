# Aurea Boot Module with Data Autoconfiguration

This module autoconfigures default Aurea data and access. 
It includes in module's resources `META-INF/spring.factories` property file with mapping 
to main `DataAutoConfiguration` class which autoconfigures JPA entities and repository interfaces

`META-INF/spring.factories` content:
```
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
  com.aurea.boot.autoconfigure.data.config.DataAutoConfiguration
```
