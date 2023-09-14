import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoutes = () => {
  const location = useLocation();
  const auth = useAuth();

  if (auth.currentUser && auth.role === 'admin') {
    return <Outlet />;
  } else if (auth.currentUser && auth.role === 'customer') {
    return <div>Unauthorized</div>;
  } else {
    return <Navigate to='/*' state={{ from: location }} replace />;
  }
};

export default AdminRoutes;
