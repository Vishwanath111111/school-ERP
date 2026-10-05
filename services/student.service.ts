import { apiClient } from './api.client';
import { Student, StudentRequest } from '@/types/student';

class StudentService {
  /**
   * Fetches all registered students from Spring Boot backend
   */
  public async getAllStudents(): Promise<Student[]> {
    return apiClient.get<Student[]>('/students');
  }

  /**
   * Fetches single student record by ID
   */
  public async getStudentById(id: number): Promise<Student> {
    return apiClient.get<Student>(`/students/${id}`);
  }

  /**
   * Creates a new student record in Spring Boot backend
   */
  public async createStudent(studentData: StudentRequest): Promise<Student> {
    return apiClient.post<Student>('/students', studentData);
  }
}

export const studentService = new StudentService();
