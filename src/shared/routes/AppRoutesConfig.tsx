import { Routes, Route, Navigate } from 'react-router-dom';
import GuestLayout from '../layouts/GuestLayout';
import RegisterPage from '../../features/auth/RegisterPage';
import HomePage from '../../features/cases/pages/CasesPage';
import { AppRoutes } from './routes';
import { PrivateRoute } from './PrivateRoute';
import ReviewCasesPage from '../../features/cases/pages/ReviewCasesPage';
// import LoginPage from '../features/home/LoginPage';       // stub for future
// import RegisterPage from '../features/home/RegisterPage'; // stub for future

export default function AppRoutesConfig() {
  return (
    <Routes>
      <Route element={<GuestLayout />}>
        <Route index element={<HomePage />} />
        {/* <Route path="login" element={<LoginPage />} /> */}
        { <Route path = {AppRoutes.register} element={<RegisterPage />} /> }
      </Route>
      <Route 
        path={AppRoutes.reviewCases}
        element = {
          <PrivateRoute>
            <ReviewCasesPage />
          </PrivateRoute>
        }/>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
