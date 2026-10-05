export interface ReportSummary {
  totalStudents: number;
  totalTeachers: number;
  totalRevenue: number;
  totalPendingDues: number;
  overallAttendanceRate: number;
  classAttendanceRates: Record<string, number>;
  feeStatusBreakdown: Record<string, number>;
}

export interface ClassAttendanceStat {
  className: string;
  enrolledStudents: number;
  presentCount: number;
  absentCount: number;
  attendancePercentage: number;
}

export interface FinancialFeeStat {
  category: string;
  totalInvoiced: number;
  collectedAmount: number;
  pendingAmount: number;
  collectionRate: number;
}

export interface AcademicGradeStat {
  subject: string;
  totalStudentsAssessed: number;
  averageGrade: string;
  passPercentage: number;
  topScorer: string;
}
