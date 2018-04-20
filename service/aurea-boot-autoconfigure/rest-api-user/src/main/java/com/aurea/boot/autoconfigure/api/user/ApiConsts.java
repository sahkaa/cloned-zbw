package com.aurea.boot.autoconfigure.api.user;

import lombok.experimental.UtilityClass;

public class ApiConsts {

    public static final String API_ROOT = "/api";

    public static class User {

        @UtilityClass
        public static final class Mapping {

            public static final String API_USER = API_ROOT + "/users";
            public static final String FORGOT_PASSWORD = "/forgot-password";
            public static final String RESET_PASSWORD = "/reset-password";
            public static final String CURRENT_USER = "/current";
            public static final String CHECK_RESET_PASSWORD_TOKEN = "/check-reset-password-token";
        }

        public static final class Param {

            public static final String EMAIL = "email";
        }
    }
}
