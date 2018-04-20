# Aurea Boot Starter REST API service with OAuth2 Authentication 

This Starter includes dependencies to default user data autoconfigure module, 
REST API autoconfigure module and OAuth2 autoconfigure module with which all those parts 
are autoconfigured and started in custom project. 
```
dependencies {
    compile 'org.springframework.boot:spring-boot-starter'
    compile project(':service:aurea-boot-autoconfigure:data-user')
    compile project(':service:aurea-boot-autoconfigure:rest-api')
    compile project(':service:aurea-boot-autoconfigure:oauth2')
}
```
