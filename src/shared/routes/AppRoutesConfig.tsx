import { Routes, Route, Navigate } from 'react-router-dom';
import GuestLayout from '../layouts/GuestLayout';
import RegisterPage from '../../features/auth/RegisterPage';
import HomePage from '../../features/cases/add-case/CasesPage';
import { AppRoutes } from './routes';
import { PrivateRoute } from './PrivateRoute';
import ReviewCasesPage from '../../features/cases/review-cases/ReviewCasesPage';
import LoginPage from '../../features/auth/LoginPage';
import ReviewCasePage from '../../features/cases/review-cases/ReviewCasePage';
// import LoginPage from '../features/home/LoginPage';       // stub for future

export default function AppRoutesConfig() {
  return (
    <Routes>
      <Route element={<GuestLayout />}>
        <Route index element={<HomePage />} />
        { <Route path={AppRoutes.LOGIN} element={<LoginPage />} />}
        { <Route path = {AppRoutes.REGISTER} element={<RegisterPage />} /> }
        <Route 
          path={AppRoutes.REVIEW_CASES}
          element = {
            <PrivateRoute>
              <ReviewCasesPage />
            </PrivateRoute>
          }/>
        <Route path="/review-cases/:id" element={<ReviewCasePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
