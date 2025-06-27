import React, { createContext, useContext } from 'react';
import { type HttpClient, AxiosClient } from './httpClient';

const Context = createContext<HttpClient | null>(null);

export const HttpClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const client = new AxiosClient();
  return <Context.Provider value={client}>{children}</Context.Provider>;
};

export function useHttpClient(): HttpClient {
  const client = useContext(Context);
  if (!client) throw new Error('HttpClientProvider missing');
  return client;
}
