import React, { JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AppRoutes } from './routes';

interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // If not logged in, redirect to register, keeping the original path in state
  if (!isAuthenticated) {
    return (
      <Navigate
        to={AppRoutes.register}
        state={{ from: location }}
        replace
      />
    );
  }

  // Otherwise, render the protected component
  return children;
};
