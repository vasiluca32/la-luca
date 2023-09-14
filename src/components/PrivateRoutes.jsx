import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoutes = () => {
  const location = useLocation();
  const auth = useAuth();

  return auth.currentUser &&
    (auth.role === 'admin' || auth.role === 'customer') ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export default PrivateRoutes;
