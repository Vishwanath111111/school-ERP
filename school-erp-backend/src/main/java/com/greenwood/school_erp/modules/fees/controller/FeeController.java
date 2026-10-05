package com.greenwood.school_erp.modules.fees.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.greenwood.school_erp.modules.fees.dto.request.CollectPaymentRequest;
import com.greenwood.school_erp.modules.fees.dto.request.FeeRequest;
import com.greenwood.school_erp.modules.fees.dto.response.FeeResponse;
import com.greenwood.school_erp.modules.fees.service.FeeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/fees")
@CrossOrigin(origins = "*")
public class FeeController {

    @Autowired
    private FeeService feeService;

    @GetMapping
    public ResponseEntity<List<FeeResponse>> getAllFees() {
        return ResponseEntity.ok(feeService.getAllFees());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FeeResponse> getFeeById(@PathVariable Long id) {
        return ResponseEntity.ok(feeService.getFeeById(id));
    }

    @PostMapping
    public ResponseEntity<FeeResponse> createFeeRecord(@Valid @RequestBody FeeRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(feeService.createFeeRecord(request));
    }

    @PostMapping("/{id}/pay")
    public ResponseEntity<FeeResponse> collectPayment(
            @PathVariable Long id,
            @Valid @RequestBody CollectPaymentRequest request) {
        return ResponseEntity.ok(feeService.collectPayment(id, request));
    }
}
