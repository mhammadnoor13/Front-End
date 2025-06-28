// src/services/authService.ts

import { AuthEndpoints } from "../../shared/api/endpoints";
import { HttpClient } from "../../shared/contexts/httpClient"
import { AuthTokens, RegisterPayload } from "./types"



export function registerUser(
  httpClient : HttpClient,
  data: RegisterPayload
): Promise <AuthTokens>{
  return httpClient.post<AuthTokens>(AuthEndpoints.register,data);
}
