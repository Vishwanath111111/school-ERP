package com.greenwood.school_erp.modules.fees.entity;

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
@Table(name = "fees")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeeRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String invoiceNo;

    @Column(nullable = false)
    private Long studentId;

    @Column(nullable = false)
    private String studentName;

    @Column(nullable = false)
    private String className;

    private String section;

    @Column(nullable = false)
    private Double totalAmount;

    @Column(nullable = false)
    private Double paidAmount;

    @Column(nullable = false)
    private Double dueAmount;

    @Column(nullable = false)
    private String status; // PAID, PENDING, OVERDUE, PARTIAL

    private String paymentMethod; // CASH, ONLINE, CHEQUE, UPI

    private String transactionRef;

    private LocalDate issueDate;

    private LocalDate dueDate;

    private LocalDate paidDate;

    private String remarks;
}
