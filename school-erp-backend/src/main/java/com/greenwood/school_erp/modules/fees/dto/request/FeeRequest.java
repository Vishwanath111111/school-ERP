package com.greenwood.school_erp.modules.fees.dto.request;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class FeeRequest {

    @NotBlank(message = "Invoice number is required")
    private String invoiceNo;

    @NotNull(message = "Student ID is required")
    private Long studentId;

    @NotBlank(message = "Student name is required")
    private String studentName;

    @NotBlank(message = "Class name is required")
    private String className;

    private String section;

    @NotNull(message = "Total amount is required")
    private Double totalAmount;

    private Double paidAmount;

    private LocalDate issueDate;

    private LocalDate dueDate;

    private String remarks;
}
