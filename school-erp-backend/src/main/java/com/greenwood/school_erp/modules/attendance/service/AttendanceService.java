package com.greenwood.school_erp.modules.attendance.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.greenwood.school_erp.modules.attendance.dto.request.AttendanceRequest;
import com.greenwood.school_erp.modules.attendance.dto.request.BulkAttendanceRequest;
import com.greenwood.school_erp.modules.attendance.dto.response.AttendanceResponse;
import com.greenwood.school_erp.modules.attendance.entity.Attendance;
import com.greenwood.school_erp.modules.attendance.repository.AttendanceRepository;

@Service
@Transactional
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Transactional(readOnly = true)
    public List<AttendanceResponse> getAttendanceByClassAndDate(String className, LocalDate date) {
        return attendanceRepository.findByClassNameAndDate(className, date).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<AttendanceResponse> getAttendanceByDate(LocalDate date) {
        return attendanceRepository.findByDate(date).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<AttendanceResponse> saveBulkAttendance(BulkAttendanceRequest request) {
        List<AttendanceResponse> responses = new ArrayList<>();

        for (AttendanceRequest item : request.getItems()) {
            Optional<Attendance> existing = attendanceRepository.findByStudentIdAndDate(
                    item.getStudentId(), request.getDate());

            Attendance attendance;
            if (existing.isPresent()) {
                attendance = existing.get();
                attendance.setStatus(item.getStatus());
                attendance.setRemarks(item.getRemarks());
            } else {
                attendance = Attendance.builder()
                        .studentId(item.getStudentId())
                        .studentName(item.getStudentName())
                        .className(item.getClassName())
                        .section(item.getSection())
                        .date(request.getDate())
                        .status(item.getStatus())
                        .remarks(item.getRemarks())
                        .build();
            }

            Attendance saved = attendanceRepository.save(attendance);
            responses.add(mapToResponse(saved));
        }

        return responses;
    }

    private AttendanceResponse mapToResponse(Attendance attendance) {
        return AttendanceResponse.builder()
                .id(attendance.getId())
                .studentId(attendance.getStudentId())
                .studentName(attendance.getStudentName())
                .className(attendance.getClassName())
                .section(attendance.getSection())
                .date(attendance.getDate())
                .status(attendance.getStatus())
                .remarks(attendance.getRemarks())
                .build();
    }
}
