import { HttpClient } from "../../shared/contexts/httpClient";
import { SpecialtyKey } from "../../shared/utils/specialties";

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
