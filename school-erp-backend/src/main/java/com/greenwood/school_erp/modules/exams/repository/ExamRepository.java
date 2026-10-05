package com.greenwood.school_erp.modules.exams.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.greenwood.school_erp.modules.exams.entity.Exam;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Long> {

    List<Exam> findByClassName(String className);

    List<Exam> findByExamType(String examType);

    List<Exam> findByStatus(String status);
}
