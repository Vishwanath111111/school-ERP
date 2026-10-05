package com.greenwood.school_erp.modules.timetable.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.greenwood.school_erp.modules.timetable.dto.request.TimetableRequest;
import com.greenwood.school_erp.modules.timetable.dto.response.TimetableResponse;
import com.greenwood.school_erp.modules.timetable.entity.TimetableEntry;
import com.greenwood.school_erp.modules.timetable.repository.TimetableRepository;

@Service
@Transactional
public class TimetableService {

    @Autowired
    private TimetableRepository timetableRepository;

    @Transactional(readOnly = true)
    public List<TimetableResponse> getAllTimetableEntries() {
        return timetableRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<TimetableResponse> getTimetableByClass(String className) {
        return timetableRepository.findByClassName(className).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public TimetableResponse createTimetableEntry(TimetableRequest request) {
        TimetableEntry entry = TimetableEntry.builder()
                .className(request.getClassName())
                .dayOfWeek(request.getDayOfWeek())
                .periodNumber(request.getPeriodNumber())
                .subject(request.getSubject())
                .teacherName(request.getTeacherName() != null ? request.getTeacherName() : "Unassigned")
                .substituteTeacherName(request.getSubstituteTeacherName())
                .roomNumber(request.getRoomNumber() != null ? request.getRoomNumber() : "Room 101")
                .startTime(request.getStartTime() != null ? request.getStartTime() : "08:30 AM")
                .endTime(request.getEndTime() != null ? request.getEndTime() : "09:15 AM")
                .isSubstituted(request.getIsSubstituted() != null ? request.getIsSubstituted() : false)
                .build();

        TimetableEntry saved = timetableRepository.save(entry);
        return mapToResponse(saved);
    }

    public TimetableResponse updateTimetableEntry(Long id, TimetableRequest request) {
        TimetableEntry entry = timetableRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Timetable entry not found with ID: " + id));

        entry.setClassName(request.getClassName());
        entry.setDayOfWeek(request.getDayOfWeek());
        entry.setPeriodNumber(request.getPeriodNumber());
        entry.setSubject(request.getSubject());
        if (request.getTeacherName() != null) {
            entry.setTeacherName(request.getTeacherName());
        }
        entry.setSubstituteTeacherName(request.getSubstituteTeacherName());
        if (request.getRoomNumber() != null) {
            entry.setRoomNumber(request.getRoomNumber());
        }
        if (request.getStartTime() != null) {
            entry.setStartTime(request.getStartTime());
        }
        if (request.getEndTime() != null) {
            entry.setEndTime(request.getEndTime());
        }
        if (request.getIsSubstituted() != null) {
            entry.setIsSubstituted(request.getIsSubstituted());
        }

        TimetableEntry updated = timetableRepository.save(entry);
        return mapToResponse(updated);
    }

    public void deleteTimetableEntry(Long id) {
        if (!timetableRepository.existsById(id)) {
            throw new RuntimeException("Timetable entry not found with ID: " + id);
        }
        timetableRepository.deleteById(id);
    }

    private TimetableResponse mapToResponse(TimetableEntry entry) {
        return TimetableResponse.builder()
                .id(entry.getId())
                .className(entry.getClassName())
                .dayOfWeek(entry.getDayOfWeek())
                .periodNumber(entry.getPeriodNumber())
                .subject(entry.getSubject())
                .teacherName(entry.getTeacherName())
                .substituteTeacherName(entry.getSubstituteTeacherName())
                .roomNumber(entry.getRoomNumber())
                .startTime(entry.getStartTime())
                .endTime(entry.getEndTime())
                .isSubstituted(entry.getIsSubstituted())
                .build();
    }
}
