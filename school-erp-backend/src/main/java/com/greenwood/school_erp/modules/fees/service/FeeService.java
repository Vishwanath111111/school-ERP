package com.greenwood.school_erp.modules.fees.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.greenwood.school_erp.modules.fees.dto.request.CollectPaymentRequest;
import com.greenwood.school_erp.modules.fees.dto.request.FeeRequest;
import com.greenwood.school_erp.modules.fees.dto.response.FeeResponse;
import com.greenwood.school_erp.modules.fees.entity.FeeRecord;
import com.greenwood.school_erp.modules.fees.repository.FeeRepository;

@Service
@Transactional
public class FeeService {

    @Autowired
    private FeeRepository feeRepository;

    @Transactional(readOnly = true)
    public List<FeeResponse> getAllFees() {
        return feeRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public FeeResponse getFeeById(Long id) {
        FeeRecord record = feeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fee invoice record not found with ID: " + id));
        return mapToResponse(record);
    }

    public FeeResponse createFeeRecord(FeeRequest request) {
        Double paid = request.getPaidAmount() != null ? request.getPaidAmount() : 0.0;
        Double due = Math.max(0.0, request.getTotalAmount() - paid);

        String status = "PENDING";
        if (due == 0.0) {
            status = "PAID";
        } else if (paid > 0.0) {
            status = "PARTIAL";
        }

        FeeRecord record = FeeRecord.builder()
                .invoiceNo(request.getInvoiceNo())
                .studentId(request.getStudentId())
                .studentName(request.getStudentName())
                .className(request.getClassName())
                .section(request.getSection())
                .totalAmount(request.getTotalAmount())
                .paidAmount(paid)
                .dueAmount(due)
                .status(status)
                .issueDate(request.getIssueDate() != null ? request.getIssueDate() : LocalDate.now())
                .dueDate(request.getDueDate() != null ? request.getDueDate() : LocalDate.now().plusDays(30))
                .remarks(request.getRemarks())
                .build();

        FeeRecord saved = feeRepository.save(record);
        return mapToResponse(saved);
    }

    public FeeResponse collectPayment(Long id, CollectPaymentRequest request) {
        FeeRecord record = feeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fee invoice record not found with ID: " + id));

        Double newPaid = record.getPaidAmount() + request.getAmount();
        Double newDue = Math.max(0.0, record.getTotalAmount() - newPaid);

        record.setPaidAmount(newPaid);
        record.setDueAmount(newDue);
        record.setPaymentMethod(request.getPaymentMethod());
        record.setTransactionRef(request.getTransactionRef());
        record.setPaidDate(LocalDate.now());

        if (newDue == 0.0) {
            record.setStatus("PAID");
        } else {
            record.setStatus("PARTIAL");
        }

        if (request.getRemarks() != null && !request.getRemarks().isBlank()) {
            record.setRemarks(request.getRemarks());
        }

        FeeRecord updated = feeRepository.save(record);
        return mapToResponse(updated);
    }

    private FeeResponse mapToResponse(FeeRecord record) {
        return FeeResponse.builder()
                .id(record.getId())
                .invoiceNo(record.getInvoiceNo())
                .studentId(record.getStudentId())
                .studentName(record.getStudentName())
                .className(record.getClassName())
                .section(record.getSection())
                .totalAmount(record.getTotalAmount())
                .paidAmount(record.getPaidAmount())
                .dueAmount(record.getDueAmount())
                .status(record.getStatus())
                .paymentMethod(record.getPaymentMethod())
                .transactionRef(record.getTransactionRef())
                .issueDate(record.getIssueDate())
                .dueDate(record.getDueDate())
                .paidDate(record.getPaidDate())
                .remarks(record.getRemarks())
                .build();
    }
}
