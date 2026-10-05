package com.greenwood.school_erp.modules.students.response;

import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentResponse {

    private Long id;
    private String admissionNo;
    private String firstName;
    private String lastName;
    private String fullName;
    private String className;
    private String section;
    private Integer rollNo;
    private String house;
    private LocalDate dateOfBirth;
    private String bloodGroup;
    private String gender;
    private String nationality;
    private String parentEmail;
    private String parentPhone;
    private String address;
    private String academicYear;
    private Boolean isActive;
    private LocalDateTime createdAt;
}