import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import LoadingSpinner from './LoadingSpinner';

const PrivateRoutes = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loggedUser = await new Promise((resolve, reject) => {
          const unsubscribe = auth.onAuthStateChanged((user) => {
            resolve(user);
            unsubscribe();
          }, reject);
        });

        if (loggedUser) {
          setUser(loggedUser);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error if necessary
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  } else if (user) {
    return <Outlet />;
  } else {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
};

export default PrivateRoutes;
