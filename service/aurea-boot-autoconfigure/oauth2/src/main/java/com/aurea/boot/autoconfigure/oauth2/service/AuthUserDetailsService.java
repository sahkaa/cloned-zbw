package com.aurea.boot.autoconfigure.oauth2.service;

import com.aurea.boot.autoconfigure.data.user.UserRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service("userDetailsService")
@RequiredArgsConstructor
public class AuthUserDetailsService implements UserDetailsService {

    @NonNull
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return this.userRepository.findByUsername(username)
                .map(userData ->
                        User.withUsername(userData.getUsername())
                                .password(userData.getPassword())
                                .roles("USER")
                                .build())
                .orElseThrow(() -> new UsernameNotFoundException("couldn't find " + username + "!"));
    }
}
