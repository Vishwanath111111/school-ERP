export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'HALF_DAY';

export interface AttendanceRecord {
  id?: number;
  studentId: number;
  studentName: string;
  className: string;
  section?: string;
  rollNo?: number;
  date: string;
  status: AttendanceStatus;
  remarks?: string;
}

export interface BulkAttendancePayload {
  date: string;
  items: AttendanceRecord[];
}

export interface AttendanceStats {
  totalStudents: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  halfDayCount: number;
  attendancePercentage: number;
}
