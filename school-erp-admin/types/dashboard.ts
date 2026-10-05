export interface DashboardMetrics {
  totalStudents: number;
  activeStudents: number;
  inactiveStudents: number;
  totalTeachers: number;
  todayAttendancePercentage: number;
  monthlyFeeCollected: number;
  pendingFeeDues: number;
}

export interface ActivityItem {
  id: string;
  type: 'ADMISSION' | 'ATTENDANCE' | 'FEE' | 'NOTICE';
  title: string;
  description: string;
  timestamp: string;
  iconName: string;
  badgeVariant: 'success' | 'info' | 'warning' | 'primary';
}

export interface SchoolEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  category: 'EXAM' | 'HOLIDAY' | 'MEETING' | 'EVENT';
  location?: string;
}

export interface ClassEnrollmentSummary {
  className: string;
  studentCount: number;
  capacity: number;
  percentage: number;
}
