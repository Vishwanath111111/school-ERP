import { apiClient } from './api.client';
import {
  ReportSummary,
  ClassAttendanceStat,
  FinancialFeeStat,
  AcademicGradeStat,
} from '@/types/report';

const SEED_SUMMARY: ReportSummary = {
  totalStudents: 450,
  totalTeachers: 32,
  totalRevenue: 428500,
  totalPendingDues: 48200,
  overallAttendanceRate: 93.6,
  classAttendanceRates: {
    'Class 10-A': 94.2,
    'Class 10-B': 91.8,
    'Class 11-A': 96.5,
    'Class 9-A': 89.4,
  },
  feeStatusBreakdown: {
    PAID: 68.5,
    PENDING: 24.0,
    OVERDUE: 7.5,
  },
};

const SEED_ATTENDANCE_STATS: ClassAttendanceStat[] = [
  { className: 'Class 11-A (Science)', enrolledStudents: 38, presentCount: 37, absentCount: 1, attendancePercentage: 97.3 },
  { className: 'Class 10-A (General)', enrolledStudents: 42, presentCount: 40, absentCount: 2, attendancePercentage: 95.2 },
  { className: 'Class 9-B (Commerce)', enrolledStudents: 35, presentCount: 32, absentCount: 3, attendancePercentage: 91.4 },
  { className: 'Class 8-A (Middle)', enrolledStudents: 40, presentCount: 36, absentCount: 4, attendancePercentage: 90.0 },
  { className: 'Class 7-B (Middle)', enrolledStudents: 38, presentCount: 35, absentCount: 3, attendancePercentage: 92.1 },
];

const SEED_FINANCIAL_STATS: FinancialFeeStat[] = [
  { category: 'Tuition Fee (Term 1 & 2)', totalInvoiced: 320000, collectedAmount: 295000, pendingAmount: 25000, collectionRate: 92.1 },
  { category: 'Annual Transport Charge', totalInvoiced: 75000, collectedAmount: 68000, pendingAmount: 7000, collectionRate: 90.6 },
  { category: 'Science & Computer Lab Fee', totalInvoiced: 50000, collectedAmount: 44500, pendingAmount: 5500, collectionRate: 89.0 },
  { category: 'Library & Sports Facility', totalInvoiced: 31700, collectedAmount: 21000, pendingAmount: 10700, collectionRate: 66.2 },
];

const SEED_ACADEMIC_STATS: AcademicGradeStat[] = [
  { subject: 'Mathematics', totalStudentsAssessed: 154, averageGrade: 'A (84.5%)', passPercentage: 96.1, topScorer: 'Aarav Sharma (99%)' },
  { subject: 'Physics & Chemistry', totalStudentsAssessed: 120, averageGrade: 'B+ (78.2%)', passPercentage: 92.5, topScorer: 'Rohan Gupta (97%)' },
  { subject: 'Computer Science & Coding', totalStudentsAssessed: 98, averageGrade: 'A+ (91.0%)', passPercentage: 98.9, topScorer: 'Ananya Verma (100%)' },
  { subject: 'English & Literature', totalStudentsAssessed: 180, averageGrade: 'A (82.4%)', passPercentage: 97.8, topScorer: 'Priya Patel (98%)' },
];

class ReportService {
  public async getSummary(): Promise<ReportSummary> {
    try {
      const summary = await apiClient.get<ReportSummary>('/reports/summary');
      return summary || SEED_SUMMARY;
    } catch {
      return SEED_SUMMARY;
    }
  }

  public getAttendanceReports(): ClassAttendanceStat[] {
    return SEED_ATTENDANCE_STATS;
  }

  public getFinancialReports(): FinancialFeeStat[] {
    return SEED_FINANCIAL_STATS;
  }

  public getAcademicReports(): AcademicGradeStat[] {
    return SEED_ACADEMIC_STATS;
  }
}

export const reportService = new ReportService();
