package com.greenwood.school_erp.modules.authentication.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.greenwood.school_erp.modules.authentication.entity.User;
import com.greenwood.school_erp.modules.authentication.repository.UserRepository;
import com.greenwood.school_erp.modules.authentication.dto.request.LoginRequest;
import com.greenwood.school_erp.modules.authentication.dto.response.LoginResponse;
import com.greenwood.school_erp.modules.authentication.dto.response.LoginUserResponse;

@Service
public class AuthService {
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    // Existing API
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Login API
    public LoginResponse login(LoginRequest request) {

        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());

        if (userOptional.isEmpty()) {
            return new LoginResponse(false, "Email not found");
        }

        User user = userOptional.get();

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return new LoginResponse(false, "Invalid Password");
        }

        LoginUserResponse userResponse = new LoginUserResponse(
                user.getId(),
                user.getEmail());

        return new LoginResponse(
                true,
                "Login Successful",
                userResponse);
    }

    public String encryptAllPasswords() {

        List<User> users = userRepository.findAll();

        for (User user : users) {

            String hashedPassword = passwordEncoder.encode(user.getPassword());

            user.setPassword(hashedPassword);

            userRepository.save(user);
        }

        return "All passwords encrypted successfully.";
    }
}