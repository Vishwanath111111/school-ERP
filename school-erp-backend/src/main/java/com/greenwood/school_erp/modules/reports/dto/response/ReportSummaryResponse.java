package com.greenwood.school_erp.modules.reports.dto.response;

import java.util.Map;

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
public class ReportSummaryResponse {

    private Long totalStudents;
    private Long totalTeachers;
    private Double totalRevenue;
    private Double totalPendingDues;
    private Double overallAttendanceRate;
    private Map<String, Double> classAttendanceRates;
    private Map<String, Double> feeStatusBreakdown;
}
