export interface SchoolProfileSettings {
  schoolName: string;
  affiliationCode?: string;
  principalName?: string;
  email: string;
  phone: string;
  address?: string;
  currentAcademicYear: string;
  sessionStartDate?: string;
  sessionEndDate?: string;
  activeTerms?: string;
  logoUrl?: string;
}

export interface AcademicYearConfig {
  academicYear: string;
  startDate: string;
  endDate: string;
  activeTerms: string[];
  gradeClasses: string[];
}

export interface RolePermissionConfig {
  role: 'SUPER_ADMIN' | 'ADMIN' | 'TEACHER' | 'STAFF' | 'PARENT';
  canManageStudents: boolean;
  canManageTeachers: boolean;
  canCollectFees: boolean;
  canMarkAttendance: boolean;
  canBroadcastNotices: boolean;
  canAssignHomework: boolean;
  canModifySettings: boolean;
}

export interface SystemBackupConfig {
  autoBackupEnabled: boolean;
  backupFrequency: 'DAILY' | 'WEEKLY' | 'MONTHLY';
  lastBackupDate: string;
  databaseSizeMB: number;
  totalRecordsCount: number;
}
