import { apiClient } from './api.client';
import { Exam, ExamRequest, ExamFilter, ExamStats, StudentReportCard } from '@/types/exam';

const SEED_EXAMS: Exam[] = [
  {
    id: 1,
    examName: 'Mid-Term Mathematics Assessment',
    examType: 'MID_TERM',
    className: 'Class 10',
    subject: 'Mathematics',
    examDate: '2026-08-18',
    startTime: '09:30 AM',
    endTime: '12:30 PM',
    maxMarks: 100,
    passingMarks: 35,
    roomNumber: 'Hall A-1',
    status: 'SCHEDULED',
  },
  {
    id: 2,
    examName: 'Physics & Thermodynamics Practical Test',
    examType: 'UNIT_TEST',
    className: 'Class 11',
    subject: 'Physics',
    examDate: '2026-08-20',
    startTime: '10:00 AM',
    endTime: '11:30 AM',
    maxMarks: 50,
    passingMarks: 18,
    roomNumber: 'Science Lab 2',
    status: 'SCHEDULED',
  },
  {
    id: 3,
    examName: 'English Literature & Essay Evaluation',
    examType: 'MID_TERM',
    className: 'Class 9',
    subject: 'English',
    examDate: '2026-08-04',
    startTime: '09:30 AM',
    endTime: '12:00 PM',
    maxMarks: 80,
    passingMarks: 28,
    roomNumber: 'Auditorium Block B',
    status: 'COMPLETED',
  },
  {
    id: 4,
    examName: 'Computer Science Practical & Viva',
    examType: 'PRELIM',
    className: 'Class 11',
    subject: 'Computer Science',
    examDate: '2026-08-22',
    startTime: '01:30 PM',
    endTime: '03:30 PM',
    maxMarks: 70,
    passingMarks: 25,
    roomNumber: 'Computer Lab 1',
    status: 'SCHEDULED',
  },
];

const SAMPLE_REPORT_CARD: StudentReportCard = {
  studentId: 'STU-1002',
  studentName: 'Aarav Sharma',
  rollNumber: '10-A-14',
  className: 'Class 10-A',
  academicYear: '2025-2026',
  examName: 'Mid-Term Examinations 2026',
  totalMaxMarks: 500,
  totalObtainedMarks: 462,
  percentage: 92.4,
  gpa: '3.9 / 4.0',
  overallGrade: 'A+',
  resultStatus: 'DISTINCTION',
  marks: [
    { subject: 'Mathematics', maxMarks: 100, obtainedMarks: 98, grade: 'A+', teacherRemarks: 'Outstanding analytical skills' },
    { subject: 'Physics', maxMarks: 100, obtainedMarks: 92, grade: 'A+', teacherRemarks: 'Excellent numerical accuracy' },
    { subject: 'Chemistry', maxMarks: 100, obtainedMarks: 88, grade: 'A', teacherRemarks: 'Very good conceptual grasp' },
    { subject: 'Computer Science', maxMarks: 100, obtainedMarks: 95, grade: 'A+', teacherRemarks: 'Mastery in logic & syntax' },
    { subject: 'English', maxMarks: 100, obtainedMarks: 89, grade: 'A', teacherRemarks: 'Strong vocabulary & structure' },
  ],
};

class ExamService {
  public async getAllExams(filters?: ExamFilter): Promise<Exam[]> {
    let exams: Exam[] = [];
    try {
      exams = await apiClient.get<Exam[]>('/exams');
      if (!exams || exams.length === 0) {
        exams = SEED_EXAMS;
      }
    } catch {
      exams = SEED_EXAMS;
    }

    if (filters) {
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase().trim();
        exams = exams.filter(
          (e) =>
            e.examName.toLowerCase().includes(query) ||
            e.subject.toLowerCase().includes(query) ||
            (e.roomNumber && e.roomNumber.toLowerCase().includes(query))
        );
      }

      if (filters.className && filters.className !== 'ALL') {
        exams = exams.filter((e) => e.className === filters.className);
      }

      if (filters.examType && filters.examType !== 'ALL') {
        exams = exams.filter((e) => e.examType === filters.examType);
      }

      if (filters.status && filters.status !== 'ALL') {
        exams = exams.filter((e) => e.status === filters.status);
      }
    }

    return exams;
  }

  public async getExamById(id: number): Promise<Exam | null> {
    try {
      return await apiClient.get<Exam>(`/exams/${id}`);
    } catch {
      return SEED_EXAMS.find((e) => e.id === id) || null;
    }
  }

  public async createExam(request: ExamRequest): Promise<Exam> {
    try {
      return await apiClient.post<Exam>('/exams', request);
    } catch {
      const newExam: Exam = {
        id: Date.now(),
        ...request,
        maxMarks: request.maxMarks || 100,
        passingMarks: request.passingMarks || 35,
        status: request.status || 'SCHEDULED',
      };
      SEED_EXAMS.unshift(newExam);
      return newExam;
    }
  }

  public async updateExam(id: number, request: ExamRequest): Promise<Exam> {
    try {
      return await apiClient.put<Exam>(`/exams/${id}`, request);
    } catch {
      const index = SEED_EXAMS.findIndex((e) => e.id === id);
      if (index !== -1) {
        SEED_EXAMS[index] = { ...SEED_EXAMS[index], ...request };
        return SEED_EXAMS[index];
      }
      throw new Error(`Exam ${id} not found`);
    }
  }

  public async deleteExam(id: number): Promise<boolean> {
    try {
      await apiClient.delete(`/exams/${id}`);
      return true;
    } catch {
      const index = SEED_EXAMS.findIndex((e) => e.id === id);
      if (index !== -1) {
        SEED_EXAMS.splice(index, 1);
      }
      return true;
    }
  }

  public async getExamStats(): Promise<ExamStats> {
    const exams = await this.getAllExams();
    const scheduled = exams.filter((e) => e.status === 'SCHEDULED').length;
    const ongoing = exams.filter((e) => e.status === 'ONGOING').length;
    const completed = exams.filter((e) => e.status === 'COMPLETED').length;

    return {
      totalExams: exams.length,
      scheduledCount: scheduled,
      ongoingCount: ongoing,
      completedCount: completed,
    };
  }

  public getSampleReportCard(): StudentReportCard {
    return SAMPLE_REPORT_CARD;
  }
}

export const examService = new ExamService();
