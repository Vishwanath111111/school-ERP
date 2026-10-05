import { apiClient } from './api.client';
import { Teacher, TeacherRequest, TeacherFilter, TeacherStats } from '@/types/teacher';

const LOCAL_STORAGE_KEY = 'greenwood_erp_teachers';

const SEED_TEACHERS: Teacher[] = [
  {
    id: 1,
    employeeId: 'TCH-2024-001',
    firstName: 'Dr. Robert',
    lastName: 'Chen',
    email: 'robert.chen@greenwood.edu',
    phone: '+91 98765 43210',
    department: 'SCIENCE',
    designation: 'HEAD_OF_DEPARTMENT',
    qualification: 'Ph.D. in Physics',
    assignedSubject: 'Physics',
    assignedClass: 'Class 11-A, 12-A',
    joiningDate: '2019-06-15',
    gender: 'MALE',
    salary: 75000,
    isActive: true,
    address: '42 Academic Ridge, North Sector, City',
  },
  {
    id: 2,
    employeeId: 'TCH-2024-002',
    firstName: 'Anita',
    lastName: 'Sharma',
    email: 'anita.sharma@greenwood.edu',
    phone: '+91 98123 45678',
    department: 'MATHEMATICS',
    designation: 'SENIOR_TEACHER',
    qualification: 'M.Sc. Mathematics, B.Ed.',
    assignedSubject: 'Mathematics',
    assignedClass: 'Class 10-A, 10-B',
    joiningDate: '2020-08-01',
    gender: 'FEMALE',
    salary: 62000,
    isActive: true,
    address: '15 Harmony Enclave, East Park, City',
  },
  {
    id: 3,
    employeeId: 'TCH-2024-003',
    firstName: 'Vikram',
    lastName: 'Deshmukh',
    email: 'vikram.d@greenwood.edu',
    phone: '+91 97654 32109',
    department: 'COMPUTER_SCIENCE',
    designation: 'HEAD_OF_DEPARTMENT',
    qualification: 'M.Tech Computer Science',
    assignedSubject: 'Computer Science',
    assignedClass: 'Class 9-A, 11-B',
    joiningDate: '2021-04-10',
    gender: 'MALE',
    salary: 70000,
    isActive: true,
    address: '88 Cyber Heights, IT Corridor, City',
  },
  {
    id: 4,
    employeeId: 'TCH-2024-004',
    firstName: 'Meera',
    lastName: 'Kulkarni',
    email: 'meera.k@greenwood.edu',
    phone: '+91 99887 76655',
    department: 'ENGLISH',
    designation: 'SENIOR_TEACHER',
    qualification: 'M.A. English Literature',
    assignedSubject: 'English Literature',
    assignedClass: 'Class 8-A, 9-B',
    joiningDate: '2022-01-12',
    gender: 'FEMALE',
    salary: 58000,
    isActive: true,
    address: '23 Rosewood Avenue, West End, City',
  },
  {
    id: 5,
    employeeId: 'TCH-2024-005',
    firstName: 'Suresh',
    lastName: 'Patil',
    email: 'suresh.patil@greenwood.edu',
    phone: '+91 94567 89012',
    department: 'PHYSICAL_EDUCATION',
    designation: 'SPORTS_COACH',
    qualification: 'M.P.Ed. Sports Science',
    assignedSubject: 'Physical Education',
    assignedClass: 'All Grades',
    joiningDate: '2023-03-20',
    gender: 'MALE',
    salary: 48000,
    isActive: true,
    address: '7 Sports Complex Housing, City',
  },
];

class TeacherService {
  private getStoredTeachers(): Teacher[] {
    if (typeof window === 'undefined') return SEED_TEACHERS;
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(SEED_TEACHERS));
        return SEED_TEACHERS;
      }
      return JSON.parse(stored);
    } catch {
      return SEED_TEACHERS;
    }
  }

  private saveStoredTeachers(teachers: Teacher[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(teachers));
    } catch {
      // Ignore storage errors
    }
  }

  public async getAllTeachers(filters?: TeacherFilter): Promise<Teacher[]> {
    let teachers: Teacher[] = [];
    try {
      teachers = await apiClient.get<Teacher[]>('/teachers');
      if (!teachers || teachers.length === 0) {
        teachers = this.getStoredTeachers();
      }
    } catch {
      teachers = this.getStoredTeachers();
    }

    if (filters) {
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase().trim();
        teachers = teachers.filter(
          (t) =>
            t.firstName.toLowerCase().includes(query) ||
            t.lastName.toLowerCase().includes(query) ||
            t.employeeId.toLowerCase().includes(query) ||
            t.email.toLowerCase().includes(query) ||
            t.assignedSubject.toLowerCase().includes(query)
        );
      }

      if (filters.department && filters.department !== 'ALL') {
        teachers = teachers.filter((t) => t.department === filters.department);
      }

      if (filters.designation && filters.designation !== 'ALL') {
        teachers = teachers.filter((t) => t.designation === filters.designation);
      }

      if (filters.isActive !== undefined && filters.isActive !== 'ALL') {
        const activeBool = filters.isActive === 'true';
        teachers = teachers.filter((t) => t.isActive === activeBool);
      }
    }

    return teachers;
  }

  public async getTeacherById(id: number): Promise<Teacher | null> {
    try {
      return await apiClient.get<Teacher>(`/teachers/${id}`);
    } catch {
      const teachers = this.getStoredTeachers();
      return teachers.find((t) => t.id === id) || null;
    }
  }

  public async createTeacher(request: TeacherRequest): Promise<Teacher> {
    try {
      return await apiClient.post<Teacher>('/teachers', request);
    } catch {
      const teachers = this.getStoredTeachers();
      const newTeacher: Teacher = {
        id: Date.now(),
        ...request,
        isActive: request.isActive !== undefined ? request.isActive : true,
      };
      teachers.unshift(newTeacher);
      this.saveStoredTeachers(teachers);
      return newTeacher;
    }
  }

  public async updateTeacher(id: number, request: TeacherRequest): Promise<Teacher> {
    try {
      return await apiClient.put<Teacher>(`/teachers/${id}`, request);
    } catch {
      const teachers = this.getStoredTeachers();
      const index = teachers.findIndex((t) => t.id === id);
      if (index !== -1) {
        teachers[index] = { ...teachers[index], ...request };
        this.saveStoredTeachers(teachers);
        return teachers[index];
      }
      throw new Error(`Teacher with ID ${id} not found`);
    }
  }

  public async deleteTeacher(id: number): Promise<boolean> {
    try {
      await apiClient.delete(`/teachers/${id}`);
      return true;
    } catch {
      let teachers = this.getStoredTeachers();
      teachers = teachers.filter((t) => t.id !== id);
      this.saveStoredTeachers(teachers);
      return true;
    }
  }

  public async getTeacherStats(): Promise<TeacherStats> {
    const teachers = await this.getAllTeachers();
    const active = teachers.filter((t) => t.isActive).length;
    const depts = new Set(teachers.map((t) => t.department)).size;
    const hods = teachers.filter((t) => t.designation === 'HEAD_OF_DEPARTMENT').length;

    return {
      totalTeachers: teachers.length,
      activeTeachers: active,
      departmentsCount: depts,
      headOfDepartments: hods,
    };
  }
}

export const teacherService = new TeacherService();
