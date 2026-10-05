package com.greenwood.school_erp.modules.notices.entity;

import java.time.LocalDate;

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
@Table(name = "notices")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 2000)
    private String content;

    @Column(nullable = false)
    private String category; // ACADEMIC, EVENT, EXAM, EMERGENCY, GENERAL

    @Column(nullable = false)
    private String audience; // ALL, PARENTS, TEACHERS, STUDENTS

    private String authorName;

    @Column(nullable = false)
    private LocalDate publishDate;

    private LocalDate expiryDate;

    @Builder.Default
    private Boolean isUrgent = false;

    @Builder.Default
    private Boolean isActive = true;

    private String attachmentUrl;
}
