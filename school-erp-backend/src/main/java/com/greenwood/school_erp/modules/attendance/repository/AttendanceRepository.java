package com.greenwood.school_erp.modules.attendance.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.greenwood.school_erp.modules.attendance.entity.Attendance;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    List<Attendance> findByClassNameAndDate(String className, LocalDate date);

    List<Attendance> findByDate(LocalDate date);

    Optional<Attendance> findByStudentIdAndDate(Long studentId, LocalDate date);
}
