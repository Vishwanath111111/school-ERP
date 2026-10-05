export type DayOfWeek = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY';

export interface TimetableEntry {
  id: number;
  className: string;
  dayOfWeek: DayOfWeek;
  periodNumber: number;
  subject: string;
  teacherName?: string;
  substituteTeacherName?: string;
  roomNumber?: string;
  startTime: string;
  endTime: string;
  isSubstituted: boolean;
}

export interface TimetableRequest {
  className: string;
  dayOfWeek: DayOfWeek;
  periodNumber: number;
  subject: string;
  teacherName?: string;
  substituteTeacherName?: string;
  roomNumber?: string;
  startTime?: string;
  endTime?: string;
  isSubstituted?: boolean;
}

export interface TimetableFilter {
  searchQuery?: string;
  className?: string;
  dayOfWeek?: string;
}

export interface TimetableStats {
  totalWeeklyPeriods: number;
  activeClassSectionsCount: number;
  substitutedPeriodsCount: number;
  freePeriodsCount: number;
}
