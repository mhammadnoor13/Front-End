
export interface RegisterPayload {
  firstName: string
  lastName: string
  speciality: string
  email: string
  password: string
}
export interface FormState extends RegisterPayload {
  confirmPassword: string
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

