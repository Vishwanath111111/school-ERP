package com.greenwood.school_erp.modules.attendance.dto.request;

import java.time.LocalDate;
import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
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
public class BulkAttendanceRequest {

    @NotNull(message = "Attendance date is required")
    private LocalDate date;

    @NotEmpty(message = "Attendance items cannot be empty")
    @Valid
    private List<AttendanceRequest> items;
}
