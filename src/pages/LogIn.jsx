import React, { useRef } from 'react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Helmet } from 'react-helmet-async';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const { signUp } = useAuth();
  let emailInput = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    signUp(email);
    emailInput.current.value = '';
    setEmail('');
    setEmailSent(true);
  }
  return (
    <>
      <Helmet>
        <title>Login - Gradina La Luca</title>
        <meta property='og:title' content='Login - Gradina La Luca' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://la-luca.web.app/login' />
        <meta
          property='og:image'
          content='https://firebasestorage.googleapis.com/v0/b/la-luca.appspot.com/o/appAssets%2Fheading-image.jpg?alt=media&token=56d8a9bb-98c6-484c-81bb-3c270c835fa6'
        />
      </Helmet>
      <div className='container' style={{ marginTop: '60px' }}>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Email address
            </label>
            <input
              type='email'
              name='email'
              id='email'
              autoComplete='on'
              ref={emailInput}
              className='form-control'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type='submit'
            className='btn btn-primary'
            disabled={email ? false : true}
          >
            Submit
          </button>
          {emailSent ? <p>Email sent</p> : ''}
        </form>
      </div>
    </>
  );
};

export default LogIn;
