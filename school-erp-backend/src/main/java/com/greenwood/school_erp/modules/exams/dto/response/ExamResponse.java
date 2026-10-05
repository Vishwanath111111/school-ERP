package com.greenwood.school_erp.modules.exams.dto.response;

import java.time.LocalDate;

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
public class ExamResponse {

    private Long id;
    private String examName;
    private String examType;
    private String className;
    private String subject;
    private LocalDate examDate;
    private String startTime;
    private String endTime;
    private Integer maxMarks;
    private Integer passingMarks;
    private String roomNumber;
    private String status;
}
