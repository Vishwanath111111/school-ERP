import { apiClient } from './api.client';
import { LoginCredentials, AuthResponse } from '@/types/auth';

class AuthService {
  /**
   * Authenticates standard user via Spring Boot POST /api/auth/login
   */
  public async loginUser(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/login', {
      email: credentials.email,
      password: credentials.password,
    });
  }

  /**
   * Authenticates administrator via Spring Boot POST /api/admin/login
   */
  public async loginAdmin(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/admin/login', {
      email: credentials.email,
      password: credentials.password,
    });
  }
}

export const authService = new AuthService();
