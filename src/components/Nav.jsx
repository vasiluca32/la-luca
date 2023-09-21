import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext, { useAuth } from '../context/AuthContext';
import './Nav.scss';
import logo from '../assets/logo/result-1.svg';

const Nav = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const { logOut } = useAuth();

  const loggedUser = useContext(AuthContext);

  function handleSignOut() {
    logOut();
  }

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container-fluid text-center'>
        <NavLink className='navbar-brand' to='/'>
          <div className='img-wrapper'>
            <img src={logo} alt='Logo' width='1000' height='207' />
          </div>
        </NavLink>

        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label='Toggle navigation'
          onClick={handleNavCollapse}
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}
          id='navbarSupportedContent'
        >
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <NavLink to='/' className='nav-link active'>
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='products'>
                Products
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='contact'>
                Contact
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='blog'>
                Blog
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='dashboard'>
                Dashboard
              </NavLink>
            </li>

            {loggedUser.currentUser ? (
              <>
                <li className='nav-item'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    className='bi bi-person'
                    viewBox='0 0 16 16'
                  >
                    <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z' />
                  </svg>
                  <p>{loggedUser.currentUser.email}</p>
                </li>
                <li className='nav-item'>
                  <NavLink className='nav-link' onClick={handleSignOut}>
                    Sign Out
                  </NavLink>
                </li>
              </>
            ) : (
              <li className='nav-item'>
                <NavLink className='nav-link' to='login'>
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
