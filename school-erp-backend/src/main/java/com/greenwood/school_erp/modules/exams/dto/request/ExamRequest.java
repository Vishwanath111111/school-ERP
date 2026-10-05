package com.greenwood.school_erp.modules.exams.dto.request;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
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
public class ExamRequest {

    @NotBlank(message = "Exam name is required")
    private String examName;

    @NotBlank(message = "Exam type is required")
    private String examType;

    @NotBlank(message = "Class name is required")
    private String className;

    @NotBlank(message = "Subject is required")
    private String subject;

    @NotNull(message = "Exam date is required")
    private LocalDate examDate;

    private String startTime;

    private String endTime;

    private Integer maxMarks;

    private Integer passingMarks;

    private String roomNumber;

    private String status;
}
