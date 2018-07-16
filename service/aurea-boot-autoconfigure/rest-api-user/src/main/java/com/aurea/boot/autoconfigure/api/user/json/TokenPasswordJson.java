package com.aurea.boot.autoconfigure.api.user.json;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.NotEmpty;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TokenPasswordJson {

    @NotEmpty
    private String token;
    @NotEmpty
    private String password;
}
