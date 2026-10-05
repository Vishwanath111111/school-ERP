package com.greenwood.school_erp.modules.reports.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.greenwood.school_erp.modules.reports.dto.response.ReportSummaryResponse;
import com.greenwood.school_erp.modules.reports.service.ReportService;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "*")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping("/summary")
    public ResponseEntity<ReportSummaryResponse> getReportSummary() {
        return ResponseEntity.ok(reportService.getReportSummary());
    }
}
