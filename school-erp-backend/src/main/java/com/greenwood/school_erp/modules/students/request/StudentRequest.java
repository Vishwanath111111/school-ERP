package com.greenwood.school_erp.modules.students.request;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentRequest {

    @NotBlank(message = "Admission number is required")
    private String admissionNo;

    @NotBlank(message = "First name is required")
    private String firstName;

    private String lastName;

    @NotBlank(message = "Class is required")
    private String className;

    private String section;

    private Integer rollNo;

    private String house;

    private String dateOfBirth; // format: yyyy-MM-dd

    private String bloodGroup;

    private String gender;

    private String nationality = "Indian";

    private String parentEmail;

    private String parentPhone;

    private String address;

    private String academicYear = "2025-2026";
}