import axios, { type AxiosInstance } from 'axios';

export interface HttpClient {
  post<T>(url: string, data: unknown): Promise<T>;
}

export class AxiosClient implements HttpClient {
  private instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'https://localhost:7011',
    });
  }
  async post<T>(url: string, data: unknown) {
    const resp = await this.instance.post<T>(url, data);
    return resp.data;
  }
}
