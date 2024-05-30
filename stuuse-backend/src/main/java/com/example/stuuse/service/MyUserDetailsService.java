package com.example.stuuse.service;

import com.example.stuuse.dao.entity.User;
import com.example.stuuse.dao.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import java.util.Optional;

@Configuration
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByLogin(username);

        if (user.isEmpty() || !user.get().isVerified()) {
            throw new UsernameNotFoundException("User not found or not verified");
        }

        User dbUser = user.get();

        return org.springframework.security.core.userdetails.User.builder()
                .username(dbUser.getLogin())
                .password(dbUser.getPassword())
                .roles(dbUser.getAccType().toString())
                .build();
    }
}