export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'TEACHER' | 'STAFF';

export interface AuthUser {
  id: number;
  email: string;
  role: UserRole;
  name?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    id: number;
    email: string;
  };
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
