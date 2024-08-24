import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext, { useAuth } from '../../context/AuthContext';
import '../styles/Nav.scss';
import logo from '../../assets/logo/result-1.svg';
import { db } from '../../firebase/firebase';
import { onValue, ref } from 'firebase/database';

const Nav = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const { logOut } = useAuth();
  const loggedUser = useContext(AuthContext);

  function handleSignOut() {
    logOut();
  }

  useEffect(() => {
    if (!loggedUser) {
      return;
    }
    const cartRef = ref(db, `users/${loggedUser.currentUser.uid}/shoppingCart`);
    onValue(cartRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const cartSize = Object.entries(data).length;
        setCartItems(cartSize);
      } else {
        setCartItems(0);
      }
    });
  });

  return (
    <nav className='navbar-component navbar navbar-expand-lg navbar-light fixed-top bg-light'>
      <div className='container-fluid text-center'>
        <NavLink className='navbar-brand' to='/'>
          <div className='img-wrapper'>
            <img src={logo} alt='Logo' width='1000' height='207' />
          </div>
        </NavLink>

        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded={mobileMenu}
          aria-label='Toggle navigation'
          onClick={() =>
            !mobileMenu ? setMobileMenu(true) : setMobileMenu(false)
          }
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className={
            !mobileMenu ? 'navbar-collapse collapse' : 'navbar-collapse'
          }
          id='navbarSupportedContent'
        >
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <NavLink
                to='/'
                className='nav-link'
                aria-current='page'
                onClick={() => setMobileMenu(false)}
              >
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                className='nav-link'
                to='products'
                onClick={() => setMobileMenu(false)}
              >
                Products
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                className='nav-link'
                to='contact'
                onClick={() => setMobileMenu(false)}
              >
                Contact
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                className='nav-link'
                to='blog'
                onClick={() => setMobileMenu(false)}
              >
                Blog
              </NavLink>
            </li>

            {loggedUser.currentUser && loggedUser.role ? (
              <li className='nav-item'>
                <NavLink
                  className='nav-link'
                  to='dashboard'
                  onClick={() => setMobileMenu(false)}
                >
                  Dashboard
                </NavLink>
              </li>
            ) : (
              ''
            )}

            {loggedUser.currentUser ? (
              <li
                className='nav-item'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <NavLink
                  className='nav-link cart'
                  to='store'
                  onClick={() => setMobileMenu(false)}
                >
                  <div className='bullet'>{cartItems}</div>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    className='bi bi-cart4'
                    viewBox='0 0 16 16'
                  >
                    <path d='M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0' />
                  </svg>
                </NavLink>
              </li>
            ) : (
              ''
            )}

            {loggedUser.currentUser ? (
              <>
                <li
                  className='nav-item'
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
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
                  <p className='mb-0'>{loggedUser.currentUser.email}</p>
                </li>

                <li className='nav-item'>
                  <NavLink className='nav-link' onClick={handleSignOut}>
                    Sign Out
                  </NavLink>
                </li>
              </>
            ) : (
              <li className='nav-item'>
                <NavLink
                  className='nav-link'
                  to='login'
                  onClick={() => setMobileMenu(false)}
                >
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
