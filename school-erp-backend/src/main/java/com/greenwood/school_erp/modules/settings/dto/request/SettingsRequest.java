package com.greenwood.school_erp.modules.settings.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SettingsRequest {

    @NotBlank(message = "School name is required")
    private String schoolName;

    private String affiliationCode;

    private String principalName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Phone number is required")
    private String phone;

    private String address;

    @NotBlank(message = "Current academic year is required")
    private String currentAcademicYear;

    private String sessionStartDate;

    private String sessionEndDate;

    private String activeTerms;

    private String logoUrl;
}
