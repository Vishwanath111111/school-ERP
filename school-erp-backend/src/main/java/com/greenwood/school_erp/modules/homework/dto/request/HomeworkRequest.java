package com.greenwood.school_erp.modules.homework.dto.request;

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
public class HomeworkRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Class name is required")
    private String className;

    private String section;

    @NotBlank(message = "Subject is required")
    private String subject;

    private String teacherName;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Issue date is required")
    private LocalDate issueDate;

    @NotNull(message = "Due date is required")
    private LocalDate dueDate;

    private Integer totalMarks;

    private Integer submittedCount;

    private Integer totalStudents;

    private String status;

    private String attachmentUrl;
}
