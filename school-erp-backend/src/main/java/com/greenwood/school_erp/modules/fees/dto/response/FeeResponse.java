package com.greenwood.school_erp.modules.fees.dto.response;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeeResponse {

    private Long id;
    private String invoiceNo;
    private Long studentId;
    private String studentName;
    private String className;
    private String section;
    private Double totalAmount;
    private Double paidAmount;
    private Double dueAmount;
    private String status;
    private String paymentMethod;
    private String transactionRef;
    private LocalDate issueDate;
    private LocalDate dueDate;
    private LocalDate paidDate;
    private String remarks;
}
