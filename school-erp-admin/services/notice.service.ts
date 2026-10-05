import { apiClient } from './api.client';
import { Notice, NoticeRequest, NoticeFilter, NoticeStats } from '@/types/notice';

const SEED_NOTICES: Notice[] = [
  {
    id: 1,
    title: 'Mid-Term Examination Schedule & Guidelines 2026',
    content: 'The Mid-Term Examinations for Classes 6 to 12 will commence on August 18, 2026. Hall tickets will be issued by class teachers. All students are advised to check the detailed timetable on the student portal.',
    category: 'EXAM',
    audience: 'ALL',
    authorName: 'Examination Cell',
    publishDate: '2026-08-05',
    expiryDate: '2026-08-28',
    isUrgent: true,
    isActive: true,
  },
  {
    id: 2,
    title: 'Parent-Teacher Meeting (Classes 9 to 12)',
    content: 'A Parent-Teacher Conference is scheduled for August 29, 2026, from 10:00 AM to 02:00 PM in the School Auditorium. Progress reports for Term 1 will be discussed.',
    category: 'EVENT',
    audience: 'PARENTS',
    authorName: 'Principal Office',
    publishDate: '2026-08-07',
    expiryDate: '2026-08-30',
    isUrgent: false,
    isActive: true,
  },
  {
    id: 3,
    title: 'Independence Day Flag Hoisting Ceremony',
    content: 'Greenwood School will celebrate the 79th Independence Day on August 15, 2026. Flag hoisting ceremony begins promptly at 08:00 AM. Attendance is mandatory for staff and student council members.',
    category: 'EVENT',
    audience: 'ALL',
    authorName: 'Cultural Committee',
    publishDate: '2026-08-08',
    expiryDate: '2026-08-16',
    isUrgent: false,
    isActive: true,
  },
  {
    id: 4,
    title: 'Science & Robotics Exhibition Registration',
    content: 'Students from Classes 7 to 11 interested in presenting projects at the Annual Science Fair are requested to submit project abstracts to the HOD Science by August 20.',
    category: 'ACADEMIC',
    audience: 'STUDENTS',
    authorName: 'Science Department',
    publishDate: '2026-08-04',
    expiryDate: '2026-08-20',
    isUrgent: false,
    isActive: true,
  },
];

class NoticeService {
  public async getAllNotices(filters?: NoticeFilter): Promise<Notice[]> {
    let notices: Notice[] = [];
    try {
      notices = await apiClient.get<Notice[]>('/notices');
      if (!notices || notices.length === 0) {
        notices = SEED_NOTICES;
      }
    } catch {
      notices = SEED_NOTICES;
    }

    if (filters) {
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase().trim();
        notices = notices.filter(
          (n) =>
            n.title.toLowerCase().includes(query) ||
            n.content.toLowerCase().includes(query) ||
            (n.authorName && n.authorName.toLowerCase().includes(query))
        );
      }

      if (filters.category && filters.category !== 'ALL') {
        notices = notices.filter((n) => n.category === filters.category);
      }

      if (filters.audience && filters.audience !== 'ALL') {
        notices = notices.filter((n) => n.audience === filters.audience || n.audience === 'ALL');
      }

      if (filters.isUrgent !== undefined && filters.isUrgent !== 'ALL') {
        const urgentBool = filters.isUrgent === 'true';
        notices = notices.filter((n) => n.isUrgent === urgentBool);
      }
    }

    return notices;
  }

  public async getNoticeById(id: number): Promise<Notice | null> {
    try {
      return await apiClient.get<Notice>(`/notices/${id}`);
    } catch {
      return SEED_NOTICES.find((n) => n.id === id) || null;
    }
  }

  public async createNotice(request: NoticeRequest): Promise<Notice> {
    try {
      return await apiClient.post<Notice>('/notices', request);
    } catch {
      const newNotice: Notice = {
        id: Date.now(),
        ...request,
        publishDate: request.publishDate || new Date().toISOString().split('T')[0],
        isUrgent: request.isUrgent || false,
        isActive: request.isActive !== undefined ? request.isActive : true,
      };
      SEED_NOTICES.unshift(newNotice);
      return newNotice;
    }
  }

  public async updateNotice(id: number, request: NoticeRequest): Promise<Notice> {
    try {
      return await apiClient.put<Notice>(`/notices/${id}`, request);
    } catch {
      const index = SEED_NOTICES.findIndex((n) => n.id === id);
      if (index !== -1) {
        SEED_NOTICES[index] = { ...SEED_NOTICES[index], ...request };
        return SEED_NOTICES[index];
      }
      throw new Error(`Notice ${id} not found`);
    }
  }

  public async deleteNotice(id: number): Promise<boolean> {
    try {
      await apiClient.delete(`/notices/${id}`);
      return true;
    } catch {
      const index = SEED_NOTICES.findIndex((n) => n.id === id);
      if (index !== -1) {
        SEED_NOTICES.splice(index, 1);
      }
      return true;
    }
  }

  public async getNoticeStats(): Promise<NoticeStats> {
    const notices = await this.getAllNotices();
    const todayStr = new Date().toISOString().split('T')[0];

    const urgent = notices.filter((n) => n.isUrgent).length;
    const parentNotices = notices.filter((n) => n.audience === 'PARENTS' || n.audience === 'ALL').length;
    const todayCount = notices.filter((n) => n.publishDate === todayStr).length;

    return {
      totalNotices: notices.length,
      urgentNoticesCount: urgent,
      parentNoticesCount: parentNotices,
      publishedTodayCount: todayCount,
    };
  }
}

export const noticeService = new NoticeService();
