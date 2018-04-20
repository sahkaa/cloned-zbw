package com.aurea.boot.autoconfigure.api.user.json;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TokenPasswordJson {

    private String token;
    private String password;
}
