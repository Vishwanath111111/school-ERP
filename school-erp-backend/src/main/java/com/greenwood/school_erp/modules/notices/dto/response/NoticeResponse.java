package com.greenwood.school_erp.modules.notices.dto.response;

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
public class NoticeResponse {

    private Long id;
    private String title;
    private String content;
    private String category;
    private String audience;
    private String authorName;
    private LocalDate publishDate;
    private LocalDate expiryDate;
    private Boolean isUrgent;
    private Boolean isActive;
    private String attachmentUrl;
}
