package com.greenwood.school_erp.modules.students.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "students")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "admission_no", unique = true, nullable = false, length = 50)
    private String admissionNo;

    @Column(name = "first_name", nullable = false, length = 100)
    private String firstName;

    @Column(name = "last_name", length = 100)
    private String lastName;

    @Column(name = "full_name", length = 200)
    private String fullName;

    @Column(name = "class_name", length = 50)
    private String className;

    @Column(name = "section", length = 20)
    private String section;

    @Column(name = "roll_no")
    private Integer rollNo;

    @Column(name = "house", length = 50)
    private String house;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "blood_group", length = 10)
    private String bloodGroup;

    @Column(name = "gender", length = 20)
    private String gender;

    @Column(name = "nationality", length = 50)
    private String nationality = "Indian";

    @Column(name = "parent_email", length = 150)
    private String parentEmail;

    @Column(name = "parent_phone", length = 20)
    private String parentPhone;

    @Column(name = "address", columnDefinition = "TEXT")
    private String address;

    @Column(name = "academic_year", length = 20)
    private String academicYear = "2025-2026";

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.fullName == null || this.fullName.isEmpty()) {
            this.fullName = (this.firstName + " " + (this.lastName != null ? this.lastName : "")).trim();
        }
    }
}