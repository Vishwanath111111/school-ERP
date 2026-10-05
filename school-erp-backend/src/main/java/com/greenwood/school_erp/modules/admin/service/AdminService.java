package com.greenwood.school_erp.modules.admin.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.greenwood.school_erp.modules.admin.dto.request.AdminLoginRequest;
import com.greenwood.school_erp.modules.admin.dto.response.AdminLoginResponse;
import com.greenwood.school_erp.modules.admin.entity.Admin;
import com.greenwood.school_erp.modules.admin.repository.AdminRepository;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public AdminLoginResponse login(AdminLoginRequest request) {

        Optional<Admin> admin = adminRepository.findByEmail(request.getEmail());

        if (admin.isEmpty()) {
            return new AdminLoginResponse(false, "Invalid Email");
        }

        if (!admin.get().getPassword().equals(request.getPassword())) {
            return new AdminLoginResponse(false, "Invalid Password");
        }

        return new AdminLoginResponse(true, "Login Successful");
    }

}