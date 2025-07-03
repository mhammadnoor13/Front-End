import { createContext, useContext, useEffect, useState } from "react";
import { useHttpClient } from "./HttpClientContext";
import { LoginRequest, RegisterPayload } from "../../features/auth/types";
import { loginUser, registerUser } from "../../features/auth/services";

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface AuthContextValue {
  isAuthenticated: boolean;
  register: (data: RegisterPayload) => Promise<void>;
  login: (payload: LoginRequest) => Promise<void>;
  logout: () => void;
  tokens: AuthTokens | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const http = useHttpClient();
  const [tokens, setTokens] = useState<AuthTokens | null>(() => {
  const saved = localStorage.getItem('authTokens');
   return saved ? JSON.parse(saved) as AuthTokens : null;
 });  
 
 
  const isAuthenticated = tokens !== null;


  // Save or clear tokens in localStorage whenever they change
  useEffect(() => {
    if (tokens) {
      localStorage.setItem('authTokens', JSON.stringify(tokens));
    } else {
      localStorage.removeItem('authTokens');
    }
  }, [tokens]);


  useEffect(() => {
    http.setAuthToken(tokens?.accessToken ?? null);
  }, [http, tokens]);

  // Call the API and store tokens on success
  const register = async (data: RegisterPayload) => {
    const tokens = await registerUser(http, data);
    setTokens(tokens);
    
  };

  const login = async (data: LoginRequest) => {
    const tokens = await loginUser(http,data);
    setTokens(tokens);
  };

  // Clear everything
  const logout = () => {
    setTokens(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, register, login,logout, tokens }}>
      {children}
    </AuthContext.Provider>
  );
};


export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('AuthProvider is missing—wrap your app in <AuthProvider>');
  return ctx;
}