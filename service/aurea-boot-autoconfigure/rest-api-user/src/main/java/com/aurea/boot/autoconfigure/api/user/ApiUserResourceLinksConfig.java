package com.aurea.boot.autoconfigure.api.user;

import com.aurea.boot.autoconfigure.data.user.User;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceProcessor;
import org.springframework.hateoas.Resources;

@Configuration
@RequiredArgsConstructor
public class ApiUserResourceLinksConfig {

    @NonNull
    private final ApiUserLinks apiUserLinks;

    @Bean
    public ResourceProcessor<PagedResources<Resource<User>>> pagedUsersLinks() {
        return new ResourceProcessor<PagedResources<Resource<User>>>() {

            @Override
            public PagedResources<Resource<User>> process(PagedResources<Resource<User>> resources) {
                resources.add(apiUserLinks.getForgotPasswordLink());
                resources.add(apiUserLinks.getResetPasswordLink());
                return resources;
            }
        };
    }

    @Bean
    public ResourceProcessor<Resources<Resource<User>>> usersLinks() {
        return new ResourceProcessor<Resources<Resource<User>>>() {

            @Override
            public Resources<Resource<User>> process(Resources<Resource<User>> resources) {
                resources.add(apiUserLinks.getForgotPasswordLink());
                resources.add(apiUserLinks.getResetPasswordLink());
                return resources;
            }
        };
    }

    @Bean
    public ResourceProcessor<Resource<User>> userLinks() {
        return new ResourceProcessor<Resource<User>>() {

            @Override
            public Resource<User> process(Resource<User> resource) {
                return resource;
            }
        };
    }
}
