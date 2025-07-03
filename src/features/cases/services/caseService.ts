import { CaseEndpoints } from "../../../shared/api/endpoints";
import { HttpClient } from "../../../shared/contexts/httpClient";
import { SpecialtyKey } from "../../../shared/utils/specialties";
import { CaseToReviewResponse } from "../types/Case";

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

export async function getAssignedCases(
  httpClient:HttpClient
): Promise<CaseToReviewResponse[]> {

  return httpClient.get<CaseToReviewResponse[]>(CaseEndpoints.review);
}