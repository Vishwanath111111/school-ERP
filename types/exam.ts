export type ExamType = 'MID_TERM' | 'FINAL_TERM' | 'UNIT_TEST' | 'PRELIM';

export type ExamStatus = 'SCHEDULED' | 'ONGOING' | 'COMPLETED';

export interface Exam {
  id: number;
  examName: string;
  examType: ExamType;
  className: string;
  subject: string;
  examDate: string;
  startTime?: string;
  endTime?: string;
  maxMarks: number;
  passingMarks: number;
  roomNumber?: string;
  status: ExamStatus;
}

export interface ExamRequest {
  examName: string;
  examType: ExamType;
  className: string;
  subject: string;
  examDate: string;
  startTime?: string;
  endTime?: string;
  maxMarks?: number;
  passingMarks?: number;
  roomNumber?: string;
  status?: ExamStatus;
}

export interface ExamFilter {
  searchQuery?: string;
  className?: string;
  examType?: string;
  status?: string;
}

export interface ExamStats {
  totalExams: number;
  scheduledCount: number;
  ongoingCount: number;
  completedCount: number;
}

export interface SubjectMarksRecord {
  subject: string;
  maxMarks: number;
  obtainedMarks: number;
  grade: string;
  teacherRemarks: string;
}

export interface StudentReportCard {
  studentId: string;
  studentName: string;
  rollNumber: string;
  className: string;
  academicYear: string;
  examName: string;
  marks: SubjectMarksRecord[];
  totalMaxMarks: number;
  totalObtainedMarks: number;
  percentage: number;
  gpa: string;
  overallGrade: string;
  resultStatus: 'PASSED' | 'FAILED' | 'DISTINCTION';
}
