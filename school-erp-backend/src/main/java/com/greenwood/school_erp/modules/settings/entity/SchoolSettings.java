package com.greenwood.school_erp.modules.settings.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "settings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SchoolSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String schoolName;

    private String affiliationCode;

    private String principalName;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String phone;

    private String address;

    @Column(nullable = false)
    private String currentAcademicYear;

    private String sessionStartDate;

    private String sessionEndDate;

    private String activeTerms;

    private String logoUrl;
}
