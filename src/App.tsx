// src/App.tsx
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import AppRoutes from './shared/routes/AppRoutes';

export default function App() {
  const { i18n } = useTranslation();

  // Whenever the language changes, update <html lang> and <html dir>
  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir  = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <>
      {/* Renders your <Routes> → pages */}
      <AppRoutes />

      {/* Global container for any toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </>
  );
}
