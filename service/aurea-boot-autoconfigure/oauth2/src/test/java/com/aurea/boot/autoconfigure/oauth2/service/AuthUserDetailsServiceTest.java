package com.aurea.boot.autoconfigure.oauth2.service;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.aurea.boot.autoconfigure.data.user.User;
import com.aurea.boot.autoconfigure.data.user.UserRepository;
import java.util.Optional;
import org.junit.Test;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class AuthUserDetailsServiceTest {

    private final UserRepository userRepository = mock(UserRepository.class);
    private final AuthUserDetailsService authUserDetailsService = new AuthUserDetailsService(userRepository);

    @Test
    public void loadUserByUsernameReturnsCorrectly() {
        String name = "name";
        String password = "password";
        User user = new User();
        user.setPassword(password);
        user.setUsername(name);
        when(userRepository.findByUsername(name)).thenReturn(Optional.of(user));

        UserDetails userDetails = authUserDetailsService.loadUserByUsername(name);
        assertThat(userDetails.getUsername(), is(name));
        assertThat(userDetails.getPassword(), is(password));
    }

    @Test(expected = UsernameNotFoundException.class)
    public void loadUserByUsernameFailsIfNoUserFound() {
        final String name = "not exist";
        when(userRepository.findByUsername(name)).thenThrow(new UsernameNotFoundException("Not found"));
        authUserDetailsService.loadUserByUsername(name);
    }
}
