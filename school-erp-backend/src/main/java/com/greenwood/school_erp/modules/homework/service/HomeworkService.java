package com.greenwood.school_erp.modules.homework.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.greenwood.school_erp.modules.homework.dto.request.HomeworkRequest;
import com.greenwood.school_erp.modules.homework.dto.response.HomeworkResponse;
import com.greenwood.school_erp.modules.homework.entity.Homework;
import com.greenwood.school_erp.modules.homework.repository.HomeworkRepository;

@Service
@Transactional
public class HomeworkService {

    @Autowired
    private HomeworkRepository homeworkRepository;

    @Transactional(readOnly = true)
    public List<HomeworkResponse> getAllHomeworks() {
        return homeworkRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public HomeworkResponse getHomeworkById(Long id) {
        Homework homework = homeworkRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Homework assignment not found with ID: " + id));
        return mapToResponse(homework);
    }

    public HomeworkResponse createHomework(HomeworkRequest request) {
        Homework homework = Homework.builder()
                .title(request.getTitle())
                .className(request.getClassName())
                .section(request.getSection())
                .subject(request.getSubject())
                .teacherName(request.getTeacherName() != null ? request.getTeacherName() : "Subject Teacher")
                .description(request.getDescription())
                .issueDate(request.getIssueDate() != null ? request.getIssueDate() : LocalDate.now())
                .dueDate(request.getDueDate() != null ? request.getDueDate() : LocalDate.now().plusDays(7))
                .totalMarks(request.getTotalMarks() != null ? request.getTotalMarks() : 100)
                .submittedCount(request.getSubmittedCount() != null ? request.getSubmittedCount() : 0)
                .totalStudents(request.getTotalStudents() != null ? request.getTotalStudents() : 40)
                .status(request.getStatus() != null ? request.getStatus() : "ACTIVE")
                .attachmentUrl(request.getAttachmentUrl())
                .build();

        Homework saved = homeworkRepository.save(homework);
        return mapToResponse(saved);
    }

    public HomeworkResponse updateHomework(Long id, HomeworkRequest request) {
        Homework homework = homeworkRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Homework assignment not found with ID: " + id));

        homework.setTitle(request.getTitle());
        homework.setClassName(request.getClassName());
        homework.setSection(request.getSection());
        homework.setSubject(request.getSubject());
        if (request.getTeacherName() != null) {
            homework.setTeacherName(request.getTeacherName());
        }
        homework.setDescription(request.getDescription());
        if (request.getIssueDate() != null) {
            homework.setIssueDate(request.getIssueDate());
        }
        if (request.getDueDate() != null) {
            homework.setDueDate(request.getDueDate());
        }
        if (request.getTotalMarks() != null) {
            homework.setTotalMarks(request.getTotalMarks());
        }
        if (request.getSubmittedCount() != null) {
            homework.setSubmittedCount(request.getSubmittedCount());
        }
        if (request.getStatus() != null) {
            homework.setStatus(request.getStatus());
        }
        homework.setAttachmentUrl(request.getAttachmentUrl());

        Homework updated = homeworkRepository.save(homework);
        return mapToResponse(updated);
    }

    public void deleteHomework(Long id) {
        if (!homeworkRepository.existsById(id)) {
            throw new RuntimeException("Homework assignment not found with ID: " + id);
        }
        homeworkRepository.deleteById(id);
    }

    private HomeworkResponse mapToResponse(Homework homework) {
        return HomeworkResponse.builder()
                .id(homework.getId())
                .title(homework.getTitle())
                .className(homework.getClassName())
                .section(homework.getSection())
                .subject(homework.getSubject())
                .teacherName(homework.getTeacherName())
                .description(homework.getDescription())
                .issueDate(homework.getIssueDate())
                .dueDate(homework.getDueDate())
                .totalMarks(homework.getTotalMarks())
                .submittedCount(homework.getSubmittedCount())
                .totalStudents(homework.getTotalStudents())
                .status(homework.getStatus())
                .attachmentUrl(homework.getAttachmentUrl())
                .build();
    }
}
