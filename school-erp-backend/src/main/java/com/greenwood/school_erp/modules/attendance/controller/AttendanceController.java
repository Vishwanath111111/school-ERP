package com.greenwood.school_erp.modules.attendance.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.greenwood.school_erp.modules.attendance.dto.request.BulkAttendanceRequest;
import com.greenwood.school_erp.modules.attendance.dto.response.AttendanceResponse;
import com.greenwood.school_erp.modules.attendance.service.AttendanceService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "*")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @GetMapping
    public ResponseEntity<List<AttendanceResponse>> getAttendance(
            @RequestParam(required = false) String className,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        if (className != null && !className.isBlank() && !"ALL".equalsIgnoreCase(className)) {
            return ResponseEntity.ok(attendanceService.getAttendanceByClassAndDate(className, date));
        }
        return ResponseEntity.ok(attendanceService.getAttendanceByDate(date));
    }

    @PostMapping("/bulk")
    public ResponseEntity<List<AttendanceResponse>> saveBulkAttendance(
            @Valid @RequestBody BulkAttendanceRequest request) {
        return ResponseEntity.ok(attendanceService.saveBulkAttendance(request));
    }
}
