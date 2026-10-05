package com.greenwood.school_erp.modules.teachers.dto.response;

import java.time.LocalDate;

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
public class TeacherResponse {

    private Long id;
    private String employeeId;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String department;
    private String designation;
    private String qualification;
    private String assignedSubject;
    private String assignedClass;
    private LocalDate joiningDate;
    private String gender;
    private Double salary;
    private Boolean isActive;
    private String address;
}
