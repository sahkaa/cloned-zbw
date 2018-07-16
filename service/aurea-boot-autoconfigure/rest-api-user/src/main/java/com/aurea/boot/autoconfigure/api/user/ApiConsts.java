package com.aurea.boot.autoconfigure.api.user;

import lombok.experimental.UtilityClass;

public class ApiConsts {

    public static final String API_ROOT = "/api";

    public static class User {

        @UtilityClass
        public static final class Mapping {

            public static final String API_USERS = API_ROOT + "/users";
            public static final String FORGOT_PASSWORD = "/forgot_password";
            public static final String RESET_PASSWORD = "/reset_password";
            public static final String CURRENT = "/current";
        }
    }
}
