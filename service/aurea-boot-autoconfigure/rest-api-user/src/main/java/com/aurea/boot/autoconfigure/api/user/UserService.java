package com.aurea.boot.autoconfigure.api.user;

import com.aurea.boot.autoconfigure.api.user.json.TokenPasswordJson;
import com.aurea.boot.autoconfigure.data.user.User;

public interface UserService {

    User getCurrentUser(String username);

    void resetPassword(TokenPasswordJson tokenPasswordJson);

    void forgotPassword(String email);
}
