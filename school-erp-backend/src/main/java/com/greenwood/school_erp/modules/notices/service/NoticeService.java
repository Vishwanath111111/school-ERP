package com.greenwood.school_erp.modules.notices.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.greenwood.school_erp.modules.notices.dto.request.NoticeRequest;
import com.greenwood.school_erp.modules.notices.dto.response.NoticeResponse;
import com.greenwood.school_erp.modules.notices.entity.Notice;
import com.greenwood.school_erp.modules.notices.repository.NoticeRepository;

@Service
@Transactional
public class NoticeService {

    @Autowired
    private NoticeRepository noticeRepository;

    @Transactional(readOnly = true)
    public List<NoticeResponse> getAllNotices() {
        return noticeRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public NoticeResponse getNoticeById(Long id) {
        Notice notice = noticeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notice announcement not found with ID: " + id));
        return mapToResponse(notice);
    }

    public NoticeResponse createNotice(NoticeRequest request) {
        Notice notice = Notice.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .category(request.getCategory())
                .audience(request.getAudience())
                .authorName(request.getAuthorName() != null ? request.getAuthorName() : "School Administration")
                .publishDate(request.getPublishDate() != null ? request.getPublishDate() : LocalDate.now())
                .expiryDate(request.getExpiryDate())
                .isUrgent(request.getIsUrgent() != null ? request.getIsUrgent() : false)
                .isActive(request.getIsActive() != null ? request.getIsActive() : true)
                .attachmentUrl(request.getAttachmentUrl())
                .build();

        Notice saved = noticeRepository.save(notice);
        return mapToResponse(saved);
    }

    public NoticeResponse updateNotice(Long id, NoticeRequest request) {
        Notice notice = noticeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notice announcement not found with ID: " + id));

        notice.setTitle(request.getTitle());
        notice.setContent(request.getContent());
        notice.setCategory(request.getCategory());
        notice.setAudience(request.getAudience());
        if (request.getAuthorName() != null) {
            notice.setAuthorName(request.getAuthorName());
        }
        if (request.getPublishDate() != null) {
            notice.setPublishDate(request.getPublishDate());
        }
        notice.setExpiryDate(request.getExpiryDate());
        if (request.getIsUrgent() != null) {
            notice.setIsUrgent(request.getIsUrgent());
        }
        if (request.getIsActive() != null) {
            notice.setIsActive(request.getIsActive());
        }
        notice.setAttachmentUrl(request.getAttachmentUrl());

        Notice updated = noticeRepository.save(notice);
        return mapToResponse(updated);
    }

    public void deleteNotice(Long id) {
        if (!noticeRepository.existsById(id)) {
            throw new RuntimeException("Notice announcement not found with ID: " + id);
        }
        noticeRepository.deleteById(id);
    }

    private NoticeResponse mapToResponse(Notice notice) {
        return NoticeResponse.builder()
                .id(notice.getId())
                .title(notice.getTitle())
                .content(notice.getContent())
                .category(notice.getCategory())
                .audience(notice.getAudience())
                .authorName(notice.getAuthorName())
                .publishDate(notice.getPublishDate())
                .expiryDate(notice.getExpiryDate())
                .isUrgent(notice.getIsUrgent())
                .isActive(notice.getIsActive())
                .attachmentUrl(notice.getAttachmentUrl())
                .build();
    }
}
