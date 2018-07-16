package com.aurea.boot.autoconfigure.data.user;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;

public interface UserRepository extends JpaRepository<User, Long> {

    String BY_USERNAME = "by_username";
    String BY_RESET_PASSWORD_TOKEN = "by_reset_password_token";

    @RestResource(path = BY_USERNAME, rel = BY_USERNAME)
    Optional<User> findByUsername(@Param("username") String username);

    @RestResource(path = BY_RESET_PASSWORD_TOKEN, rel = BY_RESET_PASSWORD_TOKEN)
    Optional<User> findByResetPasswordToken(@Param("token") String resetPasswordToken);
}
