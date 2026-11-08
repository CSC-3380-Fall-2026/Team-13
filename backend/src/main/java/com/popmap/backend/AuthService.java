package com.popmap.backend;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public User signUp(
        String firstName,
        String lastName,
        String email,
        String password
    ) {
        String normalizedEmail = email.trim().toLowerCase();

        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new IllegalArgumentException(
                "An account with this email already exists."
            );
        }

        String hashedPassword = passwordEncoder.encode(password);

        User user = new User(
            firstName.trim(),
            lastName.trim(),
            normalizedEmail,
            hashedPassword
        );

        return userRepository.save(user);
    }

    public User login(String email, String password) {
        String normalizedEmail = email.trim().toLowerCase();

        User user = userRepository
            .findByEmail(normalizedEmail)
            .orElseThrow(() ->
                new IllegalArgumentException(
                    "Invalid email or password."
                )
            );

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException(
                "Invalid email or password."
            );
        }

        return user;
    }
}