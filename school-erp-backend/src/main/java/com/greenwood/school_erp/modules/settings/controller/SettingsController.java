package com.greenwood.school_erp.modules.settings.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.greenwood.school_erp.modules.settings.dto.request.SettingsRequest;
import com.greenwood.school_erp.modules.settings.dto.response.SettingsResponse;
import com.greenwood.school_erp.modules.settings.service.SettingsService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/settings")
@CrossOrigin(origins = "*")
public class SettingsController {

    @Autowired
    private SettingsService settingsService;

    @GetMapping
    public ResponseEntity<SettingsResponse> getSettings() {
        return ResponseEntity.ok(settingsService.getSettings());
    }

    @PostMapping
    public ResponseEntity<SettingsResponse> updateSettings(@Valid @RequestBody SettingsRequest request) {
        return ResponseEntity.ok(settingsService.updateSettings(request));
    }
}
