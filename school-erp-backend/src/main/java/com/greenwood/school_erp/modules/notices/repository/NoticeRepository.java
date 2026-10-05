package com.greenwood.school_erp.modules.notices.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.greenwood.school_erp.modules.notices.entity.Notice;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {

    List<Notice> findByAudienceIn(List<String> audiences);

    List<Notice> findByCategory(String category);

    List<Notice> findByIsUrgentTrue();
}
