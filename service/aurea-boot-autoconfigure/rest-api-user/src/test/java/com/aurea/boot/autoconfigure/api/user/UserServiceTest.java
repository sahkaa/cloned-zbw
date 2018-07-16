package com.aurea.boot.autoconfigure.api.user;

import static org.junit.Assert.assertEquals;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.aurea.boot.autoconfigure.api.config.props.AureaApiProperties;
import com.aurea.boot.autoconfigure.api.error.EmailNotFoundException;
import com.aurea.boot.autoconfigure.api.error.ResetTokenInvalidException;
import com.aurea.boot.autoconfigure.api.user.impl.UserServiceImpl;
import com.aurea.boot.autoconfigure.api.user.json.TokenPasswordJson;
import com.aurea.boot.autoconfigure.data.user.User;
import com.aurea.boot.autoconfigure.data.user.UserRepository;
import com.aurea.boot.autoconfigure.mail.service.MailService;
import java.util.Optional;
import javax.persistence.EntityNotFoundException;
import org.junit.Test;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;

public class UserServiceTest {

    private static final String USERNAME_EMAIL = "test@test.com";
    private static final String RESET_KEY = "key123";
    private static final String PASSWORD = "pass";
    private static final String ENCODED_PASSWORD = "ssap!@#$";

    private final UserRepository userRepository = mock(UserRepository.class);
    private final PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
    private final JavaMailSender mailSender = mock(JavaMailSender.class);

    private final MailService mailService = new MailService(mailSender);
    private final AureaApiProperties aureaApiProperties = new AureaApiProperties();
    private final UserService userService = new UserServiceImpl(
            userRepository, passwordEncoder, mailService, aureaApiProperties);

    @Test
    public void getCurrentUser() {
        when(userRepository.findByUsername(USERNAME_EMAIL)).thenReturn(
                Optional.of(User.builder().username(USERNAME_EMAIL).build()));
        User user = userService.getCurrentUser(USERNAME_EMAIL);
        assertEquals(USERNAME_EMAIL, user.getUsername());
    }

    @Test(expected = EntityNotFoundException.class)
    public void getCurrentUserException() {
        when(userRepository.findByUsername(USERNAME_EMAIL)).thenThrow(
                new EntityNotFoundException("Entity not found"));
        userService.getCurrentUser(USERNAME_EMAIL);
    }

    @Test
    public void resetPassword() {
        User user = User.builder().username(USERNAME_EMAIL).build();
        when(userRepository.findByResetPasswordToken(RESET_KEY)).thenReturn(Optional.of(user));
        when(passwordEncoder.encode(PASSWORD)).thenReturn(ENCODED_PASSWORD);
        TokenPasswordJson tokenPasswordJson = new TokenPasswordJson(RESET_KEY, PASSWORD);
        userService.resetPassword(tokenPasswordJson);
        verify(userRepository).findByResetPasswordToken(RESET_KEY);
        verify(passwordEncoder).encode(PASSWORD);
        verify(userRepository).save(user);
    }

    @Test(expected = ResetTokenInvalidException.class)
    public void resetPasswordException() {
        when(userRepository.findByResetPasswordToken(RESET_KEY)).thenThrow(
                new ResetTokenInvalidException("Reset token invalid"));
        TokenPasswordJson tokenPasswordJson = new TokenPasswordJson(RESET_KEY, PASSWORD);
        userService.resetPassword(tokenPasswordJson);
    }

    @Test
    public void forgotPassword() {
        User user = User.builder().username(USERNAME_EMAIL).build();
        when(userRepository.findByUsername(USERNAME_EMAIL)).thenReturn(Optional.of(user));
        userService.forgotPassword(USERNAME_EMAIL);
        verify(userRepository).findByUsername(USERNAME_EMAIL);
        verify(userRepository).save(user);
        verify(mailSender).send(any(SimpleMailMessage.class));
    }

    @Test(expected = EmailNotFoundException.class)
    public void forgotPasswordException() {
        when(userRepository.findByUsername(USERNAME_EMAIL)).thenThrow(
                new EmailNotFoundException("Email not found"));
        userService.forgotPassword(USERNAME_EMAIL);
    }
}
