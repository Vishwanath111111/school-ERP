package com.greenwood.school_erp.modules.settings.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.greenwood.school_erp.modules.settings.dto.request.SettingsRequest;
import com.greenwood.school_erp.modules.settings.dto.response.SettingsResponse;
import com.greenwood.school_erp.modules.settings.entity.SchoolSettings;
import com.greenwood.school_erp.modules.settings.repository.SettingsRepository;

@Service
@Transactional
public class SettingsService {

    @Autowired
    private SettingsRepository settingsRepository;

    @Transactional(readOnly = true)
    public SettingsResponse getSettings() {
        List<SchoolSettings> list = settingsRepository.findAll();
        if (list.isEmpty()) {
            SchoolSettings defaultSettings = SchoolSettings.builder()
                    .schoolName("Greenwood High International School")
                    .affiliationCode("CBSE-AFF-987654")
                    .principalName("Dr. Sarah Jenkins")
                    .email("info@greenwood.edu")
                    .phone("+91 98765 00000")
                    .address("100 Academic Boulevard, Knowledge City")
                    .currentAcademicYear("2025-2026")
                    .sessionStartDate("2025-06-01")
                    .sessionEndDate("2026-04-30")
                    .activeTerms("Term 1, Term 2")
                    .build();
            SchoolSettings saved = settingsRepository.save(defaultSettings);
            return mapToResponse(saved);
        }
        return mapToResponse(list.get(0));
    }

    public SettingsResponse updateSettings(SettingsRequest request) {
        List<SchoolSettings> list = settingsRepository.findAll();
        SchoolSettings settings;
        if (list.isEmpty()) {
            settings = new SchoolSettings();
        } else {
            settings = list.get(0);
        }

        settings.setSchoolName(request.getSchoolName());
        settings.setAffiliationCode(request.getAffiliationCode());
        settings.setPrincipalName(request.getPrincipalName());
        settings.setEmail(request.getEmail());
        settings.setPhone(request.getPhone());
        settings.setAddress(request.getAddress());
        settings.setCurrentAcademicYear(request.getCurrentAcademicYear());
        settings.setSessionStartDate(request.getSessionStartDate());
        settings.setSessionEndDate(request.getSessionEndDate());
        settings.setActiveTerms(request.getActiveTerms());
        settings.setLogoUrl(request.getLogoUrl());

        SchoolSettings updated = settingsRepository.save(settings);
        return mapToResponse(updated);
    }

    private SettingsResponse mapToResponse(SchoolSettings settings) {
        return SettingsResponse.builder()
                .id(settings.getId())
                .schoolName(settings.getSchoolName())
                .affiliationCode(settings.getAffiliationCode())
                .principalName(settings.getPrincipalName())
                .email(settings.getEmail())
                .phone(settings.getPhone())
                .address(settings.getAddress())
                .currentAcademicYear(settings.getCurrentAcademicYear())
                .sessionStartDate(settings.getSessionStartDate())
                .sessionEndDate(settings.getSessionEndDate())
                .activeTerms(settings.getActiveTerms())
                .logoUrl(settings.getLogoUrl())
                .build();
    }
}
