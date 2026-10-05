package com.greenwood.school_erp.modules.timetable.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.greenwood.school_erp.modules.timetable.dto.request.TimetableRequest;
import com.greenwood.school_erp.modules.timetable.dto.response.TimetableResponse;
import com.greenwood.school_erp.modules.timetable.service.TimetableService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/timetable")
@CrossOrigin(origins = "*")
public class TimetableController {

    @Autowired
    private TimetableService timetableService;

    @GetMapping
    public ResponseEntity<List<TimetableResponse>> getTimetable(
            @RequestParam(required = false) String className) {
        if (className != null && !className.isBlank()) {
            return ResponseEntity.ok(timetableService.getTimetableByClass(className));
        }
        return ResponseEntity.ok(timetableService.getAllTimetableEntries());
    }

    @PostMapping
    public ResponseEntity<TimetableResponse> createEntry(@Valid @RequestBody TimetableRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(timetableService.createTimetableEntry(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TimetableResponse> updateEntry(
            @PathVariable Long id,
            @Valid @RequestBody TimetableRequest request) {
        return ResponseEntity.ok(timetableService.updateTimetableEntry(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEntry(@PathVariable Long id) {
        timetableService.deleteTimetableEntry(id);
        return ResponseEntity.noContent().build();
    }
}
