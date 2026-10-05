export interface Student {
  id: number;
  admissionNo: string;
  firstName: string;
  lastName?: string;
  fullName: string;
  className: string;
  section?: string;
  rollNo?: number;
  house?: string;
  dateOfBirth?: string; // format: YYYY-MM-DD
  bloodGroup?: string;
  gender?: string;
  nationality?: string;
  parentEmail?: string;
  parentPhone?: string;
  address?: string;
  academicYear?: string;
  isActive: boolean;
  createdAt?: string;
}

export interface StudentRequest {
  admissionNo: string;
  firstName: string;
  lastName?: string;
  className: string;
  section?: string;
  rollNo?: number;
  house?: string;
  dateOfBirth?: string;
  bloodGroup?: string;
  gender?: string;
  nationality?: string;
  parentEmail?: string;
  parentPhone?: string;
  address?: string;
  academicYear?: string;
}

export interface StudentFilter {
  searchQuery: string;
  className: string;
  section: string;
  gender: string;
  status: 'ALL' | 'ACTIVE' | 'INACTIVE';
}

export interface StudentStats {
  totalStudents: number;
  activeStudents: number;
  inactiveStudents: number;
  totalClasses: number;
}
