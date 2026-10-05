import { ApiError } from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

interface RequestOptions extends RequestInit {
  timeoutMs?: number;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { timeoutMs = 15000, headers, ...customConfig } = options;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const config: RequestInit = {
      ...customConfig,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...headers,
      },
      signal: controller.signal,
    };

    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${this.baseUrl}${cleanEndpoint}`;

    try {
      const response = await fetch(url, config);
      clearTimeout(timeoutId);

      // Handle HTTP Errors
      if (!response.ok) {
        let errorMessage = `HTTP Error ${response.status}: ${response.statusText}`;
        try {
          const errorJson = await response.json();
          errorMessage = errorJson.message || errorJson.error || errorMessage;
        } catch {
          // Fallback if response body is not JSON
        }

        const apiError: ApiError = {
          message: errorMessage,
          status: response.status,
        };
        throw apiError;
      }

      // Handle 204 No Content
      if (response.status === 204) {
        return {} as T;
      }

      const data = await response.json();
      return data as T;
    } catch (error: unknown) {
      clearTimeout(timeoutId);

      if ((error as Error).name === 'AbortError') {
        const timeoutError: ApiError = {
          message: 'Request timed out. Please check your backend connection.',
          status: 408,
        };
        throw timeoutError;
      }

      if ((error as ApiError).status !== undefined) {
        throw error;
      }

      const networkError: ApiError = {
        message: (error as Error).message || 'Failed to connect to the server. Please check backend status.',
        status: 500,
      };
      throw networkError;
    }
  }

  public async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  public async post<T>(endpoint: string, body: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  public async put<T>(endpoint: string, body: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  public async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
