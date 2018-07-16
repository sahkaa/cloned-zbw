package com.aurea.boot.autoconfigure.api.user.json;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.NotEmpty;

@Getter
@Setter
public class ForgotPasswordJson {

    @NotEmpty
    private String email;
}
