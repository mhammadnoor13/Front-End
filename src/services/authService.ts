// src/services/authService.ts

export interface RegisterPayload {
  firstName: string
  lastName: string
  speciality: string
  email: string
  password: string
}
export interface RegisterResponse {
  userId: string
}

const API_BASE = import.meta.env.VITE_API_URL || ''

/**
 * Attempts to register a user.
 * @throws {Error} where `message` is an error code:
 *   - USER_EXISTS
 *   - INVALID_SPECIALTY
 *   - INVALID_REQUEST
 *   - SERVER_ERROR
 *   - NETWORK_ERROR
 */
export async function registerUser(
  data: RegisterPayload
): Promise<RegisterResponse> {
  let res: Response
  try {
    res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  } catch {
    // network-level failure
    throw new Error('NETWORK_ERROR')
  }

  if (!res.ok) {
    // try to parse { code, message } body
    let errCode = 'SERVER_ERROR'
    try {
      const body = await res.json()
      if (body.code) errCode = body.code
      else if (body.message) errCode = 'INVALID_REQUEST'
    } catch {
      // empty or malformed JSON
    }
    throw new Error(errCode)
  }

  // success: parse JSON if present
  const ct = res.headers.get('content-type') || ''
  if (ct.includes('application/json')) {
    try {
      return await res.json()
    } catch {
      // empty body → return minimal payload
    }
  }
  return {} as RegisterResponse
}
