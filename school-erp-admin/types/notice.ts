export type NoticeCategory = 'ACADEMIC' | 'EVENT' | 'EXAM' | 'EMERGENCY' | 'GENERAL';

export type NoticeAudience = 'ALL' | 'PARENTS' | 'TEACHERS' | 'STUDENTS';

export interface Notice {
  id: number;
  title: string;
  content: string;
  category: NoticeCategory;
  audience: NoticeAudience;
  authorName?: string;
  publishDate: string;
  expiryDate?: string;
  isUrgent: boolean;
  isActive: boolean;
  attachmentUrl?: string;
}

export interface NoticeRequest {
  title: string;
  content: string;
  category: NoticeCategory;
  audience: NoticeAudience;
  authorName?: string;
  publishDate?: string;
  expiryDate?: string;
  isUrgent?: boolean;
  isActive?: boolean;
  attachmentUrl?: string;
}

export interface NoticeFilter {
  searchQuery?: string;
  category?: string;
  audience?: string;
  isUrgent?: string;
}

export interface NoticeStats {
  totalNotices: number;
  urgentNoticesCount: number;
  parentNoticesCount: number;
  publishedTodayCount: number;
}
