import { apiClient } from './api.client';
import { Homework, HomeworkRequest, HomeworkFilter, HomeworkStats } from '@/types/homework';

const SEED_HOMEWORKS: Homework[] = [
  {
    id: 1,
    title: 'Quadratic Equations & Polynomial Practice Sheet',
    className: 'Class 10',
    section: 'A',
    subject: 'Mathematics',
    teacherName: 'Anita Sharma',
    description: 'Complete Exercise 4.2 Problems 1 to 15 in homework notebook. Submit step-by-step solutions for factorization and quadratic formula methods.',
    issueDate: '2026-08-05',
    dueDate: '2026-08-12',
    totalMarks: 50,
    submittedCount: 32,
    totalStudents: 38,
    status: 'ACTIVE',
  },
  {
    id: 2,
    title: 'Newton’s Laws of Motion Numerical Worksheet',
    className: 'Class 11',
    section: 'A',
    subject: 'Physics',
    teacherName: 'Dr. Robert Chen',
    description: 'Solve numerical problems on momentum, force vectors, and friction coefficients given on page 142 of NCERT textbook.',
    issueDate: '2026-08-06',
    dueDate: '2026-08-14',
    totalMarks: 40,
    submittedCount: 28,
    totalStudents: 35,
    status: 'ACTIVE',
  },
  {
    id: 3,
    title: 'Essay: Impact of Artificial Intelligence in Modern Society',
    className: 'Class 9',
    section: 'B',
    subject: 'English',
    teacherName: 'Meera Kulkarni',
    description: 'Write a 400-word argumentative essay on ethical implications of AI technologies in healthcare and education.',
    issueDate: '2026-08-02',
    dueDate: '2026-08-09',
    totalMarks: 30,
    submittedCount: 36,
    totalStudents: 36,
    status: 'COMPLETED',
  },
  {
    id: 4,
    title: 'Python Data Structures & List Comprehensions Lab Assignment',
    className: 'Class 11',
    section: 'B',
    subject: 'Computer Science',
    teacherName: 'Vikram Deshmukh',
    description: 'Implement Python programs for list reversal, dictionary manipulation, and file read/write operations.',
    issueDate: '2026-08-07',
    dueDate: '2026-08-15',
    totalMarks: 50,
    submittedCount: 19,
    totalStudents: 34,
    status: 'ACTIVE',
  },
];

class HomeworkService {
  public async getAllHomeworks(filters?: HomeworkFilter): Promise<Homework[]> {
    let homeworks: Homework[] = [];
    try {
      homeworks = await apiClient.get<Homework[]>('/homework');
      if (!homeworks || homeworks.length === 0) {
        homeworks = SEED_HOMEWORKS;
      }
    } catch {
      homeworks = SEED_HOMEWORKS;
    }

    if (filters) {
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase().trim();
        homeworks = homeworks.filter(
          (h) =>
            h.title.toLowerCase().includes(query) ||
            h.subject.toLowerCase().includes(query) ||
            (h.teacherName && h.teacherName.toLowerCase().includes(query))
        );
      }

      if (filters.className && filters.className !== 'ALL') {
        homeworks = homeworks.filter((h) => h.className === filters.className);
      }

      if (filters.subject && filters.subject !== 'ALL') {
        homeworks = homeworks.filter((h) => h.subject === filters.subject);
      }

      if (filters.status && filters.status !== 'ALL') {
        homeworks = homeworks.filter((h) => h.status === filters.status);
      }
    }

    return homeworks;
  }

  public async getHomeworkById(id: number): Promise<Homework | null> {
    try {
      return await apiClient.get<Homework>(`/homework/${id}`);
    } catch {
      return SEED_HOMEWORKS.find((h) => h.id === id) || null;
    }
  }

  public async createHomework(request: HomeworkRequest): Promise<Homework> {
    try {
      return await apiClient.post<Homework>('/homework', request);
    } catch {
      const newHomework: Homework = {
        id: Date.now(),
        ...request,
        issueDate: request.issueDate || new Date().toISOString().split('T')[0],
        totalMarks: request.totalMarks || 50,
        submittedCount: request.submittedCount || 0,
        totalStudents: request.totalStudents || 38,
        status: request.status || 'ACTIVE',
      };
      SEED_HOMEWORKS.unshift(newHomework);
      return newHomework;
    }
  }

  public async updateHomework(id: number, request: HomeworkRequest): Promise<Homework> {
    try {
      return await apiClient.put<Homework>(`/homework/${id}`, request);
    } catch {
      const index = SEED_HOMEWORKS.findIndex((h) => h.id === id);
      if (index !== -1) {
        SEED_HOMEWORKS[index] = { ...SEED_HOMEWORKS[index], ...request };
        return SEED_HOMEWORKS[index];
      }
      throw new Error(`Homework ${id} not found`);
    }
  }

  public async deleteHomework(id: number): Promise<boolean> {
    try {
      await apiClient.delete(`/homework/${id}`);
      return true;
    } catch {
      const index = SEED_HOMEWORKS.findIndex((h) => h.id === id);
      if (index !== -1) {
        SEED_HOMEWORKS.splice(index, 1);
      }
      return true;
    }
  }

  public async getHomeworkStats(): Promise<HomeworkStats> {
    const homeworks = await this.getAllHomeworks();
    const todayStr = new Date().toISOString().split('T')[0];

    const active = homeworks.filter((h) => h.status === 'ACTIVE').length;
    const dueToday = homeworks.filter((h) => h.dueDate === todayStr).length;
    const totalSubmitted = homeworks.reduce((sum, h) => sum + h.submittedCount, 0);

    return {
      totalAssignments: homeworks.length,
      activeAssignmentsCount: active,
      dueTodayCount: dueToday,
      totalSubmissionsReceived: totalSubmitted,
    };
  }
}

export const homeworkService = new HomeworkService();
