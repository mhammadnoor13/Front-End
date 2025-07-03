import axios, { type AxiosInstance } from 'axios';

export interface HttpClient {
  post<T>(url: string, data: unknown): Promise<T>;
  get<T>(url: string, params?: Record<string, unknown>): Promise<T>;
  setAuthToken(token: string | null): void;

}

export class AxiosClient implements HttpClient {
  private instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5100',
    });
  }
  async post<T>(url: string, data: unknown) {
    const resp = await this.instance.post<T>(url, data);
    return resp.data;
  }
  
  async get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    const resp = await this.instance.get<T>(url, { params });
    return resp.data;
  }
  setAuthToken(token: string | null): void {
    if(token){
      this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    else{
      delete this.instance.defaults.headers.common['Authorization'];
    }
  }
}

// BOB the Waiter
