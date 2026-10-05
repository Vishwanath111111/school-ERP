package com.greenwood.school_erp.modules.settings.dto.response;

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
public class SettingsResponse {

    private Long id;
    private String schoolName;
    private String affiliationCode;
    private String principalName;
    private String email;
    private String phone;
    private String address;
    private String currentAcademicYear;
    private String sessionStartDate;
    private String sessionEndDate;
    private String activeTerms;
    private String logoUrl;
}
