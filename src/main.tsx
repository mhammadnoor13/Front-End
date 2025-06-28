import './shared/i18n';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HttpClientProvider } from './shared/contexts/HttpClientContext';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './shared/contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HttpClientProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
      </BrowserRouter>
      </AuthProvider>
    </HttpClientProvider>
  </React.StrictMode>
);
