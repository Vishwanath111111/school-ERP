package com.greenwood.school_erp.modules.fees.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.greenwood.school_erp.modules.fees.entity.FeeRecord;

@Repository
public interface FeeRepository extends JpaRepository<FeeRecord, Long> {

    Optional<FeeRecord> findByInvoiceNo(String invoiceNo);

    List<FeeRecord> findByStudentId(Long studentId);

    List<FeeRecord> findByStatus(String status);
}
