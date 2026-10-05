package com.greenwood.school_erp.modules.exams.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.greenwood.school_erp.modules.exams.dto.request.ExamRequest;
import com.greenwood.school_erp.modules.exams.dto.response.ExamResponse;
import com.greenwood.school_erp.modules.exams.entity.Exam;
import com.greenwood.school_erp.modules.exams.repository.ExamRepository;

@Service
@Transactional
public class ExamService {

    @Autowired
    private ExamRepository examRepository;

    @Transactional(readOnly = true)
    public List<ExamResponse> getAllExams() {
        return examRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ExamResponse getExamById(Long id) {
        Exam exam = examRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Examination schedule not found with ID: " + id));
        return mapToResponse(exam);
    }

    public ExamResponse createExam(ExamRequest request) {
        Exam exam = Exam.builder()
                .examName(request.getExamName())
                .examType(request.getExamType())
                .className(request.getClassName())
                .subject(request.getSubject())
                .examDate(request.getExamDate() != null ? request.getExamDate() : LocalDate.now().plusDays(10))
                .startTime(request.getStartTime() != null ? request.getStartTime() : "09:30 AM")
                .endTime(request.getEndTime() != null ? request.getEndTime() : "12:30 PM")
                .maxMarks(request.getMaxMarks() != null ? request.getMaxMarks() : 100)
                .passingMarks(request.getPassingMarks() != null ? request.getPassingMarks() : 35)
                .roomNumber(request.getRoomNumber() != null ? request.getRoomNumber() : "Hall A-1")
                .status(request.getStatus() != null ? request.getStatus() : "SCHEDULED")
                .build();

        Exam saved = examRepository.save(exam);
        return mapToResponse(saved);
    }

    public ExamResponse updateExam(Long id, ExamRequest request) {
        Exam exam = examRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Examination schedule not found with ID: " + id));

        exam.setExamName(request.getExamName());
        exam.setExamType(request.getExamType());
        exam.setClassName(request.getClassName());
        exam.setSubject(request.getSubject());
        if (request.getExamDate() != null) {
            exam.setExamDate(request.getExamDate());
        }
        if (request.getStartTime() != null) {
            exam.setStartTime(request.getStartTime());
        }
        if (request.getEndTime() != null) {
            exam.setEndTime(request.getEndTime());
        }
        if (request.getMaxMarks() != null) {
            exam.setMaxMarks(request.getMaxMarks());
        }
        if (request.getPassingMarks() != null) {
            exam.setPassingMarks(request.getPassingMarks());
        }
        if (request.getRoomNumber() != null) {
            exam.setRoomNumber(request.getRoomNumber());
        }
        if (request.getStatus() != null) {
            exam.setStatus(request.getStatus());
        }

        Exam updated = examRepository.save(exam);
        return mapToResponse(updated);
    }

    public void deleteExam(Long id) {
        if (!examRepository.existsById(id)) {
            throw new RuntimeException("Examination schedule not found with ID: " + id);
        }
        examRepository.deleteById(id);
    }

    private ExamResponse mapToResponse(Exam exam) {
        return ExamResponse.builder()
                .id(exam.getId())
                .examName(exam.getExamName())
                .examType(exam.getExamType())
                .className(exam.getClassName())
                .subject(exam.getSubject())
                .examDate(exam.getExamDate())
                .startTime(exam.getStartTime())
                .endTime(exam.getEndTime())
                .maxMarks(exam.getMaxMarks())
                .passingMarks(exam.getPassingMarks())
                .roomNumber(exam.getRoomNumber())
                .status(exam.getStatus())
                .build();
    }
}
