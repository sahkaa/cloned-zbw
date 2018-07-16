package com.aurea.boot.autoconfigure.api.user;

import static com.aurea.boot.autoconfigure.api.user.ApiConsts.User.Mapping.API_USERS;
import static com.aurea.boot.autoconfigure.api.user.ApiConsts.User.Mapping.CURRENT;
import static com.aurea.boot.autoconfigure.api.user.ApiConsts.User.Mapping.FORGOT_PASSWORD;
import static com.aurea.boot.autoconfigure.api.user.ApiConsts.User.Mapping.RESET_PASSWORD;

import com.aurea.boot.autoconfigure.api.annotation.ApiEndpointMapping;
import com.aurea.boot.autoconfigure.api.user.json.ForgotPasswordJson;
import com.aurea.boot.autoconfigure.api.user.json.TokenPasswordJson;
import com.aurea.boot.autoconfigure.data.user.User;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import java.security.Principal;
import javax.validation.Valid;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.hateoas.ExposesResourceFor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;

@ApiEndpointMapping(
        value = API_USERS,
        tags = "User API"
)
@ExposesResourceFor(User.class)
@RequiredArgsConstructor
public class ApiUserEndpoint {

    @NonNull
    private final UserService userService;

    @ApiOperation("Forgot Password")
    @PatchMapping(FORGOT_PASSWORD)
    public void forgotPassword(@ApiParam(required = true) @Valid @RequestBody ForgotPasswordJson forgotPasswordJson) {
        userService.forgotPassword(forgotPasswordJson.getEmail());
    }

    @ApiOperation("Reset Password")
    @PatchMapping(RESET_PASSWORD)
    public void resetPassword(@ApiParam(required = true) @Valid @RequestBody TokenPasswordJson tokenPasswordJson) {
        userService.resetPassword(tokenPasswordJson);
    }

    @ApiOperation("Get current user")
    @GetMapping(CURRENT)
    public User getCurrentUser(Principal principal) {
        return userService.getCurrentUser(principal.getName());
    }

}
