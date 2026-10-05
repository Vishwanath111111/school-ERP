package com.greenwood.school_erp.modules.settings.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.greenwood.school_erp.modules.settings.entity.SchoolSettings;

@Repository
public interface SettingsRepository extends JpaRepository<SchoolSettings, Long> {
}
