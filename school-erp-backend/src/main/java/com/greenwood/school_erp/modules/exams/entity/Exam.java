package com.greenwood.school_erp.modules.exams.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "exams")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Exam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String examName;

    @Column(nullable = false)
    private String examType; // MID_TERM, FINAL_TERM, UNIT_TEST, PRELIM

    @Column(nullable = false)
    private String className;

    @Column(nullable = false)
    private String subject;

    @Column(nullable = false)
    private LocalDate examDate;

    private String startTime;

    private String endTime;

    private Integer maxMarks;

    private Integer passingMarks;

    private String roomNumber;

    @Builder.Default
    private String status = "SCHEDULED"; // SCHEDULED, ONGOING, COMPLETED
}
