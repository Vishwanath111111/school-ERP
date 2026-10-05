package com.greenwood.school_erp.modules.timetable.dto.request;

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
public class TimetableRequest {

    @NotBlank(message = "Class name is required")
    private String className;

    @NotBlank(message = "Day of week is required")
    private String dayOfWeek;

    @NotNull(message = "Period number is required")
    private Integer periodNumber;

    @NotBlank(message = "Subject is required")
    private String subject;

    private String teacherName;

    private String substituteTeacherName;

    private String roomNumber;

    private String startTime;

    private String endTime;

    private Boolean isSubstituted;
}
