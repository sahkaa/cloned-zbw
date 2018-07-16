package com.aurea.boot.autoconfigure.api.user;

import com.aurea.boot.autoconfigure.data.user.User;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.hateoas.EntityLinks;
import org.springframework.hateoas.Link;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ApiUserLinks {

    @NonNull
    private final EntityLinks entityLinks;

    Link getForgotPasswordLink() {
        return entityLinks.linkFor(User.class).slash("forgot_password")
                .withRel("action:forgot-password");
    }

    Link getResetPasswordLink() {
        return entityLinks.linkFor(User.class).slash("reset_password")
                .withRel("action:reset-password");
    }
}
