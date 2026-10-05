package com.greenwood.school_erp.modules.homework.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.greenwood.school_erp.modules.homework.entity.Homework;

@Repository
public interface HomeworkRepository extends JpaRepository<Homework, Long> {

    List<Homework> findByClassName(String className);

    List<Homework> findBySubject(String subject);

    List<Homework> findByStatus(String status);
}
