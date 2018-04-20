# Aurea Zero Based Sample API Service module

This module has logic for Aurea Zero Based sample project's API service. It uses `rest-api-user-oauth2-starter` to autoconfigure default REST service with 
SwaggerUI, OAuth2 Authentication and default user data. All these defaults are autoconfigured 
by including dependency to 
`rest-api-oauth2-starter` in `sample-zwb-api/build.gradle`
```
dependencies {
  // database dependency
  
  compile project(':service:aurea-boot-starter:rest-api-user-oauth2-starter')

  // testing dependencies
}
```
More details about `rest-api-oauth-starter` can be found 
[here](../aurea-boot-starter/rest-api-oauth2-starter/README.md)
 
### Starting Aurea Zero Based Sample API Service
Service can be starter by executing gradle wrapper command from root of entire repository
```
./gradlew :service:sample-zwb-api:bootRun
```

### Login Endpoint and Request
Login Endpoint is mapped at `/oauth/token` and it requires POST requires basic auth with `zwbapp:zwbsecret` 
client credentials and params `grant_type=password & username=user@example.org & password=secret & scope=read`
Example of login POST request: 
```
POST /oauth/token HTTP/1.1
Host: localhost:8080
Accept: application/json
Authorization: Basic endiYXBwOnp3YnNlY3JldA==
Content-Type: application/x-www-form-urlencoded
Cache-Control: no-cache

grant_type=password&username=user@example.org&password=secret&scope=read
```
