package com.aurea.boot.autoconfigure.api.user.impl;

import static java.lang.String.format;

import com.aurea.boot.autoconfigure.api.error.EmailNotFoundException;
import com.aurea.boot.autoconfigure.api.error.ResetTokenInvalidException;
import com.aurea.boot.autoconfigure.api.user.UserService;
import com.aurea.boot.autoconfigure.api.user.json.TokenPasswordJson;
import com.aurea.boot.autoconfigure.data.user.User;
import com.aurea.boot.autoconfigure.data.user.UserRepository;
import com.aurea.boot.autoconfigure.mail.service.MailService;
import java.util.UUID;
import javax.persistence.EntityNotFoundException;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    @NonNull
    private final UserRepository userRepository;

    @NonNull
    private final PasswordEncoder passwordEncoder;

    @NonNull
    private final MailService mailService;

    @Override
    public User getCurrentUser(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    @Override
    public void resetPassword(TokenPasswordJson tokenPasswordJson) {
        User user = userRepository
                .findByResetKey(tokenPasswordJson.getToken())
                .orElseThrow(() -> new ResetTokenInvalidException("Reset token invalid"));
        user.setPassword(passwordEncoder.encode(tokenPasswordJson.getPassword()));
        user.setResetKey(null);
        userRepository.save(user);
    }

    @Override
    public void checkResetToken(String token) {
        userRepository
                .findByResetKey(token)
                .orElseThrow(() -> new ResetTokenInvalidException("Reset token invalid"));
    }

    @Override
    public void forgotPassword(String email) {
        User user = userRepository
                .findByUsername(email)
                .orElseThrow(() -> new EmailNotFoundException("The email provided does not appear on our records"));
        String resetKey = UUID.randomUUID().toString();
        user.setResetKey(resetKey);
        userRepository.save(user);
        log.debug(format("Reset key %s created for user with email %s", resetKey, email));
        mailService.compose()
                .from("no-reply@aurea-zero-based.com")
                .to(user.getUsername())
                .subject("Reset password token created")
                .content(format("Following reset password token has been created for your account: %s", resetKey))
                .send();
    }
}
