package com.greenwood.school_erp.modules.timetable.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.greenwood.school_erp.modules.timetable.entity.TimetableEntry;

@Repository
public interface TimetableRepository extends JpaRepository<TimetableEntry, Long> {

    List<TimetableEntry> findByClassName(String className);

    List<TimetableEntry> findByClassNameAndDayOfWeek(String className, String dayOfWeek);

    List<TimetableEntry> findByTeacherName(String teacherName);
}
