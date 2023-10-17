import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminRoutes = () => {
  const location = useLocation();
  const auth = useAuth();

  if (auth.currentUser && auth.role) {
    return <Outlet />;
  } else if (auth.currentUser) {
    return (
      <div style={{ marginTop: '60px' }}>
        <h1>Unauthorized</h1>
      </div>
    );
  } else {
    return <Navigate to='/*' state={{ from: location }} replace />;
  }
};

export default AdminRoutes;
