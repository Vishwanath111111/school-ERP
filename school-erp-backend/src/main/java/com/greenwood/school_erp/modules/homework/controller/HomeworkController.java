package com.greenwood.school_erp.modules.homework.controller;

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
import org.springframework.web.bind.annotation.RestController;

import com.greenwood.school_erp.modules.homework.dto.request.HomeworkRequest;
import com.greenwood.school_erp.modules.homework.dto.response.HomeworkResponse;
import com.greenwood.school_erp.modules.homework.service.HomeworkService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/homework")
@CrossOrigin(origins = "*")
public class HomeworkController {

    @Autowired
    private HomeworkService homeworkService;

    @GetMapping
    public ResponseEntity<List<HomeworkResponse>> getAllHomeworks() {
        return ResponseEntity.ok(homeworkService.getAllHomeworks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HomeworkResponse> getHomeworkById(@PathVariable Long id) {
        return ResponseEntity.ok(homeworkService.getHomeworkById(id));
    }

    @PostMapping
    public ResponseEntity<HomeworkResponse> createHomework(@Valid @RequestBody HomeworkRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(homeworkService.createHomework(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<HomeworkResponse> updateHomework(
            @PathVariable Long id,
            @Valid @RequestBody HomeworkRequest request) {
        return ResponseEntity.ok(homeworkService.updateHomework(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHomework(@PathVariable Long id) {
        homeworkService.deleteHomework(id);
        return ResponseEntity.noContent().build();
    }
}
