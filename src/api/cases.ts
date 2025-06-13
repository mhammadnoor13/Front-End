import type { HttpClient } from './httpClient';

export interface CaseInput {
  email: string;
  speciality: string;
  description: string;
}

export function makeCaseService(client: HttpClient) {
  return {
    submitCase(data: CaseInput) {
      return client.post<void>('/cases', data);
    },
  };
}
