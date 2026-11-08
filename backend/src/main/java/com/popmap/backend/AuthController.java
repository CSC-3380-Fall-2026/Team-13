package com.popmap.backend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(
        @RequestBody SignUpRequest request
    ) {
        try {
            User user = authService.signUp(
                request.getFirstName(),
                request.getLastName(),
                request.getEmail(),
                request.getPassword()
            );

            return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new AuthResponse(user));

        } catch (IllegalArgumentException error) {
            return ResponseEntity
                .badRequest()
                .body(error.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
        @RequestBody LoginRequest request
    ) {
        try {
            User user = authService.login(
                request.getEmail(),
                request.getPassword()
            );

            return ResponseEntity.ok(
                new AuthResponse(user)
            );

        } catch (IllegalArgumentException error) {
            return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(error.getMessage());
        }
    }
}