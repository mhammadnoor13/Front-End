import './i18n';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HttpClientProvider } from './contexts/HttpClientContext';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HttpClientProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HttpClientProvider>
  </React.StrictMode>
);
