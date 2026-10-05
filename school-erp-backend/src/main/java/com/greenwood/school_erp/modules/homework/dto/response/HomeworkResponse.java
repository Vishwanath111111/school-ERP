package com.greenwood.school_erp.modules.homework.dto.response;

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
public class HomeworkResponse {

    private Long id;
    private String title;
    private String className;
    private String section;
    private String subject;
    private String teacherName;
    private String description;
    private LocalDate issueDate;
    private LocalDate dueDate;
    private Integer totalMarks;
    private Integer submittedCount;
    private Integer totalStudents;
    private String status;
    private String attachmentUrl;
}
