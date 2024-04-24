import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import LoadingSpinner from './LoadingSpinner';

const AdminRoutes = () => {
  const location = useLocation();
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loggedUser = await new Promise((resolve, reject) => {
          const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
              user
                .getIdTokenResult()
                .then((idTokenResult) => {
                  if (!!idTokenResult.claims.admin) {
                    console.log(idTokenResult.claims.admin);
                    setRole(idTokenResult.claims.admin);
                  } else {
                    setRole(null);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }

            resolve(user);
            unsubscribe();
          }, reject);
        });

        console.log(loggedUser);

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
  } else if (user && role) {
    return <Outlet />;
  } else if (user) {
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
