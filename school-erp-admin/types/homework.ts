export type HomeworkStatus = 'ACTIVE' | 'COMPLETED' | 'EXPIRED';

export interface Homework {
  id: number;
  title: string;
  className: string;
  section?: string;
  subject: string;
  teacherName?: string;
  description: string;
  issueDate: string;
  dueDate: string;
  totalMarks: number;
  submittedCount: number;
  totalStudents: number;
  status: HomeworkStatus;
  attachmentUrl?: string;
}

export interface HomeworkRequest {
  title: string;
  className: string;
  section?: string;
  subject: string;
  teacherName?: string;
  description: string;
  issueDate?: string;
  dueDate: string;
  totalMarks?: number;
  submittedCount?: number;
  totalStudents?: number;
  status?: HomeworkStatus;
  attachmentUrl?: string;
}

export interface HomeworkFilter {
  searchQuery?: string;
  className?: string;
  subject?: string;
  status?: string;
}

export interface HomeworkStats {
  totalAssignments: number;
  activeAssignmentsCount: number;
  dueTodayCount: number;
  totalSubmissionsReceived: number;
}
