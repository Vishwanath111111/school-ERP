package com.greenwood.school_erp.modules.students.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.greenwood.school_erp.modules.students.entity.Student;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    
    Optional<Student> findByAdmissionNo(String admissionNo);
    
    boolean existsByAdmissionNo(String admissionNo);
}