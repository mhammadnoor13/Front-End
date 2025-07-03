// src/services/authService.ts

import { AuthEndpoints } from "../../shared/api/endpoints";
import { HttpClient } from "../../shared/contexts/httpClient"
import { AuthTokens, LoginRequest, LoginResponse, RegisterPayload } from "./types"



export function registerUser(
  httpClient : HttpClient,
  data: RegisterPayload
): Promise <AuthTokens>{
  return httpClient.post<AuthTokens>(AuthEndpoints.register,data);
}

export async function loginUser(
  httpClient: HttpClient,
  payload: LoginRequest
): Promise<LoginResponse> {
  return await httpClient.post<LoginResponse>(
    AuthEndpoints.login,
    payload
  );
}