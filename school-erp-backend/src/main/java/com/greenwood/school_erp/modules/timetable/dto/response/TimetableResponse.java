package com.greenwood.school_erp.modules.timetable.dto.response;

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
public class TimetableResponse {

    private Long id;
    private String className;
    private String dayOfWeek;
    private Integer periodNumber;
    private String subject;
    private String teacherName;
    private String substituteTeacherName;
    private String roomNumber;
    private String startTime;
    private String endTime;
    private Boolean isSubstituted;
}
