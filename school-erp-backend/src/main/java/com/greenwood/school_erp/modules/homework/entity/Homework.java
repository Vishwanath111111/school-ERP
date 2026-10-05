package com.greenwood.school_erp.modules.homework.entity;

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
@Table(name = "homeworks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Homework {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String className;

    private String section;

    @Column(nullable = false)
    private String subject;

    private String teacherName;

    @Column(nullable = false, length = 2000)
    private String description;

    @Column(nullable = false)
    private LocalDate issueDate;

    @Column(nullable = false)
    private LocalDate dueDate;

    private Integer totalMarks;

    @Builder.Default
    private Integer submittedCount = 0;

    @Builder.Default
    private Integer totalStudents = 40;

    @Builder.Default
    private String status = "ACTIVE"; // ACTIVE, COMPLETED, EXPIRED

    private String attachmentUrl;
}
