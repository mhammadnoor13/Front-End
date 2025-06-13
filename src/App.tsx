import React from 'react';
import { ToastContainer } from 'react-toastify';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <>
      <AppRoutes />
      <ToastContainer position="top-right" />
    </>
  );
}
