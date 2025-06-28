import { createContext, useContext, useEffect, useState } from "react";
import { useHttpClient } from "./HttpClientContext";
import { RegisterPayload } from "../../features/auth/types";
import { registerUser } from "../../features/auth/services";

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface AuthContextValue {
  isAuthenticated: boolean;
  register: (data: RegisterPayload) => Promise<void>;
  logout: () => void;
  tokens: AuthTokens | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const http = useHttpClient();
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const isAuthenticated = tokens !== null;

  // On app start, rehydrate tokens from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('authTokens');
    if (saved) {
      setTokens(JSON.parse(saved));
    }
  }, []);

  // Save or clear tokens in localStorage whenever they change
  useEffect(() => {
    if (tokens) {
      localStorage.setItem('authTokens', JSON.stringify(tokens));
    } else {
      localStorage.removeItem('authTokens');
    }
  }, [tokens]);

  // Call the API and store tokens on success
  const register = async (data: RegisterPayload) => {
    const tokens = await registerUser(http, data);
    setTokens(tokens);
    
  };

  // Clear everything
  const logout = () => {
    setTokens(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, register, logout, tokens }}>
      {children}
    </AuthContext.Provider>
  );
};


export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('AuthProvider is missing—wrap your app in <AuthProvider>');
  return ctx;
}