import { SpecialtyKey } from '../utils/specialties';
import type { HttpClient } from './httpClient';

export interface CaseInput {
  email: string;
  speciality: SpecialtyKey;
  description: string;
}

export function makeCaseService(client: HttpClient) {
  return {
    submitCase(data: CaseInput) {
      return client.post<void>('/cases', data);
    },
  };
}
