package com.greenwood.school_erp.modules.attendance.dto.response;

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
public class AttendanceResponse {

    private Long id;
    private Long studentId;
    private String studentName;
    private String className;
    private String section;
    private LocalDate date;
    private String status;
    private String remarks;
}
