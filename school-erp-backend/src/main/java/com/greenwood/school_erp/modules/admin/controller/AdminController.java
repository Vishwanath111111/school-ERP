package com.greenwood.school_erp.modules.admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.greenwood.school_erp.modules.admin.dto.request.AdminLoginRequest;
import com.greenwood.school_erp.modules.admin.dto.response.AdminLoginResponse;
import com.greenwood.school_erp.modules.admin.service.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public AdminLoginResponse login(@RequestBody AdminLoginRequest request) {
        return adminService.login(request);
    }

}