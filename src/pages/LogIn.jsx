import React, { useRef } from 'react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

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
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email address
          </label>
          <input
            type='email'
            name='email'
            id='email'
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
  );
};

export default LogIn;
