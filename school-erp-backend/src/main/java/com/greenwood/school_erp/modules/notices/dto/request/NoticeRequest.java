package com.greenwood.school_erp.modules.notices.dto.request;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
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
public class NoticeRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Notice content is required")
    private String content;

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Target audience is required")
    private String audience;

    private String authorName;

    private LocalDate publishDate;

    private LocalDate expiryDate;

    @Builder.Default
    private Boolean isUrgent = false;

    @Builder.Default
    private Boolean isActive = true;

    private String attachmentUrl;
}
