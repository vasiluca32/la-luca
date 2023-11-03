import React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard - Gradina La Luca</title>
      </Helmet>

      <main>
        <div className='container'>
          <nav>
            <ul className='nav nav-underline'>
              <li className='nav-item'>
                <NavLink
                  to='admin-control'
                  className='nav-link'
                  aria-current='page'
                >
                  Admin Control
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='new-product' className='nav-link'>
                  New Product
                </NavLink>
              </li>
            </ul>
          </nav>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
