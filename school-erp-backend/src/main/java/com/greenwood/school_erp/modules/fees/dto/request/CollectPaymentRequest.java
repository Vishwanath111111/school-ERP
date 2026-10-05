package com.greenwood.school_erp.modules.fees.dto.request;

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
public class CollectPaymentRequest {

    @NotNull(message = "Payment amount is required")
    private Double amount;

    @NotBlank(message = "Payment method is required")
    private String paymentMethod; // CASH, ONLINE, CHEQUE, UPI

    private String transactionRef;

    private String remarks;
}
