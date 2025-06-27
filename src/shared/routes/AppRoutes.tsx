import { Routes, Route, Navigate } from 'react-router-dom';
import GuestLayout from '../layouts/GuestLayout';
import RegisterPage from '../../features/auth/RegisterPage';
import HomePage from '../../features/cases/pages/CasesPage';
// import LoginPage from '../features/home/LoginPage';       // stub for future
// import RegisterPage from '../features/home/RegisterPage'; // stub for future

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<GuestLayout />}>
        <Route index element={<HomePage />} />
        {/* <Route path="login" element={<LoginPage />} /> */}
        { <Route path="register" element={<RegisterPage />} /> }
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
