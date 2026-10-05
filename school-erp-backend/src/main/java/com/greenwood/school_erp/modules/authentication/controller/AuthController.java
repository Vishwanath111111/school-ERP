package com.greenwood.school_erp.modules.authentication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.greenwood.school_erp.modules.authentication.entity.User;
import com.greenwood.school_erp.modules.authentication.dto.request.LoginRequest;
import com.greenwood.school_erp.modules.authentication.dto.response.LoginResponse;
import com.greenwood.school_erp.modules.authentication.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // Existing Test API
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return authService.getAllUsers();
    }

    // Login API
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @GetMapping("/encrypt-passwords")
    public String encryptPasswords() {
        return authService.encryptAllPasswords();
    }
}