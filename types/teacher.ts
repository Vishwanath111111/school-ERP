export type DepartmentType = 'SCIENCE' | 'MATHEMATICS' | 'ENGLISH' | 'SOCIAL_STUDIES' | 'COMPUTER_SCIENCE' | 'ARTS' | 'PHYSICAL_EDUCATION' | 'LANGUAGES';

export type DesignationType = 'HEAD_OF_DEPARTMENT' | 'SENIOR_TEACHER' | 'ASSISTANT_TEACHER' | 'LAB_ASSISTANT' | 'SPORTS_COACH';

export interface Teacher {
  id: number;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: DepartmentType;
  designation: DesignationType;
  qualification: string;
  assignedSubject: string;
  assignedClass?: string;
  joiningDate: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  salary?: number;
  isActive: boolean;
  address?: string;
}

export interface TeacherRequest {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: DepartmentType;
  designation: DesignationType;
  qualification: string;
  assignedSubject: string;
  assignedClass?: string;
  joiningDate: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  salary?: number;
  isActive?: boolean;
  address?: string;
}

export interface TeacherFilter {
  searchQuery?: string;
  department?: string;
  designation?: string;
  isActive?: string;
}

export interface TeacherStats {
  totalTeachers: number;
  activeTeachers: number;
  departmentsCount: number;
  headOfDepartments: number;
}
