package com.greenwood.school_erp.modules.attendance.dto.request;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class AttendanceRequest {

    @NotNull(message = "Student ID is required")
    private Long studentId;

    @NotBlank(message = "Student name is required")
    private String studentName;

    @NotBlank(message = "Class name is required")
    private String className;

    private String section;

    @NotNull(message = "Attendance date is required")
    private LocalDate date;

    @NotBlank(message = "Attendance status is required")
    private String status;

    private String remarks;
}
